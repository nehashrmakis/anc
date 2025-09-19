import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';
 import Swal from 'sweetalert2';
export default function PortList() {
  const [depos, setAgents] = useState([]);
  const [ validationError, setValidationError] = useState({});

 
  const [successMessage, setSuccessMessage] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
     contact_number: '',
   });

  const [isEditMode, setIsEditMode] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Port');

  // Pagination logic: calculate Depos to show on current page
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = depos.slice(indexOfFirstAgent, indexOfLastAgent);

  const totalPages = Math.ceil(depos.length / agentsPerPage);

  const hideModal = () => {
    const modalElement = document.getElementById('add-agent-modal-more');
    if (!modalElement) return;

    let modalInstance = Modal.getInstance(modalElement);
    if (!modalInstance) {
      modalInstance = new Modal(modalElement);
    }

    modalInstance.hide();
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationError) setValidationError('');  // clear error on typing
  };

  const validateForm = () => {
    const { name, email, contact_number, location } = formData;
  
    if (!name.trim()) {
      setValidationError("Port Name is required.");
      return false;
    }
 
  
    if (!location.trim()) {
      setValidationError("Location is required.");
      return false;
    }
  
    return true;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const isEditing = !!formData.id;
    const url = isEditing ? `/api/ports/${formData.id}` : '/api/addport';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      hideModal();
      setSuccessMessage(isEditing ? 'Port updated successfully!' : 'Port added successfully!');
      setFormData({ id: '', name: '', location: '' });
      fetchList();
    } else {
      const errorData = await response.json();
      setValidationError(errorData.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error:', error);
    setValidationError(error.message || 'An error occurred while submitting the form.');
  }
};

  const handleEditClick = async (id) => {
    try {
      const response = await fetch(`/api/ports/${id}/edit`);
      const data = await response.json();

      setFormData({
        id: data.depo.id,
        name: data.depo.name,
 
        location: data.depo.location
      });

      setIsEditMode(true);
      setModalTitle("Edit Port");
      // Show modal programmatically
      const modalElement = document.getElementById('add-agent-modal-more');
      let modalInstance = Modal.getInstance(modalElement);
      if (!modalInstance) {
        modalInstance = new Modal(modalElement);
      }
      modalInstance.show();
    } catch (error) {
      console.error("Error fetching port data:", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await fetch('/api/showsport');
      const data = await response.json();

      setAgents(data.depos || []);
      setCurrentPage(1); // Reset to page 1 after fetch
    } catch (error) {
      console.error('Failed to fetch ports:', error);
      setAgents([]);
    }
  };

  // Pagination controls handlers
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  }, [successMessage]);


  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    
    console.log("Input Text:", lowerCase);
    // Filter depos based on input text
  };


const handleDeleteClick = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This port will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const response = await fetch(`/api/ports/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Port deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setSuccessMessage('');
      fetchList(); // Refresh the list
    } else {
      const errorData = await response.json();
      Swal.fire({
        title: 'Error',
        text: errorData.message || 'Failed to delete port.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    Swal.fire({
      title: 'Unexpected Error',
      text: error.message || 'An error occurred while deleting the port.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const handleSetMainPort = async (id) => {
  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const response = await fetch(`/api/ports/${id}/set-main`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      fetchList(); // Refresh port list
      setSuccessMessage('Main port updated successfully.');
    } else {
      const data = await response.json();
      setValidationError(data.message || 'Failed to set main port.');
    }
  } catch (error) {
    console.error('Set Main Port Error:', error);
    setValidationError(error.message || 'Unexpected error.');
  }
};


  const filteredData = depos.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(inputText) ||
                   el.location.toLowerCase().includes(inputText);
        }
    })

 
  return (
    <>
      <Head title={'Port Listing'} />
      <Header />
      <Sidebar />

   <main className="app-content p-lg-5 product-invoice">
         <div className="new-invoice suplier-searchbar mt-4 mt-lg-4 d-flex align-items-start align-items-md-center align-items-md-center gap-2 gap-lg-5 flex-column flex-md-row flex-lg-row">
            <div className="invoice-btn">
              <a href="#" className="common_btn" data-bs-toggle="modal" data-bs-target="#add-agent-modal-more">Add Port</a>
            </div>
            <div className="header-search suplier-location mt-3 mt-lg-0 mt-md-0">
               <div className="input-group rounded-3">
                 
                 
                  <input type="text" className="form-control border-0 ps-3" placeholder="Port Location" aria-label="Port Location" aria-describedby="search-bar" id="outlined-basic" onChange={inputHandler}/>
                 
                 
                 
                 
                  <span className="input-group-text border-0 rounded-3 pe-3" id="search-bar"><i className="fa fa-location-arrow"></i></span>
               </div>
            </div>
        </div>

        <div className="product-list-table suplier-list-table mt-3 mt-lg-5 port_table">
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <table className="mb-3">
            <thead>
              <tr>
                <th>Port Name</th>
                <th>Location</th>
               
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

             

        
              {filteredData.length > 0 ? (
                filteredData.map(port => (
                  <tr key={port.id}>
                    <td>{port.name}</td>
                    <td><span className="color-golden">{port.location}</span></td>
                    <td>
                    <div class="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-primary edit_btn"
                        onClick={() => handleEditClick(port.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#add-agent-modal-more"
                      >
                        Edit
                      </button>

                      {port.is_main ? (
                        <span className="badge bg-success main-btn">Main Port</span>
                      ) : (
                        <button
                          type="button"
                          className="btn set-main"
                          onClick={() => handleSetMainPort(port.id)}
                        >
                          Set as Main
                        </button>
                      )}
                      </div>
                    </td>

                    

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No port found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}


        {totalPages > 1 && (

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}><i class="fa-solid fa-angle-left"></i></button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}><i class="fa-solid fa-angle-right"></i></button>
            </li>
          </ul>
        </nav>

        )}



      </main>

      <div className="modal fade" id="add-agent-modal-more" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-3 p-lg-4 rounded-4 border-0">
            <div className="modal-header border-bottom-0 p-0">
              <h2 className="modal-title">{modalTitle}</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <>
                
              <form className="row p-3" onSubmit={handleSubmit}>


              {validationError && typeof validationError === 'string' && (
  <div className="alert alert-danger">{validationError}</div>
)}


 
                <input
                  type="hidden"
                  name="id"
                  value={formData.id || ''}
                  onChange={handleChange}
                />
                <div className="col-md-12 mb-3">
                  <label className="form-label">Port Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Port Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div> 

                <div className="col-12 mb-3">
                  <label className="form-label">Location</label>
                  <textarea
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  <input type="submit" className="common_btn" value="Submit" />
                </div>
              </form>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

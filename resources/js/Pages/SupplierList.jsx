import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function SupplierList() {
  const [suppliers, setAgents] = useState([]);
  const [ validationError, setValidationError] = useState({});

 
  const [successMessage, setSuccessMessage] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    contact_number: '',
    location: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Supplier');

  // Pagination logic: calculate suppliers to show on current page
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = suppliers.slice(indexOfFirstAgent, indexOfLastAgent);

  const totalPages = Math.ceil(suppliers.length / agentsPerPage);

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
      setValidationError("Supplier Name is required.");
      return false;
    }
  
    if (!email.trim()) {
      setValidationError("Email is required.");
      return false;
    }
  
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
  
    if (!contact_number.trim()) {
      setValidationError("Contact Number is required.");
      return false;
    }
  
    // Optional: You could add phone number format validation here
  
    if (!location.trim()) {
      setValidationError("Location is required.");
      return false;
    }
  
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const isEditing = !!formData.id;
      const url = isEditing ? `/api/suppliers/${formData.id}` : '/api/addsupplier';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        hideModal();
        setSuccessMessage(isEditing ? 'Supplier updated successfully!' : 'Supplier added successfully!');
        setFormData({
          id: '',
          name: '',
          email: '',
          contact_number: '',
          location: '',
        });
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
      const response = await fetch(`/api/suppliers/${id}/edit`);
      const data = await response.json();

      setFormData({
        id: data.supplier.id,
        name: data.supplier.name,
        email: data.supplier.email,
        contact_number: data.supplier.contact_number,
        location: data.supplier.location
      });

      setIsEditMode(true);
      setModalTitle("Edit Supplier");
      // Show modal programmatically
      const modalElement = document.getElementById('add-agent-modal-more');
      let modalInstance = Modal.getInstance(modalElement);
      if (!modalInstance) {
        modalInstance = new Modal(modalElement);
      }
      modalInstance.show();
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await fetch('/api/showsuppdata');
      const data = await response.json();

      setAgents(data.suppliers || []);
      setCurrentPage(1); // Reset to page 1 after fetch
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
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
    // Filter suppliers based on input text
  };


  const filteredData = suppliers.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(inputText) ||
                   el.location.toLowerCase().includes(inputText) ||
                   el.contact_number.toLowerCase().includes(inputText) ||
                   el.email.toLowerCase().includes(inputText);
        }
    })

 
  return (
    <>
      <Head title={'Agent Listing'} />
      <Header />
      <Sidebar />

   <main className="app-content p-lg-5 product-invoice">
         <div className="new-invoice suplier-searchbar mt-4 mt-lg-4 d-flex align-items-start align-items-md-center align-items-md-center gap-2 gap-lg-5 flex-column flex-md-row flex-lg-row">
            <div className="invoice-btn">
              <a href="#" className="common_btn" data-bs-toggle="modal" data-bs-target="#add-agent-modal-more">Add Supplier</a>
            </div>
            <div className="header-search suplier-location mt-3 mt-lg-0 mt-md-0">
               <div className="input-group rounded-3">
                 
                 
                  <input type="text" className="form-control border-0 ps-3" placeholder="Suppliers Location" aria-label="Suppliers Location" aria-describedby="search-bar" id="outlined-basic" onChange={inputHandler}/>
                 
                 
                 
                 
                  <span className="input-group-text border-0 rounded-3 pe-3" id="search-bar"><i className="fa fa-location-arrow"></i></span>
               </div>
            </div>
        </div>

        <div className="product-list-table suplier-list-table mt-3 mt-lg-5">
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <table className="mb-3">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Location</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

             

        
              {filteredData.length > 0 ? (
                filteredData.map(supplier => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td><span className="color-golden">{supplier.location}</span></td>
                    <td>{supplier.contact_number}</td>
                    <td>{supplier.email}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit_btn"
                        onClick={() => handleEditClick(supplier.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#add-agent-modal-more"
                      >Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No suppliers found.</td>
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
                <div className="col-md-6 mb-3">
                  <label className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Supplier Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="contact_number"
                    value={formData.contact_number}
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

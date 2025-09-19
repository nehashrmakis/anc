import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function AgentList() {
  const [agents, setAgents] = useState([]);
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
  const [modalTitle, setModalTitle] = useState('Add Agent');

  // Pagination logic: calculate agents to show on current page
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

  const totalPages = Math.ceil(agents.length / agentsPerPage);

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
      setValidationError("Agent Name is required.");
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
      const url = isEditing ? `/api/agents/${formData.id}` : '/api/addagent';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        hideModal();
        setSuccessMessage(isEditing ? 'Agent updated successfully!' : 'Agent added successfully!');
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
      const response = await fetch(`/api/agents/${id}/edit`);
      const data = await response.json();

      setFormData({
        id: data.agent.id,
        name: data.agent.name,
        email: data.agent.email,
        contact_number: data.agent.contact_number,
        location: data.agent.location
      });

      setIsEditMode(true);
      setModalTitle("Edit Agent");
      // Show modal programmatically
      const modalElement = document.getElementById('add-agent-modal-more');
      let modalInstance = Modal.getInstance(modalElement);
      if (!modalInstance) {
        modalInstance = new Modal(modalElement);
      }
      modalInstance.show();
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await fetch('/api/showdata');
      const data = await response.json();

      setAgents(data.agents || []);
      setCurrentPage(1); // Reset to page 1 after fetch
    } catch (error) {
      console.error('Failed to fetch agents:', error);
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

  return (
    <>
      <Head title={'Agent Listing'} />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 agent">

        <div className="mt-0 mt-lg-4 agent-details">
            <div className="row align-items-center">
               <div className="col-6 col-lg-6">
                  <div className="add-agent-btn">
                     <a href="#" className="common_btn rounded-2" data-bs-toggle="modal" data-bs-target="#add-agent-modal-more">Add Agent</a>
                  </div>
               </div>
               {/* <div className="col-6 col-lg-6">
                  <div className="assing-invoice-filter text-end">
                     <button className="common_btn rounded-2 agent-filter"><i className="ri-filter-3-fill me-2"></i> Filters</button>
                  </div>
               </div> */}
            </div>
         </div>
        <div className="suppliers-location-table agent-table mt-3 mt-lg-5">
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <table className="mb-3">
            <thead>
                  <tr>
                     <th colspan="5" class="text-end">Invoice</th>
                     <th colspan="3"></th>
                  </tr>
                  <tr>
                     <th>Agent Name</th>
                     <th>Location</th>
                     <th>Contact Number</th>
                     <th>Email</th>
                     <th class="assign-vat text-center">Assigned</th>
                     <th class="assign-vat text-center">Vat</th>
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
            <tbody>
              {currentAgents.length > 0 ? (
                currentAgents.map(agent => (
                  <tr key={agent.id}>
                    <td>{agent.name}</td>
                    <td><span className="color-golden">{agent.location}</span></td>
                    <td>{agent.contact_number}</td>
                    <td>{agent.email}</td>
                    <td className="text-center">  {agent.invoice_assignments?.length || 0}</td>
                     <td className="text-center">
                        {agent.invoice_assignments && agent.invoice_assignments.length > 0
                          ? agent.invoice_assignments.filter(assign => assign.invoice?.vat_invoice).length
                          : 0}
                      </td>
                     <td>
                      <div class="edit-compare-btn text-end">
                      <button
                        type="button"
                        className="btn btn-primary edit_btn"
                        onClick={() => handleEditClick(agent.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#add-agent-modal-more"
                      >
                        Edit 
                      </button>
                      </div>
                    </td>
                    <td>
                        <div class="agent-detail-btn text-end"> <a href={`/agents/${agent.id}/invoices`} className="common_btn">Details</a></div>
                     </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No agents found.</td>
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
                  <label className="form-label">Agent Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Agent Name"
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

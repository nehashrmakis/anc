import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function ProfileList() {


    const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);
      setProfileImage(image);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Uploaded Image:', profileImage);
    // Add your submit logic here (e.g., API call)
  };

  const removeImage = () => {
    setProfileImage(null);
  };
    return (
    <>
        <Head title={'Profile'} />
        <Header />
        <Sidebar />

        <main className="app-content p-lg-5 inventory-category">
      <div className="product-category-form mt-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row mb-4">
            <div className="col-md-3">
              <label className="form-label">Profile Image</label>
            </div>
            <div className="col-md-9">
              <div className="main_full profile-full flex-column">
                <img
                  src="assets/img/icons/upload-file.png"
                  alt="upload-file"
                  className="mb-3"
                />
                <div className="panel">
                  <div className="button_outer">
                    <div className="btn_upload">
                      <input
                        type="file"
                        id="upload_file"
                        onChange={handleImageUpload}
                      />
                      Upload Image
                    </div>
                    <div className="processing_bar"></div>
                    <div className="success_box"></div>
                  </div>
                  <div className="error_msg"></div>
                  {profileImage && (
                    <div className="uploaded_file_view" id="uploaded_view">
                      <img
                        src={profileImage}
                        alt="Uploaded Preview"
                        style={{ maxWidth: '100px', marginTop: '10px' }}
                      />
                      <span
                        className="file_remove"
                        onClick={removeImage}
                        style={{ cursor: 'pointer' }}
                      >
                        X
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-3">
              <label className="form-label">Name</label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control in-prod-name"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-3">
              <label className="form-label">Email Id</label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Email Id"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-3">
              <label className="form-label">Password</label>
            </div>
            <div className="col-md-9">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-3 offset-md-9">
              <input
                type="button"
                className="common_btn"
                value="Submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </main>


    
    </>
    );
}
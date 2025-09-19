import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function EditOrderList() {

    return (
    <>
        <Head title={'Edit Invoice'} />
        <Header />
        <Sidebar />

            <main className="app-content p-lg-5 edit-invoice">
      <div className="mt-0 mt-lg-4 edit-invoice-details">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="agent-heading for-invoice">
              <h2>For Invoice : 97329</h2>
            </div>
          </div>
        </div>

        {/* Agent Section */}
        <div className="invoice-form agent-box px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
          <h2 className="common-heading pb-2">Agent</h2>
          <form className="mt-3">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Agent Name</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <select className="form-select" defaultValue="Richard Martin">
                      <option>Richard Martin</option>
                      <option>Richard Martin 2</option>
                      <option>Richard Martin 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Location</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <select className="form-select" defaultValue="Southampton">
                      <option>Southampton</option>
                      <option>Southampton 2</option>
                      <option>Southampton 3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Invoice Section */}
        <div className="invoice-form agent-invoice px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
          <h2 className="common-heading pb-2">Invoice</h2>
          <form className="mt-3">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">PO.</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="SWK539" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="row align-items-center mb-2 mb-md-0 mb-lg-2">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Container</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="FCIU-4875361" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VAT Invoice + Marking */}
            <div className="row mt-0 mt-md-3 mt-lg-3">
              <div className="col-md-6 col-12">
                <div className="row align-items-center mb-2 mb-md-0 mb-lg-2">
                  <div className="col-12 col-md-12 col-lg-4 col-xl-3">
                    <label className="form-label mb-0">Vat Invoice No.</label>
                  </div>
                  <div className="col-5 col-md-5 col-lg-3 col-xl-3">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="97325" />
                    </div>
                  </div>
                  <div className="col-5 col-md-5 col-lg-3 col-xl-3">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="97326" />
                    </div>
                  </div>
                  <div className="col-2 col-md-2 col-lg-2 col-xl-3">
                    <div className="vat-invoice-btn">
                      <button type="button" className="border-0">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Marking</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="ANC" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Dates Section */}
        <div className="invoice-form invoice-agent-date px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
          <h2 className="common-heading pb-2">Dates</h2>
          <form className="mt-3">
            <div className="row">
              <div className="col-md-6 col-12 mb-2 mb-md-0 mb-lg-2">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">ETD</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2 mb-md-0 mb-lg-2">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">ETA</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Misc Invoice Section */}
        <div className="invoice-form mics-invoice px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
          <h2 className="common-heading pb-2">Mics Invoice</h2>
          <form className="mt-3">
            <div className="row">
              <div className="col-md-6 col-12 mb-2 mb-md-0 mb-lg-2">
                <div className="row">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Invoice</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input type="text" className="form-control" defaultValue="97327" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2 mb-md-0 mb-lg-2">
                <div className="row">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Remarks</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Deliver to Boston"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Update Button */}
        <div className="agent-update-btn mt-4 pb-3 text-center">
          <button type="submit" className="border-0 common_btn rounded-2">
            Update
          </button>
        </div>
      </div>
    </main>


    
    </>
    );
}
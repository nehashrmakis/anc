import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function CompareOrderList() {

    return (
    <>
        <Head title={'Compare Order Listing'} />
        <Header />
        <Sidebar />
 <main className="app-content p-lg-5 agent">
      <div className="mt-0 mt-lg-4 agent-details">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="agent-heading">
              <h2>Richard Martin</h2>
            </div>
          </div>
        </div>
      </div>

      <form action="">
        <div className="suppliers-location-table compare-invoice-table mt-2 mt-lg-4">
          <table className="mb-3">
            <thead>
              <tr>
                <th>PO</th>
                <th>CONTAINER</th>
                <th>Supplier Name</th>
                <th>DEPO</th>
                <th>MARKING</th>
                <th>ETD</th>
                <th>ETA</th>
                <th className="vat-inv">VAT INV NO</th>
                <th className="misc-remarks">
                  <table className="table-prod prod-list">
                    <tbody>
                      <tr>
                        <td className="mis-invoice px-0">Misc Invoice</td>
                        <td className="remarks ps-0">Remarks</td>
                      </tr>
                    </tbody>
                  </table>
                </th>
                <th colSpan="2" className="clearence-inv">Clearence<br />inv no.</th>
              </tr>
            </thead>

            <tbody>
              {/* Sample Row - Repeat as needed or map from data */}
              <tr>
                <td>SWK539</td>
                <td>
                  <span className="d-block">FCIU-4875361</span>
                  <span className="d-block">FCIU-4875361</span>
                </td>
                <td>Richard</td>
                <td>STH</td>
                <td>ANC</td>
                <td>07.04.2025</td>
                <td>16.04.2025</td>
                <td className="vat-inv-data">
                  <input type="text" value="97325" className="form-control" disabled />
                </td>
                <td className="prod-table-outer px-0 msc-in-detail">
                  <table className="table-prod prod-list">
                    <tbody>
                      <tr>
                        <td className="mis-invoice py-0">
                          <input type="text" value="97329" className="form-control" disabled />
                        </td>
                        <td className="remarks py-0">
                          <input
                            type="text"
                            value="Damage to Container"
                            className="form-control damage-container"
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="mis-invoice py-0">
                          <input type="text" value="98452" className="form-control" disabled />
                        </td>
                        <td className="remarks py-0">
                          <input type="text" value="Deliver to Boston" className="form-control" disabled />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <button className="add-rows-btn border-0 rounded-2">Add Rows</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="clearence-inv-detail">97329</td>
                <td className="text-end clearence-inv-detail">
                  <button className="edit-btn border-0">
                    <img src="assets/img/icons/edit.png" alt="edit" />
                  </button>
                </td>
              </tr>

              {/* You can repeat similar <tr> blocks for other rows, or map them from props/data */}
            </tbody>
          </table>
        </div>
      </form>
    </main>



    
    </>
    );
}
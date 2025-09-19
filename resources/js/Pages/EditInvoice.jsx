import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function EditInvoice({ agent, invoice }) {
  const [miscInvoices, setMiscInvoices] = useState(
    invoice.misc_invoices && invoice.misc_invoices.length > 0
      ? invoice.misc_invoices
      : [{ invoice: '', remark: '' }]
  );

 const [etd, setEtd] = useState(invoice.etd ? invoice.etd.slice(0, 10) : '');
const [eta, setEta] = useState(invoice.landing_date ? invoice.landing_date.slice(0, 10) : '');

  const [vatInvoice, setVatInvoice] = useState(invoice.vat_invoice || '');

  const { data, setData, put, processing, errors } = useForm({
    vat_invoice: vatInvoice,
    misc_invoices: miscInvoices,
    etd: etd,
    landing_date: eta,
    remarks: invoice.remarks || '',
    clearance_invoice_no: invoice.clearance_invoice_no || ''
  });

  // Sync state into Inertia form data
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      vat_invoice: vatInvoice,
      misc_invoices: miscInvoices,
      etd: etd,
      landing_date: eta, // Optional
      clearance_invoice_no: data.clearance_invoice_no,
    }));
  }, [vatInvoice, miscInvoices, etd, eta, data.clearance_invoice_no]);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/agents/${agent.id}/invoices/${invoice.id}`);
  };

  return (
    <>
      <Head title={`Edit Invoice - ${agent.name}`} />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 edit-invoice">
        <div className="mt-0 mt-lg-4 edit-invoice-details">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="agent-heading for-invoice">
                <h2>For Invoice : {`${invoice.id}`}</h2>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Agent Section */}
            <div className="invoice-form agent-box px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
              <h2 className="common-heading pb-2">Agent</h2>
              <div className="row">
                <div className="col-md-6 col-6">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-lg-5 col-xl-3">
                      <label className="form-label mb-0">Agent Name</label>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-9">
                      <select className="form-select" defaultValue={agent.name} disabled>
                        <option>{agent.name}</option>
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
                      <select className="form-select" defaultValue={invoice.arrival_depo} disabled>
                        <option>{invoice.arrival_depo}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Section */}
            <div className="invoice-form agent-invoice px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
              <h2 className="common-heading pb-2">Invoice</h2>
              <div className="row">
                <div className="col-md-6 col-6">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-lg-5 col-xl-3">
                      <label className="form-label mb-0">PO.</label>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-9">
                      <div className="input-group rounded-5">
                        <input type="text" className="form-control" defaultValue={invoice.po_number} disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-6">
                  <div className="row align-items-center mb-2 mb-md-0 mb-lg-2">
                    <div className="col-md-12 col-lg-5 col-xl-3">
                      <label className="form-label mb-0">Vat Invoice No</label>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-9">
                      <div className="input-group rounded-5">
                        <input
                          type="text"
                          className="form-control"
                          value={vatInvoice}
                          onChange={(e) => setVatInvoice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="row align-items-center mb-2 mb-md-0 mb-lg-2">
                  <div className="col-md-12 col-lg-5 col-xl-3">
                    <label className="form-label mb-0">Clearance Inv No</label>
                  </div>
                  <div className="col-md-12 col-lg-7 col-xl-9">
                    <div className="input-group rounded-5">
                      <input
                        type="text"
                        className="form-control"
                        value={data.clearance_invoice_no}
                        onChange={(e) => setData('clearance_invoice_no', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {invoice.containers?.map((container, index) => (
                <div className="row mt-0 mt-md-3 mt-lg-3" key={index}>
                  <div className="col-md-6 col-12">
                    <div className="row align-items-center mb-2 mb-md-0 mb-lg-2">
                      <div className="col-12 col-md-12 col-lg-4 col-xl-3">
                        <label className="form-label mb-0">Container</label>
                      </div>
                      <div className="col-md-12 col-lg-7 col-xl-9">
                        <div className="input-group rounded-5">
                          <input type="text" className="form-control" defaultValue={container.container_id} disabled />
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
                          <input type="text" className="form-control" defaultValue="ANC" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dates Section */}
            <div className="invoice-form invoice-agent-date px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
              <h2 className="common-heading pb-2">Dates</h2>
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-lg-5 col-xl-3">
                      <label className="form-label mb-0">ETD</label>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-9">
                      <input
                        type="date"
                        className="form-control"
                        value={etd}
                        onChange={(e) => setEtd(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-lg-5 col-xl-3">
                      <label className="form-label mb-0">ETA</label>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-9">
                      <input
                        type="date"
                        className="form-control"
                        value={eta}
                        onChange={(e) => setEta(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Misc Invoice Section */}
            <div className="invoice-form mics-invoice px-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-3">
              <h2 className="common-heading pb-2">Misc Invoice</h2>
              {miscInvoices.map((row, index) => (
                <div className="row" key={index}>
                  <div className="col-md-6 col-12 mb-2">
                    <div className="row">
                      <div className="col-md-12 col-lg-5 col-xl-3">
                        <label className="form-label mb-0">Invoice</label>
                      </div>
                      <div className="col-md-12 col-lg-7 col-xl-9">
                        <input
                          type="text"
                          className="form-control"
                          value={row.invoice}
                          onChange={(e) => {
                            const updated = [...miscInvoices];
                            updated[index].invoice = e.target.value;
                            setMiscInvoices(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <div className="row">
                      <div className="col-md-12 col-lg-5 col-xl-3">
                        <label className="form-label mb-0">Remarks</label>
                      </div>
                      <div className="col-md-12 col-lg-7 col-xl-9">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter remark"
                          value={row.remark}
                          onChange={(e) => {
                            const updated = [...miscInvoices];
                            updated[index].remark = e.target.value;
                            setMiscInvoices(updated);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-end mb-2">
                    {miscInvoices.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          const updated = miscInvoices.filter((_, i) => i !== index);
                          setMiscInvoices(updated);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="col-12 text-end mt-2">
                <button
                  type="button"
                  className="border-0 common_btn rounded-2"
                  onClick={() => setMiscInvoices([...miscInvoices, { invoice: '', remark: '' }])}
                >
                  + Add Row
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="agent-update-btn mt-4 pb-3 text-center">
              <button type="submit" className="border-0 common_btn rounded-2" disabled={processing}>
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from './Header';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

export default function AgentInvoiceList({ agent, invoices: initialInvoices }) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [addedInventoryIds, setAddedInventoryIds] = useState([]);

  const handleAddMiscRow = (invoiceId) => {
    const updatedInvoices = invoices.map((inv) => {
      if (inv.id === invoiceId) {
        const newMisc = [...(inv.misc_invoices || []), { invoice: '', remark: '' }];
        return { ...inv, misc_invoices: newMisc };
      }
      return inv;
    });
    setInvoices(updatedInvoices);
  };

  const handleChange = (invoiceId, index, field, value) => {
    const updatedInvoices = invoices.map((inv) => {
      if (inv.id === invoiceId) {
        const updatedMisc = (inv.misc_invoices || []).map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        );
        return { ...inv, misc_invoices: updatedMisc };
      }
      return inv;
    });
    setInvoices(updatedInvoices);
  };

  const handleSave = async (invoiceId) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);

    try {
      const response = await fetch(`/agents/${agent.id}/invoices/${invoiceId}/misc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ misc_invoices: invoice.misc_invoices }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Misc invoice rows added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Missing Fields',
          text: 'Please make sure you have entered all mandatory fields.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleAddToInventory = async (invoiceId) => {
    try {
      const response = await fetch(`/agents/${agent.id}/invoices/${invoiceId}/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: 'Added to Final Inventory!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        window.location.href = '/inventory-category';
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Failed to add. Please try again.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Inventory error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <Head title={`Invoices for ${agent.name}`} />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 agent">
        <div className="mt-0 mt-lg-4 agent-details">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <div className="agent-heading">
                <h2>{agent.name}</h2>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="category-btn text-end">
                <a className="btn btn-secondary mt-2 ms-3" href="/agents">
                  ← Back to Agents
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="suppliers-location-table compare-invoice-table mt-2 mt-lg-4">
          <table className="mb-3">
            <thead>
              <tr>
                <th>PO</th>
                <th>CONTAINER</th>
                <th>Supplier Name</th>
                <th>DEPO</th>
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
                <th colSpan="2" className="clearence-inv">Clearance<br />inv no.</th>
                <th colSpan="2" className="clearence-inv">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.po_number}</td>
                    <td>
                      {(inv.containers || []).length > 0 ? (
                        inv.containers.map((container, index) => (
                          <span className="d-block" key={index}>
                            {container.container_id}
                          </span>
                        ))
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td>{inv.supplier}</td>
                    <td>{inv.arrival_depo}</td>
                    <td>{inv.etd || 'N/A'}</td>
                    <td>{inv.landing_date || 'N/A'}</td>
                    <td className="vat-inv-data">
                      <input
                        type="text"
                        value={inv.vat_invoice || ''}
                        className="form-control"
                        disabled
                      />
                    </td>
                    <td className="prod-table-outer px-0 msc-in-detail">
                      <table className="table-prod prod-list">
                        <tbody>
                          {(inv.misc_invoices || []).map((item, index) => (
                            <tr key={index}>
                              <td className="mis-invoice py-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.invoice}
                                  onChange={(e) =>
                                    handleChange(inv.id, index, 'invoice', e.target.value)
                                  }
                                />
                              </td>
                              <td className="remarks py-0">
                                <input
                                  type="text"
                                  className="form-control demage-container"
                                  value={item.remark}
                                  onChange={(e) =>
                                    handleChange(inv.id, index, 'remark', e.target.value)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2" className="text-end">
                              <button
                                type="button"
                                className="add-rows-btn border-0 rounded-2 me-2"
                                onClick={() => handleAddMiscRow(inv.id)}
                              >
                                + Add Row
                              </button>
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={() => handleSave(inv.id)}
                              >
                                Save
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="clearence-inv-detail">
                      {inv.clearance_invoice_no || 'N/A'}
                    </td>
                    <td className="text-end clearence-inv-detail">
                      <Link href={route('agent.invoice.edit', { agent: agent.id, invoice: inv.id })}>
                        <button className="edit-btn border-0">
                          <img src="/assets/img/icons/edit.png" alt="edit" />
                        </button>
                      </Link>
                    </td>
                    <td>
                      {inv.already_in_inventory || addedInventoryIds.includes(inv.id) ? (
                        <button className="btn border-0 text-success" disabled>
                          Already Added
                        </button>
                      ) : (
                        <button
                          className="btn border-0"
                          onClick={() => handleAddToInventory(inv.id)}
                        >
                          Add to Inventory
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No invoices assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

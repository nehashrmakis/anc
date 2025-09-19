import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function InvoiceList() {
  const { invoices, filters, agentList = [], portList = [] } = usePage().props;
  const [search, setSearch] = useState(filters?.search || '');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editableQty, setEditableQty] = useState({});

  const agents = agentList;
  const ports = portList;

  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');

  const handleAssignClick = (port, id) => {
    setSelectedPort(port);
    setSelectedInvoiceId(id);
    const modal = new window.bootstrap.Modal(document.getElementById('assign-product'));
    modal.show();
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const params = {};
      if (search.trim()) params.search = search.trim();
      router.get(route('invoice.index'), params, {
        preserveState: true,
        replace: true,
      });
    }, 400);
    return () => clearTimeout(delaySearch);
  }, [search]);

  const validateForm = () => {
    if (!selectedPort || !selectedAgent || !selectedInvoiceId) {
      alert('Please fill all required fields.');
      return false;
    }
    return true;
  };

  const handleUpdateQuantity = async (productId) => {
    const updatedQty = editableQty[productId];
    try {
      await fetch(`/api/update-product-quantity/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ qty: updatedQty }),
      });
      setEditingProductId(null);
      router.reload();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const selectedAgentObj = agents.find(agent => agent.id == selectedAgent);
  const agentName = selectedAgentObj?.name || '';

  const formData = new FormData();
  formData.append('invoice_id', selectedInvoiceId);
  formData.append('invoice_agent', selectedPort);
  formData.append('agent_id', selectedAgent);
  formData.append('agent_name', agentName);

  const response = await fetch('/api/addport', {
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    },
    body: formData,
  });

  const text = await response.text();

  if (response.ok) {
    console.log('✅ Response OK:', text);

    // Hide modal safely
    const modalEl = document.getElementById('assign-product');
    if (window.bootstrap?.Modal && modalEl) {
      let modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      if (!modalInstance) {
        modalInstance = new window.bootstrap.Modal(modalEl);
      }
      modalInstance.hide();
    } else if (modalEl) {
      // Fallback manual close
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }

    setSelectedAgent('');
    setSelectedPort('');
    setSelectedInvoiceId('');

    router.reload();
  } else {
    console.error('❌ Response Error:', text);
    alert('Something went wrong while assigning the agent.');
  }
};



  return (
    <>
      <Head title={'Invoice Listing'} />
      <Header />
      <Sidebar />
      <main className="app-content p-lg-5 inventory-category">
        {/* Search and Header */}
        <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
          <Link href={route('invoice.create')} className="common_btn">Add New Invoice</Link>
          <div className="header-search suplier-location">
            <div className="input-group rounded-3">
              <input
                type="text"
                className="form-control border-0 ps-3"
                placeholder="Search Invoice"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-text border-0 rounded-3 pe-3"><i className="fa fa-location-arrow"></i></span>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="suppliers-location-table">
          <table className="mb-3">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>PO</th>
                <th>Supplier</th>
                <th>Port</th>
                <th>Arrival date</th>
                <th className="text-center">Transit</th>
                <th className="prod-table-outer">
                  <table className="table-prod">
                    <thead>
                      <tr>
                        <th className="container-detail-id">Containers ID</th>
                        <th className="product-name">Product</th>
                        <th className="product-name">Marking</th>
                        <th className="product-size">Size</th>
                        <th className="product-weight">Weight</th>
                        <th className="prod-qty">Qty.(each)</th>
                        <th colSpan="2" className="prod-action">Action</th>
                      </tr>
                    </thead>
                  </table>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.po_number}</td>
                  <td>{invoice.supplier}</td>
                  <td>{invoice.agent}</td>
                  <td>{invoice.arrival_date}</td>
                  <td className="text-center">{invoice.transit}</td>
                  <td className="prod-table-outer">
                    {invoice.containers.map((container, cIdx) => (
                      <table key={container.id} className={`table-prod prod-list ${cIdx > 0 ? 'mt-3' : ''}`}>
                        <tbody>
                          {container.products.map((product, pIdx) => (
                            <tr key={product.id}>
                              {pIdx === 0 && (
                                <td className="container-detail-id" rowSpan={container.products.length}>
                                  {container.container_number}
                                </td>
                              )}
                              <td className="product-name">{product.name}</td>
                              <td className="product-name">{product.marking}</td>
                              <td className="product-size">{product.size}</td>
                              <td className="product-weight">{product.weight}</td>
                              <td className="prod-qty">
                                <input
                                  type="number"
                                  value={
                                    editingProductId === product.id
                                      ? editableQty[product.id] ?? product.qty
                                      : product.qty
                                  }
                                  onChange={(e) =>
                                    setEditableQty((prev) => ({
                                      ...prev,
                                      [product.id]: e.target.value,
                                    }))
                                  }
                                  disabled={editingProductId !== product.id}
                                  className="form-control"
                                  style={{ width: '80px' }}
                                />
                              </td>
                              <td>
                              <div className='d-flex gap-2'>
                                  {!invoice.is_assigned && (
    <div className="assign-now-btn mb-2">
      <Link
        href={route('invoice.edit', invoice.id)}
        className="assign-btn border-0 rounded-2 px-2 py-1 text-decoration-none d-inline-block text-white"
      >
        Edit Invoice
      </Link>
    </div>
  )}
  <div className="assign-now-btn">
    {invoice.is_assigned ? (
      <button
        className="assign-btn border-0 rounded-2 px-2 py-1 bg-success text-white"
        disabled
      >
        Assigned
      </button>
    ) : (
      <button
        className="assign-btn border-0 rounded-2 px-2 py-1"
        data-bs-toggle="modal"
        data-bs-target="#assign-product"
        onClick={() => handleAssignClick(invoice.agent, invoice.id)}
      >
        Assign Now
      </button>
    )}
  </div>
  
  {invoice.is_assigned ? (
    <div className="action-btn d-flex flex-column gap-2">
      {editingProductId === product.id ? (
        <button
          className="edit-btn rounded-2 py-1"
          onClick={() => handleUpdateQuantity(product.id)}
        >
          Update
        </button>
      ) : (
        <button
          className="edit-btn rounded-2 py-1"
          onClick={() => {
            setEditingProductId(product.id);
            setEditableQty((prev) => ({
              ...prev,
              [product.id]: product.qty,
            }));
          }}
        >
          Edit
        </button>
      )}
    </div>
  
  ) : null}
     </div> 
</td>

                            </tr> 
                          ))}
                        </tbody>
                      </table>
                    ))}
                  </td>
                  <td className="prod-action">
  {!invoice.is_assigned && (
    <div className="assign-now-btn mb-2">
      <Link
        href={route('invoice.edit', invoice.id)}
        className="assign-btn border-0 rounded-2 px-2 py-1 text-decoration-none d-inline-block text-white"
      >
        Edit Invoice
      </Link>
    </div>
  )}
  <div className="assign-now-btn">
    {invoice.is_assigned ? (
      <button
        className="assign-btn border-0 rounded-2 px-2 py-1 bg-success text-white"
        disabled
      >
        Assigned
      </button>
    ) : (
      <button
        className="assign-btn border-0 rounded-2 px-2 py-1"
        data-bs-toggle="modal"
        data-bs-target="#assign-product"
        onClick={() => handleAssignClick(invoice.agent, invoice.id)}
      >
        Assign Now
      </button>
    )}
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <div className="modal fade shipment-more assign-product" id="assign-product" tabIndex="-1" aria-labelledby="assign-productLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-3 p-lg-4 rounded-4">
            <div className="modal-header border-bottom-0 p-0">
              <h2 className="modal-title" id="assign-productLabel">Assign to Agent/Depo</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="arrival-info assign-agent p-4 p-lg-5 mt-2 rounded-4">
                <h4>Change Arrival Info</h4>
                <form className="row mt-2 mt-lg-3 mt-xl-3 justify-content-center" onSubmit={handleSubmit}>
                  <div className="col-6 mb-3">
                    <label className="form-label">Update arrival port</label>
                    <select className="form-select" value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)}>
                      <option value="">Select port</option>
                      {ports.map((port) => (
                        <option key={port.id} value={port.name}>{port.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Agent</label>
                    <select className="form-select" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                      <option value="">Select agent</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 text-center">
                    <button type="submit" className="common_btn">Assign Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

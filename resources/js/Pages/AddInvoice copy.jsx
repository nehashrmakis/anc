import { useForm, Head } from '@inertiajs/react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AddInvoice({ inventory }) {
  const { data, setData } = useForm({
    containers: [
      {
        id: '',
        products: [
          {
            inventory_id: '',
            marking: '',
            size: '',
            weight: '',
            total_bundles: '',
            quantity_per_bundle: '',
            total_product: '',
          },
        ],
      },
    ],
  });

  const [containerCount, setContainerCount] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const handleContainerChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setContainerCount(count);
    const newContainers = [...data.containers];
    while (newContainers.length < count) {
      newContainers.push({
        id: '',
        products: [
          {
            inventory_id: '',
            marking: '',
            product_id: '',
            size: '',
            weight: '',
            total_bundles: '',
            quantity_per_bundle: '',
            total_product: '',
          },
        ],
      });
    }
    setData('containers', newContainers.slice(0, count));
    if (activeTab >= count) setActiveTab(0);
  };

  const handleProductChange = (containerIdx, productIdx, field, value) => {
    const updatedContainers = [...data.containers];
    updatedContainers[containerIdx].products[productIdx][field] = value;

    // Auto-calculate total_product
    if (
      field === 'total_bundles' ||
      field === 'quantity_per_bundle'
    ) {
      const a = parseFloat(updatedContainers[containerIdx].products[productIdx].total_bundles) || 0;
      const b = parseFloat(updatedContainers[containerIdx].products[productIdx].quantity_per_bundle) || 0;
      updatedContainers[containerIdx].products[productIdx].total_product = a * b;
    }

    setData('containers', updatedContainers);
  };

  const addProduct = (containerIdx) => {
    const updatedContainers = [...data.containers];
    updatedContainers[containerIdx].products.push({
      inventory_id: '',
      marking: '',
      product_id: '',
      size: '',
      weight: '',
      total_bundles: '',
      quantity_per_bundle: '',
      total_product: '',
    });
    setData('containers', updatedContainers);
  };
const submit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('invoice_no', data.invoice_no);
    formData.append('po_number', data.po_number);
    formData.append('supplier', data.supplier);
    formData.append('arrival_depo', data.arrival_depo);
    formData.append('on_transit', data.on_transit);
    formData.append('landing_date', data.landing_date);
    formData.append('containers', data.containers);
    formData.append('containers_id', data.containers_id);
    formData.append('containers_product_id', data.containers_product_id);
    formData.append('containers_marking', data.containers_product_id);
  
    if (data.image) {
      formData.append('image', data.image);
    }
  
    if (inventory) {
      formData.append('_method', 'PUT');
      router.post(route('inventory.update', inventory.id), formData, {
        forceFormData: true,
      });
    } else {
      router.post(route('inventory.store'), formData, {
        forceFormData: true,
      });
    }
  };
  return (
    <>
      <Head title="Add Invoice" />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 add-invoice">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-7">
            <div className="add-invoice-left">
              <div className="invoice-form px-4 py-4 rounded-4 mt-lg-3">
                <h2 className="common-heading pb-2">Invoice</h2>
                <form className="mt-3" onSubmit={submit}>
                  <div className="row">
                    <div className="col-xl-3 mb-1">
                      <label className="form-label mb-0">Invoice No.</label>
                      <input type="text" className="form-control rounded-5" placeholder="123465787" />
                    </div>
                    <div className="col-xl-3 mb-1">
                      <label className="form-label mb-0">Container</label>
                      <input
                        type="number"
                        className="form-control rounded-5"
                        value={containerCount}
                        onChange={handleContainerChange}
                        min={1}
                        max={10}
                      />
                    </div>
                    <div className="col-xl-3 mb-1">
                      <label className="form-label mb-0">PO Number</label>
                      <input type="text" className="form-control rounded-5" />
                    </div>
                    <div className="col-xl-3 mb-1">
                      <label className="form-label mb-0">Supplier</label>
                      <input type="text" className="form-control rounded-5" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Tabs */}
              <div className="invoice-product mt-3 mb-3">
                <ul className="ms-3 nav nav-tabs gap-2 border-0" role="tablist">
                  {Array.from({ length: containerCount }).map((_, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                      <button
                        className={`nav-link py-2 ${activeTab === index ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab(index)}
                      >
                        Container {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="tab-content invoice-prod-cont rounded-4 mt-3">
                  {data.containers.map((container, containerIdx) => (
                    <div
                      key={containerIdx}
                      className={`tab-pane fade ${activeTab === containerIdx ? 'show active' : ''}`}
                      role="tabpanel"
                    >
                      <div className="invoice-product-form">
                      <form className="px-3 px-lg-4 py-4 px-md-4">
                        <div className="row mb-4">
                           <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="d-block d-md-flex d-lg-flex align-items-center gap-2">
                            <label className="form-label">Container ID</label>
                            <div className="rounded-5">
                            <input
                              type="text"
                              className="form-control"
                              value={container.id}
                              onChange={(e) => {
                                const newContainers = [...data.containers];
                                newContainers[containerIdx].id = e.target.value;
                                setData('containers', newContainers);
                              }}
                            />
                          </div>
                          </div>
                          </div>
                          </div>
                          {container.products.map((product, productIdx) => (
                            <div key={productIdx} className="invoice-product-append mb-4 pb-4">
                            <div className="row gy-2 gy-lg-4">
                              <div className="col-md-12">
                                 <div className="d-block d-md-flex d-lg-flex align-items-center gap-2">
                                    <label className="form-label mb-0">Product Name</label>
                                  <select
                                    className="form-select"
                                    value={product.inventory_id}
                                    onChange={(e) =>
                                      handleProductChange(containerIdx, productIdx, 'inventory_id', e.target.value)
                                    }
                                  >
                                    <option value="">Select a Product</option>
                                    {inventory.map((inv) => (
                                      <option key={inv.id} value={inv.id}>
                                        {inv.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                </div>
                                
                                <div className="col-md-12">
                                <div className="d-block d-md-flex d-lg-flex align-items-center gap-2">
                                    <label className="form-label mb-0 me-3">ANC Marking</label>
                                    <div className="d-flex gap-3">
                                    {['Yes', 'No'].map((markingOption) => (
                                        <div className="form-check" key={markingOption}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`marking-${containerIdx}-${productIdx}`} // unique per product
                                            value={markingOption}
                                            checked={product.marking === markingOption}
                                            onChange={(e) =>
                                            handleProductChange(containerIdx, productIdx, 'marking', e.target.value)
                                            }
                                        />
                                        <label className="form-check-label">
                                            {markingOption}
                                        </label>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                </div>

                                <div className="col-sm-6 col-md-6 col-lg-6">
                                 <div className="d-flex align-items-center gap-2">
                                    <label className="form-label mb-0 text-end">Size</label>
                                    <div className="rounded-5">
                                  <input
                                    type="number"
                                    className="form-control color-grey"
                                    value={product.size}
                                    onChange={(e) =>
                                      handleProductChange(containerIdx, productIdx, 'size', e.target.value)
                                    }
                                  />
                                </div>
                                <span>(feet)</span>
                                </div>
                                </div>
                                
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                 <div className="d-flex align-items-center gap-2">
                                    <label className="form-label mb-0 text-end">Weight</label>
                                    <div className="rounded-5">
                                  <input
                                    type="number"
                                    className="form-control color-grey"
                                    value={product.weight}
                                    onChange={(e) =>
                                      handleProductChange(containerIdx, productIdx, 'weight', e.target.value)
                                    }
                                  />
                                </div>
                                <span>(kg)</span>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                 <div className="d-flex align-items-center gap-2">
                                    <label className="form-label mb-0 text-end">Total Bundles<br /><sub>(A)</sub></label>
                                    <div className="rounded-5">
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={product.total_bundles}
                                    onChange={(e) =>
                                      handleProductChange(containerIdx, productIdx, 'total_bundles', e.target.value)
                                    }
                                  />
                                </div>
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                 <div className="d-flex align-items-center gap-2">
                                    <label className="form-label mb-0 float-lg-end text-end">Qt. Per
                                       Bundles<br /><sub>(B)</sub></label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={product.quantity_per_bundle}
                                    onChange={(e) =>
                                      handleProductChange(containerIdx, productIdx, 'quantity_per_bundle', e.target.value)
                                    }
                                  />
                                </div>
                                </div>
                               
                                <div className="col-md-7 col-lg-7">
                                    <div className="d-flex align-items-center gap-2">
                                       <label className="form-label mb-0 float-lg-end text-end">Total Product<br /><sub>(A X
                                       B)</sub></label>
                                       <div className="input-group rounded-5">
                                  <input
                                    type="number"
                                    className="form-control color-grey"
                                    readOnly
                                    value={product.total_product}
                                  />
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="text-center">
                            <button
                              type="button"
                              className="common_btn border-0"
                              onClick={() => addProduct(containerIdx)}
                            >
                              Add More Product
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit Info */}
              <div className="prod-transit-form px-3 px-lg-4 px-xxl-5 px-md-4 py-4 rounded-4 d-flex flex-column justify-content-between mt-lg-3">
                  <h2 className="common-heading">Transit  Info</h2>
                  <form className="mt-3">
                     <div className="row gy-2 gy-lg-2">
                        <div className="col-md-12">
                           <div className="row align-items-center">
                              <div className="col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                 <label className="form-label mb-0">Arrival Depo</label>
                              </div>
                              <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                                 <select className="form-select">
                                    <option selected="">Seakargo LGW</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           <div className="row align-items-center">
                              <div className="col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                 <label className="form-label mb-0">On Transit</label>
                              </div>
                              <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                                 <select className="form-select">
                                    <option selected="">In water</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           <div className="row align-items-center">
                              <div className="col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                                 <label className="form-label mb-0">Landing date </label>
                              </div>
                              <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                                 <input type="date" className="form-control" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-4 col-xl-5">
            <div className="add-invoice-right pt-4 pt-lg-5 d-flex justify-content-center gap-2">
              <a href="product-invoice.html" className="add-invo-arrow">
                <i className="fa-solid fa-arrow-left"></i>
              </a>
              <div className="add-invo-btn text-center">
                <a href="product-invoice.html" className="common_btn border-0">
                  Add Invoice
                </a>
                <p className="instrcution-error mt-3">All fields are mandatory</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

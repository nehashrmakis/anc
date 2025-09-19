import { useForm, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { usePage } from '@inertiajs/react';

export default function AddInvoice({ inventory, ports, suppliers, invoice = null }) {
  const isEdit = !!invoice;
  const [portList] = useState(ports || []);
  const { errors } = usePage().props;

  const { data, setData } = useForm({
    invoice_no: invoice?.invoice_no || '',
    po_number: invoice?.po_number || '',
    supplier: invoice?.supplier || '',
    arrival_depo: invoice?.arrival_depo || '',
    on_transit: invoice?.on_transit || '',
    landing_date: invoice?.landing_date || '',
    containers: invoice?.containers?.length > 0
      ? invoice.containers.map((c) => ({
          id: c.container_id || '',
          products: c.products.map((p) => ({
            inventory_id: p.inventory_id || '',
            marking: p.marking || '',
            size: p.size || '',
            size_unit: p.size_unit || '',
            weight: p.weight || '',
            weight_unit: p.weight_unit || '',
            total_bundles: p.total_bundles || '',
            quantity_per_bundle: p.quantity_per_bundle || '',
            total_product: p.total_product || '',
          })),
        }))
      : [
          {
            id: '',
            products: [
              {
                inventory_id: '',
                marking: '',
                size: '',
                size_unit: '',
                weight: '',
                weight_unit: '',
                total_bundles: '',
                quantity_per_bundle: '',
                total_product: '',
              },
            ],
          },
        ],
  });

  const [containerCount, setContainerCount] = useState(data.containers.length);
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
            size: '',
            size_unit: '',
            weight: '',
            weight_unit: '',
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
    const product = updatedContainers[containerIdx].products[productIdx];

    product[field] = value;

    if (field === 'inventory_id') {
      const selectedProduct = inventory.find(inv => inv.id === parseInt(value));
      if (selectedProduct) {
        product.size = selectedProduct.size || '';
        product.size_unit = selectedProduct.size_unit || '';
        product.weight = selectedProduct.weight || '';
        product.weight_unit = selectedProduct.weight_unit || '';
      } else {
        product.size = '';
        product.size_unit = '';
        product.weight = '';
        product.weight_unit = '';
      }
    }

    if (field === 'total_bundles' || field === 'quantity_per_bundle') {
      const a = parseFloat(product.total_bundles) || 0;
      const b = parseFloat(product.quantity_per_bundle) || 0;
      product.total_product = a * b;
    }

    setData('containers', updatedContainers);
  };

  const addProduct = (containerIdx) => {
    const updatedContainers = [...data.containers];
    updatedContainers[containerIdx].products.push({
      inventory_id: '',
      marking: '',
      size: '',
      size_unit: '',
      weight: '',
      weight_unit: '',
      total_bundles: '',
      quantity_per_bundle: '',
      total_product: '',
      isNew: true,
    });
    setData('containers', updatedContainers);
  };

  const removeProduct = (containerIdx, productIdx) => {
    const updatedContainers = [...data.containers];
    updatedContainers[containerIdx].products.splice(productIdx, 1);
    setData('containers', updatedContainers);
  };

  const submit = (e) => {
    e.preventDefault();
    const routeName = isEdit ? 'invoice.update' : 'invoice.store';
    const method = isEdit ? 'put' : 'post';

    router[method](route(routeName, invoice?.id), {
      invoice_no: data.invoice_no,
      po_number: data.po_number,
      supplier: data.supplier,
      arrival_depo: data.arrival_depo,
      on_transit: data.on_transit,
      landing_date: data.landing_date,
      containers: data.containers,
    });
  };

  const hasError = (fieldPath) => errors && Object.prototype.hasOwnProperty.call(errors, fieldPath);
  const inputErrorClass = (fieldPath) => (hasError(fieldPath) ? 'is-invalid' : '');

  return (
    <>
       <Head title={invoice ? 'Edit Invoice' : 'Add Invoice'} />
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
                      <input
                        type="text"
                        className={`form-control rounded-5 ${errors.invoice_no ? 'is-invalid' : ''}`}
                        placeholder="123465787"
                        value={data.invoice_no}
                        onChange={(e) => setData('invoice_no', e.target.value)}
                      />
                     
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
                      <input
                        type="text"
                        className={`form-control rounded-5 ${errors.po_number ? 'is-invalid' : ''}`}
                        value={data.po_number}
                        onChange={(e) => setData('po_number', e.target.value)}
                      />
                    </div>
                    <div className="col-xl-3 mb-1">
                      <label className="form-label mb-0">Supplier</label>
                      <select
                          className={`form-select rounded-5 ${errors.supplier ? 'is-invalid' : ''}`}
                          value={data.supplier}
                          onChange={(e) => setData('supplier', e.target.value)}
                        >
                          <option value="">Select </option>
                          {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.name}>
                              {supplier.name}
                            </option>
                          ))}
                        </select>

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
              <div className="col-12">
                <div className="d-block d-md-flex d-lg-flex align-items-center gap-2">
                  <label className="form-label">Container ID  </label>
                  <div className="rounded-5">
                  <input
                    type="text"
                    className={`form-control ${inputErrorClass(`containers.${containerIdx}.id`)}`}
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
                {product.isNew && (
      <div className="remove-product text-end mb-3">
        <button
          type="button"
          className="remove-btn rounded-2 border-0"
          onClick={() => removeProduct(containerIdx, productIdx)}
        >
          <span className="me-1">&#10005;</span>Remove
        </button>
      </div>
    )}
                <div className="row gy-2 gy-lg-4">
                  <div className="col-md-12">
                    <div className="d-block d-md-flex d-lg-flex align-items-center gap-2">
                      <label className="form-label mb-0">Product Name</label>
                      <select
                        className={`form-select ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.inventory_id`)}`}
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
                              className={`form-check-input ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.marking`)}`}
                              type="radio"
                              name={`marking-${containerIdx}-${productIdx}`}
                              value={markingOption}
                              checked={product.marking === markingOption}
                              onChange={(e) =>
                                handleProductChange(containerIdx, productIdx, 'marking', e.target.value)
                              }
                            />
                            <label className="form-check-label">{markingOption}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 text-end">Size</label>
                      <div className="rounded-5">
                        <input
                          type="text"
                          className={`form-control color-grey ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.size`)}`}
                          value={product.size}
                          onChange={(e) =>
                            handleProductChange(containerIdx, productIdx, 'size', e.target.value)
                          }
                        disabled />
                      </div>
                      <span>({product.size_unit || 'feet'})</span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 text-end">Weight</label>
                      <div className="rounded-5">
                        <input
                          type="text"
                          className={`form-control color-grey ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.weight`)}`}
                          value={product.weight}
                          onChange={(e) =>
                            handleProductChange(containerIdx, productIdx, 'weight', e.target.value)
                          }
                        disabled />
                      </div>
                      <span>({product.weight_unit || 'kg'})</span>
                    </div>
                  </div>

                  {/* Total Bundles */}
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 text-end">Total Bundles<br /><sub>(A)</sub></label>
                      <div className="rounded-5">
                        <input
                          type="number"
                          className={`form-control ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.total_bundles`)}`}
                          value={product.total_bundles}
                          onChange={(e) =>
                            handleProductChange(containerIdx, productIdx, 'total_bundles', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity per Bundle */}
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 float-lg-end text-end">
                        Qt. Per Bundles<br /><sub>(B)</sub>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${inputErrorClass(`containers.${containerIdx}.products.${productIdx}.quantity_per_bundle`)}`}
                        value={product.quantity_per_bundle}
                        onChange={(e) =>
                          handleProductChange(containerIdx, productIdx, 'quantity_per_bundle', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Total Product (Read-only) */}
                  <div className="col-md-7 col-lg-7">
                    <div className="d-flex align-items-center gap-2">
                      <label className="form-label mb-0 float-lg-end text-end">
                        Total Product<br /><sub>(A X B)</sub>
                      </label>
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
                          <label className="form-label mb-0">Arrival Port</label>
                        </div>
                        <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                          <select
                            className={`form-select ${errors.arrival_depo ? 'is-invalid' : ''}`}
                            value={data.arrival_depo}
                            onChange={(e) => setData('arrival_depo', e.target.value)}
                          >
                            <option value="">Select Port</option>

                              {portList.map((port) => (
                                  <option value={port.name}>
                                    {port.name} - {port.location}
                                  </option>
                                ))} 
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
                          <select
                            className={`form-select ${errors.on_transit ? 'is-invalid' : ''}`}
                            value={data.on_transit}
                            onChange={(e) => setData('on_transit', e.target.value)}
                          >
                            <option value="">Select Status</option> 
                            <option value="In water">In water</option>
                            <option value="1">On Hold</option>
                            <option value="2">Out for Delivery</option>
                            <option value="3">Delayed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row align-items-center">
                        <div className="col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                          <label className="form-label mb-0">Landing date</label>
                        </div>
                        <div className="col-md-8 col-lg-8 col-xl-9 col-xxl-9">
                          <input
                            type="date"
                            className={`form-control ${errors.landing_date ? 'is-invalid' : ''}`}
                            value={data.landing_date}
                            onChange={(e) => setData('landing_date', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Submit button triggers the form */}
          <div className="col-md-4 col-lg-4 col-xl-5">
            <div className="add-invoice-right pt-4 pt-lg-5 d-flex justify-content-center gap-2">
              <a href="/invoices" className="add-invo-arrow">
                <i className="fa-solid fa-arrow-left"></i>
              </a>
              <div className="add-invo-btn text-center">
                <button type="button" className="common_btn border-0" onClick={submit}>
  {isEdit ? 'Update Invoice' : 'Add Invoice'}
</button>
                <p className="instrcution-error mt-3">All fields are mandatory</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

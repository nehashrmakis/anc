import { Head, router } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

export default function InventoryByCategory({ category, inventory, title, final_inventory_count,mainPort  }) {
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedDepot, setSelectedDepot] = useState('all');

  // Increment
  const handleIncrement = (finalInventoryId, maxQuantity) => {
    setQuantities(prev => {
      const currentQty = prev[finalInventoryId] || 1;
      if (currentQty < (maxQuantity ?? Infinity)) {
        return { ...prev, [finalInventoryId]: currentQty + 1 };
      }
      return prev;
    });
  };

  // Decrement
  const handleDecrement = (finalInventoryId) => {
    setQuantities(prev => ({
      ...prev,
      [finalInventoryId]: Math.max((prev[finalInventoryId] || 1) - 1, 1),
    }));
  };

  // Add to Cart
  const handleAddToCart = (item) => {
    router.post(route('cart.store'), {
      id: item.inventory_id,
      invoice_id:item.invoice_id,
      name: item.name,
      size: item.size,
      size_unit: item.size_unit,
      weight: item.weight,
      weight_unit: item.weight_unit,
      arrival_depo: item.arrival_depo,
      quantity: quantities[item.final_inventory_id] || 1, // ✅ Fixed here
    });
  };

  // Delete
  const handleDelete = (finalInventoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be permanently deleted from inventory.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('categories.destroyinventory', {
          category: category.id,
          id: finalInventoryId
        }), {
          preserveScroll: true,
          preserveState: true,
        });
      }
    });
  };

  // Send to Main Port
// Send to Main Port
const handleSendToMainPort = (finalInventoryId) => {
  Swal.fire({
    title: 'Send to Main Port',
    html: `
      <input id="main-port" type="text" class="swal2-input" value="${mainPort?.name || ''}" readonly />
      <input id="main-port-id" type="hidden" value="${mainPort?.id || ''}" />
      <input id="quantity" type="number" class="swal2-input" placeholder="Quantity" min="1" />
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Send & Sync',
    preConfirm: () => {
      const portId = document.getElementById('main-port-id').value;
      const quantity = Number(document.getElementById('quantity').value);

      if (!portId || !quantity || quantity <= 0) {
        Swal.showValidationMessage('Please enter a valid quantity');
        return false;
      }
      return { port: portId, quantity };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { port, quantity } = result.value;

      router.post(route('inventory.sendToMainPort'), {
        final_inventory_id: finalInventoryId,
        port: port,
        quantity: quantity
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => Swal.fire('Success', 'Inventory sent and synced to QuickBooks', 'success'),
        onError: () => Swal.fire('Error', 'Something went wrong.', 'error')
      });
    }
  });
};



  // Filtering
  const filtered = useMemo(() => {
    const data = inventory?.data ?? [];
    return data.filter(item => {
      const matchProduct =
        selectedProduct === 'all' || item.inventory_id === Number(selectedProduct);
      const matchDepot =
        selectedDepot === 'all' || item.arrival_depo === selectedDepot;
      return matchProduct && matchDepot;
    });
  }, [inventory, selectedProduct, selectedDepot]);

  // Group by invoice_id
  const groupedByInvoice = useMemo(() => {
    return filtered.reduce((acc, item) => {
      const key = (item.invoice_id ?? `no-invoice-${item.final_inventory_id}`).toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [filtered]);

  const productOptions = useMemo(() => {
    const ids = Array.from(new Set((inventory?.data ?? []).map(i => i.inventory_id)));
    return ids.map(id => {
      const p = (inventory?.data ?? []).find(x => x.inventory_id === id);
      return { id, name: p?.name || `Product ${id}` };
    });
  }, [inventory]);

  const depotOptions = useMemo(() => {
    return Array.from(new Set((inventory?.data ?? []).map(i => i.arrival_depo))).filter(Boolean);
  }, [inventory]);

  return (
    <>
      <Head title={'Product List'} />
      <Header />
      <Sidebar />
      <main className="app-content p-lg-5 product-list">
        {/* Header */}
        <div className="scaffolding-tubes mt-3 mt-lg-5">
          <div className="row">
            <div className="col-md-12 col-lg-5 col-xl-5 col-xxl-6">
              <div className="prod-thumb d-flex align-items-start gap-3">
                <div className="prod-thumb-img">
                  <img
                    src={category.image ? `/uploads/${category.image}` : '/assets/img/icons/upload-file.png'}
                    alt={category.name}
                    className="rounded-3"
                  />
                </div>
                <div className="prod-thumb-text">
                  <h4>{category.name}</h4>
                  <p className="mt-1">Total Products : {final_inventory_count}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-7 col-xl-7 col-xxl-6">
              <div className="prod-and-depo ms-auto mt-3 mt-lg-0">
                <div className="row justify-content-end">
                  <div className="col-md-8 col-lg-8">
                    <div className="pod-all d-flex gap-2">
                      <button className="border-0 common_btn">
                        <i className="ri-equalizer-fill"></i>
                      </button>

                      <select
                        className="form-select"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        <option value="all">All Products</option>
                        {productOptions.map(opt => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                        ))}
                      </select>

                      <select
                        className="form-select"
                        value={selectedDepot}
                        onChange={(e) => setSelectedDepot(e.target.value)}
                      >
                        <option value="all">All Depo</option>
                        {depotOptions.map((d, i) => (
                          <option key={i} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="product-list-table mt-3 mt-lg-5">
          <table className="mb-3">
            <thead>
              <tr>
                <th>Products name</th>
                <th>Supplier Name</th>
                <th>Size</th>
                <th className="text-center">Weight</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Agent / Depo</th>
                <th className="text-center">Transit</th>
                <th colSpan="2">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedByInvoice).map(([invoiceId, items]) => (
                <React.Fragment key={invoiceId}>
                  <tr className="table-secondary">
                    <td colSpan="9" className="fw-bold">
                      Invoice ID: {invoiceId}
                    </td>
                  </tr>
                  {items.map(item => (
                    <tr key={item.final_inventory_id}>
                      <td>{item.name}</td>
                      <td>{item.supplier}</td>
                      <td>{item.size} {item.size_unit}</td>
                      <td className="text-center">{item.weight} {item.weight_unit}</td>
                      <td className="text-center">{item.total_product}</td>
                      <td className="text-center">{item.arrival_depo}</td>
                      <td className="text-center">{item.on_transit}</td>
                      <td colSpan="2">
                        <div className="cart-counting d-flex gap-2">
                          <div className="cart-counting-inc d-flex gap-2 align-items-center">
                            <button onClick={() => handleDecrement(item.final_inventory_id)} className="border-0">-</button>
                            <p className="counting">{quantities[item.final_inventory_id] || 1}</p>
                            <button onClick={() => handleIncrement(item.final_inventory_id, item.total_product)} className="border-0">+</button>
                          </div>
                          <div className="cart-counting-btn">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="rounded-2 border-0 common_btn"
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
  <div className="action-btn d-flex gap-2">
     {/* <button onClick={() => handleDelete(item.final_inventory_id)} className="border-0">
      <i className="fa-solid fa-trash"></i>
    </button> */}

    {item.arrival_depo === mainPort?.name ? (
  <span className="badge-main-port">In Main Port</span>
) : (
  <button
    onClick={() => handleSendToMainPort(item.final_inventory_id)}
    className="border-0 text-success"
    title="Send to Main Port"
  >
    <i className="fa-solid fa-arrow-right-arrow-left"></i>
  </button>
)}

  </div>
</td>

                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

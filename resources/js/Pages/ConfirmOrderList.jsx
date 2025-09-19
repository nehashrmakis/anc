import { Head, router } from '@inertiajs/react';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
export default function ConfirmOrderList({ cart = [] }) {
const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This item will be removed from your cart.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, remove it!',
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(route('cart.destroy', id), {
        preserveScroll: true,
      });
    }
  });
};

  return (
    <>
      <Head title="Confirm Order" />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 confirm-order">
        <div className="confirm-order-heading mt-3 mt-lg-5">
          <h2>Confirm Order</h2>
        </div>

        <div className="product-list-table confirm-list-table mt-3 mt-lg-4">
          <table className="mb-3">
            <thead>
              <tr>
                <th>Products name</th>
                <th>Size</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Weight (kg)</th>
                <th>Depo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {cart.map((item, index) => (
  <tr key={index}>
    <td>{item.name}</td>
    <td>{item.size ?? 'N/A'}</td>
    <td className="text-center">{item.quantity}</td>
    <td className="text-center">{(item.weight * item.quantity).toFixed(2)}</td>
    <td>
      <span className="main-depo">{item.arrival_depo ?? 'N/A'}</span>
    </td>
    <td>
    <button
        onClick={() => handleDelete(item.id)}
        className="border-0 text-danger"
        title="Remove"
      >
        <i className="fa fa-trash"></i>
      </button>
</td>
  </tr>
))}
{cart.length === 0 && (
  <tr>
    <td colSpan="5" className="text-center">Cart is empty.</td>
  </tr>
)}

            </tbody>
          </table>
        </div>

      <form onSubmit={(e) => {
  e.preventDefault();

  router.post(route('dispatch.confirm'), {}, {
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Order is confirmed.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (errors) => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to confirm the order. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  });
}}>

  <div className="varient-btn d-flex justify-content-end gap-2 mt-3 mt-lg-3">
    <button
      type="button"
      className="border-0 common_btn more-varient"
      onClick={() => history.back()}
    >
      Add More Product
    </button>
    <button type="submit" className="border-0 common_btn done-btn">
      Confirm
    </button>
  </div>
</form>

      </main>
    </>
  );
}

import { Head } from '@inertiajs/react';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DispatchHistoryList({ dispatches = [] }) {
  return (
    <>
      <Head title={'Dispatch History Listing'} />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 confirm-order">
        <div className="product-list-table confirm-list-table dispatch-history-table mt-3 mt-lg-4">
          <table className="mb-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Products name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Weight(kg)</th>
              </tr>
            </thead>
            <tbody>
              {dispatches.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.dispatched_at).toLocaleDateString('en-GB')}</td>
                  <td>{item.product_name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.total_weight.toFixed(2)}</td>
                </tr>
              ))}
              {dispatches.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">Nothing to Dispatch</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

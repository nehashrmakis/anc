import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal } from 'bootstrap';

export default function ProductList() {

    const increment = (e) => {
    const countElem = e.target.parentNode.querySelector('.counting');
    let count = parseInt(countElem.textContent);
    countElem.textContent = count + 1;
  };

  const decrement = (e) => {
    const countElem = e.target.parentNode.querySelector('.counting');
    let count = parseInt(countElem.textContent);
    if (count > 0) {
      countElem.textContent = count - 1;
    }
  };

    return (
    <>
        <Head title={'Product List'} />
        <Header />
        <Sidebar />
            <main className="app-content p-lg-5 product-list">
      <div className="scaffolding-tubes mt-3 mt-lg-5">
        <div className="row">
          <div className="col-md-12 col-lg-5 col-xl-5 col-xxl-6">
            <div className="prod-thumb d-flex align-items-start gap-3">
              <div className="prod-thumb-img">
                <img
                  src="assets/img/prod-list-1.png"
                  alt="prod-list-1"
                  className="rounded-3"
                />
              </div>
              <div className="prod-thumb-text">
                <h4>Scaffolding Tubes</h4>
                <p className="mt-1">Total Products : 165</p>
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
                    <select className="form-select" aria-label="all-prod">
                      <option defaultValue>All Product</option>
                      <option value="1">Tubes</option>
                      <option value="2">Boards</option>
                      <option value="3">Fittings</option>
                      <option value="4">Netting & Sheeting</option>
                      <option value="5">Aluminium Beams</option>
                      <option value="6">Ladders</option>
                      <option value="7">Corrugated Iron Sheeting</option>
                    </select>
                    <select className="form-select" aria-label="all-depo">
                      <option defaultValue>All Depo</option>
                      <option value="1">Main depot</option>
                      <option value="2">Seakargo LGW</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="checkout-btn text-end">
                    <button className="common_btn border-0">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-list-table mt-3 mt-lg-5">
        <table className="mb-3">
          <thead>
            <tr>
              <th>Products name</th>
              <th>Supplier Name</th>
              <th>Size(in)</th>
              <th className="text-center">Weight(kg)</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Agent / Depo</th>
              <th className="text-center">Transit</th>
              <th colSpan="2">Add to Cart</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, idx) => (
              <tr key={idx}>
                <td>Product Name Product...</td>
                <td>{idx % 2 === 0 ? 'Richard' : 'Martin'}</td>
                <td>25 X 34</td>
                <td className="text-center">20</td>
                <td className="text-center">40</td>
                <td className="text-center">
                  <span className="main-depo">
                    {idx < 2 ? 'Main depot' : 'Seakargo LGW'}
                  </span>
                </td>
                <td className="text-center">
                  <span className="no">NO</span>
                </td>
                <td colSpan="2">
                  <div className="cart-counting d-flex gap-2">
                    <div className="cart-counting-inc d-flex gap-2 align-items-center">
                      <button onClick={decrement} className="border-0">-</button>
                      <p className="counting">0</p>
                      <button onClick={increment} className="border-0">+</button>
                    </div>
                    <div className="cart-counting-btn">
                      <a className="rounded-2" href="confirm-order.html">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="action-btn d-flex gap-2">
                    <button className="border-0">
                      <img src="assets/img/icons/eye.png" alt="eye" />
                    </button>
                    <button className="border-0">
                      <img src="assets/img/icons/edit.png" alt="edit" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="checkout-btn text-end mt-3 mt-lg-4">
        <button className="common_btn border-0">Checkout</button>
      </div>
    </main>
 





    </>
    );
}


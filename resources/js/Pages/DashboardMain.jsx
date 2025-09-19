import { Head, Link, usePage } from '@inertiajs/react';
import 'aos/dist/aos.css';

export default function DashboardMain() {
  const { auth, inTransitInvoices, inTransitCount } = usePage().props;
function getProductNames(invoice) {
  if (!invoice.products || invoice.products.length === 0) return 'N/A';

  return invoice.products
    .map(p => p.inventory?.name)
    .filter(Boolean)
    .join(', ');
}


  return (
    <>
      <main className="app-content p-lg-5">
        <div className="summery-box-detail mt-lg-4">
          <div className="row g-3">
            <div className="col-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <div className="summery-box summery-box-3 px-3 py-4 rounded-4 d-flex flex-column justify-content-between">
                <div className="summery-view d-flex align-items-center gap-2 justify-content-between">
                  <h2>{inTransitCount ?? 0}</h2>
                  <button className="cart-button p-0 border-0">
                    <svg
                      width="22"
                      height="28"
                      viewBox="0 0 22 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.87298 10.7014L1.34286 8.17207C0.952885 7.78222 0.952836 7.15003 1.34275 6.76012C1.73266 6.37021 2.36485 6.37026 2.7547 6.76023L5.28404 9.29035H20.4943C20.6499 9.29034 20.8033 9.32669 20.9423 9.3965C21.0813 9.4663 21.202 9.56764 21.2949 9.69241C21.3878 9.81718 21.4502 9.96193 21.4772 10.1151C21.5042 10.2683 21.495 10.4257 21.4504 10.5747L19.0553 18.558C18.9937 18.7637 18.8674 18.944 18.6952 19.0722C18.523 19.2004 18.314 19.2696 18.0993 19.2696H5.86882V21.2654H15.848C16.3992 21.2654 16.8459 21.7122 16.8459 22.2633C16.8459 22.8145 16.3992 23.2612 15.848 23.2612H4.8709C4.60623 23.2612 4.35241 23.1561 4.16526 22.969C3.97811 22.7818 3.87298 22.528 3.87298 22.2633V10.7014ZM5.86882 11.2862V17.2737H17.3569L19.1531 11.2862H5.86882ZM5.36986 27.2529C4.97286 27.2529 4.59212 27.0952 4.3114 26.8145C4.03068 26.5338 3.87298 26.153 3.87298 25.756C3.87298 25.359 4.03068 24.9783 4.3114 24.6976C4.59212 24.4169 4.97286 24.2592 5.36986 24.2592C5.76686 24.2592 6.14759 24.4169 6.42831 24.6976C6.70903 24.9783 6.86674 25.359 6.86674 25.756C6.86674 26.153 6.70903 26.5338 6.42831 26.8145C6.14759 27.0952 5.76686 27.2529 5.36986 27.2529ZM17.3449 27.2529C16.9479 27.2529 16.5672 27.0952 16.2865 26.8145C16.0057 26.5338 15.848 26.153 15.848 25.756C15.848 25.359 16.0057 24.9783 16.2865 24.6976C16.5672 24.4169 16.9479 24.2592 17.3449 24.2592C17.7419 24.2592 18.1226 24.4169 18.4034 24.6976C18.6841 24.9783 18.8418 25.359 18.8418 25.756C18.8418 26.153 18.6841 26.5338 18.4034 26.8145C18.1226 27.0952 17.7419 27.2529 17.3449 27.2529Z"
                        fill="#04103B"
                      />
                      <path
                        d="M10.4951 3.53725L12.9671 1.06528L15.439 3.53725"
                        stroke="#04103B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.9592 1.07232V7.75437"
                        stroke="#04103B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="summery-detail d-flex align-items-baseline gap-2 justify-content-between mt-2 flex-column flex-md-row flex-lg-column flex-xl-row">
                  <h3>Container in Transit</h3>
                  <a href="/inventory-category">View Inventory</a>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 col-lg-3 col-xl-2 col-xxl-2">
               <a className="summery-box summery-box-4 add-invoice px-3 py-3 rounded-4" href="/add-invoice">
                  <div className="add-invoice-inner text-center d-flex align-items-center flex-column justify-content-between p-3 rounded-4">
                     <img src="assets/img/icons/plus.png" alt="plus" />
                     <h3 className="mt-3">Add New Invoice</h3>
                  </div>
               </a>
            </div>
            <div className="col-6 col-md-3 col-lg-3 col-xl-2 col-xxl-2">
               <a className="summery-box summery-box-4 add-suppliers-box add-invoice px-3 py-3 rounded-4" href="/suppliers">
                  <div className="add-invoice-inner text-center d-flex align-items-center flex-column justify-content-between p-3 rounded-4">
                     <img src="assets/img/icons/plus.png" alt="plus" />
                     <h3 className="mt-3">Add Suppliers</h3>
                  </div>
               </a>
            </div>
            <div className="col-6 col-md-3 col-lg-3 col-xl-2 col-xxl-2">
               <a className="summery-box summery-box-4 add-agent-box add-invoice px-3 py-3 rounded-4" href="/agents">
                  <div className="add-invoice-inner text-center d-flex align-items-center flex-column justify-content-between p-3 rounded-4">
                     <img src="assets/img/icons/plus.png" alt="plus" />
                     <h3 className="mt-3">Add Agent</h3>
                  </div>
               </a>
            </div>
          </div>
        </div>

        <div className="shipment-transit mt-5 mt-md-4 mt-lg-5">
          <h2>Shipment In Transit</h2>
          <div className="shipment-transit-table mt-3 mt-lg-4">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Supplier name</th>
                  <th>Invoice No.</th>
                  <th>Product name</th>
                  <th>Agent</th>
                  <th>Arrival Port</th>
                  <th colSpan="2">ETA</th>
                </tr>
              </thead>
              <tbody>
                {inTransitInvoices.map((invoice, index) => (
                  <tr key={invoice.id}>
                    <td><span className="s-no">{index + 1}</span></td>
                    <td>{invoice.supplier}</td>
                    <td><span className="invoice-num">#{invoice.invoice_no}</span></td>
                    <td>{getProductNames(invoice)}</td>
                    <td>{invoice.assignment?.agent?.name || 'N/A'}</td>
                    <td><span className="arival-port">{invoice.arrival_depo}</span></td>
                    <td><span className="eta">{invoice.landing_date}</span></td>
                    <td>
                      <button className="border-0 shipment-more" data-bs-toggle="modal" data-bs-target="#shipment-more">
                        <i className="ri-more-2-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';


export default function Header() {
    const { auth } = usePage().props;
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };
    const { title } = usePage().props;
      
    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
     <header className="app-header align-items-center d-none d-lg-flex">
      
      <a className="app-header__logo" href="/dashboard"><img src="/assets/img/dashboard-logo.png" className="logo" /></a>
      <div className="header-right d-flex align-items-center w-100 py-4 px-5">
         <h1 className="me-3">{title || 'Overview'}</h1>
         <div className="app-nav align-items-center gap-2">
            {/* <div className="header-search">
               <div className="input-group rounded-5">
                  <input type="text" className="form-control border-0 ps-4" placeholder="Supplier / product / Depo" aria-label="Supplier /product / Depo" aria-describedby="search-bar" />
                  <span className="input-group-text border-0 rounded-5 pe-4" id="search-bar"><img src="/assets/img/icons/search.png" alt="search" /></span>
                </div>
            </div> */}
            <div className="notification-icon ms-lg-5 ms-2">
               <button className="border-0"><i className="fa-solid fa-bell"></i></button>
            </div>
            <div className="profile-detail">
               <div className="dropdown">
                  <button className="dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <img src="/assets/img/profile-icon.png" alt="profile-icon" className="img-fluid me-2" /> {auth.user?.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end mt-2">
                     {/* <li>
                        <a className="dropdown-item px-2 py-2" href="/pprofile">
                        <i class="fa-solid fa-user h5 me-2"></i> Profile</a>
                     </li>          */}
                     <li>
                        {/* <img src="assets/img/icons/sign-out.png" alt="sign-out" className="img-fluid me-2" />  */}
                        <button
                            onClick={handleLogout}
                            className="dropdown-item px-2 py-2 border-0"
                        >
                            <i class="fa-solid fa-arrow-right-from-bracket h5 me-2"></i> Logout
                        </button></li>
                       
                  </ul>
                </div>
            </div>
         </div>
         <span className="header-bottom px-5"></span>
      </div>
      </header>
</>
    );
}
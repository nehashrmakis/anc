import { Head } from '@inertiajs/react';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';

export default function Dashboard() {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
    <>
    <Head title="Dashboard" />
  <Header />
        <Sidebar />
        <DashboardMain/>
        </>
    );
}

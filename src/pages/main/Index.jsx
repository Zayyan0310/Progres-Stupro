import { Routes, Route } from 'react-router-dom';
import Beranda from './page/Beranda';
import Catatan from './page/Catatan';
import Kalendar from './page/Kalender';
import { Sidebar } from '@/components';
import Profile from './page/Profile';
import EditCatatan from './page/EditCatatan';
import BuatCatatan from './page/BuatCatatan';

const MainContent = () => {
    return (
        <div className="flex md:flex-row flex-col min-h-screen">
            <Sidebar />
            <div className="flex-1 h-screen overflow-y-auto bg-[#F2F2F2]">
                <div className="px-6 md:px-16 py-6">
                    <Routes>
                        {/* <Route path="/" element={<Beranda />} /> */}
                        <Route path="/beranda" element={<Beranda />} />
                        <Route path="/catatan" element={<Catatan />} />
                        <Route path="/kalender" element={<Kalendar />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/edit-catatan" element={<EditCatatan />} />
                        <Route path="/buat-catatan" element={<BuatCatatan />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
};

export default MainContent;

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Stethoscope, Building, CalendarCheck, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('vhrc_admin_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('vhrc_admin_token');
    localStorage.removeItem('vhrc_admin_user');
    navigate('/vhrc-admin');
  };

  const navItems = [
    { path: '/vhrc-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vhrc-admin/doctors', icon: Users, label: 'Doctors' },
    { path: '/vhrc-admin/services', icon: Stethoscope, label: 'Services' },
    { path: '/vhrc-admin/departments', icon: Building, label: 'Departments' },
    { path: '/vhrc-admin/appointments', icon: CalendarCheck, label: 'Appointments' },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#193151] transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">VHRC Admin</h2>
                  <p className="text-gray-400 text-xs">{user.name || 'Admin'}</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setSidebarOpen(false)}>
                <item.icon className="w-5 h-5" /><span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full transition-all">
              <LogOut className="w-5 h-5" /><span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{(user.name || 'A')[0]}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name || 'Admin'}</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

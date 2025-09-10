import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import {
  Edit2,
  Trash2,
  CheckCircle,
  Ban,
  Store,
  Shield,
  PlusCircle,
  RefreshCw,
  Search,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { getadminDashboard, deleteShop, changeStatus } from "../../services/adminService";

const AdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [shops, setShops] = useState([]);
  const [managers, setManagers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getadminDashboard();

      setShops(res.data.shops); // <-- API se shops ka array
      setManagers(res.data.shops.filter((shop) => shop.role === "manager"));
      setAdmins(res.data.shops.filter((shop) => shop.role === "admin"));
    } catch (err) {
      console.error(err);
      toast.error("Failed to refresh data!")
      setError("Failed to fetch dashboard data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
        if(confirm("Are you sure you want to delete your manager? This action cannot be undone")){
            const deleted = await deleteShop(id);
            if (deleted) {
                console.log("Profile deleted seccessfully!")
            }
            fetchData();
        }
    } catch (err) {
      console.error(err);
      setError("Failed to delete shop!");
    }
  }

  const totalShops = managers.length;
  const totalAdmins = admins.length;


  const handleStatus = async (id) => {
    try {
        const status = await changeStatus(id);
        if (status) {
            console.log("Status changed successfully!")
        }
        fetchData();
    } catch (err) {
      console.error(err);
      setError("Failed to Change status!");
  }
}
  

  // Search filter
  const filteredManagers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return managers;
    return managers.filter((m) =>
      [m.name, m.email, m.phone, m.shop, m.status, m.userStatus]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [query, managers]);

  const filteredAdmins = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return admins;
    return admins.filter((m) =>
      [m.name, m.email, m.phone]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [admins]);

  // Status badge helper
  const statusBadge = (status) => {
    const base =
      "px-2 py-1 text-xs rounded-full border inline-flex items-center gap-1";
    if (status === "active")
      return (
        <span className={`${base} border-green-300 bg-green-50`}>
          ● Active
        </span>
      );
    if (status === "pending")
      return (
        <span className={`${base} border-amber-300 bg-amber-50`}>
          ● Pending
        </span>
      );
    return (
      <span className={`${base} border-rose-300 bg-rose-50`}>
        ● Suspended
      </span>
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Shield onClick={() => navigate('/adminprofile')} className="text-blue-600 w-6 h-6 cursor-pointer" />
            <div className="font-semibold text-blue-600">
              Admin Dashboard
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              (Manage users & shops)
            </span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            >
              <RefreshCw className="w-4 h-4" /><span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4" /><span className="hidden sm:inline">Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5" />
            <div>
              <div className="font-medium">Heads up</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex sm:flex-wrap gap-4 mb-6">
          <StatCard
            icon={Store}
            label="Total Shops"
            value={totalShops}
            loading={loading}
          />
          <StatCard
            icon={Shield}
            label="Total Admins"
            value={totalAdmins}
            loading={loading}
          />
        </div>

        {/* Table */}
          <div className="mb-10">
  <h2 className="text-xl md:text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-3">
    <Store className="w-5 h-5" /> Managers
  </h2>
  {/* Search */}
        <div className="mb-4 flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search managers, shops, phone..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-[800px] w-full text-sm text-left text-gray-700">
              <thead className="sticky top-0 bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th className="hidden md:table-cell">Phone</Th>
                  <Th>Shop</Th>
                  <Th>Status</Th>
                  <Th>Joined On</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredManagers.map((m) => (
                  <tr
                    key={m._id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <Td className="font-medium text-blue-800">
                        {m.name}
                      </Td>
                      <Td className="text-xs text-blue-500 md:hidden">
                        {m.email}
                    </Td>
                    <Td className="hidden md:table-cell">{m.email}</Td>
                    <Td className="hidden md:table-cell">{m.phone}</Td>
                    <Td>{m.shopname}</Td>
                    <Td>{statusBadge(m.status)}</Td>
                    <Td>{new Date(m.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <div className="flex items-center justify-end gap-2">
                        
                        {m.status !== "active" ? (
                          <button onClick={ () => { handleStatus(m._id)}}
                            className="p-2 text-emerald-600 rounded-lg hover:bg-emerald-100"
                            title="Activate"
                          >
                            <CheckCircle size={16} />
                          </button>
                        ) : (
                          <button onClick={ () => { handleStatus(m._id)}}
                            className="p-2 text-rose-600 rounded-lg hover:bg-rose-100"
                            title="Suspend"
                          >
                            <Ban size={16} />
                          </button>
                        )}
                        <button onClick={()=> navigate('/admin/profile/edit', { state: { data: m } })}  className="p-2 text-blue-600 rounded-lg hover:bg-blue-100">
                          <Edit2 size={16} />
                        </button>

                        <button onClick={ () => { handleDelete(m._id)}} className="p-2 text-red-500 rounded-lg hover:bg-red-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
                {filteredManagers.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-blue-500"
                    >
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
        </div>
        <div>
  <h2 className="text-xl md:text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-3">
    <Shield className="w-5 h-5" /> Admins
  </h2>
        <div className=" bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
              
          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-[800px] w-full text-sm text-left text-gray-700">
              <thead className="sticky top-0 bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th className="hidden md:table-cell">Phone</Th>
                  <Th>ADDRESS</Th>
                  <Th>Joined On</Th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((m) => (
                  <tr
                    key={m._id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <Td className="font-medium text-blue-800">
                        {m.name}
                      </Td>
                      <Td>
                        {m.email}
                    </Td>
                    <Td className="hidden md:table-cell">{m.phone}</Td>
                    <Td>{m.address}</Td>
                    <Td>{new Date(m.createdAt).toLocaleDateString()}</Td>
                    
                  </tr>
                ))}
                {filteredAdmins.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-blue-500"
                    >
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {label}
          </div>
          <div className="text-xl font-semibold text-slate-800">
            {loading ? <span className="animate-pulse">…</span> : value}
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 align-middle text-slate-700 ${className}`}>
      {children}
    </td>
  );
}

export default AdminPage;

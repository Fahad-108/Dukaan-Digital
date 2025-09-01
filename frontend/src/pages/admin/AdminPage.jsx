import { useNavigate } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Trash2, CheckCircle, Ban } from "lucide-react";
import {
    Users,
    Store,
    Shield,
    DollarSign,
    PlusCircle,
    RefreshCw,
    Search,
    Download,
    Upload,
    AlertTriangle,
    Settings,
} from "lucide-react";

const AdminPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    // Dummy stats
    const [stats, setStats] = useState({
        shops: 12,
    });

    // Dummy managers
    const [managers, setManagers] = useState([
        {
            id: "m1",
            name: "Ahsan Raza",
            email: "ahsan@dukaan.pk",
            phone: "‪+92 300 1234567‬",
            shop: "Raza Store",
            status: "active",
            createdAt: "2025-08-15",
        },
        {
            id: "m2",
            name: "Sana Khan",
            email: "sana@dukaan.pk",
            phone: "‪+92 311 9876543‬",
            shop: "SK Mart",
            status: "pending",
            createdAt: "2025-08-20",
        },
        {
            id: "m3",
            name: "Bilal Ahmed",
            email: "bilal@dukaan.pk",
            phone: "‪+92 333 1010101‬",
            shop: "Bilal Kirana",
            status: "suspended",
            createdAt: "2025-08-05",
        },
    ]);

    // Simulated fetch (API ke badle abhi fake delay)
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError("");
                await new Promise((r) => setTimeout(r, 400));
                if (!mounted) return;
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setError("Failed to fetch dashboard data");
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    // Search filter
    const filteredManagers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return managers;
        return managers.filter((m) =>
            [m.name, m.email, m.phone, m.shop, m.status]
                .filter(Boolean)
                .some((f) => String(f).toLowerCase().includes(q))
        );
    }, [query, managers]);

    // Status badge helper
    const statusBadge = (status) => {
        const base = "px-2 py-1 text-xs rounded-full border inline-flex items-center gap-1";
        if (status === "active")
            return <span className={`${base} border-green-300 bg-green-50`}>● Active</span >;
        if (status === "pending")
            return <span className={`${base} border-amber-300 bg-amber-50`}>● Pending</span >;
        return <span className={`${base} border-rose-300 bg-rose-50`}>● Suspended</span>;
    };

    // Currency helper
    const currency = (n) =>
        new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "PKR",
            maximumFractionDigits: 0,
        }).format(n);

    return (
        <div className="min-h-screen w-full bg-slate-50">
            {/* Top Bar */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Shield className="text-blue-600 w-6 h-6" />
                        <div className="font-semibold text-blue-600">Admin Dashboard</div>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                            (Manage shops & system)
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            <RefreshCw className="w-4 h-4" /> Refresh
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
                        >
                            <PlusCircle className="w-4 h-4" /> Add Shop
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
                <div className="w-100 mb-6">
                    <StatCard
                        icon={Store}
                        label="Total Shops"
                        value={stats.shops}
                        loading={loading}
                    />
                </div>

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

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
                    {/* <div className="px-4 py-3 text-blue-600 border-b border-blue-200 flex items-center justify-between">
                        <div className="font-semibold">Managers</div>
                        <div className="text-xs">{filteredManagers.length} results</div>
                    </div> */}

                    <div className="overflow-x-auto shadow-lg">
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="sticky top-0 bg-blue-600 text-white uppercase text-xs">
                                <tr>
                                    <Th className="px-4 py-2.5">Name</Th>
                                    <Th className="px-4 py-2.5">Email</Th>
                                    <Th className="hidden md:table-cell px-4 py-2.5">Phone</Th>
                                    <Th className="px-4 py-2.5">Shop</Th>
                                    <Th className="px-4 py-2.5">Status</Th>
                                    <Th className="px-4 py-2.5">Created</Th>
                                    <Th className="text-right px-4 py-2.5">Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredManagers.map((m) => (
                                    <tr key={m.id} className="border-b hover:bg-blue-50 transition">
                                        <Td className="px-4 py-2.5">
                                            <div className="font-medium text-blue-800">{m.name}</div>
                                            <div className="text-xs text-blue-500 md:hidden">{m.email}</div>
                                        </Td>
                                        <Td className="hidden md:table-cell px-4 py-2.5">{m.email}</Td>
                                        <Td className="hidden md:table-cell px-4 py-2.5">{m.phone}</Td>
                                        <Td className="px-4 py-2.5">{m.shop}</Td>
                                        <Td className="px-4 py-2.5">{statusBadge(m.status)}</Td>
                                        <Td className="px-4 py-2.5">{m.createdAt}</Td>
                                        <Td className="px-4 py-2.5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="p-2 text-blue-600 rounded-lg hover:bg-blue-100"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                {m.status !== "active" ? (
                                                    <button
                                                        className="p-2 text-emerald-600 rounded-lg hover:bg-emerald-100"
                                                        title="Activate"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="p-2 text-rose-600 rounded-lg hover:bg-rose-100"
                                                        title="Suspend"
                                                    >
                                                        <Ban size={16} />
                                                    </button>
                                                )}

                                                <button
                                                    className="p-2 text-red-500 rounded-lg hover:bg-red-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </Td>
                                    </tr>
                                ))}
                                {filteredManagers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-blue-500">
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
                    <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
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
        </th >
    );
}

function Td({ children, className = "" }) {
    return (
        <td className={`px-4 py-3 align-middle text-slate-700 ${className}`}>
            {children}
        </td >
    );
}

export default AdminPage
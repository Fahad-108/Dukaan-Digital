import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Box, CreditCard, PieChart, ShieldCheck, Zap, LayoutDashboard, ShoppingCart, Users, Package, FileText, User } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[20%] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Dukaan Digital
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/login" className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Welcome to the future of retail management
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Manage Your Digital Store <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
              With Elegance
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            Everything you need to manage products, track sales, handle udhaar, and monitor expenses. An all-in-one powerful dashboard designed for modern businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 group">
              Open Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Features
            </a>
          </div>
        </div>

        {/* Custom Dashboard UI Mockup */}
        <div className="max-w-5xl mx-auto mt-20 px-4 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-[#f8fafc] backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] text-slate-800 relative z-20">

            {/* Sidebar Mockup */}
            <div className="w-full md:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4">
              <div className="flex items-center gap-2 px-2 py-4 mb-4">
                <Box className="w-6 h-6 text-indigo-600" />
                <span className="font-bold text-lg text-slate-900">Dukaan Digital</span>
              </div>
              <div className="flex flex-col gap-1">
                {[
                  { name: 'Dashboard', icon: LayoutDashboard, active: true },
                  { name: 'Sales', icon: ShoppingCart },
                  { name: 'Purchases', icon: Package },
                  { name: 'Credits', icon: CreditCard },
                  { name: 'Products', icon: Box },
                  { name: 'Expenses', icon: PieChart },
                  { name: 'Reports', icon: FileText },
                  { name: 'Profile', icon: User },
                ].map((item) => (
                  <div key={item.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${item.active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-slate-400'}`} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
              {/* Header */}
              <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div className="text-sm font-medium text-slate-500">Overview</div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Main Canvas */}
              <div className="p-6 overflow-y-auto">
                {/* Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 mb-6 border border-slate-800 shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      Good Morning, M. Fahad Raza <span className="animate-bounce inline-block">👋</span>
                    </h2>
                    <p className="text-slate-400 text-sm">Here's what's happening with your shop today.</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Sales', value: '****', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { label: 'Net Profit', value: '****', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    { label: 'Expenses', value: '****', icon: PieChart, color: 'text-red-600', bg: 'bg-red-100' },
                    { label: 'Inventory', value: '****', icon: Box, color: 'text-amber-600', bg: 'bg-amber-100' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                      <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs font-medium text-slate-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart Mockup Area */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-2 mb-6">
                     <BarChart3 className="w-5 h-5 text-indigo-500" />
                     <h3 className="font-bold text-slate-800">Daily Sales Trend</h3>
                   </div>
                   <div className="w-full h-40 relative flex items-end justify-between px-2 gap-2">
                      {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                        <div key={i} className="w-full bg-indigo-100 rounded-t-md relative group">
                           <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-md transition-all duration-1000" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover the tools designed to streamline your business operations and maximize growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Inventory Management</h3>
              <p className="text-gray-400 leading-relaxed">Add, edit, and track products effortlessly. Keep your stock levels in check with real-time updates.</p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Sales & Purchases</h3>
              <p className="text-gray-400 leading-relaxed">Log every transaction instantly. Monitor daily revenue and keep a comprehensive history of sales.</p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Udhaar Management</h3>
              <p className="text-gray-400 leading-relaxed">Track customer credit and payments securely. Never lose sight of pending dues again.</p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Expense Tracking</h3>
              <p className="text-gray-400 leading-relaxed">Categorize and record business expenses to calculate exact profitability margins.</p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all cursor-default lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">Actionable Reports</h3>
              <p className="text-gray-400 leading-relaxed max-w-2xl">Generate detailed insights across sales, expenses, and overall profit. Make data-driven decisions faster with beautifully visualized reports that help your business thrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="text-lg font-bold text-gray-200">Dukaan Digital</span>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dukaan Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Box, CreditCard, PieChart, ShieldCheck, Zap } from 'lucide-react';

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

        {/* Dashboard Preview Image */}
        <div className="max-w-5xl mx-auto mt-20 px-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Dashboard Preview"
              className="w-full h-auto rounded-xl border border-white/5 object-cover shadow-[0_0_40px_rgba(79,70,229,0.15)]"
            />
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

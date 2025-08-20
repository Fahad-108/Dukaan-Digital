// src/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

// Layouts
import DashboardLayout from "../components/layout/DashboardLayout"
import AuthLayout from "../components/layout/AuthLayout"

// Auth Pages
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"

// Dashboard
import DashboardPage from "../pages/dashboard/DashboardPage"

// Profile
import ProfilePage from "../pages/profile/ProfilePage"
import EditProfilePage from "../pages/profile/EditProfilePage"

// Products
import ProductListPage from "../pages/products/ProductListPage"
import ProductFormPage from "../pages/products/ProductFormPage"

// Sales
import SalesListPage from "../pages/sales/SalesListPage"
import AddSalePage from "../pages/sales/AddSalePage"
import SaleDetailPage from "../pages/sales/SaleDetailPage"

// Udhaar
import UdhaarListPage from "../pages/udhaar/UdhaarListPage"
import UdhaarFormPage from "../pages/udhaar/UdhaarFormPage"

import PurchaseFormPage from '../pages/purchase/PurchaseFormPage'

// Expenses
import ExpenseListPage from "../pages/expenses/ExpenseListPage"
import ExpenseFormPage from "../pages/expenses/ExpenseFormPage"

// Reports
import DailyReportPage from "../pages/reports/DailyReportPage"
import MonthlyReportPage from "../pages/reports/MonthlyReportPage"
import CustomReportPage from "../pages/reports/CustomReportPage"
import ReportHomePage from "../pages/reports/ReportHomePage"

// About
import AboutUs from "../pages/about/AboutUs"
import ContactUs from '../pages/about/ContactUs'
import PrivacyPolicy from '../pages/about/PrivacyPolicy'
import TermsAndConditions from '../pages/about/TermsAndConditions'
import AboutLayout from "./layout/AboutLayout"

export default function AppRouter() {
  return (
    <Routes>

      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AboutLayout />} >
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="termsandconditions" element={<TermsAndConditions />} />
          </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Profile */}
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit" element={<EditProfilePage />} />
          </Route>

          {/* Products */}
          <Route path="products">
            <Route index element={<ProductListPage />} />
            <Route path="new" element={<ProductFormPage mode="view" />} />
            <Route path="edit/:id" element={<ProductFormPage />} />
          </Route>

          {/* Sales */}
          <Route path="sales">
            <Route index element={<SalesListPage />} />
            <Route path="purchase" element={<ProductListPage />} />
            <Route path="new" element={<ProductListPage mode="sale" />} />
          </Route>

          <Route path="purchase">
            <Route index element={<PurchaseFormPage />} />
          </Route>

          

          {/* Udhaar */}
          <Route path="udhaar">
            <Route index element={<UdhaarListPage />} />
            <Route path="new" element={<UdhaarFormPage />} />
            <Route path="edit/:id" element={<UdhaarFormPage />} />
          </Route>

          {/* Expenses */}
          <Route path="expenses">
            <Route index element={<ExpenseListPage />} />
            <Route path="new" element={<ExpenseFormPage />} />
            <Route path="edit/:id" element={<ExpenseFormPage />} />
          </Route>

          {/* Reports */}
          <Route path="reports">
            <Route index element={<ReportHomePage />} />
            <Route path="monthly" element={<MonthlyReportPage />} />
            <Route path="custom" element={<CustomReportPage />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}
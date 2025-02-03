import { createBrowserRouter } from 'react-router-dom'

import Login from '../Pages/auth/Login'
import ForgetPassword from '../Pages/auth/ForgetPassword'
import ResetPassword from '../Pages/auth/ResetPassword'
import SendOtp from '../Pages/auth/SendOtp'

import AdminRoute from '../ProtectedRoute/AdminRoute'
import Dashboard from '../Pages/layout/Dashboard'
import DashboardHome from '../Pages/dashboardHome/DashboardHome'
import Users from '../Pages/users/Users'
import Vendors from '../Pages/vendors/Vendors'
import Bookings from '../Pages/bookings/Bookings'

// import AboutUs from '../Pages/aboutUs/AboutUs'
// import ContactUs from '../Pages/contactUs/ContactUs'
// import PrivacyPolicy from '../Pages/privacyPolicy/PrivacyPolicy'
// import TermsAndConditions from '../Pages/termsAndConditions/TermsAndConditions'
// import Profile from '../Pages/profile/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/vendors',
        element: <Vendors />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      // {
      //   path: '/privacy-policy',
      //   element: <PrivacyPolicy />,
      // },
      // {
      //   path: '/terms-and-condition',
      //   element: <TermsAndConditions />,
      // },
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/send-otp',
    element: <SendOtp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
])
export default router

import React from 'react'
import HomePage from './components/HomePage';
import Medicine from './components/Medicine.jsx'
import DoctorAppointment from './components/DoctorAppointment.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Reminder from './components/Reminder';
import Layout from './components/Layout.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/reminder",
        element: <Reminder />,
      },
      {
        path: "/book-appointment",
        element: <DoctorAppointment />,
      },
      {
        path: "/schedule-medicine",
        element: <Medicine />,
      }
    ]
    }
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

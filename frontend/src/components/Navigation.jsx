import React from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navigation = () => {

  const logout = ()=>{
    localStorage.clear();
    navigate("/login")
    
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ElderConnect</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink
                to=""
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Feeds
              </NavLink>
        </li>

        <li class="nav-item">
          <NavLink
                to="/reminder"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Reminder
              </NavLink>
        </li>

        <li class="nav-item">
          <NavLink
                to="/book-appointment"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Book Appointment
              </NavLink>
        </li>

        <li class="nav-item">
          <NavLink
                to="/schedule-medicine"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Schedule Medicine
              </NavLink>
        </li>

        <li class="nav-item">
          <NavLink
                to="/health-dashboard"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Health Dashboard
              </NavLink>
        </li>

        {

          localStorage.getItem("token")? null :
          <li class="nav-item">
          <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Signup
              </NavLink>
        </li>
        }



{

  localStorage.getItem("token") ? null :
        <li class="nav-item">
          <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? "active" : null} nav-link`
                }
              >
                Login
              </NavLink>
        </li>
}

{
  localStorage.getItem("token") ? 
  <li class="nav-item">
  <NavLink
        to="/login"
        className={({ isActive }) =>
          `${isActive ? "active" : null} nav-link`
        }
        onClick={logout}
      >
        Logout
      </NavLink>
</li> : null
}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navigation
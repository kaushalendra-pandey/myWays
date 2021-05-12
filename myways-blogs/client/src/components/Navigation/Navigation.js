import React,{useState,useContext} from 'react'
import {MainContext} from '../../Context/Context';
import {NavLink} from 'react-router-dom'

import "./Navigation.css"

const Navigation = () => {
    const {state,type} = useContext(MainContext)
    const token = typeof window ? localStorage.getItem("token") : null
    const [click, setClick] = useState(false);

    const signOutHandler = () => {
        if(typeof window){
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }

    const handleClick = () => setClick(!click);
    return (
        <>
        <nav className="navbar">
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
              MyWays Blogs &nbsp;
              <i class="fas fa-book-open"></i>
            </NavLink>
  
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              { token ? (
                <li className="nav-item">
                    <NavLink
                    to="/"
                    exact
                    activeClassName="active"
                    className="nav-links"
                    onClick={signOutHandler}
                    >
                    Sign Out
                    </NavLink>
                </li>
              ) : (
                  <>
                    <li className="nav-item">
                        <NavLink
                        exact
                        to="/signin"
                        activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                        >
                        Signin
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                        exact
                        to="/signup"
                        activeClassName="active"
                        className="nav-links"
                        >
                        Signup
                        </NavLink>
                    </li>
                </>
              )
            }
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </nav>
      </>

    )
}
    


export default Navigation

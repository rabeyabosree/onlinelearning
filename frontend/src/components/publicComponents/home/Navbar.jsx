import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaUserGraduate } from "react-icons/fa";

function Navbar() {
    const navLinks = [
        { nav: "Home", navLink: "/" },
        { nav: "About", navLink: "/about-us" },
        { nav: "Courses", navLink: "/courses" },
        { nav: "Contact", navLink: "/contact" },
    ]

  const user = JSON.parse(localStorage.getItem("user"))
  
    return (
        <header className='w-full bg-transparent py-3 px-8'>
            <div className='flex items-center justify-between gap-8 '>
                <div>
                    <h1 className='text-[30px] font-bold'>Educo<span className='text-primary text-3xl'>.</span></h1>
                </div>

                <div>
                    <nav className='flex justify-between '>
                        {navLinks.map((nav) => (
                            <NavLink
                                key={nav.nav}
                                to={nav.navLink}
                                className={({ isActive }) =>
                                    isActive
                                        ? "darkButton mx-3 hover:lightButton" // Active styles
                                        : "lightButton mx-3 hover:darkButton" // Inactive styles
                                }
                            >
                                {nav.nav}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div>
                    {user ? (
                        <Link to={user.role === 'admin' ? '/admin' : '/student'}>
                            <FaUserGraduate />
                        </Link>
                    ) : (
                        <Link to="/register">Get Started</Link>
                    )}

                </div>
            </div>

        </header>
    )
}

export default Navbar
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="nav-wrapper blue darken-3">
                <div className="container">
                    <a className="brand-logo center" href="#">Jaden Smith</a>
                    <a className="sidenav-trigger" href="#" data-target="slide-out">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
            </nav>
            <ul className="sidenav sidenav-fixed" id="slide-out">
                <li className ="nav-item"><Link to="/" className="text-white">Home</Link></li>
                <li><NavLink to="/exams" className="text-white">Exams</NavLink></li>
                <li><NavLink to="/newexam" className="text-white">Create Exam</NavLink></li>
                <li><NavLink to="/question" className="text-white">New Question</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;
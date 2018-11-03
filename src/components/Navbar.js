import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = "nav-wrapper blue darken-3">
            <div className = "container">
                <a className = "brand-logo left" href="#">Jaden Smith</a>
                <ul className="right">
                    <li className ="nav-item"><Link to="/" className="text-white">Home</Link></li>
                    <li><NavLink to="/exams" className="text-white">Exams</NavLink></li>
                    <li><NavLink to="/newexam" className="text-white">Create Exam</NavLink></li>
                    <li><NavLink to="/question" className="text-white">New Question</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
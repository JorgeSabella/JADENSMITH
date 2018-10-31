import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = "nav-wrapper blue darken-3">
            <div className = "container">
                <a className = "left brand-logo">Jaden Smith</a>
                <ul className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/exams">Exams</Link></li>
                    <li><Link to="/newexam">Create Exam</Link></li>
                    <li><Link to="/question">New Question</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = "navbar navbar-dark bg-primary">
            <a className = "navbar-brand" href="#">Jaden Smith</a>
            <div className = "">
                <ul className="navbar-nav">
                    <li className ="nav-item"><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/exams" className="text-white">Exams</Link></li>
                    <li><Link to="/newexam" className="text-white">Create Exam</Link></li>
                    <li><Link to="/question" className="text-white">New Question</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
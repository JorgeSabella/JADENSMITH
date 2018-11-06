import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="top-nav blue darken-3">
                <div className="container">
                    <a className="brand-logo left" href="#">Jaden Smith</a>
                </div>
                <ul className="sidenav sidenav-fixed" id="slide-out">
                    <li>
                        <div className="user-view center">
                            <div>
                                <img className="circle" src="img/jaden smith.jpg"/>
                            </div>
                        </div>
                    </li>
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><NavLink to="/exams" className="text-white">Exams</NavLink></li>
                    <li><NavLink to="/newexam" className="text-white">Create Exam</NavLink></li>
                    <li><NavLink to="/question" className="text-white">New Question</NavLink></li>
                </ul>
            </nav>
            <a className="top-nav sidenav-trigger full hide-on-large-only" href="#" data-target="slide-out">
                <i className="material-icons white-text">menu</i>
            </a>
        </div>
    );
}

export default Navbar;
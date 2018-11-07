import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="top-nav blue darken-3">
                <div className="nav-wrapper">
                    <a className="brand-logo left" href="#">Jaden Smith</a>
                </div>
                <a className="top-nav sidenav-trigger full hide-on-large-only" href="#" data-target="slide-out">
                    <i className="material-icons white-text">menu</i>
                </a>
            </nav>
            <ul className="sidenav sidenav-fixed" id="slide-out">
                <li>
                    <div className="user-view center">
                        <div>
                            <img className="circle" src="img/jaden smith.jpg"/>
                        </div>
                    </div>
                </li>
                <li><NavLink to="/" className="text-white"><i className="material-icons">home</i>Home</NavLink></li>
                <li><NavLink to="/exams" className="text-white"><i className="material-icons">folder</i>Exams</NavLink></li>
                <li><NavLink to="/newexam" className="text-white"><i className="material-icons">edit</i>Create Exam</NavLink></li>
                <li><NavLink to="/question" className="text-white"><i className="material-icons">add</i>New Question</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;
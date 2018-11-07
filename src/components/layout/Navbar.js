import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="top-nav transparent z-depth-0">
                <div className="nav-wrapper">
                <div className="container">
                    <a className="brand-logo left" href="#"><span className="black-text">Jaden Smith</span></a>
                </div>
                </div>
                <a className="top-nav sidenav-trigger full hide-on-large-only" href="#" data-target="slide-out">
                    <i className="material-icons white-text">menu</i>
                </a>
            </nav>
            <ul className="sidenav grey darken-4 sidenav-fixed" id="slide-out">
                <li>
                    <div className="user-view center">
                        <div>
                            <img className="" src="img/jaden.png"/>
                        </div>
                    </div>
                </li>
                <li>
                    <NavLink to="/" className="white-text">
                        <i className="material-icons amber-text lighten-1">home</i>Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/exams" className="white-text">
                        <i className="material-icons amber-text lighten-1">folder</i>Examenes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newexam" className="white-text">
                        <i className="material-icons amber-text lighten-1">edit</i>Crear Examen
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/question" className="white-text"><i className="material-icons amber-text lighten-1">add</i>Nueva Pregunta
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
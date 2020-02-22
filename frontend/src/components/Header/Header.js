import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="main-nav">
                    <ul>
                        <li>
                            <NavLink to="/">News</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
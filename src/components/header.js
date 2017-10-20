import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container-fluid">
                <button type="button" className="btn btn-success btn-login pull-right">Login</button>
                <h2 className="navbar-title">Chicago Crime Visualization</h2>
            </div>
        </nav>
    );
};

export default Header;

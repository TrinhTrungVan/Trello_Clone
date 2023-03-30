import React from "react";

import Navbar from "../Navbar";
import Search from "../Search";
import Info from "../Info";

import "./Header.scss";

const Header = () => {
    return (
        <div className='header_container'>
            <div className='wrapper'>
                <div className='logo'>
                    <i className='bx bxs-category'></i>
                    Trello
                </div>
                <Navbar />
                <div className='space'></div>
                <Search />
                <Info />
            </div>
        </div>
    );
};

export default Header;

import React from "react";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className='navbar_container'>
            <NavbarItem name='Workspaces' />
            <NavbarItem name='Recent' />
            <NavbarItem name='Starred' />
            <NavbarItem name='Temlates' />
            <button className='create'>Create</button>
        </div>
    );
};

const NavbarItem = (props) => {
    return (
        <button className='navbar_item'>
            {props.name}
            <i className='bx bx-chevron-down'></i>
        </button>
    );
};

export default Navbar;

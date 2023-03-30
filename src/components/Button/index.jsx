import React from "react";

import "./Button.scss";

const Box = (props) => {
    return (
        <button className='button_container' onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Box;

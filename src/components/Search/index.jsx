import React, { useState } from "react";

import "./Search.scss";

const Search = () => {
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };
    return (
        <div className={`search_container ${focus ? "focus" : ""}`} onFocus={handleFocus} onBlur={handleBlur}>
            <i className='bx bx-search'></i>
            <input type='text' placeholder={focus ? "Search..." : ""} />
            {!focus && <span>Search</span>}
        </div>
    );
};

export default Search;

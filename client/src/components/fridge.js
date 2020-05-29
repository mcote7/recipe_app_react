import React from 'react';
import { Link, navigate } from '@reach/router';

const goInside = () => {
    navigate('/fridge-search');
}
const fridge = () => {
    return(
    <>
<div className="bgcolor"></div>
    <div className="row">
        <div className="col door">
            <div className="circle"></div>
            <div className="fridge-main">
                <div className="row fridge-freezer">
                    <div className="note">
                        <p className="notetext">check your fridge</p>
                        <p className="notetext">search for recipies</p>
                    </div>
                    <button className="freezer-handle"></button>
                </div>
                <div className="row fridge-cooler">
                    <button className="fridge-handle" onClick={goInside}><p className="handletext">open fridge</p></button>
                    <div className="react"></div>
                </div>
                <div className="fridge-btm">
                    <p className="btmlines">||||||||||||||||||||||||||||||||||||||||||||||||||||||</p>
                </div>
            </div>
        </div>
    </div>

    <div className="back">
        <Link to='/' className="mynavlinks">main</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/fridge' className="mynavlinks">back</Link>
    </div>
    </>
    );
}

export default fridge;
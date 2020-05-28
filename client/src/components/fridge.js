import React from 'react';
import { Link, navigate } from '@reach/router';

const goInside = () => {
    navigate('/fridge-search');
}
const fridge = () => {
    return(
    <>
<div className="bgimage"></div>
<div className="bgcolor"></div>
    <div className="row">
        <div className="col door">
            <div className="fridge-main">
                <div className="row fridge-freezer">
                    <p>check your fridge</p>
                    <p>search for recipies</p>
                </div>
                <div className="row fridge-cooler">
                    <button className="fridge-handle" onClick={goInside}>open fridge</button>
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
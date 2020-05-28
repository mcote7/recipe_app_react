import React from 'react';
import { navigate } from '@reach/router';

const goInside = () => {
    navigate('/fridge');
}
const main = () => {
    return(
        <div className="row">
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
    );
}

export default main;
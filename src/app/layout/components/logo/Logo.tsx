import React from 'react'
import { NavLink } from 'react-router-dom';
import './Logo.css';
import icon from  '../../img/SpiritusIcon2.JPG';

function Logo() {
    var imageName = require('../../img/SpiritusIcon.PNG')
    return (
        <div className="l-item">
            <img src={icon}  />
             <a href={`/`}>Spiritus</a>
        </div>
    )
}

export default Logo

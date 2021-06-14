import React from 'react'
interface Props {
    name:string;
}

function NavItem({name}: Props) {
    const nameLower = name.toLowerCase();
    return (
        <div className="NavItem">
            <a href={`/${nameLower}`}>{name}</a>
        </div>
    )
}

export default NavItem

import React from 'react';
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

function SpiritusFilters() {
    return (
        <>
       <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Spiritus' />
            <Menu.Item content="My Spiritus" />
            <Menu.Item content="Spiritus I'm following" />
       </Menu>
       <Header />
       <Calendar />

       </>
    )
}

export default SpiritusFilters

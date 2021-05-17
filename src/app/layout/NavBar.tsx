
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



function NavBar() {

    return (

        <Menu inverted fixed="top" class>
                <Container>
                    <Menu.Item as={NavLink} to='/' exact header>
                        <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                       Spiritus
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/spiritus' name='Spiritus List'/>
                    <Menu.Item>
                        <Button as={NavLink} to='/createActivity'  positive content="Create Spiritus"/>
                    </Menu.Item>
                </Container>
        </Menu>
    )
}

export default NavBar

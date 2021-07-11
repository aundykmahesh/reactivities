import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, Container } from "semantic-ui-react";


export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact>
                    <img src="/assets/logo.png" alt="logo"  style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' exact name="Activities" />
                <Menu.Item as={NavLink} to='/Errors' exact name="Errors" />
                <Menu.Item as={NavLink} to='/createactivity'>
                    <Button positive content="Create Activity" ></Button>
                </Menu.Item>
            </Container>

        </Menu>
    )
}
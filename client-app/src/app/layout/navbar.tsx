import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Button, Container, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
    const { userstore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' exact name="Activities" />
                <Menu.Item as={NavLink} to='/Errors' exact name="Errors" />
                <Menu.Item as={NavLink} to='/createactivity'>
                    <Button positive content="Create Activity" ></Button>
                </Menu.Item>
                {userstore.user &&
                    <Menu.Item position='right'>
                        <Image src={userstore.user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={userstore.user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${userstore.user?.userName}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={userstore.logout} text='Logout' icon='power' />
                            </Dropdown.Menu>

                        </Dropdown>
                    </Menu.Item>
                }

            </Container>

        </Menu>
    )
})
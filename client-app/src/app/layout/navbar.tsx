import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";

interface Props{
    formOpen : () => void;
}

export default function NavBar({formOpen} : Props) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo"  style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={formOpen}></Button>
                </Menu.Item>
            </Container>

        </Menu>
    )
}
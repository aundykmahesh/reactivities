import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default function NavBar() {
    const{activitystore} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo"  style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activitystore.openForm()}></Button>
                </Menu.Item>
            </Container>

        </Menu>
    )
}
import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../app/stores/store";

export default observer (function ServerError() {
    const {commonstore} = useStore();

    return(
        <Container>
            <Header as="h1" content="Server Error"/>
            <Header sub as="h5" color="red" content={commonstore.error?.message} />
            {commonstore.error?.details &&
                <Segment>
                    <Header as="h4" content="Stack trace" color="teal" />
                    <code style={{marginTop: '10px'}}>{commonstore.error?.details}</code>
                </Segment>
            }
        </Container>
    )
})
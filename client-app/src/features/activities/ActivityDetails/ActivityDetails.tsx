import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer (function ActivityDetails () {
    const {activitystore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activitystore;
    ///this is just to handle case of null, loading component does nothing
    if(!activity) return <LoadingComponenet />;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}></Image>
            <Card.Content>
                <Card.Header>{activity.date}</Card.Header>
                <Card.Meta>
                    <span>{activity.title}</span>
                </Card.Meta>
                <Card.Description> 
                    {activity.description}
                </Card.Description> 

            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'> 
                    <Button onClick={() => {openForm(activity.id)}} basic color="blue" content="Edit"></Button>
                    <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props {
    activity: Activity;
    cancelActivity: () => void;
    formOpen : (id : string) => void;
}

export default function ActivityDetails ({ activity, cancelActivity, formOpen }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}></Image>
            <Card.Content>
                <Card.Header>{activity.date}</Card.Header>
                <Card.Meta>
                    <span>{activity.title}</span>
                </Card.Meta>
                <Card.Description> ̰
                    {activity.description}
                </Card.Description> ̰

            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'> 
                    <Button onClick={() => {formOpen(activity.id)}} basic color="blue" content="Edit"></Button>
                    <Button onClick={cancelActivity} basic color="grey" content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
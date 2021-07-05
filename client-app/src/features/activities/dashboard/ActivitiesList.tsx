import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function ActivityList(){

    const [target, setTarget] = useState('');
    const {activitystore} = useStore();

    const {submitting, deleteActivity, activitiesByDate} = activitystore;

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='view' color='blue'></Button>
                                {/* <Button onClick={() => {activitystore.selectActivity(activity.id)}} floated='right' content='view' color='blue'></Button> */}
                                <Button onClick={(e) => {handleActivityDelete(e,activity.id)}}
                                    name = {activity.id}
                                    loading={submitting && target===activity.id}
                                    floated='right' 
                                    content='Delete' 
                                    color='red'></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
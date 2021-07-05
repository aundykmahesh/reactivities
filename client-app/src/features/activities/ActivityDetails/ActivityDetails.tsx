import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer (function ActivityDetails () {
    const {activitystore} = useStore();
    const {selectedActivity: activity, loadActivity, loading} = activitystore;
    //get if from url params - query string
    const {id}= useParams<{id:string}>();
    useEffect(() => {
        if(id){
            loadActivity(id);
        }
    }, [id,loadActivity]);
    ///this is just to handle case of null, loading component does nothing
    if(loading || !activity) return <LoadingComponenet />;
    
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
                    <Button basic color="blue" content="Edit" as={NavLink} to={`/manage/${activity.id}`}></Button>
                    <Button  basic color="grey" content="Cancel" as={NavLink} to='/activities' exact></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})
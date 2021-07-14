import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSideBar";


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
    if(loading || !activity) return <LoadingComponenet content='loading activities...'/>;
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo  activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})
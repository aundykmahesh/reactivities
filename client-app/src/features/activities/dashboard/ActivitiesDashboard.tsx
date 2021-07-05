import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivitiesList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponenet from "../../../app/layout/loadingComponent";


export default observer(function ActivityDashboard() {

    const { activitystore } = useStore();
    const {loadActivities,activityRegistry} = activitystore;


    useEffect(() => {
        if(activityRegistry.size <=1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    if (activitystore.loading) return <LoadingComponenet content='Loading app......' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                />
            </Grid.Column>
            <Grid.Column width='6'>
              <h2>Activity Filter comes here </h2> 
            </Grid.Column>
        </Grid>
    )
})
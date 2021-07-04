import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivitiesList";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ActivityForm from "../form/ActivityFom";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer( function ActivityDashboard() {

    const {activitystore} = useStore();
    const {selectedActivity, editMode} = activitystore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&//this will check for null left hand side
                    <ActivityDetails />}
                    {editMode && 
                        <ActivityForm />
                    }
            </Grid.Column>
        </Grid>
    )
})
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityList from "./ActivitiesList";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ActivityForm from "../form/ActivityFom";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode : boolean;
    formOpen : (id: string) => void;
    formClose : ()=> void;  
    formSubmit : (activity:Activity) => void;
    deleteActivity : (id:string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, deleteActivity,
        selectActivity, cancelActivity, editMode, formOpen, formClose,formSubmit }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities} 
                    selectActivity={selectActivity}
                    cancelActivity={cancelActivity}
                    deleteActivity = {deleteActivity}

                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&//this will check for null left hand side
                    <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} 
                        formOpen = {formOpen}                        
                        ></ActivityDetails>}
                    {editMode && 
                        <ActivityForm formClose={formClose} formSubmit={formSubmit} activity = {selectedActivity}/>
                    }
                {/* <ActivityForm></ActivityForm> */}
            </Grid.Column>
        </Grid>
    )
}
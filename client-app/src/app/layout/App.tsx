import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';

export default function App() {

  const [activities, setactivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);


  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      setactivities(response.data);
    })
  }, [])



  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id ===id));
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }
  //Edit or create form
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleFormSubmit(activity: Activity) {
    //like remove from filter and add activities for edit 
    activity.id ?
      setactivities([...activities.filter(x=>x.id!==activity.id),activity])
      : setactivities([...activities,{...activity, id:uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function deleteActivity(id:string){
    setactivities([...activities.filter(x=>x.id !==id)])
  }

  return (
    <>
      <NavBar formOpen={handleFormOpen}></NavBar>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          formSubmit={handleFormSubmit}
          deleteActivity = {deleteActivity}
        />
      </Container>


    </>
  );
}




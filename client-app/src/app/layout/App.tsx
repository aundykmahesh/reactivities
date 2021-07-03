import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponenet from './loadingComponent';

export default function App() {

  const [activities, setactivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState<boolean>(false);

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activty: Activity[] = [];

      response.forEach(element => {
        element.date = element.date.split('T')[0];
        activty.push(element);
      });
      setactivities(activty);
      setLoading(false);
    })
  }, [])



  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
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
    setIsSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setactivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setIsSubmitting(false);
      }
      );
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setactivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setIsSubmitting(false);
      });

    }


    //like remove from filter and add activities for edit 
    // activity.id ?
    //   setactivities([...activities.filter(x=>x.id!==activity.id),activity])
    //   : setactivities([...activities,{...activity, id:uuid()}]);
    //   setEditMode(false);
    //   setSelectedActivity(activity);
  }

  function deleteActivity(id: string) {
    setIsSubmitting(true);
    id && 
      agent.Activities.delete(id).then(() => {
        setactivities([...activities.filter(x => x.id !== id)])
        setIsSubmitting(false)
      }
      );
  }

  if (loading) return <LoadingComponenet content='Loading app......' />

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
          deleteActivity={deleteActivity}
          submitting={isSubmitting}
        />
      </Container>


    </>
  );
}




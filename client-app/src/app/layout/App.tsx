import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import LoadingComponenet from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activitystore} = useStore();

  useEffect(() => {
    activitystore.loadActivities();
  }, [activitystore])

  if (activitystore.loading) return <LoadingComponenet content='Loading app......' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
        />
      </Container>


    </>
  );
}
//add mobx observer to make it an observer, else cant write back to state variables
export default observer(App);


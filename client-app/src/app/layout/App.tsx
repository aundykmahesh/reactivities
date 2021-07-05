import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityFom from '../../features/activities/form/ActivityFom';
import ActivityDetails from '../../features/activities/ActivityDetails/ActivityDetails';

function App() {
  //this will be used to add keu to the create / edit route path. without this key, useeffect wont fire in activityform as both id and loadactivity wont change
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createactivity", "/manage/:id"]} component={ActivityFom} />
            </Container>
          </>
        )}
      />

    </>
  );
}
//add mobx observer to make it an observer, else cant write back to state variables
export default observer(App);


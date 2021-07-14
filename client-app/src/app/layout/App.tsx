import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityFom from '../../features/activities/form/ActivityFom';
import ActivityDetails from '../../features/activities/ActivityDetails/ActivityDetails';
import TestErrors from '../../Errors/TestingError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Errors/NotFound';
import ServerError from '../../Errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponenet from './loadingComponent';

function App() {
  //this will be used to add keu to the create / edit route path. without this key, useeffect wont fire in activityform as both id and loadactivity wont change
  const location = useLocation();
  const {userstore, commonstore} = useStore();

  useEffect(() => {
   if(commonstore.token){
     userstore.getUser().finally(() => commonstore.setAppLoaded());
   }
   else{
     commonstore.setAppLoaded();
   }
  }, [commonstore,userstore])

  if(commonstore.apploaded) <LoadingComponenet content='loading app....' />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createactivity", "/manage/:id"]} component={ActivityFom} />
              <Route path="/Errors" component={TestErrors} />
              <Route path="/server-error" component={ServerError} />
              <Route path="/login" component={LoginForm} />

              <Route component={NotFound} />
              </Switch>
              
            </Container>
          </>
        )}
      />

    </>
  );
}
//add mobx observer to make it an observer, else cant write back to state variables
export default observer(App);


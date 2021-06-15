
import { Container } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navBar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  return (
    < >
      <Route exact path='/' component={HomePage} />
      <Route
      path={'/(.+)'}
      render={() =>(
        <>
          <NavBar/>
     <Container style={{marginTop: '7em'}} >
      <Route exact path='/stories' component={ActivityDashboard} />
      <Route  path='/spiritus/:id' component={ActivityDetails} />
      <Route key={location.key}  path={['/createActivity', '/manage/:id']} component={ActivityForm} />
     </Container>
        </>
      )}
      />
     
      
    </>
  );
}

export default observer(App);

import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Container } from './components/Container/Container';
import Appbar from "./components/AppBar/AppBar";
import { HomePage } from "./components/HomePage/HomePage";
import { MoviesPage } from "./views/MoviesPage";
import { MovieDetailsPage } from './components/MovieDetailsPage/MovieDetailsPage';

function App() {
  return (
    <>
      <Container>
        <Appbar />
        
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
          <Redirect to='/' />
        </Switch>

        <ToastContainer autoClose={2000} theme={ 'dark'}/>

      </Container>
    </>
  );
}

export default App;

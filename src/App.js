import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from "react-loader-spinner";

import { Container } from './components/Container/Container';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.js' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movies-details-page" */));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.js' /* webpackChunkName: "notfound-page" */));
const Appbar = lazy(() => import('./components/AppBar/AppBar' /* webpackChunkName: "appbar" */));

function App() {
  return (
    <>
      <Container>
        
        <Suspense fallback={<div style={{display: 'flex', height:'100vh', justifyContent: 'center', alignItems:'center'}}>
          <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000} 
        /></div>}>
          <Appbar />
          <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
            {/* <Route>
              <NotFoundPage/>
            </Route> */}
          <Redirect to='/' />
        </Switch>
        </Suspense>

        <ToastContainer autoClose={2000} theme={ 'dark'}/>

      </Container>
    </>
  );
}

export default App;

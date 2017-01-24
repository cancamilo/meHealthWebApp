import Base from 'Base';
import HomePage from 'HomePage';
import LoginPage from 'LoginPage';
import SignUpPage from 'SignUpPage';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;

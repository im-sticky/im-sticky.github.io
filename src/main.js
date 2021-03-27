import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {About} from 'pages/About';
import {Footer} from 'pages/Footer';
import {NotFound} from 'pages/NotFound';
import {BlogList} from 'pages/Blog/List';

import './theme/main.scss';

// load all favicon related assets so files are processed by webpack
function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/favicon', false, /\.(png|svg|jpe?g|gif|xml|ico|webmanifest)$/));


const Main = ({}) => {
  return <Router>
    <Switch>
      <Route exact path='/blog/:slug'>

        <Footer />
      </Route>

      <Route exact path='/blog'>
        <BlogList />
        <Footer />
      </Route>

      <Route exact path='/'>
        <About />
        <Footer />
      </Route>

      <Route path='*'>
        <NotFound />
        <Footer />
      </Route>
    </Switch>
  </Router>;
};

ReactDOM.render(React.createElement(Main), document.querySelector('#app-root'));
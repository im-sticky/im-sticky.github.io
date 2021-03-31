import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Page} from 'components/Page';
import {About} from 'pages/About';
import {NotFound} from 'pages/NotFound';
import {BlogList} from 'pages/Blog/List';
import {BlogPost} from 'pages/Blog/Post';

import './theme/main.scss';

// load all favicon related assets so files are processed by webpack
function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/favicon', false, /\.(png|svg|jpe?g|gif|xml|ico|webmanifest)$/));


const Main = ({}) => {
  return <Router>
    <Switch>
      <Route exact path='/blog/:slug' render={props =>
        <Page title='Blog'>
          <BlogPost />
        </Page>} />

      <Route exact path='/blog' render={props =>
        <Page title='Blog'>
          <BlogList />
        </Page>} />

      <Route exact path='/' render={props =>
        <Page title='Home'>
          <About />
        </Page>} />

      <Route path='*' render={props =>
        <Page title='Not Found'>
          <NotFound />
        </Page>} />
    </Switch>
  </Router>;
};

ReactDOM.render(React.createElement(Main), document.querySelector('#app-root'));
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'mtg-card-seer';

import {ScrollToTop} from 'components/ScrollToTop';
import {Page} from 'components/Page';
import {About} from 'pages/About';
import {NotFound} from 'pages/NotFound';
import {BlogList} from 'pages/Blog/List';
import {BlogPost} from 'pages/Blog/Post';

import './theme/main.scss';

// load all image assets so files are processed by webpack
function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/favicon', false, /\.(png|svg|jpe?g|gif|xml|ico|webmanifest)$/));
importAll(require.context('./assets/blog', false, /\.(png|svg|jpe?g|gif|dec)$/));


const Main = ({}) => {
  return <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path='/blog/:slug' render={props =>
          <Page>
            <BlogPost />
          </Page>} />

        <Route exact path='/blog/page/:page' render={props =>
          <Page title='Blog' description="List page for all of Alex's blog posts.">
            <BlogList />
          </Page>} />

        <Route exact path='/blog' render={props =>
          <Page title='Blog' description="List page for all of Alex's blog posts.">
            <BlogList />
          </Page>} />

        <Route exact path='/' render={props =>
          <Page title='Home' description="Portfolio website of Alex Craig.">
            <About />
          </Page>} />

        <Route path='*' render={props =>
          <Page title='Not Found' description="404 This page does not exist.">
            <NotFound />
          </Page>} />
      </Switch>
    </ScrollToTop>
  </Router>;
};

ReactDOM.render(React.createElement(Main), document.querySelector('#app-root'));
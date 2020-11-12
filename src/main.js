import React from 'react';
import ReactDOM from 'react-dom';

import {About} from 'pages/About';
import {Footer} from 'pages/Footer';

import './theme/main.scss';

// load all favicon related assets so files are processed by webpack
function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/favicon', false, /\.(png|svg|jpe?g|gif|xml|ico|webmanifest)$/));


const Main = ({}) => {
  return <>
    <About />
    <Footer />
  </>;
};

ReactDOM.render(React.createElement(Main), document.querySelector('#app-root'));
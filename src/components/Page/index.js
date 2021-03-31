import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Footer} from 'pages/Footer';

export const Page = ({title, children}) => {
  useEffect(() => {
    document.title = `Alex Craig | ${title}`;
  }, [title]);

  return <>
    {children}
    <Footer />
  </>;
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};
import React from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {Footer} from 'pages/Footer';
import {useTitle, useDescription, useShareImage, usePathname} from 'hooks/metadata';

export const Page = ({title, description, shareImage, children}) => {
  const {pathname} = useLocation();

  useTitle(title);
  useDescription(description);
  useShareImage(shareImage);
  usePathname(pathname);

  return <>
    {children}
    <Footer />
  </>;
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  description: PropTypes.string,
  shareImage: PropTypes.string,
  title: PropTypes.string,
};
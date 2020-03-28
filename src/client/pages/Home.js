import React, { useState, useEffect } from 'react';
// Import Material UI Components
import { Container } from '@material-ui/core';
// Import Material UI CSS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

function Home() {
  const classes = useStyles();

  return <Container>Home</Container>;
}

export default Home;

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
// Import the App component
import { App } from '../../client/App';
// Import the theme
import { theme } from '../../client/styles/theme';

function Main() {
  // The inital data
  const initialData = window.__R_DATA.initialData;

  // Upon component mount, remove the inital server-side renderd css
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App initialData={initialData} />
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

ReactDOM.hydrate(<Main />, document.getElementById('root'));

// Enable client-side HMR
if (module.hot) {
  module.hot.accept();
}

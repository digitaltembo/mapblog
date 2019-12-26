import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const white = '#fff';
const black = '#000';


/* global styles for app */
import './styles/app.scss';

const theme = createMuiTheme({
	palette: {
	  primary1Color: '#ff6b6b',
  	primary2Color: '#ff9d99',
  	primary3Color: '#c73840',
  	accent1Color: '#d81b60',
  	accent2Color: '#ff5c8d',
  	accent3Color: '#a00037',
  	textColor: grey[900],
  	alternateTextColor: white,
  	canvasColor: white,
  	borderColor: grey[300],
  	disabledColor: grey[700],
  	pickerHeaderColor: '#ff9d99',
  	clockCircleColor: grey[700],
  	shadowColor: black
  }
});

const App  = ({children}) => (
  <ThemeProvider theme={theme}>
    <section>
      <div
        className="container"
        style={{ marginTop: 10, paddingBottom: 250 }}
      >
        {children}
      </div>
    </section>
  </ThemeProvider>
);

export { App };

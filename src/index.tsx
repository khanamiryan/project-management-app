import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { createTheme, ThemeProvider } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import LinkRouter from './utils/LinkRouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkRouter,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkRouter,
      },
    },
  },
  palette: {
    primary: {
      main: '#233456',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#334561',
      contrastText: '#fafafa',
    },
  },
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store({})}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

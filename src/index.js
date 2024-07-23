import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";

console.log('index.js: All modules imported successfully');

const logProviderRender = (ProviderComponent, name) => {
  return ({ children }) => {
    console.log(`index.js: Rendering ${name}`);
    return <ProviderComponent>{children}</ProviderComponent>;
  };
};

const LoggedProductProvider = logProviderRender(ProductProvider, 'ProductProvider');
const LoggedCartProvider = logProviderRender(CartProvider, 'CartProvider');
const LoggedAuthContextProvider = logProviderRender(AuthContextProvider, 'AuthContextProvider');

console.log('index.js: Providers created');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
console.log('index.js: Root element found:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('index.js: Root created');

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Router>
          <LoggedProductProvider>
            <LoggedCartProvider>
              <LoggedAuthContextProvider>
                <App/>
              </LoggedAuthContextProvider>
            </LoggedCartProvider>
          </LoggedProductProvider>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log('index.js: Render method called');
} else {
  console.error('index.js: Root element not found');
}


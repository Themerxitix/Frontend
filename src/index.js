import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";

console.log('All modules imported successfully');

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

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root element found:', root);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <ProductProvider>
          <CartProvider>
            <AuthContextProvider>
              <App/>
            </AuthContextProvider>
          </CartProvider>
        </ProductProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('Render method called');


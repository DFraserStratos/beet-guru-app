import { Component } from 'react';

/**
 * Error boundary component that catches JS errors in children
 * and displays a fallback UI instead of crashing
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;
    
    if (hasError) {
      // Render custom fallback UI if provided
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(error, errorInfo) 
          : fallback;
      }
      
      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md my-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-3">
            There was an error loading this part of the application.
          </p>
          <button 
            className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

import React from 'react';

/**
 * Error boundary component to catch JavaScript errors
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white rounded-xl shadow p-6 my-4">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-700 mb-4">
            The application encountered an error. Please try refreshing the page or contact support if the problem persists.
          </p>
          <details className="bg-gray-50 p-4 rounded-lg">
            <summary className="cursor-pointer text-gray-600 font-medium mb-2">Error Details</summary>
            <pre className="whitespace-pre-wrap text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-auto max-h-96">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
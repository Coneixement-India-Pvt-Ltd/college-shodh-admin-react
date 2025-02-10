import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className="text-center text-red-500 p-10">
          Something went wrong. Please try again.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

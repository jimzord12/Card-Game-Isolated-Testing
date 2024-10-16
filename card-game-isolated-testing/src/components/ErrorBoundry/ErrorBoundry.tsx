import React from "react";
import ErrorPage from "../../pages/Error/ErrorPage";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("(Error Boundry): Uncaught error:", error, errorInfo);

    window.location.replace(window.location.origin); // ✨ Uncomment after testing this line to refresh the page

    // alert("An error occurred. Please refresh the page.");
  }

  render() {
    if (this.state.hasError) {
      console.log("An error occurred. Please refresh the page.");
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

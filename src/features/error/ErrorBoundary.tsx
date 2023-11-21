import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ApplicationError, ErrorSeverity } from './ApplicationError';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent: ReactNode | null;
}

interface ErrorBoundaryState {
  message: string | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { message: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logError(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.message !== null) {
        return this.props.fallbackComponent ?
            this.props.fallbackComponent : <p>{this.state.message}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

function logError(error: Error, errorInfo: ErrorInfo) {
    console.error(`Encountered error: ${error}\n${errorInfo}`);
}
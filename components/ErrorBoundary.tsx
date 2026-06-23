"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[40vh] items-center justify-center p-6">
          <div className="max-w-md w-full text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-6">

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-2">
              Something went wrong
            </h2>

            {/* Message */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 wrap-break-word">
              {this.state.error?.message || "Unexpected error occurred"}
            </p>

            {/* Action */}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition active:scale-95"
            >
              <RefreshCcw className="w-4 h-4" />
              Try again
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
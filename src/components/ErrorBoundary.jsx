import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-mami-soft-cyan">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#CFEFF3] p-8 text-center shadow-lg space-y-4">
            <h1 className="text-2xl font-extrabold text-[#0B3566]">Something went wrong</h1>
            <p className="text-sm text-[#60758A]">Please try again or return to the homepage.</p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-full border border-[#CFEFF3] text-[#0B3566] font-semibold text-sm cursor-pointer"
              >
                Try Again
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false })}
                className="px-5 py-2.5 rounded-full bg-mami-gradient text-white font-semibold text-sm"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


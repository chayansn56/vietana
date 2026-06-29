import React, { Component, ErrorInfo, ReactNode } from 'react';
import Icon from './Icon';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public props: Props;
  
  constructor(props: Props) {
    super(props);
    this.props = props;
  }
  
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 bg-black border border-white/10 rounded-xl text-center shadow-md max-w-sm mx-auto my-8">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-3">
            <Icon name="AlertCircle" size={20} />
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Service Unavailable</h2>
          <p className="text-xs text-white/60 mb-4 px-2">
            This section is temporarily down. Need immediate help? Contact support at <strong>+91 9953294543</strong> / <strong>+84 902434006</strong> or <strong>support@vietana.com</strong>.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 bg-white/10 text-white font-medium rounded-lg text-xs hover:bg-white/20 transition-colors border border-white/10"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

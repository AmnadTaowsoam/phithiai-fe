'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  children: React.ReactNode;
  title?: string;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Unexpected error',
    };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-ivory">
        <h2 className="text-lg font-semibold">{this.props.title ?? 'Something went wrong'}</h2>
        <p className="mt-2 text-sm text-ivory/70">{this.state.message}</p>
        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => this.setState({ hasError: false, message: undefined })}
          >
            Retry
          </Button>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }
}


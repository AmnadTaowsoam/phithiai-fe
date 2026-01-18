'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class PlanningErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-ivory">
        <h2 className="text-lg font-semibold">Planning tools unavailable</h2>
        <p className="mt-2 text-sm text-ivory/70">{this.state.message}</p>
        <div className="mt-4">
          <Button
            onClick={() => {
              this.setState({ hasError: false, message: undefined });
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }
}


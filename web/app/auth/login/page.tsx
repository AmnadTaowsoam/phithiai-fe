import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-6xl items-center px-6 py-16">
      <Suspense fallback={<div className="text-ivory/70">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login as loginApi, type AuthSession } from '@/lib/api/auth';
import { setClientAuthTokens } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/dashboard';

  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginValues, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => values.email.trim().length > 0 && values.password.length > 0, [values]);

  const handleChange = (key: keyof LoginValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof LoginValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LoginValues | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const session: AuthSession = await loginApi(parsed.data);
      setClientAuthTokens(session.accessToken, session.refreshToken);
      router.replace(nextPath);
      router.refresh();
    } catch (error: any) {
      setSubmitError(error?.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-ivory/15 bg-background/70 shadow-subtle">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue planning your ceremony.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => handleChange('email')(e.target.value)}
              placeholder="you@example.com"
            />
            {fieldErrors.email ? <p className="text-sm text-red-300">{fieldErrors.email}</p> : null}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/reset-password" className="text-sm text-brand-200 hover:text-brand-100">
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(e) => handleChange('password')(e.target.value)}
              placeholder="••••••••"
            />
            {fieldErrors.password ? <p className="text-sm text-red-300">{fieldErrors.password}</p> : null}
          </div>

          {submitError ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}

          <Button type="submit" disabled={!canSubmit || loading} className="w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <p className="text-center text-sm text-ivory/60">
            New to phithiai?{' '}
            <Link href="/auth/register" className="text-brand-200 hover:text-brand-100">
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};


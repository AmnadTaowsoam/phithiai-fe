'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset, resetPassword } from '@/lib/api/auth';

const emailSchema = z.object({ email: z.string().email('Please enter a valid email') });
const resetSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canRequest = useMemo(() => email.trim().length > 3, [email]);
  const canReset = useMemo(() => password.length >= 8 && confirmPassword.length >= 1, [password, confirmPassword]);

  const handleRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    const parsed = emailSchema.safeParse({ email });
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message ?? 'Invalid email');
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset({ email: parsed.data.email });
      setEmailSent(true);
      setEmailError(null);
    } catch (error: any) {
      setSubmitError(error?.message ?? 'Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    const parsed = resetSchema.safeParse({ password, confirmPassword });
    if (!parsed.success) {
      const nextErrors: { password?: string; confirmPassword?: string } = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as 'password' | 'confirmPassword' | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setFieldErrors(nextErrors);
      return;
    }

    if (!token) {
      setSubmitError('Reset token is missing.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, newPassword: parsed.data.password });
      router.replace('/auth/login');
    } catch (error: any) {
      setSubmitError(error?.message ?? 'Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    return (
      <Card className="mx-auto w-full max-w-md border-ivory/15 bg-background/70 shadow-subtle">
        <CardHeader>
          <CardTitle>Set a new password</CardTitle>
          <CardDescription>Choose a strong password to secure your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
              />
              {fieldErrors.password ? <p className="text-sm text-red-300">{fieldErrors.password}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
              />
              {fieldErrors.confirmPassword ? (
                <p className="text-sm text-red-300">{fieldErrors.confirmPassword}</p>
              ) : null}
            </div>

            {submitError ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}

            <Button type="submit" disabled={!canReset || loading} className="w-full">
              {loading ? 'Saving…' : 'Save password'}
            </Button>

            <p className="text-center text-sm text-ivory/60">
              <Link href="/auth/login" className="text-brand-200 hover:text-brand-100">
                Back to login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md border-ivory/15 bg-background/70 shadow-subtle">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>We’ll email you a reset link if your account exists.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequest} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              autoComplete="email"
            />
            {emailError ? <p className="text-sm text-red-300">{emailError}</p> : null}
          </div>

          {emailSent ? (
            <p className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3 text-sm text-brand-100">
              Check your inbox for a reset link.
            </p>
          ) : null}

          {submitError ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}

          <Button type="submit" disabled={!canRequest || loading} className="w-full">
            {loading ? 'Sending…' : 'Send reset link'}
          </Button>

          <p className="text-center text-sm text-ivory/60">
            <Link href="/auth/login" className="text-brand-200 hover:text-brand-100">
              Back to login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};


'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register as registerApi, type AuthSession } from '@/lib/api/auth';
import { setClientAuthTokens } from '@/lib/auth';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type RegisterValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const [values, setValues] = useState<RegisterValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterValues, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () =>
      values.firstName.trim() &&
      values.lastName.trim() &&
      values.email.trim() &&
      values.password.length >= 8 &&
      values.confirmPassword.length >= 1,
    [values],
  );

  const handleChange = (key: keyof RegisterValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof RegisterValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof RegisterValues | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const session: AuthSession = await registerApi({
        email: parsed.data.email,
        password: parsed.data.password,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        role: 'BUYER',
      });
      setClientAuthTokens(session.accessToken, session.refreshToken);
      router.replace('/dashboard');
      router.refresh();
    } catch (error: any) {
      setSubmitError(error?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-ivory/15 bg-background/70 shadow-subtle">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Start planning with trusted vendors and phithiai guidance.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={values.firstName}
                onChange={(e) => handleChange('firstName')(e.target.value)}
                autoComplete="given-name"
              />
              {fieldErrors.firstName ? <p className="text-sm text-red-300">{fieldErrors.firstName}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={values.lastName}
                onChange={(e) => handleChange('lastName')(e.target.value)}
                autoComplete="family-name"
              />
              {fieldErrors.lastName ? <p className="text-sm text-red-300">{fieldErrors.lastName}</p> : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email')(e.target.value)}
              autoComplete="email"
            />
            {fieldErrors.email ? <p className="text-sm text-red-300">{fieldErrors.email}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={values.password}
              onChange={(e) => handleChange('password')(e.target.value)}
              autoComplete="new-password"
            />
            {fieldErrors.password ? <p className="text-sm text-red-300">{fieldErrors.password}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => handleChange('confirmPassword')(e.target.value)}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword ? (
              <p className="text-sm text-red-300">{fieldErrors.confirmPassword}</p>
            ) : null}
          </div>

          {submitError ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}

          <Button type="submit" disabled={!canSubmit || loading} className="w-full">
            {loading ? 'Creating account…' : 'Create account'}
          </Button>

          <p className="text-center text-sm text-ivory/60">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-200 hover:text-brand-100">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};


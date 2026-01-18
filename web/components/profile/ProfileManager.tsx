'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuthUser } from '@/lib/api/auth';
import { updateMe, changePassword } from '@/lib/api/users';
import { clearClientAuthTokens, getClientAccessToken } from '@/lib/auth';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().min(5, 'Phone looks too short').optional().or(z.literal('')),
  avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ProfileManagerProps = {
  user: AuthUser;
};

export const ProfileManager = ({ user }: ProfileManagerProps) => {
  const router = useRouter();

  const [profileValues, setProfileValues] = useState({
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    phone: user.phone ?? '',
    avatar: user.avatar ?? '',
  });
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<keyof typeof passwordValues, string>>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const accessToken = getClientAccessToken();

  const canSaveProfile = useMemo(
    () => Boolean(profileValues.firstName.trim() && profileValues.lastName.trim()),
    [profileValues],
  );

  const onSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    if (!accessToken) {
      setProfileError('You are not signed in.');
      return;
    }

    const parsed = profileSchema.safeParse(profileValues);
    if (!parsed.success) {
      setProfileError(parsed.error.issues[0]?.message ?? 'Invalid profile data.');
      return;
    }

    setProfileLoading(true);
    try {
      await updateMe(accessToken, {
        firstName: profileValues.firstName.trim(),
        lastName: profileValues.lastName.trim(),
        phone: profileValues.phone.trim() || undefined,
        avatar: profileValues.avatar.trim() || undefined,
      });
      setProfileSuccess('Profile updated.');
      router.refresh();
    } catch (error: any) {
      setProfileError(error?.message ?? 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const onChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    setPasswordErrors({});
    if (!accessToken) {
      setPasswordError('You are not signed in.');
      return;
    }

    const parsed = passwordSchema.safeParse(passwordValues);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof typeof passwordValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof typeof passwordValues | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setPasswordErrors(nextErrors);
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(accessToken, {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      });
      setPasswordValues({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordSuccess('Password updated.');
    } catch (error: any) {
      setPasswordError(error?.message ?? 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const onLogout = () => {
    clearClientAuthTokens();
    router.replace('/auth/login');
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-ivory">Your profile</h1>
        <p className="text-ivory/60">Manage your account details and security settings.</p>
      </div>

      <Card className="border-ivory/15 bg-background/70 shadow-subtle">
        <CardHeader>
          <CardTitle>Profile details</CardTitle>
          <CardDescription>Keep your name and contact info up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSaveProfile} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={profileValues.firstName}
                  onChange={(e) => setProfileValues((p) => ({ ...p, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={profileValues.lastName}
                  onChange={(e) => setProfileValues((p) => ({ ...p, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email (read-only)</Label>
                <Input id="email" value={user.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileValues.phone}
                  onChange={(e) => setProfileValues((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={profileValues.avatar}
                onChange={(e) => setProfileValues((p) => ({ ...p, avatar: e.target.value }))}
                placeholder="https://…"
              />
            </div>

            {profileError ? (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {profileError}
              </p>
            ) : null}
            {profileSuccess ? (
              <p className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3 text-sm text-brand-100">
                {profileSuccess}
              </p>
            ) : null}

            <div className="flex items-center justify-between">
              <Button type="submit" disabled={!canSaveProfile || profileLoading}>
                {profileLoading ? 'Saving…' : 'Save changes'}
              </Button>
              <Button type="button" variant="ghost" onClick={onLogout}>
                Sign out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-ivory/15 bg-background/70 shadow-subtle">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onChangePassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordValues.currentPassword}
                onChange={(e) => setPasswordValues((p) => ({ ...p, currentPassword: e.target.value }))}
              />
              {passwordErrors.currentPassword ? (
                <p className="text-sm text-red-300">{passwordErrors.currentPassword}</p>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordValues.newPassword}
                  onChange={(e) => setPasswordValues((p) => ({ ...p, newPassword: e.target.value }))}
                />
                {passwordErrors.newPassword ? <p className="text-sm text-red-300">{passwordErrors.newPassword}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordValues.confirmPassword}
                  onChange={(e) => setPasswordValues((p) => ({ ...p, confirmPassword: e.target.value }))}
                />
                {passwordErrors.confirmPassword ? (
                  <p className="text-sm text-red-300">{passwordErrors.confirmPassword}</p>
                ) : null}
              </div>
            </div>

            {passwordError ? (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {passwordError}
              </p>
            ) : null}
            {passwordSuccess ? (
              <p className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3 text-sm text-brand-100">
                {passwordSuccess}
              </p>
            ) : null}

            <Button type="submit" disabled={passwordLoading || !canResetPasswords(passwordValues)}>
              {passwordLoading ? 'Updating…' : 'Change password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const canResetPasswords = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
  Boolean(values.currentPassword && values.newPassword.length >= 8 && values.confirmPassword);


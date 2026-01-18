import { redirect } from 'next/navigation';
import { ProfileManager } from '@/components/profile/ProfileManager';
import { getMe } from '@/lib/api/users';
import { getServerAccessToken } from '@/lib/auth/server';

export default async function ProfilePage() {
  const accessToken = getServerAccessToken();
  if (!accessToken) {
    redirect('/auth/login');
  }

  const user = await getMe(accessToken);

  return <ProfileManager user={user} />;
}

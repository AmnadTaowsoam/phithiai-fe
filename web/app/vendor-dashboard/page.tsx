import { redirect } from 'next/navigation';

export default function LegacyVendorDashboardRedirect() {
  redirect('/vendor/dashboard');
}


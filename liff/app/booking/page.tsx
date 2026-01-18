import { LiffShell } from '@/components/LiffShell';

export default function LiffBookingPage() {
  return (
    <LiffShell>
      <h1 style={{ margin: '8px 0' }}>Quick booking</h1>
      <p style={{ opacity: 0.8 }}>This screen is scaffolded for a streamlined booking flow.</p>
      <ul style={{ marginTop: 12 }}>
        <li>Select vendor</li>
        <li>Pick date</li>
        <li>Submit inquiry / booking request</li>
      </ul>
    </LiffShell>
  );
}


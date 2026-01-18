'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type ConsultationFormProps = {
  onSuccess: () => void;
};

type Feedback = {
  status: 'success' | 'error';
  message: string;
};

export const ConsultationForm = ({ onSuccess }: ConsultationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? 'Unable to submit request at this time.');
      }

      setFeedback({
        status: 'success',
        message: 'ทีม Concierge ได้รับข้อมูลแล้ว และจะติดต่อกลับภายใน 90 นาที (09:00-21:00 ICT).',
      });
      form.reset();
      onSuccess();
    } catch (error) {
      setFeedback({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again or reach us at hello@phithiai.com.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required placeholder="you@example.com" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / LINE ID</Label>
          <Input id="phone" name="phone" placeholder="+66 8X XXX XXXX or @Phithiai" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventDate">Event Date</Label>
          <Input id="eventDate" type="date" name="eventDate" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="vision">Ceremony Vision</Label>
        <Textarea
          id="vision"
          name="vision"
          placeholder="Share cultural traditions, venue ideas, guest count, experience goals..."
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="investmentRange">Investment Range</Label>
        <Input id="investmentRange" name="investmentRange" placeholder="e.g., 1.5M THB" />
      </div>
      {feedback ? (
        <div
          className={cnFeedback(feedback.status)}
          role={feedback.status === 'error' ? 'alert' : 'status'}
        >
          {feedback.message}
        </div>
      ) : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : 'Submit Consultation Request'}
      </Button>
    </form>
  );
};

const cnFeedback = (status: Feedback['status']) =>
  status === 'success'
    ? 'rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200'
    : 'rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200';

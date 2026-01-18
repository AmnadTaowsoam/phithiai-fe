import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-6xl items-center px-6 py-16">
      <div className="space-y-4 rounded-3xl border border-ivory/15 bg-background/70 p-8 text-ivory">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-ivory/70">The page you’re looking for doesn’t exist or has moved.</p>
        <Button as="a" href="/">
          Go home
        </Button>
      </div>
    </div>
  );
}

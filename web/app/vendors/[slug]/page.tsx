import Image from 'next/image';
import { notFound } from 'next/navigation';
import { VendorGallery } from '@/components/vendors/VendorGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getVendorById, getVendorReviews } from '@/lib/api';

type VendorDetailPageProps = {
  params: { slug: string };
};

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const vendor = await getVendorById(params.slug).catch(() => null);
  if (!vendor) {
    notFound();
  }

  const reviews = await getVendorReviews(vendor.id).catch(() => []);

  const galleryImages: string[] = [
    vendor.coverImage,
    vendor.logo,
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-ivory/10">
            <div className="relative aspect-[16/7]">
              <Image
                src={
                  vendor.coverImage ??
                  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80'
                }
                alt={vendor.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/25 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 text-ivory">
              <div className="flex flex-wrap gap-2">
                <Badge>{vendor.category}</Badge>
                <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">{vendor.zone}</Badge>
                {vendor.verified ? <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">Verified</Badge> : null}
              </div>
              <h1 className="text-3xl font-semibold">{vendor.name}</h1>
              <p className="max-w-2xl text-sm text-ivory/70">{vendor.longDescription ?? vendor.description}</p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-ivory">Gallery</h2>
            <VendorGallery images={galleryImages} />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-ivory">Reviews</h2>
            <div className="space-y-4">
              {reviews.length ? (
                reviews.slice(0, 5).map((review) => (
                  <Card key={review.id} className="border-ivory/10 bg-background/70">
                    <CardHeader>
                      <CardTitle className="text-base">Rating: {review.rating.toFixed(1)}</CardTitle>
                      <CardDescription>{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    {review.comment ? <CardContent className="text-sm text-ivory/70">{review.comment}</CardContent> : null}
                  </Card>
                ))
              ) : (
                <p className="text-sm text-ivory/60">No reviews yet.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <Card className="border-ivory/10 bg-background/70">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Request a quote or start booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Request a quote</Button>
              <Button variant="ghost" className="w-full">
                Save to favorites
              </Button>
            </CardContent>
          </Card>

          <Card className="border-ivory/10 bg-background/70">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Reach out directly if available.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-ivory/70">
              {vendor.contact?.email ? <p>Email: {vendor.contact.email}</p> : null}
              {vendor.contact?.phone ? <p>Phone: {vendor.contact.phone}</p> : null}
              {vendor.contact?.website ? <p>Website: {vendor.contact.website}</p> : null}
              {vendor.address ? <p>Address: {vendor.address}</p> : null}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

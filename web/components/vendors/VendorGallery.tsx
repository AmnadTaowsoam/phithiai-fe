import Image from 'next/image';

type VendorGalleryProps = {
  images: string[];
};

export const VendorGallery = ({ images }: VendorGalleryProps) => {
  if (!images.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, idx) => (
        <div key={`${src}-${idx}`} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ivory/10">
          <Image src={src} alt={`Vendor gallery image ${idx + 1}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      ))}
    </div>
  );
};


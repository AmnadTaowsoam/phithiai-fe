import { redirect } from 'next/navigation';

type LookbookDetailPageProps = {
  params: { slug: string };
};

export default function LookbookDetailPage({ params }: LookbookDetailPageProps) {
  redirect(`/vendors/${params.slug}`);
}


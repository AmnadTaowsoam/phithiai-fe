type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={`animate-pulse rounded-2xl bg-ivory/10 ${className ?? ''}`} />
);


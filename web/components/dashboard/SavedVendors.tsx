'use client';

import { useState } from 'react';
import { Heart, MapPin, Star, Calendar, DollarSign, X, Filter, Grid, List } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type SavedVendor = {
  id: string;
  name: string;
  category: string;
  logo?: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
  zone: string;
  startingPrice?: number;
  verified: boolean;
  tags: string[];
  minAdvanceBooking?: number;
  savedAt: string;
};

type Props = {
  vendors: SavedVendor[];
  onVendorClick?: (vendor: SavedVendor) => void;
  onUnsave?: (vendorId: string) => void;
  onContact?: (vendor: SavedVendor) => void;
};

export const SavedVendors = ({ vendors, onVendorClick, onUnsave, onContact }: Props) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterZone, setFilterZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(vendors.map(v => v.category)))];
  const zones = ['all', ...Array.from(new Set(vendors.map(v => v.zone)))];

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    const matchesZone = filterZone === 'all' || vendor.zone === filterZone;
    const matchesSearch = searchQuery === '' ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesZone && matchesSearch;
  });

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Contact for pricing';
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (viewMode === 'grid') {
    return (
      <GlassCard className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-ivory">Saved Vendors</h2>
            <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
              {vendors.length} saved
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/60" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-ivory/15 bg-background/70 pl-9 pr-4 py-2 text-sm text-ivory placeholder:text-ivory/40 focus:border-brand-500/40 focus:outline-none"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
            >
              {zones.map(zone => (
                <option key={zone} value={zone}>
                  {zone === 'all' ? 'All Zones' : zone}
                </option>
              ))}
            </select>

            <div className="flex rounded-lg border border-ivory/15 bg-background/70">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-l-lg px-3 py-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-brand-500/10 text-brand-200'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-r-lg px-3 py-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-brand-500/10 text-brand-200'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredVendors.length === 0 ? (
          <div className="py-12 text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-ivory/20" />
            <p className="text-ivory/60">
              {searchQuery || filterCategory !== 'all' || filterZone !== 'all'
                ? 'No vendors match your filters'
                : 'No saved vendors yet'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => onVendorClick?.(vendor)}
                className="group relative overflow-hidden rounded-lg border border-ivory/10 bg-background/60 transition-all hover:border-ivory/20 hover:shadow-lg"
              >
                {/* Cover Image */}
                {vendor.coverImage && (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={vendor.coverImage}
                      alt={vendor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                )}

                {/* Unsave Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnsave?.(vendor.id);
                  }}
                  className="absolute right-3 top-3 rounded-full border border-ivory/20 bg-background/90 p-2 text-ivory/60 transition-colors hover:bg-background hover:text-red-200"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="p-4">
                  {/* Vendor Info */}
                  <div className="flex items-start gap-3">
                    {vendor.logo && (
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="h-12 w-12 rounded-full border border-ivory/10 object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-ivory group-hover:text-brand-200">
                          {vendor.name}
                        </h3>
                        {vendor.verified && (
                          <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-ivory/60">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-amber-400" />
                          {vendor.rating.toFixed(1)}
                        </span>
                        <span>({vendor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-ivory/80">
                      <MapPin className="h-3 w-3" />
                      <span>{vendor.zone}</span>
                      <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
                        {vendor.category}
                      </Badge>
                    </div>

                    {vendor.startingPrice && (
                      <div className="flex items-center gap-2 text-xs text-ivory/80">
                        <DollarSign className="h-3 w-3" />
                        <span>Starting from {formatCurrency(vendor.startingPrice)}</span>
                      </div>
                    )}

                    {vendor.minAdvanceBooking && (
                      <div className="flex items-center gap-2 text-xs text-ivory/80">
                        <Calendar className="h-3 w-3" />
                        <span>Book {vendor.minAdvanceBooking}+ days in advance</span>
                      </div>
                    )}

                    {/* Tags */}
                    {vendor.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {vendor.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-ivory/15 bg-ivory/5 px-2 py-0.5 text-xs text-ivory/80"
                          >
                            {tag}
                          </span>
                        ))}
                        {vendor.tags.length > 3 && (
                          <span className="text-xs text-ivory/60">
                            +{vendor.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onContact?.(vendor);
                      }}
                      className="flex-1 rounded-lg border border-brand-500/40 bg-brand-500/10 px-3 py-2 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
                    >
                      Contact
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onVendorClick?.(vendor);
                      }}
                      className="flex-1 rounded-lg border border-ivory/15 bg-background/70 px-3 py-2 text-sm font-medium text-ivory hover:border-ivory/25"
                    >
                      View Details
                    </Button>
                  </div>

                  {/* Saved Date */}
                  <div className="mt-3 text-center text-xs text-ivory/40">
                    Saved {formatDate(vendor.savedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    );
  }

  // List View
  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ivory">Saved Vendors</h2>
          <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
            {vendors.length} saved
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/60" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-ivory/15 bg-background/70 pl-9 pr-4 py-2 text-sm text-ivory placeholder:text-ivory/40 focus:border-brand-500/40 focus:outline-none"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="rounded-lg border border-ivory/15 bg-background/70 px-4 py-2 text-sm text-ivory focus:border-brand-500/40 focus:outline-none"
          >
            {zones.map(zone => (
              <option key={zone} value={zone}>
                {zone === 'all' ? 'All Zones' : zone}
              </option>
            ))}
          </select>

          <div className="flex rounded-lg border border-ivory/15 bg-background/70">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg px-3 py-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-500/10 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg px-3 py-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-brand-500/10 text-brand-200'
                  : 'text-ivory/60 hover:text-ivory'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-ivory/20" />
          <p className="text-ivory/60">
            {searchQuery || filterCategory !== 'all' || filterZone !== 'all'
              ? 'No vendors match your filters'
              : 'No saved vendors yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onVendorClick?.(vendor)}
              className="flex items-center gap-4 rounded-lg border border-ivory/10 bg-background/60 p-4 transition-all hover:border-ivory/20 hover:shadow-md"
            >
              {/* Vendor Image */}
              {vendor.logo && (
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="h-14 w-14 rounded-full border border-ivory/10 object-cover"
                />
              )}

              {/* Vendor Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-ivory">
                    {vendor.name}
                  </h3>
                  {vendor.verified && (
                    <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-ivory/60">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-amber-400" />
                    {vendor.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {vendor.zone}
                  </span>
                  <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
                    {vendor.category}
                  </Badge>
                  {vendor.startingPrice && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatCurrency(vendor.startingPrice)}
                    </span>
                  )}
                </div>
                {/* Tags */}
                {vendor.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {vendor.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ivory/15 bg-ivory/5 px-2 py-0.5 text-xs text-ivory/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {vendor.tags.length > 4 && (
                      <span className="text-xs text-ivory/60">
                        +{vendor.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnsave?.(vendor.id);
                  }}
                  className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory/60 transition-colors hover:bg-background hover:text-red-200"
                  title="Remove from saved"
                >
                  <X className="h-4 w-4" />
                </button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onContact?.(vendor);
                  }}
                  className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-200 hover:bg-brand-500/15"
                >
                  Contact
                </Button>
              </div>

              {/* Saved Date */}
              <div className="text-xs text-ivory/40">
                Saved {formatDate(vendor.savedAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

$content = @'
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconHeart, IconHeartBroken, IconMessage, IconLayoutGrid, IconList } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export interface SavedVendor {
  id: string;
  name: string;
  category: string;
  logo?: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
  zone: string;
  startingPrice: number;
  verified: boolean;
  tags: string[];
  minAdvanceBooking: number;
  savedAt: string;
}

export interface SavedVendorsProps {
  vendors: SavedVendor[];
  onVendorClick?: (vendor: SavedVendor) => void;
  onUnsave?: (vendorId: string) => void;
  onContact?: (vendor: SavedVendor) => void;
}

type ViewMode = 'grid' | 'list';

export function SavedVendors({
  vendors,
  onVendorClick,
  onUnsave,
  onContact,
}: SavedVendorsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);

  return (
    <Card className="border-ivory/10 bg-background/60">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ivory">Saved Vendors</h3>
            <p className="text-sm text-ivory/60">
              {vendors.length} vendor{vendors.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-ivory/10 text-ivory' : 'text-ivory/60'}
            >
              <IconLayoutGrid size={18} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-ivory/10 text-ivory' : 'text-ivory/60'}
            >
              <IconList size={18} />
            </Button>
          </div>
        </div>

        {vendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <IconHeart size={48} className="mb-4 text-ivory/20" />
            <p className="text-ivory/60">No saved vendors yet</p>
            <p className="text-sm text-ivory/40">Start browsing and save your favorites</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {vendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setHoveredVendor(vendor.id)}
                onMouseLeave={() => setHoveredVendor(null)}
              >
                <Card
                  className="cursor-pointer border-ivory/10 bg-background/70 transition-colors hover:border-ivory/20"
                  onClick={() => onVendorClick?.(vendor)}
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-ivory">{vendor.name}</h4>
                        <p className="text-sm text-ivory/60">{vendor.category}</p>
                      </div>
                      {vendor.verified && (
                        <span className="flex h-6 items-center rounded-full bg-brand-500/20 px-2 text-xs font-medium text-brand-200">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="mb-3 flex items-center gap-4 text-sm text-ivory/60">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-ivory">{vendor.rating.toFixed(1)}</span>
                        <span>({vendor.reviewCount})</span>
                      </div>
                      <div>{vendor.zone}</div>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {vendor.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-ivory/5 px-2 py-0.5 text-xs text-ivory/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {vendor.tags.length > 2 && (
                        <span className="rounded-full bg-ivory/5 px-2 py-0.5 text-xs text-ivory/60">
                          +{vendor.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <div className="text-ivory">
                        <span className="font-medium">
                          {vendor.startingPrice.toLocaleString()} THB
                        </span>
                        <span className="text-ivory/60"> starting</span>
                      </div>
                      <div className="text-xs text-ivory/40">
                        {vendor.minAdvanceBooking} days advance
                      </div>
                    </div>
                    {hoveredVendor === vendor.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <Button
                          variant="outline"
                          className="flex-1 border-ivory/15 bg-background/70 text-ivory hover:border-ivory/25"
                          onClick={(e) => {
                            e.stopPropagation();
                            onContact?.(vendor);
                          }}
                        >
                          <IconMessage size={16} className="mr-1" />
                          Contact
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-red-500/20 bg-red-500/5 text-red-300 hover:border-red-500/30 hover:bg-red-500/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUnsave?.(vendor.id);
                          }}
                        >
                          <IconHeartBroken size={16} className="mr-1" />
                          Unsave
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {vendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 2 }}
              >
                <Card
                  className="cursor-pointer border-ivory/10 bg-background/70 transition-colors hover:border-ivory/20"
                  onClick={() => onVendorClick?.(vendor)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ivory/5 text-ivory/60">
                      <IconHeart size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-ivory">{vendor.name}</h4>
                        {vendor.verified && (
                          <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-200">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-ivory/60">{vendor.category} • {vendor.zone}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-ivory">
                        {vendor.startingPrice.toLocaleString()} THB
                      </div>
                      <div className="flex items-center gap-1 text-sm text-ivory/60">
                        <span>{vendor.rating.toFixed(1)}</span>
                        <span>({vendor.reviewCount})</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        className="text-ivory/60 hover:bg-ivory/5 hover:text-ivory"
                        onClick={(e) => {
                          e.stopPropagation();
                          onContact?.(vendor);
                        }}
                      >
                        <IconMessage size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-300 hover:bg-red-500/10 hover:text-red-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUnsave?.(vendor.id);
                        }}
                      >
                        <IconHeartBroken size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
'@

Set-Content -Path 'components\dashboard\SavedVendors.tsx' -Value $content -Encoding UTF8

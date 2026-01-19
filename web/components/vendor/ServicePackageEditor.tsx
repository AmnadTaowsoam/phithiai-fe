'use client';

import { useState } from 'react';
import { Plus, X, Edit3, Save, Trash2, Package, DollarSign, Clock, User, CheckCircle2, Users } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export type ServicePackage = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  included: string[];
  isActive: boolean;
  minGuests?: number;
  maxGuests?: number;
  availability?: string[];
};

export type ServicePackageAddon = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  packages: ServicePackage[];
  onPackageAdd?: (pkg: ServicePackage) => void;
  onPackageEdit?: (pkg: ServicePackage) => void;
  onPackageDelete?: (packageId: string) => void;
  onPackageSave?: (pkg: ServicePackage) => void;
};

export const ServicePackageEditor = ({ packages, onPackageAdd, onPackageEdit, onPackageDelete, onPackageSave }: Props) => {
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Pick<ServicePackage, 'name' | 'description' | 'price' | 'duration' | 'included'>>>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    included: [],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddPackage = () => {
    setShowAddForm(true);
    setFormData({
      name: '',
      description: '',
      price: 0,
      duration: '',
      included: [],
    });
  };

  const handleEditPackage = (pkg: ServicePackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      included: pkg.included,
    });
    setShowAddForm(true);
  };

  const handleDeletePackage = (packageId: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      onPackageDelete?.(packageId);
    }
  };

  const handleSavePackage = () => {
    if (editingPackage) {
      onPackageSave?.({
        ...editingPackage,
        ...formData,
        isActive: true,
      });
      setEditingPackage(null);
      setShowAddForm(false);
    } else {
      const newPackage: ServicePackage = {
        id: `new-${Date.now()}`,
        name: formData.name || 'New Package',
        description: formData.description || '',
        price: formData.price || 0,
        duration: formData.duration || '',
        included: (formData.included || []),
        isActive: true,
      };
      onPackageAdd?.(newPackage);
      setShowAddForm(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: '',
        included: [],
      });
    }
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      duration: '',
      included: [],
    });
  };

  const handleInputChange = (field: keyof Pick<ServicePackage, 'name' | 'description' | 'price' | 'duration' | 'included'>, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ivory">Services & Packages</h2>
          <Badge className="border-ivory/15 bg-ivory/5 text-ivory/80">
            {packages.length} packages
          </Badge>
        </div>

        <Button
          onClick={handleAddPackage}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Package
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg border border-ivory/10 bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ivory">
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h3>
              <button
                onClick={handleCancel}
                className="rounded-lg border border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Package Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Wedding Photography Package"
                  className="w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what's included in this package..."
                  rows={3}
                  className="w-full resize-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ivory">Price (THB)</label>
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    min="0"
                    step="100"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ivory">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., Full day, Half day"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ivory">Included Services</label>
                <div className="space-y-2">
                  {(formData.included || []).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newIncluded = [...(formData.included || [])];
                          newIncluded[index] = e.target.value;
                          handleInputChange('included', newIncluded);
                        }}
                        placeholder="e.g., Photography, Video coverage"
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newIncluded = (formData.included || []).filter((_, i) => i !== index);
                          handleInputChange('included', newIncluded);
                        }}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-200 hover:bg-red-500/15"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('included', [...(formData.included || []), '']);
                    }}
                    className="rounded-lg border-ivory/15 bg-background/70 p-2 text-ivory hover:border-ivory/25"
                  >
                    <Plus className="h-4 w-4" />
                    Add Service
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={handleSavePackage}>
                <Save className="mr-2 h-4 w-4" />
                {editingPackage ? 'Save Changes' : 'Create Package'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="space-y-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-lg border p-4 transition-all ${
              pkg.isActive
                ? 'border-brand-500/40 bg-brand-500/10'
                : 'border-ivory/10 bg-background-60 hover:border-ivory/20'
            }`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-brand-200" />
                  <div className="flex-1">
                    <div className="text-base font-semibold text-ivory">{pkg.name}</div>
                    {pkg.isActive && (
                      <Badge className="ml-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-sm text-ivory/60">
                  {pkg.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pkg.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-semibold text-ivory">
                  {formatCurrency(pkg.price)}
                </div>
                <div className="text-xs text-ivory/60">per package</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleEditPackage(pkg)}
                variant="outline"
                className="p-2"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDeletePackage(pkg.id)}
                className="p-2 border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/15"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Package Details */}
            <div className="mt-4 space-y-2">
              {pkg.description && (
                <div className="text-sm text-ivory/80">
                  {pkg.description}
                </div>
              )}

              {pkg.included && pkg.included.length > 0 && (
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-ivory/60">Included Services</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.included.map((item, index) => (
                      <Badge
                        key={index}
                        className="border-ivory/15 bg-ivory/5 text-ivory/80"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {pkg.minGuests !== undefined && pkg.maxGuests !== undefined && (
                <div className="flex items-center gap-2 text-xs text-ivory/60">
                  <Users className="h-3 w-3" />
                  <span>
                    {pkg.minGuests} - {pkg.maxGuests !== undefined ? pkg.maxGuests : ''} guests
                  </span>
                </div>
              )}

              {pkg.availability && pkg.availability.length > 0 && (
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-ivory/60">Available On</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.availability.map((day, index) => (
                      <Badge
                        key={index}
                        className="border-ivory/15 bg-ivory/5 text-ivory/80"
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-ivory/20" />
          <p className="text-ivory/60">No packages yet. Create your first package to get started.</p>
          <Button onClick={handleAddPackage}>
            <Plus className="mr-2 h-4" />
            Create Package
          </Button>
        </div>
      )}
    </GlassCard>
  );
};

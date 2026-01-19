'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSettings, SystemSetting } from '@/hooks/use-settings';
import { Save, RotateCcw, Plus, Trash2, Search } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  general: 'General',
  payment: 'Payment',
  notification: 'Notification',
  security: 'Security',
};

const typeLabels: Record<string, string> = {
  STRING: 'Text',
  NUMBER: 'Number',
  BOOLEAN: 'Boolean',
  JSON: 'JSON',
};

const categoryColors: Record<string, string> = {
  general: 'bg-blue-100 text-blue-800',
  payment: 'bg-green-100 text-green-800',
  notification: 'bg-purple-100 text-purple-800',
  security: 'bg-red-100 text-red-800',
};

export default function AdminSettingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    type: 'STRING' as const,
    category: 'general',
    description: '',
    isPublic: false,
    isEditable: true,
  });

  const { settings, loading, error, updateSetting, createSetting, deleteSetting, resetSetting } =
    useSettings(selectedCategory === 'all' ? undefined : selectedCategory);

  const filteredSettings = settings.filter((setting) => {
    const matchesSearch =
      setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (setting.description && setting.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const categories = ['all', ...new Set(settings.map((s) => s.category))];

  const handleSave = async (key: string) => {
    try {
      await updateSetting(key, { key, value: editValue });
      setEditingKey(null);
      setEditValue('');
    } catch (err) {
      alert('Failed to update setting');
    }
  };

  const handleReset = async (key: string) => {
    if (confirm('Reset this setting to its default value?')) {
      try {
        await resetSetting(key);
      } catch (err) {
        alert('Failed to reset setting');
      }
    }
  };

  const handleDelete = async (key: string) => {
    if (confirm('Are you sure you want to delete this setting?')) {
      try {
        await deleteSetting(key);
      } catch (err) {
        alert('Failed to delete setting');
      }
    }
  };

  const handleCreate = async () => {
    try {
      await createSetting(newSetting);
      setShowCreateDialog(false);
      setNewSetting({
        key: '',
        value: '',
        type: 'STRING',
        category: 'general',
        description: '',
        isPublic: false,
        isEditable: true,
      });
    } catch (err: any) {
      alert(err.message || 'Failed to create setting');
    }
  };

  const renderValueInput = (setting: SystemSetting) => {
    if (!setting.isEditable) {
      return <span className="text-muted-foreground">{setting.value}</span>;
    }

    if (editingKey === setting.key) {
      switch (setting.type) {
        case 'BOOLEAN':
          return (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm w-full"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          );
        case 'NUMBER':
          return (
            <Input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-sm"
            />
          );
        case 'JSON':
          return (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={3}
              className="text-sm font-mono"
            />
          );
        default:
          return (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-sm"
            />
          );
      }
    }

    switch (setting.type) {
      case 'BOOLEAN':
        return <Badge variant={setting.value === 'true' ? 'default' : 'secondary'}>{setting.value}</Badge>;
      case 'JSON':
        return (
          <code className="text-xs bg-muted px-2 py-1 rounded max-w-xs block truncate">
            {setting.value}
          </code>
        );
      default:
        return <span>{setting.value}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="System configuration and platform settings"
        actions={
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Setting
          </Button>
        }
      />

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Categories' : categoryLabels[category] || category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings Table */}
      <Card>
        {loading ? (
          <CardContent className="p-6 text-center text-muted-foreground">Loading settings...</CardContent>
        ) : error ? (
          <CardContent className="p-6 text-center text-red-500">{error}</CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No settings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSettings.map((setting) => (
                  <TableRow key={setting.key}>
                    <TableCell className="font-mono text-xs">{setting.key}</TableCell>
                    <TableCell className="max-w-xs">
                      {renderValueInput(setting)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{typeLabels[setting.type]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[setting.category]}>
                        {categoryLabels[setting.category] || setting.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={setting.isPublic ? 'default' : 'secondary'}>
                        {setting.isPublic ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs text-sm text-muted-foreground">
                      {setting.description || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {editingKey === setting.key ? (
                          <>
                            <Button size="sm" onClick={() => handleSave(setting.key)}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingKey(null)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            {setting.isEditable && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingKey(setting.key);
                                  setEditValue(setting.value);
                                }}
                              >
                                Edit
                              </Button>
                            )}
                            {setting.isEditable && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleReset(setting.key)}
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            )}
                            {setting.isEditable && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(setting.key)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create Setting Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Setting</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={newSetting.key}
                  onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                  placeholder="e.g., site.name"
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                  placeholder="Setting value"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newSetting.type}
                  onChange={(e) => setNewSetting({ ...newSetting, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="STRING">Text</option>
                  <option value="NUMBER">Number</option>
                  <option value="BOOLEAN">Boolean</option>
                  <option value="JSON">JSON</option>
                </select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newSetting.category}
                  onChange={(e) => setNewSetting({ ...newSetting, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="general">General</option>
                  <option value="payment">Payment</option>
                  <option value="notification">Notification</option>
                  <option value="security">Security</option>
                </select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSetting.description}
                  onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                  placeholder="Setting description"
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newSetting.isPublic}
                    onChange={(e) => setNewSetting({ ...newSetting, isPublic: e.target.checked })}
                  />
                  <span className="text-sm">Public</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newSetting.isEditable}
                    onChange={(e) => setNewSetting({ ...newSetting, isEditable: e.target.checked })}
                  />
                  <span className="text-sm">Editable</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!newSetting.key || !newSetting.value}>
                Create Setting
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

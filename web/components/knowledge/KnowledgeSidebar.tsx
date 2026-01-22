'use client';

import { Card, CardContent } from '@/components/ui/card';

interface KnowledgeSidebarProps {
  categories: { key: string; label: string; icon: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sections: { id: string; title: string; category: string }[];
  activeSectionId: string;
  onSectionChange: (sectionId: string) => void;
}

type KnowledgeCategory = 'identity' | 'business' | 'ai' | 'database' | 'ops' | 'security';

export function KnowledgeSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  sections,
  activeSectionId,
  onSectionChange,
}: KnowledgeSidebarProps) {
  const categorySections = sections.filter(s => s.category === activeCategory);

  return (
    <Card className="border-r border-ivory/15 bg-background/70">
      <CardContent className="p-0">
        {/* Category Navigation */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-ivory/60 uppercase tracking-wider mb-3">
            Browse by Category
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeCategory === category.key
                    ? 'bg-brand-500 text-white'
                    : 'bg-ivory/5 text-ivory/90 hover:bg-ivory/10'
                }`}
              >
                <span className="mr-3">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-ivory/60 uppercase tracking-wider mb-3">
            {categories.find(c => c.key === activeCategory)?.label}
          </h3>
          <div className="space-y-1 mt-4">
            {categorySections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors text-sm ${
                  activeSectionId === section.id
                    ? 'bg-brand-500/10 text-brand-200'
                    : 'text-ivory/70 hover:bg-brand-500/5'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

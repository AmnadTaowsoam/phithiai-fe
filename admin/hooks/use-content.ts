import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'BLOG' | 'HELP_CENTER' | 'FAQ' | 'ANNOUNCEMENT';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  excerpt: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentInput {
  title: string;
  slug: string;
  type: 'BLOG' | 'HELP_CENTER' | 'FAQ' | 'ANNOUNCEMENT';
  excerpt: string;
  content?: string;
}

const defaultContent: ContentItem[] = [];

export function useContent(searchQuery = '', filterType?: string, filterStatus?: string) {
  const [content, setContent] = useState<ContentItem[]>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: any = {};
        if (searchQuery) params.search = searchQuery;
        if (filterType) params.type = filterType;
        if (filterStatus) params.status = filterStatus;

        const response = await apiClient.get<{ data: ContentItem[] }>('/admin/content', {
          params,
        });

        if (response.success && response.data) {
          setContent(response.data.data || []);
        }

      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [searchQuery, filterType, filterStatus]);

  const publishContent = async (id: string) => {
    try {
      const response = await apiClient.post<{ content: ContentItem }>(
        `/admin/content/${id}/publish`
      );

      if (response.success && response.data?.content) {
        setContent((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...response.data.content, status: 'PUBLISHED', publishedAt: new Date().toISOString() }
              : item
          )
        );
      } else {
        throw new Error('Failed to publish content');
      }
    } catch (err) {
      console.error('Error publishing content:', err);
      throw err;
    }
  };

  const archiveContent = async (id: string) => {
    try {
      const response = await apiClient.post<{ content: ContentItem }>(
        `/admin/content/${id}/archive`
      );

      if (response.success && response.data?.content) {
        setContent((prev) =>
          prev.map((item) =>
            item.id === id ? { ...response.data.content, status: 'ARCHIVED' } : item
          )
        );
      } else {
        throw new Error('Failed to archive content');
      }
    } catch (err) {
      console.error('Error archiving content:', err);
      throw err;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await apiClient.delete(`/admin/content/${id}`);

      setContent((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting content:', err);
      throw err;
    }
  };

  const createContent = async (input: CreateContentInput) => {
    try {
      const response = await apiClient.post<{ content: ContentItem }>(
        '/admin/content',
        input
      );

      if (response.success && response.data?.content) {
        setContent((prev) => [...prev, response.data.content]);
        return response.data.content;
      } else {
        throw new Error('Failed to create content');
      }
    } catch (err) {
      console.error('Error creating content:', err);
      throw err;
    }
  };

  return {
    content,
    loading,
    error,
    publishContent,
    archiveContent,
    deleteContent,
    createContent,
  };
}

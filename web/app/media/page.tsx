'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Video, Download, Eye, Filter, Grid, List, Calendar, User } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  vendorName: string;
  eventDate: string;
  uploadDate: string;
  size: string;
  watermarked: boolean;
}

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: 'media_1',
      type: 'photo',
      url: '#',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
      title: 'งานแต่งงาน - เซ็ตที่ 1',
      vendorName: 'Dream Wedding Studio',
      eventDate: '2025-01-15',
      uploadDate: '2025-01-20',
      size: '250 รูป',
      watermarked: false
    },
    {
      id: 'media_2',
      type: 'video',
      url: '#',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
      title: 'Highlight Video',
      vendorName: 'Perfect Moments',
      eventDate: '2025-01-15',
      uploadDate: '2025-01-22',
      size: '15 นาที',
      watermarked: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-ivory mb-4 thai-heading">
            แกลเลอรี่สื่อ
          </h1>
          <p className="text-lg text-ivory/80">
            รูปภาพและวิดีโอจากงานของคุณ
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>สื่อของฉัน</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" className="px-3 py-2" onClick={() => setViewMode('grid')}>
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="px-3 py-2" onClick={() => setViewMode('list')}>
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="px-4 py-2 text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  กรอง
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={item.type === 'photo' ? 'bg-blue-600' : 'bg-purple-600'}>
                          {item.type === 'photo' ? <ImageIcon className="w-3 h-3 mr-1" /> : <Video className="w-3 h-3 mr-1" />}
                          {item.type === 'photo' ? 'รูปภาพ' : 'วิดีโอ'}
                        </Badge>
                      </div>
                      {item.watermarked && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gray-600">Watermark</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-ivory mb-2">{item.title}</h3>
                      <p className="text-sm text-ivory/70 mb-2">{item.vendorName}</p>
                      <div className="flex items-center gap-4 text-xs text-ivory/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.eventDate).toLocaleDateString('th-TH')}
                        </span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 px-3 py-2 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          ดู
                        </Button>
                        <Button variant="outline" className="flex-1 px-3 py-2 text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          ดาวน์โหลด
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-amber-50 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-ivory">{item.title}</h3>
                        <Badge className={item.type === 'photo' ? 'bg-blue-600' : 'bg-purple-600'}>
                          {item.type === 'photo' ? 'รูปภาพ' : 'วิดีโอ'}
                        </Badge>
                        {item.watermarked && <Badge className="bg-gray-600">Watermark</Badge>}
                      </div>
                      <p className="text-sm text-ivory/70 mb-2">{item.vendorName}</p>
                      <div className="flex items-center gap-4 text-xs text-ivory/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.eventDate).toLocaleDateString('th-TH')}
                        </span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="px-3 py-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="px-3 py-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



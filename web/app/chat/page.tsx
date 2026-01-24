'use client';

import { useState, useEffect } from 'react';
import { ChatInterface, Conversation } from '@/components/chat/ChatInterface';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, MessageCircle, Phone, Video } from 'lucide-react';
import { InquiryAPI, type Conversation as APIConversation } from '@/lib/api/inquiry';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<APIConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [wsUrl, setWsUrl] = useState<string>('ws://localhost:3001/ws');

  // Load conversations from API
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const data = await InquiryAPI.getConversations(token);
          setConversations(data as APIConversation[]);
          // Set WebSocket URL with token
          setWsUrl(InquiryAPI.getWebSocketUrl(token));
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.eventName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversationData = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleCallClick = (type: 'voice' | 'video') => {
    console.log(`Starting ${type} call with ${selectedConversationData?.participantName}`);
  };

  const handleNewMessage = () => {
    console.log('Create new message');
    // TODO: Implement new message creation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-ivory/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ivory">Messages</h1>
              <p className="text-sm text-ivory/60">Communicate with your vendors</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg border border-ivory/15 bg-background/70 py-2 pl-10 pr-4 text-sm text-ivory placeholder:text-ivory/40 focus:border-brand-500/50 focus:outline-none"
                />
              </div>

              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <Button onClick={handleNewMessage}>
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <GlassCard className="h-[calc(100vh-180px)] overflow-hidden">
              <div className="border-b border-ivory/10 p-4">
                <h2 className="text-lg font-semibold text-ivory">Conversations</h2>
                <p className="text-sm text-ivory/60">{conversations.length} active</p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
                </div>
              ) : (
                <div className="overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`cursor-pointer border-b border-ivory/5 p-4 transition-colors hover:bg-ivory/5 ${
                        selectedConversation === conv.id ? 'bg-brand-500/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {conv.participantAvatar || conv.participantName.substring(0, 2).toUpperCase()}
                          </div>
                          {conv.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-ivory truncate">
                              {conv.participantName}
                            </h3>
                            <span className="text-xs text-ivory/60 whitespace-nowrap">
                              {new Date(conv.lastMessageTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          {conv.eventName && (
                            <p className="text-xs text-ivory/60 truncate">
                              {conv.eventName}
                            </p>
                          )}

                          <p className="mt-1 text-sm text-ivory/80 truncate">
                            {conv.lastMessage}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            {conv.isTyping && (
                              <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-200 text-xs">
                                typing...
                              </Badge>
                            )}
                            {conv.unreadCount > 0 && (
                              <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-200 text-xs">
                                {conv.unreadCount} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredConversations.length === 0 && !loading && (
                    <div className="py-12 text-center">
                      <MessageCircle className="mx-auto mb-4 h-16 w-16 text-ivory/20" />
                      <p className="text-ivory/60">No conversations found</p>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <ChatInterface
                conversationId={selectedConversation}
                currentUserId="user-1"
                wsUrl={wsUrl}
                onCallClick={handleCallClick}
              />
            ) : (
              <GlassCard className="flex h-[calc(100vh-180px)] items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="mx-auto mb-4 h-16 w-16 text-ivory/20" />
                  <p className="text-ivory/60">Select a conversation to start chatting</p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

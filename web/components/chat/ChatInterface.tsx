'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, Check, CheckCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWebSocket, WebSocketMessage } from '@/hooks/useWebSocket';

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: ChatAttachment[];
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  isOwn?: boolean;
};

export type ChatAttachment = {
  id: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  name: string;
  size: number;
  thumbnail?: string;
};

export type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
  bookingId?: string;
  vendorName?: string;
  eventName?: string;
};

type Props = {
  conversationId: string;
  currentUserId: string;
  wsUrl: string;
  initialMessages?: ChatMessage[];
  onAttachmentClick?: (attachment: ChatAttachment) => void;
  onCallClick?: (type: 'voice' | 'video') => void;
};

export const ChatInterface = ({
  conversationId,
  currentUserId,
  wsUrl,
  initialMessages = [],
  onAttachmentClick,
  onCallClick,
}: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleWebSocketMessage = useCallback((wsMessage: WebSocketMessage) => {
    if (wsMessage.conversationId !== conversationId) {
      return;
    }

    switch (wsMessage.type) {
      case 'message':
        const newMsg: ChatMessage = {
          id: wsMessage.data.id || `msg-${Date.now()}`,
          conversationId: wsMessage.conversationId,
          senderId: wsMessage.senderId,
          senderName: wsMessage.data.senderName || 'Unknown',
          senderAvatar: wsMessage.data.senderAvatar,
          content: wsMessage.data.content || '',
          attachments: wsMessage.data.attachments,
          timestamp: wsMessage.timestamp,
          status: 'delivered',
          isOwn: wsMessage.senderId === currentUserId,
        };
        setMessages((prev) => [...prev, newMsg]);
        break;

      case 'typing':
        if (wsMessage.senderId !== currentUserId) {
          setOtherUserTyping(wsMessage.data.isTyping);
        }
        break;

      case 'read_receipt':
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === wsMessage.data.messageId
              ? { ...msg, status: 'read' as const }
              : msg
          )
        );
        break;

      default:
        break;
    }
  }, [conversationId, currentUserId]);

  const { status, send, sendTypingIndicator, sendReadReceipt } = useWebSocket({
    url: wsUrl,
    onMessage: handleWebSocketMessage,
    onStatusChange: (newStatus) => {
      console.log('WebSocket status:', newStatus);
    },
  });

  // Send read receipt for unread messages when opening chat
  useEffect(() => {
    messages.forEach((msg) => {
      if (!msg.isOwn && msg.status !== 'read') {
        sendReadReceipt(conversationId, msg.id);
      }
    });
  }, [conversationId, messages, sendReadReceipt]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) {
      return;
    }

    // Optimistic UI update
    const optimisticMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      senderName: 'You',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sending',
      isOwn: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage('');

    // Send via WebSocket
    const success = send({
      type: 'message',
      data: {
        content: newMessage.trim(),
        conversationId,
      },
      conversationId,
    });

    // Update status based on send result
    if (success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: 'failed' as const }
            : msg
        )
      );
    }
  }, [newMessage, conversationId, currentUserId, send]);

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);

      if (!isTyping && e.target.value.length > 0) {
        setIsTyping(true);
        sendTypingIndicator(conversationId, true);
      } else if (isTyping && e.target.value.length === 0) {
        setIsTyping(false);
        sendTypingIndicator(conversationId, false);
      }
    },
    [isTyping, conversationId, sendTypingIndicator]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload via Media Service
      // This is a placeholder - actual implementation would upload to Media Service
      console.log('Files selected:', files);
      setShowAttachmentMenu(false);
    }
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const getStatusIcon = (status: ChatMessage['status']) => {
    switch (status) {
      case 'sending':
        return <div className="h-3 w-3 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />;
      case 'sent':
        return <Check className="h-3 w-3 text-ivory/40" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-ivory/40" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-brand-400" />;
      case 'failed':
        return <div className="h-3 w-3 rounded-full bg-red-500" />;
      default:
        return null;
    }
  };

  return (
    <GlassCard className="flex h-[600px] flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-ivory/10 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              VP
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-ivory">Vendor Pro</h3>
            <div className="flex items-center gap-2">
              {status === 'connected' ? (
                <span className="text-xs text-emerald-400">Online</span>
              ) : (
                <span className="text-xs text-ivory/60">Offline</span>
              )}
              {otherUserTyping && (
                <span className="text-xs text-brand-400">typing...</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="p-2" onClick={() => onCallClick?.('voice')}>
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="p-2" onClick={() => onCallClick?.('video')}>
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="p-2">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="p-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-ivory/60">No messages yet</p>
              <p className="text-sm text-ivory/40">Start a conversation</p>
            </div>
          </div>
        )}

        {messages.map((msg, index) => {
          const showDate =
            index === 0 ||
            formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="mb-4 flex items-center justify-center">
                  <Badge className="border-ivory/15 bg-ivory/5 text-ivory/60">
                    {formatDate(msg.timestamp)}
                  </Badge>
                </div>
              )}

              <div
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isOwn
                      ? 'bg-brand-500/20 text-ivory'
                      : 'bg-ivory/10 text-ivory'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="mb-1 text-xs font-semibold text-ivory/60">
                      {msg.senderName}
                    </p>
                  )}

                  {msg.content && (
                    <p className="text-sm">{msg.content}</p>
                  )}

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex cursor-pointer items-center gap-2 rounded border border-ivory/15 bg-background/50 p-2 hover:border-ivory/25"
                          onClick={() => onAttachmentClick?.(attachment)}
                        >
                          <div className="rounded bg-ivory/10 p-2">
                            <Paperclip className="h-4 w-4 text-ivory/60" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-ivory truncate">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-ivory/60">
                              {(attachment.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`mt-1 flex items-center gap-1 text-xs ${
                      msg.isOwn ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="text-ivory/40">{formatTime(msg.timestamp)}</span>
                    {msg.isOwn && getStatusIcon(msg.status)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {otherUserTyping && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-ivory/10 p-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-ivory/40" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-ivory/40" style={{ animationDelay: '0.1s' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-ivory/40" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-ivory/10 p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              className="p-2"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            {showAttachmentMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-ivory/10 bg-background p-2 shadow-lg">
                <button
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-ivory hover:bg-ivory/10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                  Upload File
                </button>
                <button
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-ivory hover:bg-ivory/10"
                >
                  <Smile className="h-4 w-4" />
                  Add Emoji
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleFileSelect}
            />
          </div>

          <Input
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || status !== 'connected'}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {status !== 'connected' && (
          <div className="mt-2 text-center text-xs text-ivory/60">
            Reconnecting to chat...
          </div>
        )}
      </div>
    </GlassCard>
  );
};

"use client";
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Share2, Users, MessageCircle, Clock, Send, Link2,
  Eye, Edit3, UserPlus, Settings, CheckCircle2
} from 'lucide-react';

interface CollaborationPanelProps {
  onClose: () => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ onClose }) => {
  const [shareEmail, setShareEmail] = useState('');
  const [comment, setComment] = useState('');
  const [shareLink] = useState('https://resume-builder.app/share/abc123def456');

  const collaborators = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Editor',
      avatar: '/api/placeholder/32/32',
      status: 'online',
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'Viewer',
      avatar: '/api/placeholder/32/32',
      status: 'offline',
      lastSeen: new Date(Date.now() - 1000 * 60 * 30)
    }
  ];

  const comments = [
    {
      id: '1',
      author: 'Sarah Johnson',
      content: 'Great work on the professional summary! Consider adding more specific metrics to the achievements section.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      resolved: false
    },
    {
      id: '2',
      author: 'Mike Chen',
      content: 'The skills section looks comprehensive. Maybe reorganize them by category?',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      resolved: true
    }
  ];

  const activities = [
    {
      id: '1',
      user: 'Sarah Johnson',
      action: 'edited',
      section: 'Professional Summary',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: '2',
      user: 'You',
      action: 'added',
      section: 'Work Experience',
      timestamp: new Date(Date.now() - 1000 * 60 * 20)
    },
    {
      id: '3',
      user: 'Mike Chen',
      action: 'viewed',
      section: 'Resume',
      timestamp: new Date(Date.now() - 1000 * 60 * 35)
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const inviteCollaborator = () => {
    if (shareEmail.trim()) {
      // Simulate sending invitation
      setShareEmail('');
      // Add to collaborators list in real implementation
    }
  };

  const addComment = () => {
    if (comment.trim()) {
      // Add comment in real implementation
      setComment('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Collaboration</h2>
              <p className="text-sm text-gray-600">Share and collaborate on your resume</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            ×
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <Tabs defaultValue="share" className="h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="share">Share</TabsTrigger>
              <TabsTrigger value="collaborators">People</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="share" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Share Link</h3>
                  <div className="flex gap-2">
                    <Input value={shareLink} readOnly className="flex-1" />
                    <Button onClick={copyShareLink} variant="outline">
                      <Link2 className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Anyone with this link can view your resume
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Invite Collaborator</h3>
                  <div className="flex gap-2">
                    <Input
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1"
                    />
                    <Button onClick={inviteCollaborator} disabled={!shareEmail.trim()}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Permission Levels</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span><strong>Viewer:</strong> Can view and comment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-gray-500" />
                      <span><strong>Editor:</strong> Can view, comment, and edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="collaborators" className="mt-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={collaborator.avatar} />
                            <AvatarFallback>
                              {collaborator.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{collaborator.name}</p>
                          <p className="text-xs text-gray-600">{collaborator.email}</p>
                          <p className="text-xs text-gray-500">
                            {collaborator.status === 'online' ? 'Online' : `Last seen ${formatTimeAgo(collaborator.lastSeen)}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={collaborator.role === 'Editor' ? 'default' : 'secondary'}>
                          {collaborator.role}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="comments" className="mt-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="flex-1 resize-none"
                  />
                  <Button onClick={addComment} disabled={!comment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className={`p-3 rounded-lg border ${
                        comment.resolved ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                          </div>
                          {comment.resolved && (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        {!comment.resolved && (
                          <Button variant="ghost" size="sm" className="mt-2 text-xs">
                            Mark as resolved
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.section}</span>
                        </p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default CollaborationPanel;

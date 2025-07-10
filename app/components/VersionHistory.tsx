"use client";
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { History, Clock, User, Download, RefreshCw, Eye } from 'lucide-react';

interface VersionHistoryProps {
  versions?: Array<{
    id: string;
    version: number;
    timestamp: Date;
    changes: string[];
    size: string;
  }>;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ versions = [] }) => {
  const mockVersions = [
    {
      id: 'v1',
      version: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      changes: ['Updated professional summary', 'Added new work experience'],
      size: '2.4 MB'
    },
    {
      id: 'v2',
      version: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      changes: ['Enhanced skills section', 'Improved formatting'],
      size: '2.3 MB'
    },
    {
      id: 'v3',
      version: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      changes: ['Initial resume creation'],
      size: '2.1 MB'
    }
  ];

  const versionsToShow = versions.length > 0 ? versions : mockVersions;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <History className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Version History</h3>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-4">
          {versionsToShow.map((version, index) => (
            <div key={version.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Version {version.version}</h4>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(version.timestamp)}
                    <span>•</span>
                    <span>{version.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-3 h-3" />
                  </Button>
                  {index !== 0 && (
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Changes:</p>
                <ul className="text-sm text-gray-600 space-y-0.5">
                  {version.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">•</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Auto-save enabled</span>
          <span>{versionsToShow.length} versions saved</span>
        </div>
      </div>
    </Card>
  );
};

export default VersionHistory;

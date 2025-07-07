"use client";
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import {
  BarChart3, TrendingUp, Target, Eye, Clock, Award,
  CheckCircle2, AlertCircle, XCircle, Lightbulb, Star
} from 'lucide-react';

interface ResumeAnalyticsProps {
  resumeData: any;
}

const ResumeAnalytics: React.FC<ResumeAnalyticsProps> = ({ resumeData }) => {
  const calculateScores = () => {
    const scores = {
      completion: resumeData.metadata?.completionScore || 0,
      ats: calculateATSScore(),
      impact: calculateImpactScore(),
      readability: calculateReadabilityScore(),
      keywords: calculateKeywordScore()
    };

    const overall = Math.round((scores.completion + scores.ats + scores.impact + scores.readability + scores.keywords) / 5);
    
    return { ...scores, overall };
  };

  const calculateATSScore = () => {
    let score = 0;
    
    // Check for standard sections
    if (resumeData.personalInfo?.fullName) score += 20;
    if (resumeData.personalInfo?.email) score += 15;
    if (resumeData.experience?.length > 0) score += 25;
    if (resumeData.education?.length > 0) score += 20;
    if (resumeData.skills?.length >= 5) score += 20;
    
    return Math.min(score, 100);
  };

  const calculateImpactScore = () => {
    let score = 0;
    const hasMetrics = resumeData.experience?.some((exp: any) => 
      exp.metrics?.revenue || exp.metrics?.teamSize || exp.metrics?.improvement
    );
    
    if (hasMetrics) score += 40;
    if (resumeData.experience?.some((exp: any) => exp.achievements?.length > 0)) score += 30;
    if (resumeData.personalInfo?.summary?.length > 50) score += 30;
    
    return Math.min(score, 100);
  };

  const calculateReadabilityScore = () => {
    let score = 80; // Base score
    
    // Check for overly long descriptions
    const longDescriptions = resumeData.experience?.filter((exp: any) => 
      exp.description && exp.description.length > 200
    ).length || 0;
    
    score -= longDescriptions * 10;
    
    return Math.max(Math.min(score, 100), 0);
  };

  const calculateKeywordScore = () => {
    const commonKeywords = ['led', 'managed', 'developed', 'improved', 'increased', 'achieved'];
    const experienceText = resumeData.experience?.map((exp: any) => 
      `${exp.description} ${exp.achievements?.join(' ')}`
    ).join(' ').toLowerCase() || '';
    
    const foundKeywords = commonKeywords.filter(keyword => 
      experienceText.includes(keyword)
    ).length;
    
    return Math.min((foundKeywords / commonKeywords.length) * 100, 100);
  };

  const scores = calculateScores();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const insights = [
    {
      title: "Add Quantifiable Results",
      description: "Include specific numbers, percentages, or dollar amounts in your achievements",
      priority: "high",
      implemented: resumeData.experience?.some((exp: any) => exp.metrics?.revenue) || false
    },
    {
      title: "Optimize Keywords",
      description: "Use industry-specific terms and action verbs to improve ATS compatibility",
      priority: "medium",
      implemented: scores.keywords > 70
    },
    {
      title: "Professional Summary",
      description: "Write a compelling 2-3 sentence summary highlighting your value proposition",
      priority: "high",
      implemented: resumeData.personalInfo?.summary?.length > 50 || false
    },
    {
      title: "Skills Section",
      description: "Include both technical and soft skills relevant to your target role",
      priority: "medium",
      implemented: resumeData.skills?.length >= 5 || false
    }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">Resume Analytics</h2>
      </div>

      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Overall Score</h3>
          <div className="flex items-center gap-2">
            {getScoreIcon(scores.overall)}
            <span className={`text-2xl font-bold ${getScoreColor(scores.overall)}`}>
              {scores.overall}%
            </span>
          </div>
        </div>
        <Progress value={scores.overall} className="h-3" />
        <p className="text-sm text-gray-600 mt-2">
          {scores.overall >= 80 ? 'Excellent! Your resume is well-optimized.' :
           scores.overall >= 60 ? 'Good progress! A few improvements will make it great.' :
           'Your resume needs some work to stand out to employers.'}
        </p>
      </div>

      {/* Detailed Scores */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-gray-900">Detailed Analysis</h3>
        
        {[
          { name: 'Completion', score: scores.completion, icon: CheckCircle2 },
          { name: 'ATS Compatibility', score: scores.ats, icon: Target },
          { name: 'Impact & Results', score: scores.impact, icon: TrendingUp },
          { name: 'Readability', score: scores.readability, icon: Eye },
          { name: 'Keywords', score: scores.keywords, icon: Star }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <item.icon className={`w-4 h-4 ${getScoreColor(item.score)}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={item.score} className="w-16 h-2" />
              <span className={`text-sm font-medium ${getScoreColor(item.score)} min-w-[3rem] text-right`}>
                {Math.round(item.score)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insights & Recommendations */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Recommendations</h3>
        
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">
              {insight.implemented ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <Lightbulb className={`w-4 h-4 ${insight.priority === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium">{insight.title}</h4>
                <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                  {insight.priority}
                </Badge>
                {insight.implemented && (
                  <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                    Done
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600">{insight.description}</p>
            </div>
            {!insight.implemented && (
              <Button size="sm" variant="outline" className="text-xs">
                Fix
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {resumeData.experience?.length || 0}
            </div>
            <div className="text-xs text-gray-600">Work Experiences</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">
              {resumeData.skills?.length || 0}
            </div>
            <div className="text-xs text-gray-600">Skills Listed</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeAnalytics;

"use client";
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Target, Plus, TrendingUp, Star, Zap } from 'lucide-react';

interface SkillsSuggestionsProps {
  currentSkills: string[];
  onAddSkill: (skill: string) => void;
  jobRole?: string;
}

const SkillsSuggestions: React.FC<SkillsSuggestionsProps> = ({ 
  currentSkills, 
  onAddSkill, 
  jobRole = 'general' 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const skillCategories = {
    popular: {
      title: 'Most Popular',
      icon: <TrendingUp className="w-4 h-4" />,
      skills: [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
        'Project Management', 'Communication', 'Leadership', 'Problem Solving',
        'Team Collaboration', 'Critical Thinking'
      ]
    },
    technical: {
      title: 'Technical Skills',
      icon: <Zap className="w-4 h-4" />,
      skills: [
        'TypeScript', 'Java', 'AWS', 'Docker', 'Kubernetes', 'MongoDB',
        'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs', 'Microservices',
        'CI/CD', 'Unit Testing', 'Agile', 'Scrum'
      ]
    },
    soft: {
      title: 'Soft Skills',
      icon: <Star className="w-4 h-4" />,
      skills: [
        'Strategic Thinking', 'Adaptability', 'Time Management', 'Creativity',
        'Emotional Intelligence', 'Conflict Resolution', 'Public Speaking',
        'Mentoring', 'Cross-functional Collaboration', 'Decision Making'
      ]
    },
    trending: {
      title: 'Trending',
      icon: <Target className="w-4 h-4" />,
      skills: [
        'Machine Learning', 'AI/ML', 'Data Science', 'Cloud Computing',
        'DevOps', 'Cybersecurity', 'Blockchain', 'IoT', 'AR/VR',
        'Remote Work', 'Digital Marketing', 'UX/UI Design'
      ]
    }
  };

  const getRelevantSkills = (category: string) => {
    const allSkills = skillCategories[category as keyof typeof skillCategories]?.skills || [];
    return allSkills.filter(skill => !currentSkills.includes(skill));
  };

  const getSkillRecommendationReason = (skill: string) => {
    const reasons = {
      'JavaScript': 'Essential for web development',
      'Python': 'Versatile and in-demand',
      'React': 'Popular frontend framework',
      'Leadership': 'Valued across all industries',
      'Communication': 'Critical soft skill',
      'Project Management': 'High-demand skill',
      'Machine Learning': 'Growing field with opportunities',
      'Cloud Computing': 'Industry standard technology'
    };
    
    return reasons[skill as keyof typeof reasons] || 'Relevant to your field';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Skill Suggestions</h3>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(skillCategories).map(([key, category]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(key)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.title}
          </Button>
        ))}
      </div>

      <Separator className="mb-4" />

      {/* Skills Grid */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">
          {skillCategories[selectedCategory as keyof typeof skillCategories]?.title}
        </h4>
        
        <div className="grid gap-2">
          {getRelevantSkills(selectedCategory).slice(0, 12).map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{skill}</span>
                  <Badge variant="outline" className="text-xs">
                    Recommended
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {getSkillRecommendationReason(skill)}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onAddSkill(skill)}
                className="ml-3"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Skill Input */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Add Custom Skill</h4>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter a skill not listed above..."
            className="flex-1"
          />
          <Button>Add</Button>
        </div>
      </div>
    </Card>
  );
};

export default SkillsSuggestions;

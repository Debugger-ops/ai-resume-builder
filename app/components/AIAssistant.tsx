'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Card
} from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import {
  Sparkles,
  Loader2,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { ResumeData } from '../start-building/page';

interface AIAssistantProps {
  resumeData: ResumeData;
  onUpdateResume: (data: ResumeData) => void;
  onClose: () => void;
}

type JobKey = 'software engineer' | 'marketing manager' | 'data analyst';

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, onUpdateResume, onClose }) => {
  const { toast } = useToast();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [appliedIndices, setAppliedIndices] = useState<number[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const mockSuggestions: Record<JobKey | 'default', string[]> = {
    'software engineer': [
      'Developed and maintained scalable web applications using React and Node.js',
      'Collaborated with cross-functional teams to deliver high-quality software solutions',
      'Implemented automated testing procedures, reducing bug reports by 40%',
      'Optimized database queries resulting in 25% faster page load times',
      'Led code reviews and mentored junior developers'
    ],
    'marketing manager': [
      'Developed and executed comprehensive marketing strategies across multiple channels',
      'Increased brand awareness by 45% through targeted social media campaigns',
      'Managed a team of 5 marketing professionals and coordinated project timelines',
      'Analyzed market trends and competitor strategies to inform decision-making',
      'Generated $2M in new revenue through innovative lead generation campaigns'
    ],
    'data analyst': [
      'Analyzed large datasets to identify trends and provide actionable business insights',
      'Created automated reports and dashboards using SQL, Python, and Tableau',
      'Collaborated with stakeholders to define KPIs and measurement frameworks',
      'Improved data accuracy by 30% through implementation of quality control processes',
      'Presented findings to C-level executives and influenced strategic decisions'
    ],
    'default': [
      'Demonstrated strong problem-solving abilities in fast-paced environments',
      'Collaborated effectively with diverse teams to achieve common goals',
      'Managed multiple projects simultaneously while meeting strict deadlines',
      'Implemented process improvements that increased efficiency by 20%',
      'Communicated complex information clearly to various stakeholders'
    ]
  };

  const generateSuggestions = async () => {
    setLoadingSuggestions(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const key = jobTitle.toLowerCase().trim() as JobKey;
    const relevant = mockSuggestions[key] || mockSuggestions.default;

    setSuggestions(relevant);
    setAppliedIndices([]);
    setLoadingSuggestions(false);

    toast({
      title: "AI Suggestions Generated",
      description: "Here are some tailored suggestions for your resume!"
    });
  };

  const applySuggestion = (suggestion: string, index: number) => {
    if (resumeData.experience.length === 0) {
      toast({
        title: "Add Experience First",
        description: "Please add a work experience entry before applying AI suggestions.",
        variant: "destructive"
      });
      return;
    }

    const updatedExperience = [...resumeData.experience];
    const latest = updatedExperience[updatedExperience.length - 1];

    if (!latest.achievements) latest.achievements = [];

    latest.achievements.push(suggestion);

    onUpdateResume({
      ...resumeData,
      experience: updatedExperience
    });

    setAppliedIndices([...appliedIndices, index]);

    toast({
      title: "Suggestion Applied",
      description: "The AI suggestion has been added to your latest work experience."
    });
  };

  const improveSummary = async () => {
    setLoadingSummary(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const improved = `Results-driven ${jobTitle || 'professional'} with proven expertise in delivering high-impact solutions. Demonstrated ability to drive innovation, lead cross-functional teams, and exceed performance targets. Passionate about leveraging cutting-edge technologies and data-driven insights to solve complex business challenges and drive organizational growth.`;

    onUpdateResume({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        summary: improved
      }
    });

    setLoadingSummary(false);

    toast({
      title: "Summary Improved",
      description: "Your professional summary has been enhanced with AI suggestions."
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Resume Assistant
          </DialogTitle>
          <DialogDescription>
            Get AI-powered suggestions to enhance your resume content and make it more compelling.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">

          {/* Job Information Input */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Target Job Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Job Title</label>
                <Input
                  placeholder="e.g., Software Engineer, Marketing Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Job Description (Optional)</label>
                <Textarea
                  placeholder="Paste the job description here for more targeted suggestions..."
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <Button
                onClick={generateSuggestions}
                disabled={!jobTitle.trim() || loadingSuggestions}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loadingSuggestions ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Suggestions...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Suggestions
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                AI-Generated Achievements
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion(suggestion, index)}
                      disabled={appliedIndices.includes(index)}
                      className={`bg-blue-600 hover:bg-blue-700 ${appliedIndices.includes(index) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {appliedIndices.includes(index) ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Quick AI Improvements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={improveSummary}
                disabled={loadingSummary}
                variant="outline"
                className="justify-start h-auto p-4"
              >
                {loadingSummary ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Improving Summary...
                  </>
                ) : (
                  <div className="text-left">
                    <div className="font-medium">Improve Summary</div>
                    <div className="text-sm text-gray-500">
                      Enhance your professional summary with AI
                    </div>
                  </div>
                )}
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() =>
                  toast({
                    title: 'Coming Soon',
                    description: 'This feature will be available in the next update.'
                  })
                }
              >
                <div className="text-left">
                  <div className="font-medium">Optimize Keywords</div>
                  <div className="text-sm text-gray-500">
                    Add industry-relevant keywords
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use specific job titles for more targeted suggestions</li>
              <li>• Include quantifiable achievements when possible</li>
              <li>• Tailor your resume for each job application</li>
              <li>• Keep your professional summary concise but impactful</li>
            </ul>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;

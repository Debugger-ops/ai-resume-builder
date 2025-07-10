'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "../components/ui/button";
import SortableResumeSections from '../components/SortableResumeSections';
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext,
  sortableKeyboardCoordinates, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  Download, Sparkles, Save, FileText, User, Briefcase,
  GraduationCap, Award, MapPin, Mail, Phone, Calendar,
  Plus, X, Edit3, Eye, Settings, Palette, Upload, Share2,
  BarChart3, History, Zap, Globe, Star, Target, TrendingUp,
  Copy, RefreshCw, BookOpen, Lightbulb, CheckCircle2, Clock
} from 'lucide-react';
import ResumeSection from '../components/ResumeSection';
import ResumePreview from '../components/ResumePreview';
import AIAssistant from '../components/AIAssistant';
import SkillsSuggestions from '../components/SkillsSuggestions';
import ResumeAnalytics from '../components/ResumeAnalytics';
import VersionHistory from '../components/VersionHistory';
import ImportDialog from '../components/ImportDialog';
import CollaborationPanel from '../components/CollaborationPanel';
import ClientTime from '../components/ClientTime';
import type { ResumeData } from '../types/types';
import { v4 as uuidv4 } from 'uuid';


export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  metrics?: {
    revenue?: string;
    teamSize?: string;
    improvement?: string;
  };
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'list' | 'paragraph' | 'achievements';
  content: any;
}


const ResumeBuilderPage = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    volunteer: [], // ✅ Add this
    awards: [],
    customSections: [],
   sections: [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "projects",
  "volunteer",
  "awards"
],
    metadata: {
      completionScore: 0,
      lastModified: new Date(),
      version: 1,
      template: 'modern'
    }
  });
// --- Language ---
const addLanguage = () => {
  setResumeData(prev => ({
    ...prev,
    languages: [...prev.languages, { id: uuidv4(), name: '', level: '' }],
  }));
};

const updateLanguage = (id: string, field: string, value: string) => {
  setResumeData(prev => ({
    ...prev,
    languages: prev.languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ),
  }));
};

const removeLanguage = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    languages: prev.languages.filter(lang => lang.id !== id),
  }));
};

// --- Certification ---
const addCertification = () => {
  setResumeData(prev => ({
    ...prev,
    certifications: [...prev.certifications, {
      id: uuidv4(),
      name: '',
      issuer: '',
      issue: '',
      date: '',
    }],
  }));
};

const updateCertification = (id: string, field: string, value: string) => {
  setResumeData(prev => ({
    ...prev,
    certifications: prev.certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ),
  }));
};

const removeCertification = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    certifications: prev.certifications.filter(cert => cert.id !== id),
  }));
};

// --- Project ---
const addProject = () => {
  setResumeData(prev => ({
    ...prev,
    projects: [...prev.projects, {
      id: uuidv4(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    }],
  }));
};

const updateProject = (id: string, field: string, value: string | string[]) => {
  setResumeData(prev => ({
    ...prev,
    projects: prev.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    ),
  }));
};

const removeProject = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    projects: prev.projects.filter(proj => proj.id !== id),
  }));
}
// --- Volunteer ---
const addVolunteer = () => {
  setResumeData(prev => ({
    ...prev,
    volunteer: [...prev.volunteer, {
      id: uuidv4(),
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
  }));
};

const updateVolunteer = (id: string, field: string, value: string) => {
  setResumeData(prev => ({
    ...prev,
    volunteer: prev.volunteer.map(vol =>
      vol.id === id ? { ...vol, [field]: value } : vol
    ),
  }));
};

const removeVolunteer = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    volunteer: prev.volunteer.filter(vol => vol.id !== id),
  }));
};

// --- Award ---
const addAward = () => {
  setResumeData(prev => ({
    ...prev,
    awards: [...prev.awards, {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
      description: ''
    }],
  }));
};

const updateAward = (id: string, field: string, value: string) => {
  setResumeData(prev => ({
    ...prev,
    awards: prev.awards.map(award =>
      award.id === id ? { ...award, [field]: value } : award
    ),
  }));
};

const removeAward = (id: string) => {
  setResumeData(prev => ({
    ...prev,
    awards: prev.awards.filter(award => award.id !== id),
  }));
};

  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [activeTab, setActiveTab] = useState('editor');
  const [autoSave, setAutoSave] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const saveResume = useCallback((event?: React.MouseEvent<HTMLButtonElement>) => {
    const resumeKey = `resume_${Date.now()}`;
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  }, [toast]);

  const saveResumeAuto = useCallback(() => {
    const resumeKey = `resume_${Date.now()}`;
    // Silent save for auto-save functionality
  }, []);

  const exportToPDF = useCallback(async () => {
    toast({
      title: "Exporting PDF",
      description: "Your resume is being exported to PDF...",
    });
  }, [toast]);

  const duplicateResume = useCallback(() => {
    const newResumeData = {
      ...resumeData,
      metadata: {
        ...resumeData.metadata,
        version: resumeData.metadata.version + 1,
        lastModified: new Date()
      }
    };
    setResumeData(newResumeData);
    toast({
      title: "Resume Duplicated",
      description: "A copy of your resume has been created.",
    });
  }, [resumeData, toast]);

  const templates = [
    { id: 'modern', name: 'Modern', preview: '#3B82F6', description: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic', preview: '#1F2937', description: 'Traditional and professional' },
    { id: 'creative', name: 'Creative', preview: '#8B5CF6', description: 'Bold and artistic' },
    { id: 'minimal', name: 'Minimal', preview: '#10B981', description: 'Simple and elegant' },
    { id: 'executive', name: 'Executive', preview: '#DC2626', description: 'Senior-level positions' },
    { id: 'tech', name: 'Tech', preview: '#F59E0B', description: 'Developer-focused' }
  ];

  const availableSections = [
    { id: 'languages', title: 'Languages', icon: Globe },
    { id: 'certifications', title: 'Certifications', icon: Award },
    { id: 'projects', title: 'Projects', icon: Briefcase },
    { id: 'volunteer', title: 'Volunteer Work', icon: User },
    { id: 'publications', title: 'Publications', icon: BookOpen },
    { id: 'awards', title: 'Awards', icon: Star }
  ];

  useEffect(() => {
    if (autoSave) {
      const saveTimer = setTimeout(() => {
        saveResumeAuto();
      }, 2000);
      return () => clearTimeout(saveTimer);
    }
  }, [resumeData, autoSave, saveResumeAuto]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.sections.indexOf(active.id as string);
        const newIndex = prev.sections.indexOf(over.id as string);
        return {
          ...prev,
          sections: arrayMove(prev.sections, oldIndex, newIndex)
        };
      });
    }
  }, []);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [],
      metrics: {}
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  }, []);

  const updateExperience = useCallback((id: string, field: string, value: string | string[] | any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      honors: []
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  }, []);

  const updateEducation = useCallback((id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  const addSkill = useCallback((skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  }, [resumeData.skills]);

  const removeSkill = useCallback((skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

const update = (section: string, value: any) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: value,
  }));
};

  const addCustomSection = useCallback((title: string, type: 'list' | 'paragraph' | 'achievements') => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title,
      type,
      content: type === 'list' ? [] : ''
    };
    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
      sections: [...prev.sections, `custom_${newSection.id}`]
    }));
  }, []);

  const generateAISummary = useCallback(async () => {
    setIsGeneratingSummary(true);
    // Simulate AI generation
    setTimeout(() => {
      const aiSummary = "Dynamic professional with proven track record in driving results through innovative solutions and strategic thinking. Experienced in leading cross-functional teams and delivering high-impact projects that exceed expectations.";
      updatePersonalInfo('summary', aiSummary);
      setIsGeneratingSummary(false);
      toast({
        title: "AI Summary Generated",
        description: "Your professional summary has been enhanced with AI.",
      });
    }, 2000);
  }, [updatePersonalInfo, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder Pro</h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600 text-sm">Create professional resumes with AI-powered suggestions</p>
                  <div className="flex items-center gap-2">
                    <Progress value={resumeData.metadata.completionScore} className="w-20 h-2" />
                    <span className="text-xs text-gray-500">{resumeData.metadata.completionScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-white rounded-lg p-1 shadow-sm border">
                <Button
                  variant={activeTab === 'editor' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('editor')}
                  className="gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Editor
                </Button>
                <Button
                  variant={activeTab === 'preview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('preview')}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('analytics')}
                  className="gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Quick Actions */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Resume Data</DialogTitle>
                  </DialogHeader>
                  <ImportDialog onImport={setResumeData} />
                </DialogContent>
              </Dialog>

              <Button onClick={duplicateResume} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>

              <Button
                onClick={() => setShowAIAssistant(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>

              <Button onClick={saveResume} variant="outline" className="shadow-sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>

              <Button
                onClick={exportToPDF}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Editor Section */}
          <div className={`xl:col-span-2 ${activeTab !== 'editor' ? 'hidden xl:block' : ''}`}>
            <div className="space-y-6">
              {/* Enhanced Template Selection */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Choose Template</h2>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md group ${selectedTemplate === template.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div
                        className="w-full h-16 rounded mb-3 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: template.preview }}
                      />
                      <p className="text-sm font-medium text-center mb-1">{template.name}</p>
                      <p className="text-xs text-gray-500 text-center">{template.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Smart Tools */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Smart Tools</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={generateAISummary}
                    disabled={isGeneratingSummary}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    variant="outline"
                  >
                    {isGeneratingSummary ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                    )}
                    <span className="font-medium">Generate Summary</span>
                    <span className="text-xs text-gray-500">AI-powered</span>
                  </Button>

                  <Button
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    variant="outline"
                  >
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Skill Suggestions</span>
                    <span className="text-xs text-gray-500">Industry-specific</span>
                  </Button>

                  <Button
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    variant="outline"
                  >
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Optimize ATS</span>
                    <span className="text-xs text-gray-500">Keyword boost</span>
                  </Button>
                </div>
              </Card>

              {/* Add Sections */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Add Sections</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSections.map((section) => (
                    <Button
                      key={section.id}
                      onClick={() => addCustomSection(section.title, 'list')}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-gray-50"
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm">{section.title}</span>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Resume Builder with Enhanced Sections */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Resume Builder</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="auto-save" className="text-sm text-black">Auto-save</Label>
                      <Switch
                        className='border-gray-300 focus:ring-indigo-500'
                        id="auto-save"
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                    <Badge variant="secondary">
                      {resumeData.sections.length} sections
                    </Badge>
                  </div>
                </div>

                <SortableResumeSections
                  resumeData={resumeData}
                  update={update} 
                  updateResumeData={setResumeData}
                  updatePersonalInfo={updatePersonalInfo}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                  addLanguage={addLanguage}
                  updateLanguage={updateLanguage}
                  removeLanguage={removeLanguage}
                  addCertification={addCertification}
                  updateCertification={updateCertification}
                  removeCertification={removeCertification}
                  addProject={addProject}
                  updateProject={updateProject}
                  removeProject={removeProject}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  addVolunteer={addVolunteer}
                  updateVolunteer={updateVolunteer}
                  removeVolunteer={removeVolunteer}
                  addAward={addAward}
                  updateAward={updateAward}
                  removeAward={removeAward}
                />


              </Card>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`xl:col-span-1 ${activeTab === 'editor' ? 'hidden xl:block' : activeTab === 'preview' ? 'block' : 'hidden'}`}>
            <div className="sticky top-24">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedTemplate}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-inner p-4 min-h-[600px]">
                  <ResumePreview
                    resumeData={resumeData}
                    template={selectedTemplate}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Analytics Section */}
          <div className={`xl:col-span-1 ${activeTab === 'analytics' ? 'block' : 'hidden xl:hidden'}`}>
            <div className="sticky top-24">
              <ResumeAnalytics resumeData={resumeData} />
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Modals */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <AIAssistant
              resumeData={resumeData}
              onUpdateResume={setResumeData}
              onClose={() => setShowAIAssistant(false)}
            />
          </div>
        </div>
      )}

      {/* Enhanced Progress Indicator */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${autoSave ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {autoSave ? 'Auto-saving...' : 'Auto-save off'}
            </span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <ClientTime date={resumeData.metadata.lastModified} />
          </div>
        </div>
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 left-6">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setShowVersionHistory(true)}
            className="rounded-full w-12 h-12 shadow-lg"
            variant="outline"
          >
            <History className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setShowCollaboration(true)}
            className="rounded-full w-12 h-12 shadow-lg"
            variant="outline"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
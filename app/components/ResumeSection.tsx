"use client";
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  GripVertical, Plus, X, User, FileText,
  Briefcase, GraduationCap, Award, Globe, BookOpen
} from 'lucide-react';
import { ResumeData, Experience, Education } from '../start-building/page';

interface ResumeSectionProps {
  id: string;
  type: string;
  resumeData: ResumeData;
  updatePersonalInfo: (field: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | string[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  id, type, resumeData, updatePersonalInfo,
  addExperience, updateExperience, addEducation, updateEducation,
  addSkill, removeSkill
}) => {
  const [newSkill, setNewSkill] = useState('');

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'personal': return <User className="w-5 h-5 text-blue-600" />;
      case 'summary': return <FileText className="w-5 h-5 text-green-600" />;
      case 'experience': return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'education': return <GraduationCap className="w-5 h-5 text-orange-600" />;
      case 'skills': return <Award className="w-5 h-5 text-red-600" />;
      case 'languages': return <Globe className="w-5 h-5 text-yellow-500" />;
      case 'certifications': return <Award className="w-5 h-5 text-emerald-500" />;
      case 'projects': return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'volunteer': return <User className="w-5 h-5 text-pink-500" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'personal': return 'Personal Information';
      case 'summary': return 'Professional Summary';
      case 'experience': return 'Work Experience';
      case 'education': return 'Education';
      case 'skills': return 'Skills';
      case 'languages': return 'Languages';
      case 'certifications': return 'Certifications';
      case 'projects': return 'Projects';
      case 'volunteer': return 'Volunteer Work';
      default: return 'Custom Section';
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const renderPersonalSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} />
      <Input placeholder="Email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
      <Input placeholder="Phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
      <Input placeholder="Location" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
    </div>
  );

  const renderSummarySection = () => (
    <Textarea
      placeholder="Write your summary..."
      rows={4}
      value={resumeData.personalInfo.summary}
      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
    />
  );

  const renderExperienceSection = () => (
    <div className="space-y-6">
      {resumeData.experience.map((exp) => (
        <Card key={exp.id} className="p-4 border-l-4 border-purple-500">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
            <Input placeholder="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
            <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
            <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
          </div>
          <Textarea placeholder="Description" rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
        </Card>
      ))}
      <Button onClick={addExperience} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      {resumeData.education.map((edu) => (
        <Card key={edu.id} className="p-4 border-l-4 border-orange-500">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
            <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
            <Input placeholder="Field" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
            <Input placeholder="GPA (optional)" value={edu.gpa || ''} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} />
            <Input placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
            <Input placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
          </div>
        </Card>
      ))}
      <Button onClick={addEducation} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Education
      </Button>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} placeholder="e.g. JavaScript" />
        <Button onClick={handleAddSkill}><Plus className="w-4 h-4" /></Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-2">
            {skill}
            <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
          </Badge>
        ))}
      </div>
    </div>
  );

  const renderLanguagesSection = () => (
    <ul className="list-disc pl-6">
      {resumeData.languages?.map((lang, i) => (
        <li key={i}>{lang.name} – {lang.level}</li>
      ))}
    </ul>
  );

  const renderCertificationsSection = () => (
    <ul className="list-disc pl-6">
      {resumeData.certifications?.map((cert, i) => (
        <li key={i}>{cert.name} by {cert.issuer} ({cert.date})</li>
      ))}
    </ul>
  );

  const renderProjectsSection = () => (
    <ul className="list-disc pl-6">
      {resumeData.projects?.map((proj, i) => (
        <li key={i}>
          <strong>{proj.name}</strong>: {proj.description} [{proj.technologies.join(', ')}]
        </li>
      ))}
    </ul>
  );

  const renderSectionContent = () => {
    switch (type) {
      case 'personal': return renderPersonalSection();
      case 'summary': return renderSummarySection();
      case 'experience': return renderExperienceSection();
      case 'education': return renderEducationSection();
      case 'skills': return renderSkillsSection();
      case 'languages': return renderLanguagesSection();
      case 'certifications': return renderCertificationsSection();
      case 'projects': return renderProjectsSection();
      default: return <div className="text-gray-500 italic">Unsupported section</div>;
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getSectionIcon(type)}
          <h3 className="text-lg font-semibold">{getSectionTitle(type)}</h3>
        </div>
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <Separator className="mb-4" />
      {renderSectionContent()}
    </Card>
  );
};

export default ResumeSection;

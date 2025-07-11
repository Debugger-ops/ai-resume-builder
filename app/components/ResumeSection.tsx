"use client";
import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  GripVertical, Plus, X, User, FileText, Trash2,
  Briefcase, GraduationCap, Award, Globe, BookOpen, Trophy
} from 'lucide-react';
import { ResumeSectionProps } from '../types/types';
import type { ResumeData, Language, Certification, Project, VolunteerWork, AwardItem, Experience, Education, CustomSection } from '../types/types'




const ResumeSection: React.FC<ResumeSectionProps> = ({
  id, type, resumeData, updatePersonalInfo,
  addExperience, updateExperience, addEducation, updateEducation,
  addSkill, removeSkill, addLanguage, updateLanguage, removeLanguage,
  addCertification, updateCertification, removeCertification,
  addProject, updateProject, removeProject,
  addVolunteer, updateVolunteer, removeVolunteer,
  addAward, updateAward, removeAward
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newTech, setNewTech] = useState('');

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
      case 'awards': return <Trophy className="w-5 h-5 text-amber-500" />;
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
      case 'awards': return 'Awards & Honors';
      default: return 'Custom Section';
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleAddTechnology = (projectId: string) => {
    if (newTech.trim()) {
      const project = resumeData.projects.find(p => p.id === projectId);
      if (project) {
        const updatedTechnologies = [...project.technologies, newTech.trim()];
        updateProject(projectId, 'technologies', updatedTechnologies);
        setNewTech('');
      }
    }
  };

  const handleRemoveTechnology = (projectId: string, techToRemove: string) => {
    const project = resumeData.projects.find(p => p.id === projectId);
    if (project) {
      const updatedTechnologies = project.technologies.filter(tech => tech !== techToRemove);
      updateProject(projectId, 'technologies', updatedTechnologies);
    }
  };

  const renderPersonalSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input className='bg-white text-black' placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} />
      <Input className='bg-white text-black' placeholder="Email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
      <Input className='bg-white text-black' placeholder="Phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
      <Input className='bg-white text-black' placeholder="Location" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
    
    </div>
  );

  const renderSummarySection = () => (
    <Textarea
    className='bg-white text-black'
      placeholder="Write your professional summary..."
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
            <Input className='bg-white text-black' placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
            <Input className='bg-white text-black' placeholder="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
            <Input className='bg-white text-black' placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
            <Input className='bg-white text-black' placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
          </div>
          <Textarea className='bg-white text-black' placeholder="Description" rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
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
            <Input className='bg-white text-black' placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
            <Input className='bg-white text-black' placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
            <Input className='bg-white text-black' placeholder="Field" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
            <Input className='bg-white text-black' placeholder="GPA (optional)" value={edu.gpa || ''} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} />
            <Input className='bg-white text-black' placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
            <Input className='bg-white text-black' placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
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
        <Input className='bg-white text-black' value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} placeholder="e.g. JavaScript" />
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
    <div className="space-y-4">
      {resumeData.languages?.map((lang) => (
        <Card key={lang.id} className="p-4 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start mb-2">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Input
              className='bg-white text-black'
                placeholder="Language"
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Level (e.g. Native, Fluent, Intermediate)"
                value={lang.level}
                onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeLanguage(lang.id)} // ✅ Corrected
              className="ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={addLanguage} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Language
      </Button>
    </div>
  );


  const renderCertificationsSection = () => (
    <div className="space-y-4">
      {resumeData.certifications?.map((cert) => (
        <Card key={cert.id} className="p-4 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start mb-2">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Input
              className='bg-white text-black'
                placeholder="Certification Name"
                value={cert.name ?? ''}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Issuing Organization"
                value={cert.issuer ?? ''}  // ✅ Corrected field name
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Date Obtained"
                value={cert.date ?? ''}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Expiry Date (optional)"
                value={cert.expiryDate ?? ''}
                onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCertification(cert.id)}
              className="ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
      <Button onClick={addCertification} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="space-y-4">
      {resumeData.projects?.map((project) => (
        <Card key={project.id} className="p-4 border-l-4 border-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Input
              className='bg-white text-black'
                placeholder="Project Name"
                value={project.name ?? ''}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Project URL (optional)"
                value={project.url ?? ''}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Start Date (optional)"
                value={project.startDate ?? ''}
                onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="End Date (optional)"
                value={project.endDate ?? ''}
                onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            className='bg-white text-black mb-4'
            placeholder="Project Description"
            rows={3}
            value={project.description}
            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
            
          />
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
              className='bg-white text-black'
                placeholder="Add technology (e.g. React, Node.js)"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTechnology(project.id)}
              />
              <Button onClick={() => handleAddTechnology(project.id)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="flex items-center gap-2">
                  {tech}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveTechnology(project.id, tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
      <Button onClick={addProject} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Project
      </Button>
    </div>
  );

  const renderVolunteerSection = () => (
    <div className="space-y-4">
      {resumeData.volunteer?.map((vol) => (
        <Card key={vol.id} className="p-4 border-l-4 border-pink-500">
          <div className="flex justify-between items-start mb-2">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Input
              className='bg-white text-black'
                placeholder="Organization"
                value={vol.organization}
                onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Position/Role"
                value={vol.position}
                onChange={(e) => updateVolunteer(vol.id, 'position', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Start Date"
                value={vol.startDate}
                onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="End Date"
                value={vol.endDate}
                onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeVolunteer(vol.id)}
              className="ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            className='bg-white text-black'
            placeholder="Description of volunteer work"
            rows={3}
            value={vol.description}
            onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
          />
        </Card>
      ))}
      <Button onClick={addVolunteer} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Volunteer Work
      </Button>
    </div>
  );

  const renderAwardsSection = () => (
    <div className="space-y-4">
      {resumeData.awards?.map((award) => (
        <Card key={award.id} className="p-4 border-l-4 border-amber-500">
          <div className="flex justify-between items-start mb-2">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Input
              className='bg-white text-black'
                placeholder="Award Name"
                value={award.name}
                onChange={(e) => updateAward(award.id, 'name', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Issuing Organization"
                value={award.issuer}
                onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
              />
              <Input
              className='bg-white text-black'
                placeholder="Date Received"
                value={award.date}
                onChange={(e) => updateAward(award.id, 'date', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeAward(award.id)}
              className="ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            className='bg-white text-black'
            placeholder="Award description (optional)"
            rows={2}
            value={award.description || ''}
            onChange={(e) => updateAward(award.id, 'description', e.target.value)}
          />
        </Card>
      ))}
      <Button onClick={addAward} variant="outline" className="w-full mt-2">
        <Plus className="w-4 h-4 mr-2" /> Add Award
      </Button>
    </div>
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
      case 'volunteer': return renderVolunteerSection();
      case 'awards': return renderAwardsSection();
      default: return <div className="text-gray-500 italic">Unsupported section</div>;
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getSectionIcon(type)}
          <h3 className="text-lg font-semibold text-black">{getSectionTitle(type)}</h3>
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

'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import ResumeSection from './ResumeSection';
import { ResumeData } from '../types/types'; // ✅ Make sure this path is correct
import { Dispatch, SetStateAction } from 'react';

interface Props {
  resumeData: ResumeData;
  update: (section: string, value: any) => void;

  updateResumeData: Dispatch<SetStateAction<ResumeData>>; 
  updatePersonalInfo: (field: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | string[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, field: string, value: string) => void;
  removeCertification: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, field: string, value: string | string[]) => void;
  removeProject: (id: string) => void;

  addVolunteer: () => void;
  updateVolunteer: (id: string, field: string, value: string) => void;
  removeVolunteer: (id: string) => void;

  addAward: () => void;
  updateAward: (id: string, field: string, value: string) => void;
  removeAward: (id: string) => void;
}


const SortableResumeSections: React.FC<Props> = ({
  resumeData,
  update,
  updatePersonalInfo,
  updateExperience,
  addExperience,
  updateEducation,
  addEducation,
  addSkill,
  removeSkill,
  addLanguage,
  updateLanguage,
  removeLanguage,

  addCertification,
  updateCertification,
  removeCertification,

  addProject,
  updateProject,
  removeProject,

  addVolunteer,
  updateVolunteer,
  removeVolunteer,

  addAward,
  updateAward,
  removeAward,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleRemoveSkill = (skillToRemove: string) => {
  const updatedSkills = resumeData.skills.filter(skill => skill !== skillToRemove);
  update('skills', updatedSkills);
};




  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.sections.indexOf(active.id as string);
      const newIndex = resumeData.sections.indexOf(over.id as string);
      const newSections = arrayMove(resumeData.sections, oldIndex, newIndex);
      update('sections', newSections);

    }
  };
  

  // ✅ Properly typed and initialized fallback arrays
  const normalized: ResumeData = {
    ...resumeData,
    languages: resumeData.languages ?? [],
    certifications: resumeData.certifications ?? [],
    projects: resumeData.projects ?? [],
    awards: resumeData.awards ?? [],
    experience: resumeData.experience ?? [],
    education: resumeData.education ?? [],
    skills: resumeData.skills ?? [],
    volunteer: resumeData.volunteer ?? [],
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={resumeData.sections} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {resumeData.sections.map((sectionType) => (
            <div
              key={sectionType}
              className="bg-gray-50/50 rounded-lg p-4 border border-gray-200/50 hover:shadow-sm transition-all duration-200"
            >
<ResumeSection
  id={sectionType}
  type={sectionType}
  resumeData={normalized}
  updatePersonalInfo={updatePersonalInfo}

  addExperience={addExperience}
  updateExperience={updateExperience}

  addEducation={addEducation}
  updateEducation={updateEducation}

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

  addVolunteer={addVolunteer}
  updateVolunteer={updateVolunteer}
  removeVolunteer={removeVolunteer}

  addAward={addAward}
  updateAward={updateAward}
  removeAward={removeAward}
/>

            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableResumeSections;

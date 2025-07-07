'use client';

import React from 'react';
import { DndContext, closestCenter, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import ResumeSection from './ResumeSection';
import { ResumeData } from '../start-building/page';

interface Props {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  updateExperience: (id: string, field: string, value: any) => void;
  addExperience: () => void;
  updateEducation: (id: string, field: string, value: any) => void;
  addEducation: () => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

const SortableResumeSections: React.FC<Props> = ({
  resumeData,
  updateResumeData,
  updatePersonalInfo,
  updateExperience,
  addExperience,
  updateEducation,
  addEducation,
  addSkill,
  removeSkill,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.sections.indexOf(active.id as string);
      const newIndex = resumeData.sections.indexOf(over.id as string);
      const newSections = arrayMove(resumeData.sections, oldIndex, newIndex);
      updateResumeData({ ...resumeData, sections: newSections });
    }
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
                resumeData={resumeData}
                updatePersonalInfo={updatePersonalInfo}
                addExperience={addExperience}
                updateExperience={updateExperience}
                addEducation={addEducation}
                updateEducation={updateEducation}
                addSkill={addSkill}
                removeSkill={removeSkill}
              />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableResumeSections;

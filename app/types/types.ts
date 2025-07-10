export interface Language {
  id: string;
  name: string;
  level: string;
}

export type CustomSection = {
  id: string;
  title: string;
  content: string;
};

export type Certification = {
  id: string;
  name: string;
  issue: string;
  date: string;
  expiryDate?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
};

export type AwardItem = {
  id: string;
  name: string;
  date: string;
  issuer: string;
  description?: string;
};


export type Experience = {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
};

export type Education = {
  id: string;
  institution: string;
  field: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
};

export type VolunteerWork = {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
};

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[]; // ✅ fixed
  certifications: Certification[]; // ✅ fixed
  projects: Project[];
  customSections: CustomSection[];
  
  sections: string[];
  metadata: {
    completionScore: number;
    lastModified: Date;
    version: number;
    template: string;
  };
  volunteer: VolunteerWork[];
  awards: AwardItem[];
}

export type ResumeSectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | 'volunteer'
  | 'awards';

export interface ResumeSectionProps {
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
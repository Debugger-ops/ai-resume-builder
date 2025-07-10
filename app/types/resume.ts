export interface ResumeItem {
  id: string;
  name: string;
}

export interface ResumeData {
  languages: ResumeItem[];
  certifications: ResumeItem[];
  projects: ResumeItem[];
  volunteer: ResumeItem[];
  awards: ResumeItem[];
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


export interface ResumeSectionHandlers {
  addLanguage: () => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, field: string, value: string) => void;
  removeCertification: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, field: string, value: string) => void;
  removeProject: (id: string) => void;

  addVolunteer: () => void;
  updateVolunteer: (id: string, field: string, value: string) => void;
  removeVolunteer: (id: string) => void;

  addAward: () => void;
  updateAward: (id: string, field: string, value: string) => void;
  removeAward: (id: string) => void;
}

export interface Props extends ResumeSectionHandlers {
  resumeData: ResumeData;
}

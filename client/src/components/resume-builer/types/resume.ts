export type PersonalDetailsForm = {
  fname: string;
  lname: string;
  email: string;
  website?: string;
  phone?: string;
  location?: string;
};

export type ProjectForm = {
  pname: string;
  link?: string;
  date: string;
  description?: string;
};

export type SkillsForm = {
  skills: string;
};

export type EducationForm = {
  cname: string;
  areaofstudy: string;
  typeofstudy: string;
  datefrom: string;
  dateto: string;
  score: string;
};

export type ExperienceForm = {
  companyName: string;
  location: string;
  duration: string;
  position: string;
  description: string;
};

export type ResumeFormData = {
  personalDetails: PersonalDetailsForm;
  projects: ProjectForm[];
  skills: SkillsForm;
  education: EducationForm[];
  experience: ExperienceForm[];
};

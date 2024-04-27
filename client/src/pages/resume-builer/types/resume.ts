export type PersonalDetailsForm = {
  fname: string;
  lname: string;
  email: string;
  website?: string;
  phone?: string;
  location?: string;
};

export type ProjectForm = {
  title1: string;
  link1: string;
  projectDescription1: string;
  title2?: string;
  link2?: string;
  projectDescription2?: string;
  title3?: string;
  link3?: string;
  projectDescription3?: string;
};

export type SkillsForm = {
  skills: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type EducationForm = {
  college: string;
  fromyear1: string;
  toyear1: string;
  qualification1: string;
  description1: string;
  school: string;
  fromyear2: string;
  toyear2: string;
  qualification2: string;
  description2: string;
};

export type ExperienceForm = {
  institute1: string;
  position1: string;
  duration1: string;
  experienceDescription1: string;
  institute2?: string;
  position2?: string;
  duration2?: string;
  experienceDescription2?: string;
};

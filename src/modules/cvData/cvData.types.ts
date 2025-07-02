import { Document, Types } from 'mongoose';

export interface IPersonalInfo {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  website?: string | null;
  dob?: Date | null;
  nationality?: string | null;
  gender?: 'Male' | 'Female' | 'Other' | null;
}

export interface ISkills {
  technicalSkills?: string[];
  softSkills?: string[];
  languages?: {
    language: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }[];
}

export interface IEducation {
  institution?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  gpa?: string | null;
  location?: string | null;
}

export interface IWorkExperience {
  company?: string | null;
  position?: string | null;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  currentlyWorking?: boolean | null;
  responsibilities?: string[];
  technologiesUsed?: string[];
}

export interface ICertification {
  name?: string | null;
  issuer?: string | null;
  issueDate?: Date | null;
  expirationDate?: Date | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
}

export interface IProject {
  title?: string | null;
  description?: string | null;
  technologies?: string[];
  url?: string | null;
  githubRepo?: string | null;
}

export interface ICv extends Document {
  _id: Types.ObjectId;
  personalInfo: IPersonalInfo;
  skills: ISkills;
  education: IEducation[];
  workExperience: IWorkExperience[];
  certifications: ICertification[];
  projects: IProject[];
}

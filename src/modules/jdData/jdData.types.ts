import { Document, Types } from 'mongoose';

export interface ISalaryRange {
  min?: number;
  max?: number;
  currency?: string;
  period?: 'per annum' | 'per month' | 'per week' | 'per day' | 'per hour';
}

export interface IEducationRequirement {
  degree?: string;
  fieldOfStudy?: string;
  required?: boolean;
}

export interface IJd extends Document {
  _id: Types.ObjectId;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  employmentType?:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Temporary'
    | 'Internship'
    | 'Freelance';
  experienceLevel?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Manager';
  requiredExperienceYears?: number;
  salaryRange?: ISalaryRange;
  skillsRequired?: [string];
  technologies?: [string];
  educationRequirements?: IEducationRequirement;
  responsibilities?: [string];
  qualifications?: [string];
  preferredQualifications?: [string];
  softSkills?: [string];
  jobDescriptionSummary?: string;
  benefits?: [string];
  applicationDeadline?: Date;
  jobPostingDate: Date;
  jobId?: string;
  source?: string;
}

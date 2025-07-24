import mongoose, { Schema } from 'mongoose';
import {
  ICertification,
  ICv,
  IEducation,
  IPersonalInfo,
  IProject,
  ISkills,
  IWorkExperience,
} from './cvData.types';

const personalInfoSchema = new Schema<IPersonalInfo>({
  fullName: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  linkedinUrl: { type: String, default: null },
  githubUrl: { type: String, default: null },
  portfolioUrl: { type: String, default: null },
  website: { type: String, default: null },
  dob: { type: Date, default: null },
  nationality: { type: String, default: null },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', null],
    default: null,
  },
});

const skillsSchema = new Schema<ISkills>({
  technicalSkills: { type: [String] },
  softSkills: [String],
  languages: [
    {
      language: { type: String },
      proficiency: {
        type: String,
        enum: ['Basic', 'Conversational', 'Fluent', 'Native'],
      },
    },
  ],
});

const educationSchema = new Schema<IEducation>({
  institution: { type: String, default: null },
  degree: { type: String, default: null },
  fieldOfStudy: { type: String, default: null },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  gpa: { type: String, default: null },
  location: { type: String, default: null },
});

const workExperienceSchema = new Schema<IWorkExperience>({
  company: { type: String, default: null },
  position: { type: String, default: null },
  location: { type: String, default: null },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  currentlyWorking: { type: Boolean, default: null },
  responsibilities: [String],
  technologiesUsed: [String],
});

const certificationsSchema = new Schema<ICertification>({
  name: { type: String, default: null },
  issuer: { type: String, default: null },
  issueDate: { type: Date, default: null },
  expirationDate: { type: Date, default: null },
  credentialId: { type: String, default: null },
  credentialUrl: { type: String, default: null },
});

const projectsSchema = new Schema<IProject>({
  title: { type: String, default: null },
  description: { type: String, default: null },
  technologies: [String],
  url: { type: String, default: null },
  githubRepo: { type: String, default: null },
});

const cvSchema = new Schema(
  {
    personalInfo: { type: personalInfoSchema, required: true },
    skills: { type: skillsSchema },
    education: [educationSchema],
    workExperience: [workExperienceSchema],
    certifications: [certificationsSchema],
    projects: [projectsSchema],
    image: {
      type: String,
      default: null,
    },
  },
  { collection: 'cv_data', timestamps: true }
);

export default mongoose.model<ICv>('cv_data', cvSchema);

import mongoose, { Schema } from 'mongoose';
import { IEducationRequirement, IJd, ISalaryRange } from './jdData.types';

const salaryRangeSchema = new Schema<ISalaryRange>({
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  currency: { type: String, default: null },
  period: {
    type: String,
    enum: ['per annum', 'per month', 'per week', 'per day', 'per hour', null],
    default: null,
  },
});

const educationRequirementSchema = new Schema<IEducationRequirement>({
  degree: { type: String, default: null },
  fieldOfStudy: { type: String, default: null },
  required: { type: Boolean, default: null },
});

const jdSchema = new Schema(
  {
    jobTitle: { type: String, default: null, required: true },
    companyName: { type: String, default: null },
    location: { type: String, default: null },
    employmentType: {
      type: String,
      enum: [
        'Full-time',
        'Part-time',
        'Contract',
        'Temporary',
        'Internship',
        'Freelance',
        null,
      ],
      default: null,
    },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Manager', null],
      default: null,
    },
    requiredExperienceYears: { type: Number, default: null },
    salaryRange: salaryRangeSchema,
    skillsRequired: { type: [String] },
    technologies: [String],
    educationRequirements: [educationRequirementSchema],
    responsibilities: { type: [String] },
    qualifications: [String],
    preferredQualifications: [String],
    softSkills: [String],
    jobDescriptionSummary: { type: String, default: null },
    benefits: [String],
    applicationDeadline: { type: Date, default: null },
    jobPostingDate: { type: Date, default: null },
    jobId: { type: String, default: null },
    source: { type: String, default: null },
  },
  { collection: 'jd_data', timestamps: true }
);

export default mongoose.model<IJd>('jd_data', jdSchema);

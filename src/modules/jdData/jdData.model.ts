import mongoose from 'mongoose';

const salaryRangeSchema = new mongoose.Schema({
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  currency: { type: String, default: null },
  period: {
    type: String,
    enum: ['per annum', 'per month', 'per week', 'per day', 'per hour', null],
    default: null,
  },
});

const educationRequirementSchema = new mongoose.Schema({
  degree: { type: String, default: null, required: true },
  field_of_study: { type: String, default: null },
  required: { type: Boolean, default: null },
});

const jdSchema = new mongoose.Schema(
  {
    job_title: { type: String, default: null, required: true },
    company_name: { type: String, default: null },
    location: { type: String, default: null },
    employment_type: {
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
    experience_level: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Manager', null],
      default: null,
    },
    required_experience_years: { type: Number, default: null },
    salary_range: salaryRangeSchema,
    skills_required: { type: [String], required: true },
    technologies: [String],
    education_requirements: [educationRequirementSchema],
    responsibilities: { type: [String], required: true },
    qualifications: [String],
    preferred_qualifications: [String],
    soft_skills: [String],
    job_description_summary: { type: String, default: null },
    benefits: [String],
    application_deadline: { type: Date, default: null },
    job_posting_date: { type: Date, default: null },
    job_id: { type: String, default: null },
    source: { type: String, default: null },
  },
  { collection: 'jd_data' }
);

export default mongoose.model('jd_data', jdSchema);

import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  full_name: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  linkedin_url: { type: String, default: null },
  github_url: { type: String, default: null },
  portfolio_url: { type: String, default: null },
  website: { type: String, default: null },
  dob: { type: Date, default: null },
  nationality: { type: String, default: null },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', null],
    default: null,
  },
});

const skillsSchema = new mongoose.Schema({
  technical_skills: { type: [String] },
  soft_skills: [String],
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

const educationSchema = new mongoose.Schema({
  institution: { type: String, default: null },
  degree: { type: String, default: null },
  field_of_study: { type: String, default: null },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },
  gpa: { type: String, default: null },
  location: { type: String, default: null },
});

const workExperienceSchema = new mongoose.Schema({
  company: { type: String, default: null },
  position: { type: String, default: null },
  location: { type: String, default: null },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },
  currently_working: { type: Boolean, default: null },
  responsibilities: [String],
  technologies_used: [String],
});

const certificationsSchema = new mongoose.Schema({
  name: { type: String, default: null },
  issuer: { type: String, default: null },
  issue_date: { type: Date, default: null },
  expiration_date: { type: Date, default: null },
  credential_id: { type: String, default: null },
  credential_url: { type: String, default: null },
});

const projectsSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  technologies: [String],
  url: { type: String, default: null },
  github_repo: { type: String, default: null },
});

const cvSchema = new mongoose.Schema(
  {
    personal_info: { type: personalInfoSchema, required: true },
    skills: { type: skillsSchema, required: true },
    education: [educationSchema],
    work_experience: [workExperienceSchema],
    certifications: [certificationsSchema],
    projects: [projectsSchema],
  },
  { collection: 'cv_data' }
);

export default mongoose.model('cv_data', cvSchema);

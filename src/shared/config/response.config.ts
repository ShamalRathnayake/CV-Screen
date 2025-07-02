export const cvResFormat = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      properties: {
        fullName: { type: ['string', 'null'] },
        email: { type: ['string', 'null'], format: 'email' },
        phone: { type: ['string', 'null'] },
        address: { type: ['string', 'null'] },
        linkedinUrl: { type: ['string', 'null'], format: 'uri' },
        githubUrl: { type: ['string', 'null'], format: 'uri' },
        portfolioUrl: { type: ['string', 'null'], format: 'uri' },
        website: { type: ['string', 'null'], format: 'uri' },
        dob: { type: ['string', 'null'], format: 'date' },
        nationality: { type: ['string', 'null'] },
        gender: {
          type: ['string', 'null'],
          enum: ['Male', 'Female', 'Other', null],
        },
      },
      required: ['fullName', 'email'],
    },
    skills: {
      type: 'object',
      properties: {
        technicalSkills: { type: 'array', items: { type: 'string' } },
        softSkills: { type: 'array', items: { type: 'string' } },
        languages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              language: { type: 'string' },
              proficiency: {
                type: 'string',
                enum: ['Basic', 'Conversational', 'Fluent', 'Native'],
              },
            },
            required: ['language'],
          },
        },
      },
      required: ['technicalSkills'],
    },
    education: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          institution: { type: ['string', 'null'] },
          degree: { type: ['string', 'null'] },
          fieldOfStudy: { type: ['string', 'null'] },
          startDate: { type: ['string', 'null'], format: 'date' },
          endDate: { type: ['string', 'null'], format: 'date' },
          gpa: { type: ['string', 'null'] },
          location: { type: ['string', 'null'] },
        },
        required: ['institution', 'degree'],
      },
    },
    workExperience: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          company: { type: ['string', 'null'] },
          position: { type: ['string', 'null'] },
          location: { type: ['string', 'null'] },
          startDate: { type: ['string', 'null'], format: 'date' },
          endDate: { type: ['string', 'null'], format: 'date' },
          currentlyWorking: { type: ['boolean', 'null'] },
          responsibilities: { type: 'array', items: { type: 'string' } },
          technologiesUsed: { type: 'array', items: { type: 'string' } },
        },
        required: ['company', 'position'],
      },
    },
    certifications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: ['string', 'null'] },
          issuer: { type: ['string', 'null'] },
          issueDate: { type: ['string', 'null'], format: 'date' },
          expirationDate: { type: ['string', 'null'], format: 'date' },
          credentialId: { type: ['string', 'null'] },
          credentialUrl: { type: ['string', 'null'], format: 'uri' },
        },
        required: ['name'],
      },
    },
    projects: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: ['string', 'null'] },
          description: { type: ['string', 'null'] },
          technologies: { type: 'array', items: { type: 'string' } },
          url: { type: ['string', 'null'], format: 'uri' },
          githubRepo: { type: ['string', 'null'], format: 'uri' },
        },
        required: ['title'],
      },
    },
  },
  required: ['personalInfo', 'skills', 'education'],
};

export const jdResFormat = {
  type: 'object',
  properties: {
    jobTitle: { type: ['string', 'null'] },
    companyName: { type: ['string', 'null'] },
    location: { type: ['string', 'null'] },
    employmentType: {
      type: ['string', 'null'],
      enum: [
        'Full-time',
        'Part-time',
        'Contract',
        'Temporary',
        'Internship',
        'Freelance',
        null,
      ],
    },
    experienceLevel: {
      type: ['string', 'null'],
      enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Manager', null],
    },
    requiredExperienceYears: { type: ['number', 'null'] },
    salaryRange: {
      type: 'object',
      properties: {
        min: { type: ['number', 'null'] },
        max: { type: ['number', 'null'] },
        currency: { type: ['string', 'null'] },
        period: {
          type: ['string', 'null'],
          enum: [
            'per annum',
            'per month',
            'per week',
            'per day',
            'per hour',
            null,
          ],
        },
      },
      required: [],
    },
    skillsRequired: {
      description:
        'List of required technical and domain-specific skills (e.g., JavaScript, AWS, accounting)',
      type: 'array',
      items: { type: 'string' },
    },
    technologies: {
      description:
        'List of tools, frameworks, or platforms explicitly mentioned (e.g., React, Docker, Kubernetes)',
      type: 'array',
      items: { type: 'string' },
    },
    educationRequirements: {
      description:
        'Formal education qualifications like degrees or certifications',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          degree: {
            type: ['string', 'null'],
            description: 'e.g., BSc, MSc, PhD, High School Diploma',
          },
          fieldOfStudy: {
            type: ['string', 'null'],
            description: 'e.g., Computer Science, Business Administration',
          },
          required: {
            type: ['boolean', 'null'],
            description: 'Is the degree mandatory?',
          },
        },
        required: ['degree'],
      },
    },
    responsibilities: {
      type: 'array',
      items: { type: 'string' },
    },
    qualifications: {
      type: 'array',
      items: { type: 'string' },
    },
    preferredQualifications: {
      type: 'array',
      items: { type: 'string' },
    },
    softSkills: {
      type: 'array',
      items: { type: 'string' },
    },
    jobDescriptionSummary: { type: ['string', 'null'] },
    benefits: {
      type: 'array',
      items: { type: 'string' },
    },
    applicationDeadline: { type: ['string', 'null'], format: 'date' },
    jobPostingDate: { type: ['string', 'null'], format: 'date' },
    jobId: { type: ['string', 'null'] },
    source: { type: ['string', 'null'] },
  },
  required: ['jobTitle', 'skillsRequired', 'responsibilities'],
};

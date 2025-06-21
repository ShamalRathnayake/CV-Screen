export const cvResFormat = {
  type: 'object',
  properties: {
    personal_info: {
      type: 'object',
      properties: {
        full_name: { type: ['string', 'null'] },
        email: { type: ['string', 'null'], format: 'email' },
        phone: { type: ['string', 'null'] },
        address: { type: ['string', 'null'] },
        linkedin_url: { type: ['string', 'null'], format: 'uri' },
        github_url: { type: ['string', 'null'], format: 'uri' },
        portfolio_url: { type: ['string', 'null'], format: 'uri' },
        website: { type: ['string', 'null'], format: 'uri' },
        dob: { type: ['string', 'null'], format: 'date' },
        nationality: { type: ['string', 'null'] },
        gender: {
          type: ['string', 'null'],
          enum: ['Male', 'Female', 'Other', null],
        },
      },
      required: ['full_name', 'email'],
    },

    // summary: { type: ['string', 'null'] },
    // objective: { type: ['string', 'null'] },

    skills: {
      type: 'object',
      properties: {
        technical_skills: { type: 'array', items: { type: 'string' } },
        soft_skills: { type: 'array', items: { type: 'string' } },
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
      required: ['technical_skills'],
    },

    education: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          institution: { type: ['string', 'null'] },
          degree: { type: ['string', 'null'] },
          field_of_study: { type: ['string', 'null'] },
          start_date: { type: ['string', 'null'], format: 'date' },
          end_date: { type: ['string', 'null'], format: 'date' },
          gpa: { type: ['string', 'null'] },
          location: { type: ['string', 'null'] },
        },
        required: ['institution', 'degree'],
      },
    },

    work_experience: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          company: { type: ['string', 'null'] },
          position: { type: ['string', 'null'] },
          location: { type: ['string', 'null'] },
          start_date: { type: ['string', 'null'], format: 'date' },
          end_date: { type: ['string', 'null'], format: 'date' },
          currently_working: { type: ['boolean', 'null'] },
          responsibilities: { type: 'array', items: { type: 'string' } },
          technologies_used: { type: 'array', items: { type: 'string' } },
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
          issue_date: { type: ['string', 'null'], format: 'date' },
          expiration_date: { type: ['string', 'null'], format: 'date' },
          credential_id: { type: ['string', 'null'] },
          credential_url: { type: ['string', 'null'], format: 'uri' },
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
          github_repo: { type: ['string', 'null'], format: 'uri' },
        },
        required: ['title'],
      },
    },

    // publications: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       title: { type: ['string', 'null'] },
    //       journal: { type: ['string', 'null'] },
    //       year: { type: ['string', 'null'] },
    //       link: { type: ['string', 'null'], format: 'uri' },
    //     },
    //     required: ['title'],
    //   },
    // },

    // awards: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       title: { type: ['string', 'null'] },
    //       issuer: { type: ['string', 'null'] },
    //       year: { type: ['string', 'null'] },
    //     },
    //     required: ['title'],
    //   },
    // },

    // volunteer_experience: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       organization: { type: ['string', 'null'] },
    //       role: { type: ['string', 'null'] },
    //       location: { type: ['string', 'null'] },
    //       start_date: { type: ['string', 'null'], format: 'date' },
    //       end_date: { type: ['string', 'null'], format: 'date' },
    //       description: { type: ['string', 'null'] },
    //     },
    //     required: ['organization'],
    //   },
    // },

    // hobbies_and_interests: {
    //   type: 'array',
    //   items: { type: 'string' },
    // },

    // references: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       name: { type: ['string', 'null'] },
    //       relationship: { type: ['string', 'null'] },
    //       contact: { type: ['string', 'null'] },
    //       email: { type: ['string', 'null'], format: 'email' },
    //     },
    //     required: ['name'],
    //   },
    // },
  },
  required: ['personal_info', 'skills', 'education'],
};
export const jdResFormat = {
  type: 'object',
  properties: {
    job_title: { type: ['string', 'null'] },
    company_name: { type: ['string', 'null'] },
    location: { type: ['string', 'null'] },
    employment_type: {
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
    experience_level: {
      type: ['string', 'null'],
      enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Manager', null],
    },
    required_experience_years: { type: ['number', 'null'] },

    salary_range: {
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

    skills_required: {
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

    education_requirements: {
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
          field_of_study: {
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

    preferred_qualifications: {
      type: 'array',
      items: { type: 'string' },
    },

    soft_skills: {
      type: 'array',
      items: { type: 'string' },
    },

    job_description_summary: { type: ['string', 'null'] },

    benefits: {
      type: 'array',
      items: { type: 'string' },
    },

    application_deadline: { type: ['string', 'null'], format: 'date' },
    job_posting_date: { type: ['string', 'null'], format: 'date' },
    job_id: { type: ['string', 'null'] },
    source: { type: ['string', 'null'] },
  },
  required: ['job_title', 'skills_required', 'responsibilities'],
};

import { createReadStream } from 'fs';
import { commonConfig } from '../config/common.config';
import { cvResFormat, jdResFormat } from '../config/response.config';
import { logger } from '../utils/logger.utils';
import { Ollama } from 'ollama';
import axios from 'axios';
import { config } from '../config/env.config';
import path from 'path';
import FormData from 'form-data';

export class ExtractorService {
  private readonly model;
  private readonly client;
  private static instance: ExtractorService;

  private constructor() {
    this.model = commonConfig.model;
    this.client = new Ollama({ host: commonConfig.ollamaUrl });
  }

  public static getInstance(): ExtractorService {
    if (!ExtractorService.instance) {
      const instance = new ExtractorService();
      ExtractorService.instance = instance;
    }
    return ExtractorService.instance;
  }

  async extractFromCV(cvText: string) {
    const prompt = this.buildPrompt('cv', cvText);
    return this.callModel(prompt, false);
  }

  async extractFromJD(jdText: string) {
    const prompt = this.buildPrompt('jd', jdText);
    return this.callModel(prompt, true);
  }

  private buildPrompt(type: 'cv' | 'jd', data: any): string {
    if (type === 'cv') {
      return `Extract structured candidate info from the following CV and make sure to add spaces between words where needed:\n\n${data}`;
    } else {
      return `Extract the following fields from the job description. JobTitle is the title of the position. CompanyName is the employer or company name. Location is the work location or location mentioned in the job description. EmploymentType can be full-time, part-time, contract, etc. ExperienceLevel can be entry, mid, senior, lead, or manager. RequiredExperienceYears is the number of years if mentioned. SalaryRange includes min, max, currency, and period. SkillsRequired includes only specific technical or hard skills like Python, Marketing, or Excel. Technologies are tools, platforms, or frameworks like React, Docker, or Salesforce. EducationRequirements must include degrees such as BSc, MSc, or PhD and optionally the field of study like Computer Science. Do not include degrees in skillsRequired. Responsibilities are the core duties or tasks. Qualifications are general requirements like experience, traits, or certifications. PreferredQualifications are optional or nice-to-have requirements. SoftSkills are behavioral or interpersonal skills like communication or leadership. JobDescriptionSummary is a short summary. Benefits, applicationDeadline, jobPostingDate, jobId, and source should be included if found. Return the output as a JSON object in the specified format.:\n\n${data}`;
    }
  }

  private async callModel(prompt: string, isJd: boolean) {
    try {
      const result = await this.client.generate({
        model: this.model,
        prompt,
        stream: false,
        format: isJd ? jdResFormat : cvResFormat,
      });

      return JSON.parse(result.response);
    } catch (err: any) {
      logger.error('Model call failed:', err.message);
      throw new Error('Failed to extract data using LLM');
    }
  }

  public async extractImageFromCv(cvPath: string): Promise<string> {
    try {
      const cvFile = createReadStream(cvPath);
      const form = new FormData();
      form.append('file', cvFile, {
        filename: path.basename(cvPath),
        contentType: 'application/pdf',
      });

      const response = await axios.post(`${config.modelUrl}upload`, form, {
        headers: form.getHeaders(),
      });

      if (response?.data?.status) return response?.data?.profile_image_base64;
      return '';
    } catch (err: any) {
      logger.error('Extracting image failed:', err.message);
      throw new Error('Failed to extract image using model server');
    }
  }
}

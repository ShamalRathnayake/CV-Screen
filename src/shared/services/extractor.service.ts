import { commonConfig } from '../config/common.config';
import { cvResFormat, jdResFormat } from '../config/response.config';
import { logger } from '../utils/logger.utils';
import { Ollama } from 'ollama';

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
      return `Extract the following fields from the job description. Job_title is the title of the position. Company_name is the employer or company name. Location is the work location or location mentioned in the job description. Employment_type can be full-time, part-time, contract, etc. Experience_level can be entry, mid, senior, lead, or manager. Required_experience_years is the number of years if mentioned. Salary_range includes min, max, currency, and period. Skills_required includes only specific technical or hard skills like Python, Marketing, or Excel. Technologies are tools, platforms, or frameworks like React, Docker, or Salesforce. Education_requirements must include degrees such as BSc, MSc, or PhD and optionally the field of study like Computer Science. Do not include degrees in skills_required. Responsibilities are the core duties or tasks. Qualifications are general requirements like experience, traits, or certifications. Preferred_qualifications are optional or nice-to-have requirements. Soft_skills are behavioral or interpersonal skills like communication or leadership. Job_description_summary is a short summary. Benefits, application_deadline, job_posting_date, job_id, and source should be included if found. Return the output as a JSON object in the specified format.:\n\n${data}`;
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
}

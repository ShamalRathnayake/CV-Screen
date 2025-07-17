export class Transformer {
  constructor() {}

  //   public static async prepareCVTextForEmbedding(cv: any): Promise<string[]> {
  //     const result: string[] = [];

  //     if (cv.skills.technical_skills?.length) {
  //       result.push('Technical Skills:');
  //       cv.skills.technical_skills.forEach((skill: string) =>
  //         result.push(skill.replace(/,/g, ', '))
  //       );
  //     }

  //     if (cv.skills.languages?.length) {
  //       result.push('Languages:');
  //       cv.skills.languages.forEach(
  //         (lang: { language: any; proficiency: any }) => {
  //           result.push(`${lang.language} (${lang.proficiency})`);
  //         }
  //       );
  //     }

  //     if (cv.education?.length) {
  //       result.push('Education:');
  //       cv.education.forEach(
  //         (edu: {
  //           degree: any;
  //           institution: any;
  //           start_date: any;
  //           end_date: any;
  //         }) => {
  //           result.push(
  //             `${edu.degree ?? 'Degree'} in ${edu.institution ?? 'Institution'} (${edu.start_date} to ${edu.end_date})`
  //           );
  //         }
  //       );
  //     }

  //     if (cv.work_experience?.length) {
  //       result.push('Work Experience:');
  //       cv.work_experience.forEach(
  //         (exp: {
  //           position: any;
  //           company: any;
  //           start_date: any;
  //           end_date: any;
  //         }) => {
  //           result.push(
  //             `${exp.position ?? 'Position'} at ${exp.company ?? 'Company'} (${exp.start_date} to ${exp.end_date})`
  //           );
  //         }
  //       );
  //     }

  //     if (cv.projects?.length) {
  //       result.push('Projects:');
  //       cv.projects.forEach(
  //         (project: { title: any; description: string; technologies: any[] }) => {
  //           result.push(`Project: ${project.title}`);
  //           if (project.description) result.push(project.description);
  //           if (project.technologies?.length)
  //             result.push(`Technologies: ${project.technologies.join(', ')}`);
  //         }
  //       );
  //     }

  //     if (cv.publications?.length) {
  //       result.push('Publications:');
  //       cv.publications.forEach(
  //         (pub: { title: any; journal: any; year: any }) => {
  //           result.push(`Title: ${pub.title}`);
  //           if (pub.journal) result.push(`Journal: ${pub.journal}`);
  //           if (pub.year) result.push(`Year: ${pub.year}`);
  //         }
  //       );
  //     }

  //     if (cv.awards?.length) {
  //       result.push('Awards:');
  //       cv.awards.forEach((award: { title: any; year: any }) => {
  //         result.push(`${award.title} (${award.year || 'Year not specified'})`);
  //       });
  //     }

  //     if (cv.volunteer_experience?.length) {
  //       result.push('Volunteer Experience:');
  //       cv.volunteer_experience.forEach(
  //         (vol: { role: any; organization: any }) => {
  //           result.push(`${vol.role} at ${vol.organization}`);
  //         }
  //       );
  //     }

  //     return result;
  //   }

  public static async prepareCVTextForEmbedding(
    cv: any
  ): Promise<Record<string, string[]>> {
    return {
      combined: [
        ...this.extractTechnicalSkills(cv),
        ...this.extractCertifications(cv),
        ...this.extractLanguages(cv),
        ...this.extractEducation(cv),
        ...this.extractWorkExperience(cv),
        ...this.extractProjects(cv),
        ...this.extractPublications(cv),
        ...this.extractAwards(cv),
        ...this.extractVolunteerExperience(cv),
      ],
      technical: [
        ...this.extractTechnicalSkills(cv),
        ...this.extractLanguages(cv),
        ...this.extractProjects(cv),
        ...this.extractCertifications(cv),
      ],
      education: this.extractEducation(cv),
      workExp: this.extractWorkExperience(cv),
    };
  }

  public static extractTechnicalSkills(cv: any): string[] {
    const result: string[] = [];
    if (cv.skills?.technicalSkills?.length) {
      result.push('Technical Skills:');
      cv.skills.technicalSkills.forEach((skill: string) =>
        result.push(skill.replace(/,/g, ', '))
      );
    }
    return result;
  }

  public static extractCertifications(cv: any): string[] {
    const result: string[] = [];
    if (cv.certifications?.length) {
      result.push('Certifications:');
      cv.certifications.forEach((cert: { name: string; issuer?: string }) => {
        const parts: string[] = [];
        if (cert.name) parts.push(cert.name);
        if (cert.issuer) parts.push(`by ${cert.issuer}`);
        result.push(parts.join(', '));
      });
    }
    return result;
  }

  public static extractLanguages(cv: any): string[] {
    const result: string[] = [];
    if (cv.skills?.languages?.length) {
      result.push('Languages:');
      cv.skills.languages.forEach(
        (lang: { language: string; proficiency: string }) => {
          result.push(`${lang.language} (${lang.proficiency})`);
        }
      );
    }
    return result;
  }

  public static extractEducation(cv: any): string[] {
    const result: string[] = [];
    if (cv.education?.length) {
      result.push('Education:');
      cv.education.forEach(
        (edu: {
          degree: string;
          institution: string;
          startDate: string;
          endDate: string;
        }) => {
          result.push(
            `${edu.degree ?? 'Degree'} in ${edu.institution ?? 'Institution'} (${edu.startDate} to ${edu.endDate})`
          );
        }
      );
    }
    return result;
  }

  public static extractWorkExperience(cv: any): string[] {
    const result: string[] = [];
    if (cv.workExperience?.length) {
      result.push('Work Experience:');
      cv.workExperience.forEach(
        (exp: {
          position: string;
          company: string;
          startDate: string;
          endDate: string;
        }) => {
          result.push(
            `${exp.position ?? 'Position'} at ${exp.company ?? 'Company'} (${exp.startDate} to ${exp.endDate})`
          );
        }
      );
    }
    return result;
  }

  public static extractProjects(cv: any): string[] {
    const result: string[] = [];
    if (cv.projects?.length) {
      result.push('Projects:');
      cv.projects.forEach(
        (project: {
          title: string;
          description: string;
          technologies: string[];
        }) => {
          result.push(`Project: ${project.title}`);
          if (project.description) result.push(project.description);
          if (project.technologies?.length)
            result.push(`Technologies: ${project.technologies.join(', ')}`);
        }
      );
    }
    return result;
  }

  public static extractPublications(cv: any): string[] {
    const result: string[] = [];
    if (cv.publications?.length) {
      result.push('Publications:');
      cv.publications.forEach(
        (pub: { title: string; journal: string; year: string }) => {
          result.push(`Title: ${pub.title}`);
          if (pub.journal) result.push(`Journal: ${pub.journal}`);
          if (pub.year) result.push(`Year: ${pub.year}`);
        }
      );
    }
    return result;
  }

  public static extractAwards(cv: any): string[] {
    const result: string[] = [];
    if (cv.awards?.length) {
      result.push('Awards:');
      cv.awards.forEach((award: { title: string; year: string }) => {
        result.push(`${award.title} (${award.year || 'Year not specified'})`);
      });
    }
    return result;
  }

  public static extractVolunteerExperience(cv: any): string[] {
    const result: string[] = [];
    if (cv.volunteerExperience?.length) {
      result.push('Volunteer Experience:');
      cv.volunteerExperience.forEach(
        (vol: { role: string; organization: string }) => {
          result.push(`${vol.role} at ${vol.organization}`);
        }
      );
    }
    return result;
  }

  public static async prepareJDTextForEmbedding(jd: any): Promise<string[]> {
    const result: string[] = [];

    if (jd.jobTitle) result.push(`Job Title: ${jd.jobTitle}`);

    if (jd.skillsRequired?.length) {
      result.push('Required Skills:');
      jd.skillsRequired.forEach((skill: string) => result.push(skill));
    }

    if (jd.responsibilities?.length) {
      result.push('Responsibilities:');
      jd.responsibilities.forEach((resp: string) => result.push(resp));
    }

    if (jd.qualifications?.length) {
      result.push('Qualifications:');
      jd.qualifications.forEach((q: string) => result.push(q));
    }

    if (jd.preferredQualifications?.length) {
      result.push('Preferred Qualifications:');
      jd.preferredQualifications.forEach((pq: string) => result.push(pq));
    }

    return result;
  }
}

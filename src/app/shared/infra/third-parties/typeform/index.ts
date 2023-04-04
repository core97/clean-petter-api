import { Fetcher } from '@shared/application/fetcher';
import { Logger } from '@shared/application/logger';
import { InternalServerError } from '@shared/application/errors/internal-server.error';
import { RetriveResponse } from './typeform-response.interface';
import { RetriveForm } from './typeform-form.interface';

export class Typeform {
  private BASE_URL = 'https://api.typeform.com';

  private fetcher: Fetcher;

  private logger: Logger;

  constructor(dependencies: { fetcher: Fetcher; logger: Logger }) {
    this.fetcher = dependencies.fetcher;
    this.logger = dependencies.logger;
  }

  async getFormResult(formId: string, responseId: string) {
    try {
      this.logger.info(
        `Getting form result from ${formId} form and ${responseId} response`
      );

      const [response, form] = await Promise.all([
        this.retrieveResponses(formId, responseId),
        this.retrieveForm(formId),
      ]);

      const result = this.mapToFormResult(response, form);

      return result;
    } catch (error) {
      throw new InternalServerError(
        `Could not get the result of the Typeform form:\n${error}`
      );
    }
  }

  private mapToFormResult(response: RetriveResponse, form: RetriveForm) {
    const questionsAndResponses = response.items[0].answers.map(answer => {
      const questionRef = answer.field.ref;
      const question = form.fields.find(field => field.ref === questionRef);

      return {
        answer: answer.choice?.label || answer.text || 'NONE_ANSWER',
        question: question?.title || 'NONE_QUESTION',
        questionType: answer.field.type,
      };
    });

    return {
      lang: form.settings.language,
      formResult: questionsAndResponses,
    };
  }

  private async retrieveResponses(formId: string, responseId: string) {
    const url = `${this.BASE_URL}/forms/${formId}/responses?included_response_ids=${responseId}`;

    const res = await this.fetcher.fetch<RetriveResponse>(url, {
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_SECRET}`,
      },
    });

    return res;
  }

  private async retrieveForm(formId: string) {
    const url = `${this.BASE_URL}/forms/${formId}`;

    const res = await this.fetcher.fetch<RetriveForm>(url, {
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_SECRET}`,
      },
    });

    return res;
  }
}

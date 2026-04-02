'use server';
/**
 * @fileOverview This file implements an AI flow to generate and "send" a subsidy status report via email.
 *
 * - emailSubsidyReport - A function that fetches farmer data and drafts a personalized email report.
 * - EmailSubsidyReportInput - The input type for the emailSubsidyReport function.
 * - EmailSubsidyReportOutput - The return type for the emailSubsidyReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmailSubsidyReportInputSchema = z.object({
  email: z.string().email().describe('The email address to send the report to.'),
  farmerId: z.string().describe('The unique Farmer ID for lookup.'),
  language: z.string().describe('The preferred language for the email content.'),
  farmerData: z.any().optional().describe('Pre-fetched farmer data from Firestore.'),
});
export type EmailSubsidyReportInput = z.infer<typeof EmailSubsidyReportInputSchema>;

const EmailSubsidyReportOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was successfully drafted and "sent".'),
  message: z.string().describe('A confirmation message for the UI.'),
  emailDraft: z.object({
    subject: z.string(),
    body: z.string(),
  }).describe('The drafted email content.'),
});
export type EmailSubsidyReportOutput = z.infer<typeof EmailSubsidyReportOutputSchema>;

export async function emailSubsidyReport(input: EmailSubsidyReportInput): Promise<EmailSubsidyReportOutput> {
  return emailSubsidyReportFlow(input);
}

const emailDrafterPrompt = ai.definePrompt({
  name: 'emailDrafterPrompt',
  input: { schema: EmailSubsidyReportInputSchema },
  output: { schema: EmailSubsidyReportOutputSchema },
  prompt: `You are an automated communications assistant for 'KISAN SAHAYATA'. 
Your task is to draft a professional and helpful email report for a farmer regarding their subsidy status.

Language: {{{language}}}
Farmer Details: 
- ID: {{{farmerId}}}
- Email: {{{email}}}
- Name: {{#if farmerData.firstName}}{{{farmerData.firstName}}} {{{farmerData.lastName}}}{{else}}Farmer{{/if}}
- Primary Crop: {{#if farmerData.primaryCropType}}{{{farmerData.primaryCropType}}}{{else}}Not Specified{{/if}}
- Status: {{#if farmerData.isRegistered}}Active & Verified{{else}}Pending Registration{{/if}}

The email should:
1. Start with a warm greeting in the specified language.
2. Provide a summary of their registration status.
3. Mention that their subsidy tracking is active.
4. Provide a professional closing.

Draft the email subject and body carefully. The body should be formatted with clear line breaks.`,
});

const emailSubsidyReportFlow = ai.defineFlow(
  {
    name: 'emailSubsidyReportFlow',
    inputSchema: EmailSubsidyReportInputSchema,
    outputSchema: EmailSubsidyReportOutputSchema,
  },
  async (input) => {
    const { output } = await emailDrafterPrompt(input);
    
    if (!output) {
      throw new Error('Failed to generate email report.');
    }

    // In a real production environment, you would call a mail service like Resend or SendGrid here.
    // For this prototype, we simulate the "send" by logging and returning the draft.
    console.log(`[MOCK EMAIL SENT TO ${input.email}]`);
    console.log(`Subject: ${output.emailDraft.subject}`);
    console.log(`Body: ${output.emailDraft.body}`);

    return {
      success: true,
      message: `A personalized report has been drafted and sent to ${input.email}.`,
      emailDraft: output.emailDraft,
    };
  }
);

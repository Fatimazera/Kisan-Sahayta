'use server';
/**
 * @fileOverview This file implements an AI-powered eligibility assistant flow.
 *
 * - aiPoweredEligibilityGuidance - A function that processes farmer details to determine subsidy eligibility and provides application advice.
 * - AIPoweredEligibilityGuidanceInput - The input type for the aiPoweredEligibilityGuidance function.
 * - AIPoweredEligibilityGuidanceOutput - The return type for the aiPoweredEligibilityGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredEligibilityGuidanceInputSchema = z.object({
  farmLocation: z
    .string()
    .describe(
      'The geographical location of the farm (e.g., district, state/province, country).' 
    ),
  farmSizeAcres: z
    .number()
    .min(0)
    .describe('The total size of the farm in acres.'),
  primaryCrops: z
    .array(z.string())
    .describe('A list of primary crops grown on the farm (e.g., wheat, rice, corn).')
    .optional(),
  currentIrrigationMethods: z
    .array(z.string())
    .describe(
      'Current irrigation methods used (e.g., rain-fed, drip irrigation, sprinkler, canal irrigation).' 
    )
    .optional(),
  annualIncomeUSD: z
    .number()
    .min(0)
    .describe('The estimated annual income of the farmer in USD.')
    .optional(),
  previousSubsidiesReceived: z
    .array(z.string())
    .describe('Any previous subsidies received by the farmer (e.g., "2022 Fertilizer Subsidy").')
    .optional(),
  additionalDetails: z
    .string()
    .describe(
      'Any additional details about the farm or farmer that might be relevant for eligibility (e.g., soil type, specific challenges, cooperative membership).' 
    )
    .optional(),
});
export type AIPoweredEligibilityGuidanceInput = z.infer<
  typeof AIPoweredEligibilityGuidanceInputSchema
>;

const AIPoweredEligibilityGuidanceOutputSchema = z.object({
  eligibleSubsidies: z
    .array(z.string())
    .describe(
      'A list of subsidies the farmer appears to be eligible for (e.g., "Fertilizer Subsidy", "Seed Subsidy", "Irrigation Subsidy").' 
    ),
  ineligibleSubsidies: z
    .array(z.string())
    .describe(
      'A list of subsidies the farmer appears to be ineligible for, or for which more information is needed.' 
    ),
  eligibilitySummary: z
    .string()
    .describe('A comprehensive summary explaining the overall eligibility determination and key factors.'),
  applicationGuidance: z
    .string()
    .describe(
      'Detailed, actionable advice on how to successfully apply for eligible subsidies, including general steps and tips.' 
    ),
  requiredDocuments: z
    .array(z.string())
    .describe(
      'A list of common documents typically required for subsidy applications (e.g., "Land ownership documents", "National ID card", "Bank account details", "Farm income statements").' 
    ),
  nextSteps: z
    .string()
    .describe(
      'Clear next steps the farmer should take, such as visiting a local agricultural office or specific online portals.' 
    ),
});
export type AIPoweredEligibilityGuidanceOutput = z.infer<
  typeof AIPoweredEligibilityGuidanceOutputSchema
>;

export async function aiPoweredEligibilityGuidance(
  input: AIPoweredEligibilityGuidanceInput
): Promise<AIPoweredEligibilityGuidanceOutput> {
  return aiPoweredEligibilityGuidanceFlow(input);
}

const eligibilityCheckerPrompt = ai.definePrompt({
  name: 'eligibilityCheckerPrompt',
  input: {schema: AIPoweredEligibilityGuidanceInputSchema},
  output: {schema: AIPoweredEligibilityGuidanceOutputSchema},
  prompt: `You are an expert agricultural subsidy advisor for the 'CropAid Connect' platform. Your role is to help farmers understand their eligibility for various subsidies and guide them through the application process.

Based on the farmer's provided profile and details, determine their eligibility for the following common subsidy categories:
1.  **Fertilizer Subsidy** (often based on crop type, farm size, and location)
2.  **Seed Subsidy** (often based on crop type, farm size, and regional programs)
3.  **Irrigation Subsidy** (often based on current irrigation methods, farm size, water scarcity in region, and income level)

Provide a clear summary of which subsidies the farmer is eligible for and which they are not, explaining the reasoning concisely. Then, offer actionable advice on how to successfully apply for the eligible subsidies, including a list of common required documents and clear next steps.

Farmer Profile:
Location: {{{farmLocation}}}
Farm Size: {{{farmSizeAcres}}} acres
{{#if primaryCrops}}Primary Crops: {{#each primaryCrops}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Primary Crops: Not specified{{/if}}
{{#if currentIrrigationMethods}}Current Irrigation Methods: {{#each currentIrrigationMethods}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Current Irrigation Methods: Not specified{{/if}}
{{#if annualIncomeUSD}}Annual Income: $U.S. {{{annualIncomeUSD}}}{{else}}Annual Income: Not specified{{/if}}
{{#if previousSubsidiesReceived}}Previous Subsidies Received: {{#each previousSubsidiesReceived}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Previous Subsidies Received: None{{/if}}
{{#if additionalDetails}}Additional Details: {{{additionalDetails}}}{{else}}Additional Details: None{{/if}}

Consider typical eligibility criteria for each subsidy type. If a farmer is ineligible for a specific subsidy, explain why based on the provided information, or state if more information is needed. For eligible subsidies, provide a practical, step-by-step application guide.

Ensure your response is structured exactly according to the output JSON schema.`,
});

const aiPoweredEligibilityGuidanceFlow = ai.defineFlow(
  {
    name: 'aiPoweredEligibilityGuidanceFlow',
    inputSchema: AIPoweredEligibilityGuidanceInputSchema,
    outputSchema: AIPoweredEligibilityGuidanceOutputSchema,
  },
  async (input) => {
    const {output} = await eligibilityCheckerPrompt(input);
    if (!output) {
      throw new Error('Failed to get eligibility output from AI.');
    }
    return output;
  }
);

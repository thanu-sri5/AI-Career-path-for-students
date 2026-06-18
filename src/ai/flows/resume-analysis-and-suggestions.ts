'use server';
/**
 * @fileOverview A Genkit flow for analyzing resumes for ATS compatibility and providing improvement suggestions.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - ResumeAnalysisInput - The input type for the analyzeResume function.
 * - ResumeAnalysisOutput - The return type for the analyzeResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeAnalysisInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume content, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .refine((val) => val.startsWith('data:'), {
      message: 'resumeDataUri must be a data URI',
    }),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

const ResumeAnalysisOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('An overall compatibility score for the resume (0-100).'),
  atsCompatibility: z
    .enum(['Excellent', 'Good', 'Average', 'Poor'])
    .describe(
      'A rating of the resume\'s compatibility with Applicant Tracking Systems (ATS).'
    ),
  breakdown: z
    .array(
      z.object({
        category: z
          .string()
          .describe(
            'The category of the resume breakdown (e.g., "Formatting", "Keywords", "Experience").'
          ),
        insights: z
          .string()
          .describe('Detailed insights for this specific category.'),
      })
    )
    .describe('A detailed breakdown of the resume\'s strengths and weaknesses.'),
  suggestions: z
    .array(z.string())
    .describe('Actionable suggestions for improving the resume.'),
  improvementChecklist: z
    .array(z.string())
    .describe('A checklist of tasks the user can perform to improve their resume.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;

export async function analyzeResume(
  input: ResumeAnalysisInput
): Promise<ResumeAnalysisOutput> {
  return resumeAnalysisFlow(input);
}

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: { schema: ResumeAnalysisInputSchema },
  output: { schema: ResumeAnalysisOutputSchema },
  prompt: `You are an expert career advisor specializing in resume optimization and Applicant Tracking System (ATS) compatibility.
Your task is to analyze the provided resume content, identify areas for improvement, and offer actionable suggestions.

Analyze the resume carefully, focusing on:
- Overall structure and readability
- Keyword optimization for common ATS systems
- Clarity and impact of experience descriptions
- Quantifiable achievements
- Formatting and design elements (if discernible from text)

Provide a comprehensive analysis in JSON format according to the output schema. Ensure all fields are populated.

Resume content: {{media url=resumeDataUri}}`,
});

const resumeAnalysisFlow = ai.defineFlow(
  {
    name: 'resumeAnalysisFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await resumeAnalysisPrompt(input);
    if (!output) {
      throw new Error('Resume analysis failed to produce output.');
    }
    return output;
  }
);

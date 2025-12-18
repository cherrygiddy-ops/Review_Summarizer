import OpenAI from 'openai';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});
type GenerateTextOptions = {
   model?: string;
   temperature?: number;
   prompt: string;
   maxTokens?: number;
};

type GenerateTextResults = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      prompt,
      maxTokens = 300,
      model = 'gpt-4.1',
      temperature = 0.2,
   }: GenerateTextOptions): Promise<GenerateTextResults> {
      const response = await client.responses.create({
         input: prompt,
         max_output_tokens: maxTokens,
         model,
         temperature,
      });
      return {
         id: response.id,
         text: response.output_text,
      };
   },
};

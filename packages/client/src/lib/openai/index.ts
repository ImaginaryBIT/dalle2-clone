import {Configuration, OpenAIApi} from 'openai';

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(config);

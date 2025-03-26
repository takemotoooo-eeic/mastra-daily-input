import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { LibSQLStore } from '@mastra/core/storage/libsql';
import { LibSQLVector } from '@mastra/core/vector/libsql';
import { Memory } from "@mastra/memory";
import { weatherTool } from '../tools';

const memory = new Memory({
  storage: new LibSQLStore({
      config: {
          url: process.env.DATABASE_URL || "file:local.db",
      },
  }),
  vector: new LibSQLVector({
      connectionUrl: process.env.DATABASE_URL || "file:local.db",
  }),
  options: {
      lastMessages: 30, 
      semanticRecall: {
          topK: 5, 
          messageRange: 3, 
      },
      workingMemory: {
          enabled: true, 
      },
  },
});

export const trendInputAgent = new Agent({
  name: 'Tech関係の最新トレンド収集エージェント',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: openai('gpt-4o'),
  tools: { weatherTool },
  memory: memory,
});

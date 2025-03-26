
import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';

import { trendInputAgent } from './agents';

export const mastra = new Mastra({
  agents: { trendInputAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

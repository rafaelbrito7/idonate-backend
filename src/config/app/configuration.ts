import { registerAs } from '@nestjs/config';

export const secrets = registerAs('secrets', () => ({
  jwt: {
    at: process.env.AT_SECRET,
    rt: process.env.RT_SECRET,
  },
}));

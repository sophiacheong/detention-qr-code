function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: getEnv('PORT'),
  ENV: getEnv('ENV'),
  PASSWORD: getEnv('PASSWORD'),
  PHONE_NUMBER: getEnv('PHONE_NUMBER')
};

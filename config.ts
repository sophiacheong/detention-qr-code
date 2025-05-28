type ClientConfig = {
  PASSWORD: string;
  PHONE_NUMBER: string;
  PHONE_NUMBER_2: string;
  PHONE_NUMBER_3: string;
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

export function getClientConfig(): ClientConfig {
  const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;
  const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const PHONE_NUMBER_2 = process.env.NEXT_PUBLIC_PHONE_NUMBER_2;
  const PHONE_NUMBER_3 = process.env.NEXT_PUBLIC_PHONE_NUMBER_3;


  if (!PASSWORD || !PHONE_NUMBER || !PHONE_NUMBER_2 || !PHONE_NUMBER_3) {
    throw new Error("Missing required public environment variables");
  }

  return {
    PASSWORD,
    PHONE_NUMBER,
    PHONE_NUMBER_2,
    PHONE_NUMBER_3
  };
}

export const env = {
  PORT: getEnv('PORT'),
  ENV: getEnv('NODE_ENV'),
};

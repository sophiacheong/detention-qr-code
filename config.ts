type ClientConfig = {
  PASSWORD: string;
  PHONE_NUMBER: string;
};

// function getEnv(name: string): string {
//   const value = process.env[name];
//   if (!value) {
//     throw new Error(`Missing required env variable: ${name}`);
//   }
//   return value;
// }

export function getClientConfig(): ClientConfig {
  const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;
  const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  if (!PASSWORD || !PHONE_NUMBER) {
    throw new Error("Missing required public environment variables");
  }

  return {
    PASSWORD,
    PHONE_NUMBER,
  };
}

// export const env = {
//   PORT: getEnv('PORT'),
//   ENV: getEnv('ENV'),
// };

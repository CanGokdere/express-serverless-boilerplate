if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({ path: `${__dirname}/../../.env.test` });
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

const { env } = process;
export default {
  aws: {
    accessKey: env.AWS_ACCESS_KEY,
    secretKey: env.AWS_SECRET_KEY,
    region: env.AWS_REGION,
    bucket: env.AWS_S3_BUCKET,
  },
  db: {
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
};

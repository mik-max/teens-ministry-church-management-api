import "dotenv/config";
const {
  PORT,
  HOST,
  HOST_URL,
  DEV_BASE_URL,
  SQL_DATABASE,
  SQL_SERVER,
  SQL_PASSWORD,
  SQL_USER,
  NODE_ENV,
  OTP_SALT,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_AUTH_TOKEN,
  SENDINBLUE_API_KEY,
  DEVBASEURL,
} = process.env;


let configData = {
  otpSalt: OTP_SALT,
  sendInBlueApiKey: SENDINBLUE_API_KEY,
  sql: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    trustServerCertificate: true,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
  },
};


export default configData;
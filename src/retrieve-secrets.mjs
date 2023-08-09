import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

export const retrieveSecrets = async (secretName) => {
  const client = new SecretsManagerClient(getSecretsManagerConfiguration());
  const command = new GetSecretValueCommand({ SecretId: secretName });
  console.log(`Secrets ${secretName} retrieving...`);
  try {
    const response = await client.send(command);
    console.log(`Secrets ${secretName} retrieved`);
    return JSON.parse(response.SecretString)[0];
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};

const getSecretsManagerConfiguration = () => {
  if (process.env.stage === 'local') {
    return {
      endpoint: 'http://localhost:4566',
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      }
    };
  } else {
    return {
      region: 'ap-southeast-1'
    };
  }
}

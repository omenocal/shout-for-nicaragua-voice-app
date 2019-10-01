module.exports = {
  // accessKeyId:      '',  // optional for loading AWS credentials from custom profile
  // secretAccessKey:  '',  // optional for loading AWS credentials from custom profile
  profile:          '',  // optional for loading AWS credentials from custom profile
  region:           'us-east-1',
  handler:          'src/index.handler',
  role:             '',
  functionName:     '',
  runtime:          'nodejs8.10',
  timeout:          10,
  memorySize:       256
};

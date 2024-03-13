export default {
  Auth: {
    Cognito: {
      region: '{{cognito_region}}',
      userPoolId: '{{cognito_user_pool_id}}',
      userPoolClientId: '{{cognito_user_pool_client_id}}',
      identityPoolId: '{{cognito_identity_pool_id}}'
    }
  },
  Storage: {
    S3: {
      region: '{{s3_region}}',
      bucket: '{{s3_bucket_name}}'
    }
  }
};

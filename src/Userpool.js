import { CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
  UserPoolId: 'us-east-2_XCxBVfC2g', // Your user pool id here
  ClientId: '2ftpqjvak8l9j8bep63udhr15u' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export default userPool;

import React, { useContext,useEffect, useState } from 'react';
import {AccountContext} from '../Context/Account';
import Cookies from 'js-cookie';

const LoginHostedUI = () => {


    const [tokens, setTokens] = useState({ idToken: '', accessToken: '' });

    const redirectToCognitoHostedUI = () => {
        const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
        const appClientId = "2ftpqjvak8l9j8bep63udhr15u";
        const callbackUrl = encodeURIComponent("http://localhost:3000");
        const responseType = "token"; // or "code" for Authorization Code grant
        const scopes = ""; // Add other scopes as needed

        const loginUrl = `${domainUrl}/oauth2/authorize?response_type=${responseType}&client_id=${appClientId}&redirect_uri=${callbackUrl}&scope=${encodeURIComponent(scopes)}`;

        window.location.href = loginUrl;
     
    };

   

    return (
        <div>
            say
            <button onClick={redirectToCognitoHostedUI}>Go to Hosted UI Cognito</button>
            {tokens.idToken && <div>Okay</div>}
        </div>
    );
};

export default LoginHostedUI;
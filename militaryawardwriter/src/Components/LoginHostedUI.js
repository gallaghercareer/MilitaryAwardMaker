import React, { useContext,useEffect, useState } from 'react';
import {AccountContext} from './Account';
import Cookies from 'js-cookie';

const LoginHostedUI = () => {

    const [tokens, setTokens] = useState({ idToken: '', accessToken: '' });

    const redirectToCognitoHostedUI = () => {
        const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
        const appClientId = "2ftpqjvak8l9j8bep63udhr15u";
        const callbackUrl = encodeURIComponent("http://localhost:3000");
        const responseType = "token"; // or "code" for Authorization Code grant
        const scopes = "openid email phone"; // Add other scopes as needed

        const loginUrl = `${domainUrl}/oauth2/authorize?response_type=${responseType}&client_id=${appClientId}&redirect_uri=${callbackUrl}&scope=${encodeURIComponent(scopes)}`;

        window.location.href = loginUrl;
     
    };

    const handleCallback = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const idToken = urlParams.get('id_token');
        const accessToken = urlParams.get('access_token');
        
        if(Cookies.get('jwt') == null){
            const jwt = idToken
            Cookies.set('jwt', jwt, { expires: 5, path: '/' });
            console.log("jwt is:" + jwt);

        }
    
        if (idToken && accessToken) {
            setTokens({ idToken, accessToken });
            // You can now use these tokens as needed in your application
            console.log('Tokens received:', { idToken, accessToken });
        }
    };

    useEffect(() => {
        handleCallback();
    }, []);

    return (
        <div>
            <button onClick={redirectToCognitoHostedUI}>Go to Hosted UI Cognito</button>
            {tokens.idToken && <div>Okay</div>}
        </div>
    );
};

export default LoginHostedUI;
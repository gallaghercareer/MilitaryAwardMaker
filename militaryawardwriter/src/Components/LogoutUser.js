import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const LogoutUser = () => {
 
        
    const redirectToLogoutCognitoHostedUI = () => {
        Cookies.remove('jwt')
        Cookies.remove('thread_Id')
        const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
        const clientId = "2ftpqjvak8l9j8bep63udhr15u";
        const callbackUrl = "http://localhost:3000";
        const logoutUrl = `${domainUrl}/logout?client_id=${clientId}&logout_uri=${callbackUrl}&redirect_uri=${callbackUrl}&response_type=token`;
        window.location.href = logoutUrl;

    };
    
    
    return(<div><button onClick={redirectToLogoutCognitoHostedUI}>Logout</button></div>)

}

export default LogoutUser;
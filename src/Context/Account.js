import React, {createContext, useState,useEffect} from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import pool from '../Userpool';
import Cookie from 'js-cookie';
import { useJwt  } from "react-jwt";

const AccountContext = createContext();


const Account = (props) => {
    
    const [isSignedIn, setIsSignedIn] = useState(false);
    const  [email, setEmail] = useState('');
    
    const jwt = Cookie.get('jwt');
 
    const { decodedToken, isExpired } = useJwt(jwt);

    console.log("The  token is:" + decodedToken)
   
    useEffect(() => {
        if (decodedToken) {
            setEmail(decodedToken.email);
        }
    }, [decodedToken]); 
    

    const logout = () => {
        const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
        const appClientId = "2ftpqjvak8l9j8bep63udhr15u";
        const callbackUrl = "https://www.militaryawardwriter.com/coastguard";
        const responseType = "token"; // or "code" for Authorization Code grant
        //const scopes = "openid email phone"; // Add other scopes as needed
        const scopes = ""
        const logouturl = `${domainUrl}/logout?&response_type=${responseType}&client_id=${appClientId}&redirect_uri=${callbackUrl}&scope=${encodeURIComponent(scopes)}`;

        window.location.href = logouturl;
            }
        

    const login = () =>{
            const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
            const appClientId = "2ftpqjvak8l9j8bep63udhr15u";
            const callbackUrl = encodeURIComponent("https://www.militaryawardwriter.com/coastguard");
            const responseType = "token"; // or "code" for Authorization Code grant
            //const scopes = "openid email phone"; // Add other scopes as needed
            const scopes = ""
            const loginUrl = `${domainUrl}/oauth2/authorize?response_type=${responseType}&client_id=${appClientId}&redirect_uri=${callbackUrl}&scope=${encodeURIComponent(scopes)}`;

            window.location.href = loginUrl;
        }
  

    return <AccountContext.Provider value ={{ logout, login, email,setIsSignedIn}}>
        {props.children}
        </AccountContext.Provider>
    }
export { Account, AccountContext};
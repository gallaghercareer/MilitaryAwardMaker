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

    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject('Error getting user session');
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject('No current user');
            }
        });
    }


    const logout = () => {
            getSession().then(({user}) => {
                user.globalSignOut({
                    onSuccess: data => {
                        console.log('User Signed Out:', data);
                        setIsSignedIn(false);
                        Cookie.remove('jwt');
                        Cookie.remove('thread_Id');
                    },
                    onFailure: err => {
                        console.error('Error signing user out:', err);
                    }
                });
            })  
            

            }
        

    const login = () =>{
            const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
            const appClientId = "2ftpqjvak8l9j8bep63udhr15u";
            const callbackUrl = encodeURIComponent("http://localhost:3000/coastguard");
            const responseType = "token"; // or "code" for Authorization Code grant
            //const scopes = "openid email phone"; // Add other scopes as needed
            const scopes = ""
            const loginUrl = `${domainUrl}/oauth2/authorize?response_type=${responseType}&client_id=${appClientId}&redirect_uri=${callbackUrl}&scope=${encodeURIComponent(scopes)}`;

            window.location.href = loginUrl;
        }
  

    return <AccountContext.Provider value ={{ getSession, logout, login, email,setIsSignedIn}}>
        {props.children}
        </AccountContext.Provider>
    }
export { Account, AccountContext};
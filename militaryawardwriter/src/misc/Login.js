import React, { useState,useContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../Userpool';
import { AccountContext } from '../Components/Account';

const Login = () => {


    
    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
         const user = new CognitoUser({Username,Pool});
 
         const authDetails = new AuthenticationDetails({Username,Password});
     
         user.authenticateUser(authDetails, {
             onSuccess: data => {
                 console.log('onSuccess:', data);
             },
             onFailure: err => {
                 console.error('onFailure:', err);
                 reject(err)
             },
             newPasswordRequired: data => {
                 console.log('newPasswordRequired:', data);
             }
         });
        })
     }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (e) => {

    e.preventDefault();

    authenticate(email, password)
        .then(data => {console.log("logged in:", data)})
        .catch(err => {console.error("failed to login:", err)}); 

    const user = new CognitoUser({
        Username: email,
        Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    });

    user.authenticateUser(authDetails, {
        onSuccess: data => {
            console.log('onSuccess:', data);
        },
        onFailure: err => {
            console.error('onFailure:', err);
        },
        newPasswordRequired: data => {
            console.log('newPasswordRequired:', data);
        }
    });
    
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>


            </form>

        </div>
    )
};

export default Login;

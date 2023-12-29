import React, {createContext} from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../Userpool';

const AccountContext = createContext();
const Account = (props) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => { // Made this function async
                    if (err) {
                        reject(err);
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                }
                            });
                        });
                        resolve({user, ...session,...attributes}); // Moved this inside the else block
                    }
                });
            } else {
                reject(new Error("No current user"));
            }
        });
    }

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

    const logout = () => {
        const user = Pool.getCurrentUser();
        if(user) {
            user.signOut();
        }
    }

  

    return <AccountContext.Provider value ={{authenticate, getSession, logout}}>
        {props.children}
        </AccountContext.Provider>
    }
export { Account, AccountContext};
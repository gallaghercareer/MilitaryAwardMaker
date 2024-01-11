import React, {useEffect, useState,useContext} from 'react';
import Authorizer from './Authorizer';
import { AccountContext } from '../Components/Account';

const Settings = () => {
    const {getSession} = useContext(AccountContext);

    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(()=>{
        getSession()
            .then((response) => {
                setLoggedIn(true);
                console.log("The session object on settings.js:"+ response.email)
            })
            .catch((err) => console.error(err));}, []);
    
    return (
        <div>
            {loggedIn && (
                <div>
                    <h2>Logged In</h2>
                    <Authorizer />
                </div>
            )
            }
        </div>
    )};

export default Settings;
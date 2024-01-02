import React, {useEffect, useContext} from 'react';
import {AccountContext} from '../../Context/Account';
import Cookies from 'js-cookie';
import pool from '../../Userpool';
import { useNavigate } from 'react-router-dom';

function CoastGuardHomePage() {
    const {getSession, setIsSignedIn,email} = useContext(AccountContext);
    
    const navigate = useNavigate()
   
    
    const handleCognitoLoginRedirect = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const idToken = urlParams.get('id_token');
        const accessToken = urlParams.get('access_token');
        console.log("The access token:" + accessToken)
        console.log ("\n\n")

    };

    const navigateToNomineeInfo = () =>{
        navigate('/nomineeinfo')
    }

    useEffect(() => {
        handleCognitoLoginRedirect();
        
    }, []);
 

    return (
        <div>
        <h1>Coast Guard Home Page</h1>
        {email && <button color="black" onClick={navigateToNomineeInfo}>This will be a letter</button>
}
        </div>
    );
}

export default CoastGuardHomePage;

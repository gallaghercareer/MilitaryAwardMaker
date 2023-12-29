import Pool from '../Userpool';
import React, { useState } from 'react';
    

    const EmailValidation = () => {
        
        
        const [confirmationCode, setConfirmationCode] = useState('');
        
        const confirmEmail = (e) =>{
            e.preventDefault();

            Pool.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
        // Handle successful confirmation here, like redirecting to the login page
    });
        }
    return (
        <div>
            <form onSubmit={confirmEmail}>
                <input
                    type="text"
                    placeholder="Confirmation Code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button type="submit">Confirm  </button>

                </form>
        </div>
    )

    }
    
    export default EmailValidation;
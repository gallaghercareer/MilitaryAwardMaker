import React, {useState,useEffect,useContext} from 'react'
import {AccountContext} from '../Components/Account'

const Status = () => {

    const [status, setStatus] = useState('')
    const {getSession,logout} = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session:', session);
                setStatus(true)
           
            }).catch(err => {console.error("Error at Status.js:",err)});}, []); 
    return (
        <div>
            {status ? <button onClick={logout}>logout</button>: "Please login!"}
        </div>
    )
}

export default Status;
import React, {useState,useEffect,useContext} from 'react'
import {AccountContext} from './Account'

const Authorizer = () => {
    const [jwtToken, setjwttoken] = useState('')
    const [url, setUrl] = useState('')
    const [response, setResponse] = useState('')
    const [userMessage, setUserMessage] = useState('')
    const [threadId, setThreadId] = useState('')

    const {getSession} = useContext(AccountContext);
    useEffect(() => {
        setUrl('https://csitg9jz5c.execute-api.us-east-2.amazonaws.com/default/sendMessage_AAM');
    }, []);
  
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "Authorizer": jwtToken,  
            thread_id: threadId,
            user_message: userMessage })
    };
    const onSubmit = (e) => {
        e.preventDefault();
        getSession().then(({user}) => {
        user.getSession((err,session) => {
            if (err) {
                console.log(err);
            }
            console.log(session);
            setjwttoken(session.getIdToken().getJwtToken());
            fetch(url, requestOptions).then(response => response.json()).then(data => setResponse(data)).then(console.log(response));
        })    
    })};
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={e => setUserMessage(e.target.value)} />                
                <button type="submit">Try To reach API-GATEWAY</button>
            </form>
        </div>
    )
    
   
};

export default Authorizer;

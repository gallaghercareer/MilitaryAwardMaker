import React, { useState} from 'react';
import Cookies from 'js-cookie';

const CallLambda = () => {
    const [user_message, setUserMessage] = useState('');

    const callOpenAI = async (userMessage) => {
        const url = 'https://csitg9jz5c.execute-api.us-east-2.amazonaws.com/default/sendMessage_AAM';   
        const headers = new Headers();
        const authorizationToken = Cookies.get('jwt');
        const thread_Id = Cookies.get("thread_Id") || '';
        headers.append('Authorization', authorizationToken);
        headers.append('Thread_id', thread_Id);
        headers.append('User_message', userMessage);
    
        try {
            const response = await fetch(url, {
                method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on your needs
                headers: headers
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json(); // or response.text() if the response is not in JSON format
            console.log("lambda response:" + data)
            //set thread_Id in cookies here
            return data;
        } catch (error) {
            console.error('Error calling API Gateway:', error);
            return null;
        }
    };

    return <div>
            <form onSubmit={callOpenAI}>
                <label>
                    UserMessage:
                    <input type="text" value ={user_message} name="user_message" onChange={(e)=>setUserMessage(e.target.value)} />
                </label>
               <button type="submit"> Call Lambda </button>
            </form>
    </div>

}

export default CallLambda;

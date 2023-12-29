import React, { useState} from 'react';
import Cookies from 'js-cookie';

const CallLambda = () => {
    const [user_message, setUserMessage] = useState('');

    const callOpenAI = async (event) => {
        event.preventDefault();
        const url = 'https://csitg9jz5c.execute-api.us-east-2.amazonaws.com/beta/sendMessage_AAM';   
        const authorizationToken = Cookies.get('jwt');
        const thread_Id = Cookies.get("thread_Id") || '';
        
        const headers = {
            'Authorization': `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
     

        try {
            const requestBody = {
                body: JSON.stringify({
                    thread_id: thread_Id,
                    user_message: user_message
                })
            };
            const response = await fetch(url, {
                method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on your needs
                headers: headers,
                body:  requestBody
              
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            let data = await response.json(); // or response.text() if the response is not in JSON format
            data = JSON.stringify(data);
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

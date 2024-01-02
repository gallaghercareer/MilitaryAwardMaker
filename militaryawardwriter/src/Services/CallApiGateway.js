import Cookies from 'js-cookie';

const CallApiGateway = async (user_message) => {
    const url = 'https://csitg9jz5c.execute-api.us-east-2.amazonaws.com/beta/sendMessage_AAM';   
    const authorizationToken = Cookies.get('jwt');
    let thread_Id = Cookies.get("thread_Id");
    
    if (!thread_Id || thread_Id === 'undefined'){
        thread_Id = '';
    }
    
    const headers = {
        'Authorization': `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',          
    };
    
    const messageBody = JSON.stringify({
        thread_id: thread_Id,
        user_message: user_message
    });

    const requestBody = JSON.stringify({
        body: messageBody
    });
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        return data; // This should be the message you want to display
    } catch (error) {
        console.error('Error calling API Gateway:', error);
        return null;
    }
};

export default CallApiGateway;

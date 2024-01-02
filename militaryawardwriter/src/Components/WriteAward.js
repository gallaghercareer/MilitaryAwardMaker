import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import CallApiGateway from '../Services/CallApiGateway';
import Cookies from 'js-cookie'; // Don't forget to import Cookies

const WriteAward = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (newMessage && newMessage.sender === 'assistant') {
      // Use a timeout to simulate typewriting delay
      const timeoutId = setTimeout(() => {
        addMessageToHistory(newMessage);
        setNewMessage('');
      }, 1000 + newMessage.text.length * 30); // Adjust timing as needed
  
      return () => clearTimeout(timeoutId);
    }
  }, [newMessage]);
  
  const addMessageToHistory = (msg) => {
    setMessageHistory((prevHistory) => [...prevHistory, msg]);
  };

  const sendMessageToLambda  = async()  => {
    const userMessage = { text: message, sender: 'user' };
    addMessageToHistory(userMessage)
    const response = await CallApiGateway(message);
    if (response) {
         // Parse the JSON string in the 'body' to get the actual response object
      const responseBody = JSON.parse(response.body);

      // Extract the 'assistant_response' from the response object
      const assistantResponse = responseBody.assistant_response;
    setNewMessage(assistantResponse);
    let threadId = responseBody.thread_id;
   // Add the assistant's response to the history with a typewriter effect
      setNewMessage({ text: assistantResponse, sender: 'assistant' });
      Cookies.set('thread_Id', threadId);
      setMessage(''); // Clear the message input after sending
    }
  };

  const attachFile = () => {
    // Logic to attach a file
    console.log("Attach file clicked");
  };
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div id="messageHistory" style={{ 
          maxWidth: '33%', 
          height: '300px', 
          marginBottom: '10px', 
        
          padding: '10px', 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center'
      }}>
        {messageHistory.map((msg, index) => (
          <div key={index} style={{ width: '100%' }}>
            {msg.sender === 'assistant' ? (
              <Typewriter
                options={{
                  delay: 30,
                  cursor: "",
                }}
                onInit={(typewriter) => {
                  typewriter.typeString(msg.text).start();
                }}
              />
            ) : (
              <div>{msg.text}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <a href="#" onClick={attachFile} style={{ marginRight: '10px' }}>Attach File</a>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessageToLambda()}
          style={{ flexGrow: 1, marginRight: '10px', width: '33%' }}
        />
        <button onClick={sendMessageToLambda}>Send</button>
      </div>
    </div>
  );
};

export default WriteAward;

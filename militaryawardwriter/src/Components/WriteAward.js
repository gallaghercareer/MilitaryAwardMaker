import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

const WriteAward = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (newMessage) {
      // Simulate the new message being typed out
      setMessageHistory(prevHistory => [...prevHistory, newMessage]);
      setNewMessage('');
    }
  }, [newMessage]);

  const sendMessage = () => {
    // Instead of immediately adding the message to the history,
    // we set it as a newMessage to trigger the typewriter effect.
    setNewMessage(message);
    setMessage(''); // Clear the message input after sending
  };

  const attachFile = () => {
    // Logic to attach a file
    console.log("Attach file clicked");
  };

  return (
    <div style={{ padding: '20px' }}>
      <div id="messageHistory" style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
        {messageHistory.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        {newMessage && (
          <Typewriter
            options={{
              delay: 50,
              cursor: "",
            }}
            onInit={(typewriter) => {
              typewriter.typeString(newMessage).start();
            }}
          />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" onClick={attachFile} style={{ marginRight: '10px' }}>Attach File</a>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WriteAward;

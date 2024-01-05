import React, {useState,useEffect,useContext,useRef} from 'react'
 
import CallApiGateway from '../Services/CallApiGateway';
import Cookies from 'js-cookie'; // Don't forget to import Cookies
import { CircularProgress, AppBar, Link, InputAdornment, TextField, IconButton, Toolbar, Button, Stack, Box, ButtonGroup, Grid, MenuItem, Menu, Icon } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Example icon for user
import AssistantIcon from '@mui/icons-material/Assistant';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AssistantIcon2 from '../Css/penIcon.png';

const AssistIcon = () => (
  <img 
    src={AssistantIcon2}
    alt="User Icon" 
    style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%', // This line makes the image round
     position: 'absolute', 
     left: '-30px', 
     top: '-25px'
    }} 
  />
);
// Keyframes for the blinking effect
const keyframesBlinking = `
  @keyframes blinking {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;  
// BlinkingDot component
const BlinkingDot = () => (
  <>
    <style>{keyframesBlinking}</style>
    <FiberManualRecordIcon sx={{
      fontSize: '10px', // Adjust the size as needed
      color: 'black', // Adjust the color as needed
      animation: 'blinking 1s infinite' // Apply the blinking animation
    }} />
  </>
);
// Create a custom theme with the color override
const customTheme = createTheme({
  palette: {
    primary: {
      main: grey[900], // Change this to your desired color
    },
  },
});

const MessageBox = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef(null);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};


  useEffect(() => {
    scrollBottom();
  }, [messageHistory]);
  
  
  const addMessageToHistory = (msg) => {
    setMessageHistory((prevHistory) => [...prevHistory, msg]);
  };

  useEffect(() => {
    const messageHistoryContainer = document.getElementById('messageHistory');
    messageHistoryContainer.scrollTop = messageHistoryContainer.scrollHeight;
  }, [messageHistory]);
  
  
  const sendMessageToLambda = async () => {

    const userMessage = { text: message, sender: 'user' };
    addMessageToHistory(userMessage)
    // Add a placeholder for the assistant's response
    const placeholderResponse = { text: '', sender: 'assistant', isPlaceholder: true, isLoading: true };
    addMessageToHistory(placeholderResponse);
    // Capture the message before clearing it
    const messageToSend = message;
    setMessage(''); // Clear the message input
   
      const response = await CallApiGateway(messageToSend);
      if (response) {
        // Parse the JSON string in the 'body' to get the actual response object
        const responseBody = JSON.parse(response.body);

        // Extract the 'assistant_response' from the response object
        const assistantResponse = responseBody.assistant_response;
        // Update the placeholder with the actual response
        updateAssistantResponse(assistantResponse);
        let threadId = responseBody.thread_id;
        // Add the assistant's response to the history with a typewriter effect
        setNewMessage({ text: assistantResponse, sender: 'assistant',isLoading: false });
        Cookies.set('thread_Id', threadId);
        // Clear the message input after sending
      }
    };
    const updateAssistantResponse = (responseText) => {
      // Update the last message (which is the placeholder) with the actual response
      setMessageHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = { text: responseText, sender: 'assistant' };
        return newHistory;
      });
    };

   
    const fakeAssistantResponse = () => {
      
    const userMessage = { text: message, sender: 'user' };
    addMessageToHistory(userMessage)
    const placeholderResponse = { text: '', sender: 'assistant', isPlaceholder: true, isLoading: true };
    addMessageToHistory(placeholderResponse);
    // Capture the message before clearing it
    const messageToSend = message;
    setMessage('');
      setMessageHistory(prevHistory => {
        const lorem = 'fermentum dui faucibus in. Ut placerat orci nulla pellentesque dignissim enim. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Dolor sit amet consectetur adipiscing elit duis tristique. Sed faucibus turpis in eu mi bibendum neque. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Nunc scelerisque viverra mauris in aliquam sem. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Aliquam faucibus purus in massa tempor nec. Aliquet enim tortor at auctor urna nunc id cursus. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Eget sit amet tellus cras adipiscing enim eu turpis. Aliquam etiam erat velit scelerisque in. Rhoncus urna neque viverra justo nec ultrices dui sapien. Non sodales neque sodales ut. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. In est ante in nibh mauris cursus. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Enim neque volutpat ac tincidunt vitae semper quis. Risus in hendrerit gravida rutrum quisque non tellus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Aliquet eget sit amet tellus cras adipiscing enim. Tristique magna sit amet purus gravida quis. Tristique senectus et netus et. Vitae elementum curabitur vitae nunc sed. Risus feugiat in ante metus dictum at tempor commodo. Fames ac turpis egestas integer eget. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Ligula ullamcorper malesuada proin libero. Pharetra vel turpis nunc eget lorem dolor sed viverra. Amet facilisis magna etiam tempor orci eu lobortis elementum. In vitae turpis massa sed elementum tempus egestas sed. Libero justo laoreet sit amet cursus sit. Nibh tortor id aliquet lectus. Leo a diam sollicitudin tempor id eu nisl nunc. Odio eu feugiat pretium nibh ipsum. Diam vulputate ut pharetra sit. Morbi tristique senectus et netus et malesuada. Urna condimentum mattis pellentesque id. Eget gravida cum sociis natoque penatibus et. Erat velit scelerisque in dictum non consectetur a. Vitae et leo duis ut diam quam nulla porttitor. Orci phasellus egestas tellus rutrum tellus. Gravida quis blandit turpis cursus in hac. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Enim ut tellus elementum sagittis vitae. Commodo ullamcorper a lacus vestibulum. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Vel risus commodo viverra maecenas accumsan lacus. Vel facilisis volutpat est velit egestas. Eu non diam phasellus vestibulum lorem sed risus. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Pretium lectus quam id leo in. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Vulputate mi sit amet mauris commodo quis imperdiet. Nisi est sit amet facilisis magna. Massa sapien faucibus et molestie ac feugiat sed lectus. Ac placerat vestibulum lectus mauris ultrices eros. Cursus metus aliquam eleifend mi in nulla. Velit sed ullamcorper morbi tincidunt.';
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = { text: lorem, sender: 'assistant' };
        return newHistory;
      });
              const lorem = 'fermentum dui faucibus in. Ut placerat orci nulla pellentesque dignissim enim. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Dolor sit amet consectetur adipiscing elit duis tristique. Sed faucibus turpis in eu mi bibendum neque. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Nunc scelerisque viverra mauris in aliquam sem. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Aliquam faucibus purus in massa tempor nec. Aliquet enim tortor at auctor urna nunc id cursus. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Eget sit amet tellus cras adipiscing enim eu turpis. Aliquam etiam erat velit scelerisque in. Rhoncus urna neque viverra justo nec ultrices dui sapien. Non sodales neque sodales ut. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. In est ante in nibh mauris cursus. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Enim neque volutpat ac tincidunt vitae semper quis. Risus in hendrerit gravida rutrum quisque non tellus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Aliquet eget sit amet tellus cras adipiscing enim. Tristique magna sit amet purus gravida quis. Tristique senectus et netus et. Vitae elementum curabitur vitae nunc sed. Risus feugiat in ante metus dictum at tempor commodo. Fames ac turpis egestas integer eget. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Ligula ullamcorper malesuada proin libero. Pharetra vel turpis nunc eget lorem dolor sed viverra. Amet facilisis magna etiam tempor orci eu lobortis elementum. In vitae turpis massa sed elementum tempus egestas sed. Libero justo laoreet sit amet cursus sit. Nibh tortor id aliquet lectus. Leo a diam sollicitudin tempor id eu nisl nunc. Odio eu feugiat pretium nibh ipsum. Diam vulputate ut pharetra sit. Morbi tristique senectus et netus et malesuada. Urna condimentum mattis pellentesque id. Eget gravida cum sociis natoque penatibus et. Erat velit scelerisque in dictum non consectetur a. Vitae et leo duis ut diam quam nulla porttitor. Orci phasellus egestas tellus rutrum tellus. Gravida quis blandit turpis cursus in hac. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Enim ut tellus elementum sagittis vitae. Commodo ullamcorper a lacus vestibulum. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Vel risus commodo viverra maecenas accumsan lacus. Vel facilisis volutpat est velit egestas. Eu non diam phasellus vestibulum lorem sed risus. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Pretium lectus quam id leo in. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Vulputate mi sit amet mauris commodo quis imperdiet. Nisi est sit amet facilisis magna. Massa sapien faucibus et molestie ac feugiat sed lectus. Ac placerat vestibulum lectus mauris ultrices eros. Cursus metus aliquam eleifend mi in nulla. Velit sed ullamcorper morbi tincidunt.';

      setNewMessage({ text: lorem, sender: 'assistant',isLoading: false }); 
    };
    const attachFile = () => {
      // Logic to attach a file
      console.log("Attach file clicked");
    };
    return (
      <>
      <Grid style={{ height: '90vh', marginTop:'10vh'}}>
        <Grid container sx={{overflowY:'scroll',  maxHeight:'70%' }}>

          <Grid item xs={false} sm={4} md={4} lg={3} /> {/* Empty space for columns 1-4 */}

          <Grid item xs={12} sm={4} md={4} lg={6} > {/* Expanded to span columns 4-8 */}

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', textAlign: 'left', maxWidth: '100%', minHeight: 0 }}>
              <div id="messageHistory">
                {messageHistory.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '30px' }}>
                    <div style={{ position: 'relative', marginLeft: '20px' }}>
                     
                      {msg.sender === 'user' ? (<>
                        <PersonIcon style={{ position: 'absolute', left: '-25px', top: '-20px' }} />
                        <div style={{ fontWeight: 'bold', position: 'absolute', left: '0px', top: '-20px', fontSize: '0.8em' }}>User</div></>) : (
                        <>
                          <AssistIcon />
                          <div style={{ fontWeight: 'bold', position: 'absolute', left: '0px', top: '-20px', fontSize: '0.8em' }}>Assistant</div>
                        </>
                      )}
            {msg.sender === 'assistant' ? (
           
       <div>    {msg.isLoading && (<div style={{ marginTop: '10px' }}>
                 {<BlinkingDot />}{/* Or any other loading indicator */}
             </div>
             )}{msg.text} <div ref={messagesEndRef} /></div>
      ) : (
        <div>{msg.text} <div ref={messagesEndRef} /></div>
      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
           
          </Grid>
          <Grid item xs={false} sm={4} md={4} lg={3} /> {/* Empty space for columns 8-12 */}
        
        </Grid>

        <Grid container sx={{position:'fixed', bottom:0, marginBottom: '5%',zIndex: 10,backgroundColor:'white'}}>
          <Grid item xs={false} sm={4} md={4} lg={3} /> {/* Empty space for columns 1-4 */}

          {/*USER MESSAGE BOX BEGINS */}

          <Grid item xs={12} sm={4} md={4} lg={6}>
            <ThemeProvider theme={customTheme}>
              <TextField
                multiline
                minrows={2}
                maxRows={10}

                fullWidth
                type="text"
                color="primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessageToLambda()}
                InputProps={{

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={sendMessageToLambda}>
                        <ArrowCircleUpIcon fontSize="large" sx={{
                          '&:hover': {
                            color: 'black', // Change color on hover
                          },
                        }} />
                      </IconButton >
                    </InputAdornment>
                  ),
                }}

                style={{ paddingRight: 0 }} // Adjust the right padding if necessary
              /> </ThemeProvider>
          </Grid>

          <Grid item xs={false} sm={4} md={4} lg={3} /> {/* Empty space for columns 8-12 */}
        </Grid>
        </Grid>
      </>
    );
  };

  export default MessageBox;
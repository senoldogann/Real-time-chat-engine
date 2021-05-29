import { ChatEngine } from 'react-chat-engine';

import LoginForm from './components/LoginForm'

import ChatFeed from './components/ChatFeed';

import './App.css';

const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm/>

    return (
        <ChatEngine
            height="100vh"
            projectID = "" // Project-ID: enter here 'string' example:""849c3757-bfa1-4992" like this 
            userName = {localStorage.getItem('username')}
            userSecret =  {localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
        />
    );
}

export default App;
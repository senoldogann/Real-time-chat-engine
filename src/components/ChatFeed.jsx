import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
 
const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    // Eğer kullanıcı mesajı görürse altta kutucukla gördüğünü gösterme 
    const renderReadReceipts = (message,isMyMessage) => {
        return chat.people.map((person,index) => person.last_read === message.id && (
            <div
            key = {`read_${index}`}
            className="read-receipt"
            style={{
                float:isMyMessage ? 'right' : "left",
                backgroundImage: `url(${person?.person?.avatar})` 
            }}
            />
        ))
    }

   
    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message,isMyMessage)}
                    </div>
                </div>
            );
        })

    }

    const localstoreDelete = ()  => {window.localStorage.clear(); window.location.reload();}
    

    if (!chat) return 'Loading....';
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                    <hr />
                    <button style={{backgroundColor:"#2c3e50",color:"white",borderRadius:"10px",width:"80px",height:"25px"}} onClick={localstoreDelete}>LogOut</button>
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm  {... props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;

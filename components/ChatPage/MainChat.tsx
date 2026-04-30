'use client';
export default function MainChat(){
    return(
        <div className="container">
                        <div id="profile-top-bar"><button>Profile</button></div>
                        <div id="chat">
                            {/* Chats / Messages */}
                            <div id="chat-ui">
                                <div id="sender"></div>
                                <div id="reciever"></div>
                            </div>
                            <div><input type="text" name="message" id="message" autoFocus placeholder="Type a message..." /></div>
                        </div>
        </div>
    )
}
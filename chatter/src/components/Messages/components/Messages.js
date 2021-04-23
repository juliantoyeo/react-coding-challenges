import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import _ from 'lodash';

const ME = 'me'
const BOT = 'bot'

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { messages, setLatestMessage } = useContext(LatestMessagesContext);
	const [messageList, setMessageList] = useState([])
	const [messageInput, setMessageInput] = useState('')
	const [reply, setReply] = useState('')

	socket.on('bot-message', (message) => {
		setReply(message)
	});

	useEffect(() => {
		const newMessage = {
			userId: BOT,
			text: messages[BOT]
		}
		const newList = [newMessage]
		setMessageList(newList)
	}, [])

	useEffect(() => {
		if (reply != '') {
			const newMessage = {
				userId: BOT,
				text: reply
			}
			const newList = [
				...messageList, newMessage
			]
			setMessageList(newList)
			setLatestMessage(BOT, reply)
			playReceive()
		}
	}, [reply])

	const sendMessage = () => {
		const newMessage = {
			userId: ME,
			text: messageInput
		}
		if (socket) socket.emit('user-message', messageInput);
		const newList = [
			...messageList, newMessage
		]
		playSend()
		setMessageList(newList)
		setMessageInput('')
	}

	const onChangeMessage = (event) => {
		const value = event.target.value
		setMessageInput(value)
	}

	const printMessages = () => {
		return _.map(messageList, message => {
			return (
				<Message message={{ message: message.text, user: message.userId }}/>
			)
		})
	}

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
				{printMessages()}
      </div>
      <Footer message={messageInput} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;

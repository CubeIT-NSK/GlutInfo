import React, { useState } from "react";
import styles from "./index.module.css";
import icons from "../../resources/icon";

export default function Chat() {
    const initialChatData = [
        {
            id: 1,
            name: "ГастроГлютен.инфо",
            avatar: "path/to/gastrogluten-avatar.png",
            messages: [
                { sender: "ГастроГлютен.инфо", text: "Вы записаны на онлайн-консультацию в виде видео-чата с Иванов Иван Иванович 30 сентября, 12:45", type: "notification" }
            ],
            unreadCount: 1
        },
        {
            id: 2,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 3,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 4,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 5,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 6,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 7,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 8,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 9,
            name: "Консультант Иванов И. И.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Иванов И. И.", text: "Добрый день! Чем могу помочь?", type: "notification" }
            ],
            unreadCount: 3
        },
        {
            id: 10,
            name: "Консультант Сидоров А. А.",
            avatar: "path/to/consultant1-avatar.png",
            messages: [
                { sender: "Консультант Сидоров А. А.", text: "У вас есть вопросы?", type: "notification" }
            ],
            unreadCount: 3
        },
    ];

    const [chatData, setChatData] = useState(initialChatData);
    const [activeChatId, setActiveChatId] = useState(chatData[0].id);
    const [newMessage, setNewMessage] = useState("");

    const activeChat = chatData.find(chat => chat.id === activeChatId);

    const handleChatSwitch = (chatId) => {
        setChatData(prevChatData =>
            prevChatData.map(chat =>
                chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
            )
        );

        setActiveChatId(chatId);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMsg = { sender: "Вы", text: newMessage, type: "response" };

        setChatData(prevChatData =>
            prevChatData.map(chat =>
                chat.id === activeChatId
                    ? { ...chat, messages: [...chat.messages, newMsg] }
                    : chat
            )
        );

        setNewMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <aside className={styles.chatList}>
                <div className={styles.chatTitle}>
                    <span className={styles.chatTitleText}>Чаты</span>
                </div>
                <div className={styles.chatItemsWrapper}>
                    {chatData.map(chat => {
                    const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "Нет сообщений";
                    return (
                        <div
                            key={chat.id}
                            className={`${styles.chatItem} ${chat.id === activeChatId ? styles.activeChat : ""}`}
                            onClick={() => handleChatSwitch(chat.id)}
                        >
                            <div className={styles.chatHeaderWrapper}>
                                <div className={styles.chatHeader}>
                                    <img src={chat.avatar} alt="avatar" className={styles.avatar} />
                                    <div className={styles.chatHeaderRight}>
                                        <div className={styles.chatHeaderRightTop}>
                                            <span className={styles.chatName}>
                                                {chat.name.includes("ГастроГлютен.") ? (
                                                    <>
                                                        <span className={styles.highlightedName}>ГастроГлютен.</span>
                                                        <span className={styles.chatName}>инфо</span>
                                                    </>
                                                ) : (
                                                    chat.name
                                                )}
                                            </span>

                                            {chat.unreadCount > 0 &&
                                                <div className={styles.unreadCount}>
                                                    <span  className={styles.unreadCountText}>{chat.unreadCount}</span>
                                                </div>
                                            }
                                        </div>
                                        <div className={styles.chatPreview}>
                                            {lastMessage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            </aside>
            <div className={styles.chatMessages}>
                <div className={styles.chatTitle}>
                    <span className={styles.chatTitleText}>
                        {activeChat.name.includes("ГастроГлютен.") ? (
                            <>
                                <span className={styles.highlightedName}>ГастроГлютен.</span>
                                {activeChat.name.replace("ГастроГлютен.", "")}
                            </>
                        ) : (
                            activeChat.name
                        )}
                    </span>
                </div>
                <div className={styles.messagesContainer}>
                    {activeChat.messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${message.type === "response" ? styles.messageResponse : styles.messageNotification} ${styles.fadeIn}`}
                        >
                            {message.type !== "response" && (
                                <img
                                    src={message.sender === "ГастроГлютен.инфо" ? "path/to/gastrogluten-avatar.png" : activeChat.avatar}
                                    alt="avatar"
                                    className={`${styles.avatar} ${styles.avatarLeft}`}
                                />
                            )}
                            <p className={styles.messageText}>{message.text}</p>
                            {message.type === "response" && (
                                <img
                                    src="path/to/user-avatar.png"
                                    alt="avatar"
                                    className={`${styles.avatar} ${styles.avatarRight}`}
                                />
                            )}
                        </div>

                    ))}
                </div>
                <div className={styles.messageInputWrapper}>
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        className={styles.messageInput}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className={styles.sendButton} onClick={handleSendMessage}>
                        <img src={icons.sendMessageIcon} alt="sendMessageIcon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

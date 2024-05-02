"use client";

import React, { useState, useEffect, useContext, FormEvent } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { Context } from "../layout";

interface Message {
  message: string;
  user: string;
  time: string;
  roomId: string;
}

const socket = io("http://localhost:4000");

const Chatapp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [chatActive, setChatActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [usernameEntered, setUsernameEntered] = useState<boolean>(false);
  const router = useRouter();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized, router]);

  useEffect(() => {
    socket.on("received-message", (message: Message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("previous-messages", (previousMessages: Message[]) => {
      setMessages(previousMessages);
    });
  }, []);

  const handleSubmitUsername = () => {
    if (username.trim() !== "") {
      setUsernameEntered(true);
    }
  };

  const handleSubmitRoomId = () => {
    if (roomId.trim() !== "") {
      setChatActive(true);
      socket.emit("join-room", roomId);
    }
  };

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const messageData: Message = {
        message: newMessage,
        user: username,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
        roomId: roomId,
      };
      socket.emit("send-message", messageData);
      setNewMessage("");
    } else {
      alert("Message cannot be empty");
    }
  };

  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: "url('/images/hero/bg2.jpg')",
          backgroundPosition: "top",
        }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Chating App
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1>ChatApp</h1>
      <div className="chatapp bg-blue-100">
        <p>
          This chat app serves as a virtual space where employers and job
          seekers can engage in meaningful conversations. The app operates on a
          RoomID system, ensuring that users only interact with each other when
          they share the same RoomID. Heres a breakdown of the features and
          functionalities:
        </p>
      </div>

      <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
        {chatActive ? (
          <div className="rounded-md w-full md:w-[65vw] lg:w[40vw] mx-auto bg-white">
            <h1 className="font-bold text-center my-2 uppercase">Squde Chat</h1>
            <div className="overflow-y-scroll h-[80vh] lg:h-[60vh]">
              {messages.map((message: Message, index: number) => (
                <div
                  key={index}
                  className={`flex rounded-md shadow-sm my-5 ${
                    username === message.user ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`bg-green-400 flex justify-center items-center rounded-l-md`}
                  >
                    <h3 className="font-bold text-lg px-2">
                      {message.user.charAt(0).toUpperCase()}
                    </h3>
                  </div>
                  <div className={`px-2 bg--200 rounded-md`}>
                    <span className="text-sm">{message.user}</span>
                    <h3 className="font-bold">{message.message}</h3>
                    <span className="text-sm font-bold">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 md:gap-4 justify-between"
              onSubmit={handleSubmitMessage}
            >
              <input
                type="text"
                placeholder="Type your message here..."
                value={newMessage}
                className="w-full rounded-md px-3 py-2 border-2 outline-none"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-2 bg-green-500 rounded-md font-bold"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-center px-3 py-2"
            />
            <button
              onClick={handleSubmitUsername}
              className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
            >
              Enter Username
            </button>
            {usernameEntered && (
              <div>
                <input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="text-center px-3 py-2"
                />
                <button
                  onClick={handleSubmitRoomId}
                  className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
                >
                  Enter Room
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Chatapp;

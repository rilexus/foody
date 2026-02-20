"use client";
import React from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useEventListener } from "../../hooks/use-event-listener";
import { useApplicationState } from "../../state/hooks/use-application-state";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 75px);
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const MessageBubble = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 16px 20px;
  border-radius: ${(props) =>
    props.$isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px"};
  background: ${(props) =>
    props.$isUser
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#f3f4f6"};
  color: ${(props) => (props.$isUser ? "white" : "#1f2937")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
`;

const MessageText = styled.p`
  margin: 0;

  font-size: 15px;
  line-height: 1.5;
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: ${(props) => (props.$isUser ? "#9ca3af" : "#9ca3af")};
  margin-top: 6px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 15px;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  text-align: center;
  padding: 48px;
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 8px 0;
`;

const EmptyStateText = styled.p`
  font-size: 15px;
  color: #9ca3af;
  margin: 0;
`;

const SuggestionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
`;

const SuggestionChip = styled.button`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
  }
`;

const useChatState = () => {
  const [applicationState, setApplicationState] = useApplicationState();

  return [
    applicationState.chat,
    (chat) => {
      setApplicationState((state) => {
        return {
          ...state,
          chat: typeof chat === "function" ? chat(state.chat) : chat,
        };
      });
    },
  ];
};

const useChatHistory = () => {
  const [chat, setChat] = useChatState();

  return [
    chat.history,
    (message) => {
      setChat((prev) => {
        return {
          ...prev,
          history:
            typeof message === "function" ? message(prev.history) : message,
        };
      });
    },
  ];
};

export default function ChatPage() {
  const [messages, setMessages] = useChatHistory();

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [calledToolName, setCalledToolName] = useState(null);

  const clearChatHistory = () => {
    setMessages([]);
  };

  useEventListener("ai-tool-call", (event) => {});

  useEventListener("ai-tool-called", (event) => {
    // setMessages((prev) => [
    //   ...prev,
    //   { content: `Tool called: ${event.toolName}`, role: "tool" },
    // ]);
  });

  const send = useEventListener("ai-assistent-response", (response) => {
    setIsTyping(false);
    setMessages((prev) => [...prev, response]);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: inputText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    send("ai-user-request", {
      ...userMessage,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const suggestions = [
    "What should I eat for breakfast?",
    "Create a meal plan for weight loss",
    "Suggest high protein recipes",
    "Help me with grocery shopping",
  ];

  return (
    <Container>
      <ChatContainer>
        <MessagesContainer>
          {messages.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>💬</EmptyStateIcon>
              <EmptyStateTitle>Start a conversation</EmptyStateTitle>
              <EmptyStateText>
                Ask me anything about nutrition, meal planning, or recipes!
              </EmptyStateText>
              <SuggestionChips>
                {suggestions.map((suggestion, index) => (
                  <SuggestionChip
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionChip>
                ))}
              </SuggestionChips>
            </EmptyState>
          ) : (
            <>
              {messages.map((message) => {
                return (
                  <MessageBubble
                    key={message.id}
                    $isUser={message.role === "user"}
                  >
                    <MessageContent $isUser={message.role === "user"}>
                      <MessageText>{message.content}</MessageText>
                      <MessageTime $isUser={message.role === "user"}>
                        {formatTime(message.timestamp)}
                      </MessageTime>
                    </MessageContent>
                  </MessageBubble>
                );
              })}
              {isTyping && (
                <MessageBubble $isUser={false}>
                  <MessageContent $isUser={false}>
                    <MessageText>Thinking...</MessageText>
                  </MessageContent>
                </MessageBubble>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </MessagesContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <SendButton
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            Send
          </SendButton>
          <button onClick={clearChatHistory}>Clear</button>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
}

import React from "react";
import ChatBot from "react-simple-chatbot";
import Custom from "../Custom/Custom";

class Chat extends React.Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message: "Welcome to TripTnT.",
            trigger: "search"
          },
          {
            id: "search",
            user: true,
            validator: value => {
              if (value.length === 0) {
                return "abcdefghijklmnopqrstuvwxyz";
              }
              return true;
            },
            trigger: "3"
          },
          {
            id: "3",
            component: <Custom />,
            waitAction: true,
            asMessage: true,
            trigger: "search"
          },
          {
            id: "4",
            message: "Sorry I did not understand.",
            trigger: "search"
          }
        ]}
      />
    );
  }
}

export default Chat;

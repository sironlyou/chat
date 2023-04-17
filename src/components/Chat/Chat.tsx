import { Flex } from "@chakra-ui/react";
import { ConversationsWrapper } from "./Conversations/ConversationsWrapper";
import { FeedWrapper } from "./Feed/FeedWrapper";
import { Session } from "next-auth";
import { ConversationModalProvider } from "@/src/context/ModalContext";

export interface SessionProps {
  session: Session;
}

const Chat: React.FC<SessionProps> = ({ session }) => {
  return (
    <Flex height={"100vh"}>
      <ConversationModalProvider>
        <ConversationsWrapper session={session} />
        <FeedWrapper session={session} />
      </ConversationModalProvider>
    </Flex>
  );
};

export default Chat;

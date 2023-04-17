import { SessionProps } from "../Chat";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { MessagesHeader } from "./Messages/Header";
import user from "@/src/graphql/operations/user";
import { MessageInput } from "./Messages/Input";
import { Messages } from "./Messages/Messages";
import { NoConversationSelected } from "./NoConversationSelected";

export const FeedWrapper: React.FC<SessionProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width={"100%"}
      direction={"column"}>
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction={"column"}
            justify={"space-between"}
            overflow={"hidden"}
            flexGrow={1}>
            <MessagesHeader conversationId={conversationId} userId={userId} />
            <Messages conversationId={conversationId} userId={userId} />
          </Flex>
          <MessageInput conversationId={conversationId} session={session} />
        </>
      ) : (
        <NoConversationSelected />
      )}
    </Flex>
  );
};

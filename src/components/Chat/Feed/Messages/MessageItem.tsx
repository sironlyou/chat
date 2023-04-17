import { MessagePopulated } from "@/src/utils/types";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import React from "react";

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  sentByMe,
}) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: "whiteAlpha.200" }}
      justify={sentByMe ? "flex-end" : "flex-start"}
      wordBreak="break-word">
      {!sentByMe && (
        <Flex align="flex-end">
          {!sentByMe && (
            <Box
              backgroundImage={
                message.sender && message && message.sender.avatar
                  ? message.sender.avatar
                  : "none"
              }
              height={"32px"}
              minWidth={"32px"}
              borderRadius={"50%"}
              backgroundSize={"cover"}
            />
          )}
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={sentByMe ? "flex-end" : "flex-start"}>
          {!sentByMe && (
            <Text fontWeight={500} textAlign={sentByMe ? "right" : "left"}>
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {JSON.stringify(message.createdAt).substring(12, 17)}
          </Text>
        </Stack>
        <Flex direction="row" justify={sentByMe ? "flex-end" : "flex-start"}>
          <Box
            bg={sentByMe ? "brand.100" : "whiteAlpha.300"}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%">
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

import {
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { SearchedUser } from "../../../../utils/types";

interface UserListProps {
  users: Array<SearchedUser>;
  participants: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

export const UserSearchList: React.FC<UserListProps> = ({
  users,
  participants,
  addParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.username}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}>
              <Box
                backgroundImage={user.avatar}
                height={"48px"}
                minWidth={"48px"}
                borderRadius={"50%"}
                backgroundSize={"cover"}
              />
              <Flex justify="space-between" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>

                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  disabled={
                    !!participants.find(
                      (participant) => participant.id === user.id
                    )
                  }
                  onClick={() => addParticipant(user)}>
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

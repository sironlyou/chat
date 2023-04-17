import { SearchedUser } from "@/src/utils/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipant: (userId: string) => void;
}
export const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <Flex mt={0} gap={"10px"} flexWrap={"wrap"}>
      {participants.map((participant) => (
        <Stack
          key={participant.id}
          direction={"row"}
          align={"center"}
          bg={"whiteAlpha.200"}
          borderRadius={4}
          p={2}>
          <Text>{participant.username}</Text>

          <IoIosCloseCircleOutline
            onClick={() => removeParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

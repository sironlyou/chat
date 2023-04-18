import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../../utils/types";
import EasyYandexS3 from "easy-yandex-s3";
import { UploadFile } from "easy-yandex-s3/types/EasyYandexS3";
import axios from "axios";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = React.useState<Blob>();
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (typeof selectedFile === "undefined") return;
    formData.append("selectedFile", selectedFile);
    try {
      const response = await axios({
        method: "post",

        url: `https://chat-backend-m3np.onrender.com/uploadFile`,

        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("res", response.data.Location);
      setAvatar(response.data.Location);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setSelectedFile(event.target.files[0]);
  };

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      const { data } = await createUsername({
        variables: {
          username,
          avatar,
        },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        toast.error(error);
        return;
      }

      toast.success("Username successfully created");

      reloadSession();
    } catch (error) {
      toast.error("There was an error");
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <Button onClick={onSubmit} width="100%" isLoading={loading}>
              Save
            </Button>
            <Text>Upload a profile picture</Text>

            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileSelect} />
              <Button onClick={handleSubmit}></Button>
            </form>
          </>
        ) : (
          <>
            <Text fontSize="4xl">Messenger</Text>
            <Text width="70%" align="center">
              Sign in with Google to send unlimited free messages to your
              friends
            </Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image alt="" height="20px" src="/images/googlelogo.png" />
              }>
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
export default Auth;

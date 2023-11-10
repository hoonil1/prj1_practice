import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  let submitAvailable = true;

  if (password != passwordCheck) {
    submitAvailable = false;
  }
  function handleSignUp() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
      })
      .then(() => console.log("good"))
      .catch(() => console.log("fuck"))
      .finally(() => console.log("check"));
  }

  return (
    <Box>
      <h1>회원 가입</h1>
      <FormControl>
        <FormLabel>ID</FormLabel>
        <Input value={id} onChange={(e) => setId(e.target.value)} />
      </FormControl>
      <FormControl isInvalid={password.length === 0}>
        <FormLabel>PASSWORD</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>암호를 입력해주세요.</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={password != passwordCheck}>
        <FormLabel>PASSWORD 확인</FormLabel>
        <Input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <FormErrorMessage>입력하신 암호와 다릅니다.</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>E-MAIL</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <Flex gap={10}>
        <Button
          onClick={handleSignUp}
          colorScheme="blue"
          isDisabled={!submitAvailable}
        >
          SIGN UP
        </Button>
        <Button onClick={() => navigate(-1)}>취소</Button>
      </Flex>
    </Box>
  );
}

import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    //TODO: 로그인 후 성공,실패,완료 코드 추가
    axios
      .post("/api/member/login", {
        id,
        password,
      })
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("finally"));
  }

  return (
    <Box>
      <h1>LOGIN</h1>
      <FormControl>
        <FormLabel>ID</FormLabel>
        <Input value={id} onChange={(e) => setId(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>PASSWORD</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="facebook" onClick={handleLogin}>
        GO!
      </Button>
    </Box>
  );
}

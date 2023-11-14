import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    axios
      //TODO:로그아웃 후에 할일 추가
      .post("/api/member/logout")
      .then(() => console.log("log outted"))
      .catch(() => console.log("logout failed"))
      .finally(() => console.log("finally"));
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      <Button onClick={() => navigate("/write")}>write</Button>
      <Button onClick={() => navigate("/signup")}>signup</Button>
      <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      <Button onClick={() => navigate("/login")}>LOGIN</Button>
      <Button onClick={handleLogout}>LOGOUT</Button>
    </Flex>
  );
}

import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  let navigate = useNavigate();
  return (
    <Flex>
      <Button onClick={() => navigate("/")}>HOME</Button>
      <Button onClick={() => navigate("/write")}>WRITE</Button>
    </Flex>
  );
}

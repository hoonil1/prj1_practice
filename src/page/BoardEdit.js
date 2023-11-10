import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const navigate = useNavigate();

  // /edit/:id
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleEditButton() {
    // 수정버튼 클릭시
    // PUT 방식 /api/board/edit
    axios
      .put("/api/board/edit", board)
      .then(() => console.log("잘됨"))
      .catch(() => console.log("안됨"))
      .finally(() => console.log("수정버튼 클릭 잘됨"));
  }

  return (
    <Box>
      <h1>{id} 번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={board.writer}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.writer = e.target.value;
            })
          }
        />
      </FormControl>
      <Flex gap={7}>
        <Button colorScheme="facebook" onClick={handleEditButton}>
          수정
        </Button>
        <Button onClick={() => navigate(-1)}>취소</Button>
      </Flex>
    </Box>
  );
}

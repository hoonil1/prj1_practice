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
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);

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

  function titleChange(e) {
    updateBoard((draft) => {
      draft.title = e.target.value;
    });
  }

  function contentChange(e) {
    updateBoard((draft) => {
      draft.content = e.target.value;
    });
  }

  function writerChange(e) {
    updateBoard((draft) => {
      draft.writer = e.target.value;
    });
  }

  return (
    <Box>
      <h1>{id} 번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input value={board.title} onChange={titleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} onChange={contentChange} />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} onChange={writerChange} />
      </FormControl>
      <Flex gap={7}>
        <Button>수정</Button>
        <Button>삭제</Button>
      </Flex>
    </Box>
  );
}
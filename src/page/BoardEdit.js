import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [editting, setEditting] = useState(false);

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
    setEditting(true);
    toast({
      description: "수정중입니다...",
      status: "loading",
      duration: 1000,
    });
    axios.put("/api/board/edit", board).then(() =>
      toast({
        description: { id } + "번 게시물이 수정되었습니다",
        status: "success",
      }),
    );
    navigate("/board/" + id).catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 400) {
        toast({
          description: "요청이 잘못되었습니다.",
          status: "error",
        });
      } else {
        toast({
          description: "수정 중에 문제가 발생하였습니다.",
          status: "error",
        });
      }
    });
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
        <Button
          colorScheme="facebook"
          onClick={handleEditButton}
          disabled={editting}
        >
          수정
        </Button>
        <Button onClick={() => navigate(-1)}>취소</Button>
      </Flex>
    </Box>
  );
}

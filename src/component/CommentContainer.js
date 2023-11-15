import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import { LoginContext } from "./LoginProvider";

function CommentForm({ boardId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ boardId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ commentList, onDeleteModalOpen, isSubmitting }) {
  const { hasAccess } = useContext(LoginContext);
  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{comment.memberId}</Heading>
                <Text fontSize="xs">{comment.inserted}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {comment.comment}
                </Text>

                {hasAccess(comment.memberId) && (
                  <Button
                    isDisabled={isSubmitting}
                    onClick={() => onDeleteModalOpen(comment.id)}
                    size="xs"
                    colorScheme="red"
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ boardId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [commentList, setCommentList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // const [id, setId] = useState(0);

  const { isAuthenticated } = useContext(LoginContext);
  const commentIdRef = useRef(0);
  // useRef : 컴포넌트에서 임시로 값을 저장하는 용도로 사용

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", boardId);

      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .then(() =>
        toast({
          description: "댓글이 등록되었습니다",
          status: "success",
        }),
      )
      .catch((error) => {
        toast({
          description: "댓글 등록중 문제가 발생하였습니다",
          status: "error",
        });
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    // console.log(id + "번 댓글 삭제");
    // TODO: 모달, then, catch, finally

    setIsSubmitting(true);
    axios
      .delete("/api/comment/" + commentIdRef.current)
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      })
      .then(() =>
        toast({
          description: "댓글이 삭제되었습니다",
          status: "success",
        }),
      )
      .catch(() => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다",
            status: "warning",
          });
        } else {
          toast({
            description: "댓글 삭제중 문제가 발생했습니다",
            status: "error",
          });
        }
      });
  }

  function handleDeleteModalOpen(id) {
    // id 를 어딘가에 저장
    // setId(id);
    commentIdRef.current = id;
    // 모달 열기
    onOpen();
  }

  return (
    <Box>
      {isAuthenticated() && (
        <CommentForm
          boardId={boardId}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      )}

      <CommentList
        boardId={boardId}
        isSubmitting={isSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

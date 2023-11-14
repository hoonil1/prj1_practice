import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");

  const [idAvailable, setIdAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [nickNameAvailable, setNickNameAvailable] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  let submitAvailable = true;

  if (!emailAvailable) {
    submitAvailable = false;
  }

  if (!idAvailable) {
    submitAvailable = false;
  }

  if (password != passwordCheck) {
    submitAvailable = false;
  }
  if (!nickNameAvailable) {
    submitAvailable = false;
  }

  if (password.length === 0) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
        nickName,
      })
      .then(() => {
        // toast
        // navigate
        toast({
          description: "회원가입이 완료되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        // toast
        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "가입 중에 오류가 발생하였습니다.",
            status: "error",
          });
        }
      });
  }

  function handleIdCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("id", id);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setIdAvailable(false);
        toast({
          description: "이미 사용 중인 ID입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvailable(true);
          toast({
            description: "사용 가능한 ID입니다.",
            status: "success",
          });
        }
      });
  }

  function handleEmailCheck() {
    const params = new URLSearchParams();
    params.set("email", email);

    axios
      .get("/api/member/check?" + params)
      .then(() => {
        setEmailAvailable(false);
        toast({
          description: "이미 사용 중인 email입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setEmailAvailable(true);
          toast({
            description: "사용 가능한 email입니다.",
            status: "success",
          });
        }
      });
  }

  function handleNicknameCheck() {
    const params = new URLSearchParams();
    params.set("nickName", nickName);

    axios
      .get("/api/member/check?" + params.toString())
      .then(() => {
        setNickNameAvailable(false);
        toast({
          description: "이미 사용중인 닉네임입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNickNameAvailable(true);
          toast({
            description: "사용 가능한 닉네임입니다",
            statue: "success",
          });
        }
      });
  }

  return (
    <Box>
      <p style={{ fontSize: "3rem" }}>회원 가입</p>
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "3px solid black",
        }}
      >
        <FormControl isInvalid={!idAvailable}>
          <FormLabel style={{ fontSize: "1rem", fontStyle: "italic" }}>
            ID
          </FormLabel>
          <Flex>
            <Input
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIdAvailable(false);
              }}
            />
            <Button onClick={handleIdCheck}>중복확인</Button>
          </Flex>
          <FormErrorMessage>ID 중복체크를 해주세요.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={password.length === 0}>
          <FormLabel style={{ fontSize: "1rem", fontStyle: "italic" }}>
            PASSWORD
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>암호를 입력해 주세요.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={password != passwordCheck}>
          <FormLabel style={{ fontSize: "1rem", fontStyle: "italic" }}>
            PASSWORD 확인
          </FormLabel>
          <Input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!nickName}>
          <FormLabel style={{ fontSize: "1rem", fontStyle: "italic" }}>
            NICKNAME
          </FormLabel>
          <Flex>
            <Input
              type="nickName"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
                setNickNameAvailable(false);
              }}
            />
            <Button onClick={handleNicknameCheck}>중복체크</Button>
          </Flex>
          <FormErrorMessage>nickname 중복체크를 해주세요</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!emailAvailable}>
          <FormLabel style={{ fontSize: "1rem", fontStyle: "italic" }}>
            EMAIL
          </FormLabel>
          <Flex>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmailAvailable(false);
                setEmail(e.target.value);
              }}
            />
            <Button onClick={handleEmailCheck}>중복체크</Button>
          </Flex>
          <FormErrorMessage>email 중복 체크를 해주세요.</FormErrorMessage>
        </FormControl>
      </div>
      <Button
        isDisabled={!submitAvailable}
        onClick={handleSubmit}
        colorScheme="blue"
      >
        가입
      </Button>
    </Box>
  );
}
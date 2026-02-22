import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Link,
  HStack,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReachLink, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;
console.log("API URL =", API);

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  // STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isSignup && !name) {
      toast({
        title: "Name is required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: "Email and Password required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (isSignup && !email.endsWith("@gmail.com")) {
      setEmailError("Please enter a valid Gmail ID (example@gmail.com)");
      return;
    }

    setEmailError("");

    const url = isSignup
      ? `${API}/api/auth/signup`
      : `${API}/api/auth/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup
            ? { name, email, password }
            : { email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: data.msg || data.message || "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: isSignup
          ? "Account created successfully! Please login."
          : "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      if (isSignup) {
        setIsSignup(false);
      } else {
        localStorage.setItem("token", data.token);
        const redirect = localStorage.getItem("redirectAfterLogin");
        navigate("/");
        if (redirect) localStorage.removeItem("redirectAfterLogin");
      }

      setName("");
      setEmail("");
      setPassword("");
      setEmailError("");
    } catch (error) {
      toast({
        title: "Server error",
        description: "Please make sure backend is running.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, gray.100, gray.200)"
    >
      <Box
        bg="whiteAlpha.900"
        backdropFilter="blur(20px)"
        p={10}
        rounded="2xl"
        shadow="2xl"
        width="100%"
        maxW="420px"
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading mb={6} textAlign="center" fontWeight="bold">
          {isSignup ? "Create Account" : "Welcome Back"}
        </Heading>

        <VStack spacing={5}>
          {/* NAME FIELD */}
          {isSignup && (
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                focusBorderColor="teal.400"
              />
            </FormControl>
          )}

          {/* EMAIL FIELD */}
          <FormControl isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isSignup && !e.target.value.endsWith("@gmail.com")) {
                  setEmailError("Only Gmail allowed");
                } else {
                  setEmailError("");
                }
              }}
              placeholder="Enter your email"
              focusBorderColor="teal.400"
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          </FormControl>

          {/* ✅ FIXED PASSWORD FIELD (ONLY ONE) */}
          <FormControl>
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                focusBorderColor="teal.400"
                pr="3rem"
              />

              <InputRightElement height="100%">
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* LOGIN BUTTON */}
          <Button
            width="100%"
            py={6}
            rounded="full"
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="white"
            onClick={handleSubmit}
          >
            {isSignup ? "Create Account" : "Login"}
          </Button>

          {/* ADMIN LOGIN */}
          <Button
            width="100%"
            py={5}
            rounded="full"
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            onClick={() => navigate("/adminlogin")}
          >
            Admin Login
          </Button>

          {/* SWITCH */}
          <HStack spacing={2}>
            <Text fontSize="sm">
              {isSignup ? "Already have an account?" : "New user?"}
              <Link
                color="teal.500"
                ml={1}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login" : "Sign up"}
              </Link>
            </Text>

            <Text fontSize="sm">|</Text>

            <ReachLink to="/">
              <Text fontSize="sm" color="teal.500">
                Go Home
              </Text>
            </ReachLink>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
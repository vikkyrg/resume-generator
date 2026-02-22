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

  // ✅ STATES
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
        isClosable: true
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: "Email and Password required",
        status: "warning",
        duration: 2000,
        isClosable: true
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
        )
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: data.msg || data.message || "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true
        });
        return;
      }

      toast({
        title: isSignup
          ? "Account created successfully! Please login."
          : "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true
      });

      if (isSignup) {
        setIsSignup(false);
      } else {
        localStorage.setItem("token", data.token);
        const redirect = localStorage.getItem("redirectAfterLogin");
        navigate("/");
        if (redirect) {
          localStorage.removeItem("redirectAfterLogin");
        }
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
        isClosable: true
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
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-5px)",
          shadow: "xl",
        }}
      >

        <Heading mb={6} textAlign="center" fontWeight="bold">
          {isSignup ? "Create Account" : "Welcome Back"}
        </Heading>

        <VStack spacing={5}>

          {isSignup && (
            <FormControl>
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                focusBorderColor="teal.400"
                rounded="lg"
              />
            </FormControl>
          )}

          <FormControl isInvalid={emailError}>
            <FormLabel fontWeight="medium">Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (isSignup && !e.target.value.endsWith("@gmail.com")) {
                  setEmailError("Only Gmail addresses allowed (@gmail.com)");
                } else {
                  setEmailError("");
                }
              }}
              placeholder="Enter your email"
              focusBorderColor="teal.400"
              rounded="lg"
            />
            {emailError && (
              <FormErrorMessage>
                {emailError}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="medium">Password</FormLabel>

            <InputGroup size="md">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                focusBorderColor="teal.400"
                rounded="lg"
                pr="4.5rem"   // important for mobile spacing
              />

              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label="Toggle Password"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            width="100%"
            py={6}
            rounded="full"
            fontWeight="semibold"
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="white"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "lg",
              bgGradient: "linear(to-r, teal.500, blue.600)",
            }}
            _active={{
              transform: "scale(0.96)",
            }}
            onClick={handleSubmit}
          >
            {isSignup ? "Create Account" : "Login"}
          </Button>

          <Button
            width="100%"
            py={5}
            rounded="full"
            fontWeight="medium"
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "lg",
            }}
            onClick={() => navigate("/adminlogin")}
          >
            Admin Login
          </Button>

          <HStack spacing={2}>
            <Text fontSize="sm">
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <Link
                color="teal.500"
                fontWeight="medium"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login" : "Sign up"}
              </Link>
            </Text>

            <Text fontSize="sm">|</Text>

            <ReachLink to="/">
              <Text fontSize="sm" color="teal.500" fontWeight="medium">
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

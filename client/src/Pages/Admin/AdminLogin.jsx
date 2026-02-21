import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Email and Password required",
        status: "warning",
        duration: 2000,
        isClosable: true
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: data.msg || "Invalid admin credentials",
          status: "error",
          duration: 2000,
          isClosable: true
        });
        return;
      }

      localStorage.setItem("adminToken", data.token);

      toast({
        title: "Admin login successful",
        status: "success",
        duration: 2000,
        isClosable: true
      });

      navigate("/admin");

    } catch (error) {
      toast({
        title: "Server error",
        status: "error",
        duration: 2000,
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
          Admin Login
        </Heading>

        <VStack spacing={5}>
          <FormControl>
            <FormLabel fontWeight="medium">Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              focusBorderColor="purple.400"
              rounded="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="medium">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              focusBorderColor="purple.400"
              rounded="lg"
            />
          </FormControl>

          <Button
            width="100%"
            py={6}
            rounded="full"
            fontWeight="semibold"
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "lg",
              bgGradient: "linear(to-r, purple.500, pink.600)",
            }}
            _active={{
              transform: "scale(0.96)",
            }}
            onClick={handleAdminLogin}
          >
            Login as Admin
          </Button>

          <Text
            fontSize="sm"
            color="purple.500"
            fontWeight="medium"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              textDecoration: "underline",
              color: "purple.600",
            }}
            onClick={() => navigate("/login")}
          >
            Back to User Login
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminLogin;

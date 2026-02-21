import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Stack,
  Badge,
  Avatar,
  Flex,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

const UserDetails = () => {

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  // ============================
  // FETCH USER
  // ============================
  const fetchUser = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/${id}`;

      console.log("Fetching User From:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();

      console.log("User Data:", data);

      setUser(data);
      setLoading(false);

    } catch (error) {
      console.error("Fetch User Error:", error);
      setError(true);
      setLoading(false);
    }
  };

  // ============================
  // LOADING STATE
  // ============================
  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // ============================
  // ERROR STATE
  // ============================
  if (error || !user) {
    return (
      <Box textAlign="center" mt={20}>
        <Heading size="md">User not found</Heading>
        <Link to="/admin/users">
          <Button mt={4}>Back</Button>
        </Link>
      </Box>
    );
  }

  // ============================
  // UI
  // ============================
  return (
    <Box p={5}>

      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={6}>

        <Flex align="center" gap={4}>
          <Avatar
            size="lg"
            name={user.name || user.email}
          />

          <Box>
            <Heading size="md">
              {user.name || "User"}
            </Heading>

            <Text color="gray.500">
              {user.email}
            </Text>
          </Box>
        </Flex>

        <Link to="/admin/users">
          <Button colorScheme="blue" variant="outline">
            Back to Users
          </Button>
        </Link>

      </Flex>

      {/* CARD */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="sm"
      >

        <Heading size="sm" mb={4}>
          Account Information
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              User ID
            </Text>
            <Text fontWeight="500">
              {user._id}
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Name
            </Text>
            <Text fontWeight="500">
              {user.name || "N/A"}
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Email
            </Text>
            <Text fontWeight="500">
              {user.email}
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Role
            </Text>
            <Badge
              width="fit-content"
              colorScheme={user.role === "admin" ? "purple" : "blue"}
            >
              {user.role || "user"}
            </Badge>
          </Stack>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Created At
            </Text>
            <Text fontWeight="500">
              {new Date(user.createdAt).toLocaleString()}
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Updated At
            </Text>
            <Text fontWeight="500">
              {new Date(user.updatedAt).toLocaleString()}
            </Text>
          </Stack>

        </SimpleGrid>

      </Box>

    </Box>
  );
};

export default UserDetails;
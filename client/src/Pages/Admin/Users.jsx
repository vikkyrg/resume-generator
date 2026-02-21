import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  Avatar,
  Flex,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==============================
  // FETCH USERS
  // ==============================
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.totalUsers || 0);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Users Error:", error);
      setLoading(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) return;

      closeDeleteDialog();
      await fetchUsers();
    } catch (error) {
      console.error("Delete User Error:", error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={{ base: 3, md: 5 }} width="100%">

      {/* HEADER */}
      <Box mb={4}>
        <Heading size="lg">Users</Heading>
        <Text color="gray.500">Total Users: {total}</Text>
      </Box>

      {/* SEARCH */}
      <Input
        placeholder="Search by email..."
        mb={6}
        width={{ base: "100%", md: "300px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflowX={{ base: "auto", md: "visible" }}
        width="100%"
      >
        <Table
          variant="simple"
          size={{ base: "sm", md: "md" }}
          width="100%"
        >
          <Thead bg="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>User</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Joined</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {filteredUsers.map((user, index) => (
              <Tr key={user._id} _hover={{ bg: "gray.50" }}>
                <Td>{index + 1}</Td>

                <Td>
                  <Flex align="center" gap={2}>
                    <Avatar size="sm" name={user.name || user.email} />
                    <Text fontWeight="500" fontSize={{ base: "sm", md: "md" }}>
                      {user.name || "User"}
                    </Text>
                  </Flex>
                </Td>

                <Td
                  maxW="150px"
                  wordBreak="break-word"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Link
                    to={`/admin/users/${user._id}`}
                    style={{ color: "#3182ce" }}
                  >
                    {user.email}
                  </Link>
                </Td>

                <Td>
                  <Badge
                    fontSize={{ base: "0.7rem", md: "0.8rem" }}
                    colorScheme={
                      user.role === "admin" ? "purple" : "blue"
                    }
                  >
                    {user.role || "user"}
                  </Badge>
                </Td>

                <Td fontSize={{ base: "sm", md: "md" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Td>

                <Td textAlign="center">
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={2}
                    justify="center"
                  >
                    <Link to={`/admin/users/${user._id}`}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        width={{ base: "100%", md: "auto" }}
                      >
                        View
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      width={{ base: "100%", md: "auto" }}
                      onClick={() => openDeleteDialog(user._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* DELETE DIALOG */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this user?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Cancel
              </Button>

              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box>
  );
};

export default Users;

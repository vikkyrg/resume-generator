import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  Flex,
  Button,
  Badge,
  Avatar,
} from "@chakra-ui/react";

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==============================
  // FETCH RESUMES
  // ==============================
  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resumes"
      );

      setResumes(res.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resumes", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ==============================
  // DELETE RESUME
  // ==============================
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/resumes/${id}`
        );
        fetchResumes();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  // ==============================
  // SEARCH FILTER
  // ==============================
  const filteredResumes = resumes.filter(
    (r) =>
      r.personalData?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      r.personalData?.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // ==============================
  // UI
  // ==============================
  return (
    <Box p={{ base: 3, md: 5 }} width="100%">

      {/* HEADER (NOW MATCHES USERS PAGE) */}
      <Box mb={4}>
        <Heading size="lg">Resumes</Heading>
        <Text color="gray.500">
          Total Resumes: {filteredResumes.length}
        </Text>
      </Box>

      {/* SEARCH */}
      <Input
        placeholder="Search by name or email..."
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
        bg="white"
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
              <Th>Phone</Th>
              <Th>Theme</Th>
              <Th>Joined</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {filteredResumes.length === 0 ? (
              <Tr>
                <Td colSpan={7} textAlign="center" py={6}>
                  No resumes found
                </Td>
              </Tr>
            ) : (
              filteredResumes.map((resume, index) => (
                <Tr key={resume._id} _hover={{ bg: "gray.50" }}>

                  {/* INDEX */}
                  <Td>{index + 1}</Td>

                  {/* AVATAR + NAME */}
                  <Td>
                    <Flex align="center" gap={3}>
                      <Avatar
                        size="sm"
                        name={
                          resume.user?.name ||
                          resume.user?.email
                        }
                      />
                      <Text fontWeight="500">
                        {resume.user?.name || "User"}
                      </Text>
                    </Flex>
                  </Td>

                  {/* EMAIL */}
                  <Td>
                    {resume.user?.email || "N/A"}
                  </Td>

                  {/* PHONE */}
                  <Td>
                    {resume.personalData?.phone || "N/A"}
                  </Td>

                  {/* THEME */}
                  <Td>
                    <Badge colorScheme="blue">
                      {resume.themeKey || "N/A"}
                    </Badge>
                  </Td>

                  {/* CREATED */}
                  <Td>
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </Td>

                  {/* ACTION */}
                  <Td textAlign="center">
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      gap={2}
                      justify="center"
                    >
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        width={{ base: "100%", md: "auto" }}
                        onClick={() =>
                          navigate(
                            `/admin/resume-preview/${resume._id}`
                          )
                        }
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        width={{ base: "100%", md: "auto" }}
                        onClick={() =>
                          handleDelete(resume._id)
                        }
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>

                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

    </Box>
  );
};

export default Resumes;

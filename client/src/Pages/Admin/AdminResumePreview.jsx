import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";

import ResumeContext from "../../Context/ResumeContext";
import TemplateRegistry from "../../TemplateRegistry";

const AdminResumePreview = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const scaleValue = useBreakpointValue({
    base: 0.45,
    sm: 0.65,
    md: 0.85,
    lg: 1
  });

  const fetchResume = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/resume/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      setResume(res.data);
      setLoading(false);

    } catch (error) {
      console.log("Failed to load resume", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!resume) {
    return (
      <Heading p={10}>
        Resume Not Found
      </Heading>
    );
  }

  const SelectedTheme = TemplateRegistry[resume.themeKey];

  return (
    <ResumeContext.Provider value={{ themeData: resume }}>

      <Box minH="100vh" bg="gray.100" p={{ base: 3, md: 6 }}>

        {/* HEADER */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 3, md: 0 }}
          bg="white"
          p={{ base: 3, md: 4 }}
          mb={5}
          borderRadius="lg"
          boxShadow="sm"
        >

          <Box>
            <Heading size="md">
              Resume Preview
            </Heading>

            <Text color="gray.500">
              {resume.personalData?.name || "User Resume"}
            </Text>
          </Box>

          <Flex gap={3} align="center" flexWrap="wrap">
            <Badge
              colorScheme="blue"
              fontSize="0.9em"
              px={3}
              py={1}
            >
              {resume.themeKey}
            </Badge>

            <Button
              size={{ base: "sm", md: "md" }}
              variant="outline"
              colorScheme="blue"
              onClick={() => navigate(-1)}
              w={{ base: "100%", md: "auto" }}
            >
              Back
            </Button>
          </Flex>

        </Flex>

        {/* PREVIEW AREA */}
        <Box
  bg="white"
  p={{ base: 2, md: 6 }}
  borderRadius="lg"
  boxShadow="md"
  overflowX="auto"
>
  <Box
    display="flex"
    justifyContent="center"
  >
    <Box
      transform={`scale(${scaleValue})`}
      transformOrigin="top center"
      width="794px"
      bg="white"
      boxShadow="lg"
    >
      {SelectedTheme ? (
        <SelectedTheme />
      ) : (
        <Heading size="md" p={4}>
          Theme Not Found
        </Heading>
      )}
    </Box>
  </Box>
</Box>


      </Box>

    </ResumeContext.Provider>
  );
};

export default AdminResumePreview;

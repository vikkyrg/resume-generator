import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Icon,
  Container,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFileText, FiLayers, FiArrowRight } from "react-icons/fi";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [resumeCount, setResumeCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);

  // Styling Variables
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/adminlogin");
    } else {
      fetchUserCount();
      fetchResumeCount();
      fetchTemplateCount();
    }
  }, [navigate]);

  // -------------------
  // Fetch Users Count
  // -------------------
  const fetchUserCount = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setTotalUsers(data.totalUsers || 0);
    } catch (error) {
      console.error("User Count Error:", error);
    }
  };

  // -------------------
  // Fetch Resume Count
  // -------------------
  const fetchResumeCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resumes");
      setResumeCount(res.data.length);
    } catch (error) {
      console.error("Resume Count Error:", error);
    }
  };

  // -------------------
  // Fetch Template Count
  // -------------------
  const fetchTemplateCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/templates");
      setTemplateCount(res.data.length);
    } catch (error) {
      console.error("Template Count Error:", error);
    }
  };

  // Helper component for Stat Cards to keep code clean
  const DashboardCard = ({ title, count, icon, color, onClick }) => (
    <Stat
      px={{ base: 4, md: 6 }}
      py={"5"}
      bg={cardBg}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.100", "gray.700")}
      rounded={"xl"}
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl", borderColor: color }}
      onClick={onClick}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated color={"gray.500"}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"3xl"} fontWeight={"bold"}>
            {count}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={color}
          alignContent={"center"}
          bg={useColorModeValue(`${color}.50`, "gray.700")}
          p={3}
          borderRadius={"lg"}
        >
          <Icon as={icon} w={8} h={8} />
        </Box>
      </Flex>
      <Divider my={3} />
      <Flex align="center" fontSize="sm" color={color} fontWeight="600">
        View Details <Icon as={FiArrowRight} ml={1} />
      </Flex>
    </Stat>
  );

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="7xl">
        {/* HEADER */}
        <Box mb={10}>
          <Heading size="xl" letterSpacing="tight" mb={1}>
            Dashboard Overview
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Welcome back, <Text as="span" fontWeight="bold" color="blue.600">Admin</Text>
          </Text>
        </Box>

        {/* STATS GRID */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <DashboardCard
            title={"Total Registered Users"}
            count={totalUsers}
            icon={FiUsers}
            color="blue.500"
            onClick={() => navigate("/admin/users")}
          />
          <DashboardCard
            title={"Resumes Created"}
            count={resumeCount}
            icon={FiFileText}
            color="green.500"
            onClick={() => navigate("/admin/resumes")}
          />
          <DashboardCard
            title={"Active Templates"}
            count={templateCount}
            icon={FiLayers}
            color="purple.500"
            onClick={() => navigate("/admin/templates")}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
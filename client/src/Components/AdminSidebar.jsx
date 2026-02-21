import React from "react";
import {
  VStack,
  HStack,
  Button,
  Heading,
  Icon,
  Divider,
  Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiFileText,
  FiLayout,
  FiLogOut,
  FiLayers
} from "react-icons/fi";

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  const NavItem = ({ icon, label, path }) => (
    <Button
      variant="ghost"
      w="100%"
      justifyContent="flex-start"
      leftIcon={<Icon as={icon} boxSize={5} />}
      fontSize="md"
      fontWeight="medium"
      color="whiteAlpha.900"
      px={4}
      py={6}
      borderRadius="xl"
      _hover={{
        bg: "whiteAlpha.200",
        transform: "translateX(4px)",
      }}
      _active={{
        bg: "whiteAlpha.300",
      }}
      transition="all 0.2s ease"
      onClick={() => {
        navigate(path);
        if (onClose) onClose();
      }}
    >
      {label}
    </Button>
  );

  return (
    <Box
      w="270px"
      h="100vh"
      bgGradient="linear(to-b, purple.900, purple.700)"
      color="white"
      p={5}
      display="flex"
      flexDirection="column"
      boxShadow="xl"
    >
      {/* Top Section */}
      <VStack align="start" spacing={8} flex="1" w="100%">

        {/* Logo / Title */}
        <HStack spacing={3}>
          <Box
            p={2}
            bg="whiteAlpha.200"
            borderRadius="lg"
          >
            <Icon as={FiLayout} boxSize={6} />
          </Box>
          <Box>
            <Heading size="md" lineHeight="1">
              Admin Core
            </Heading>
          </Box>
        </HStack>

        <Divider borderColor="whiteAlpha.300" />

        {/* Navigation */}
        <VStack align="start" spacing={1} w="100%">
          <NavItem icon={FiLayout} label="Dashboard" path="/admin" />
          <NavItem icon={FiUsers} label="Users" path="/admin/users" />
          <NavItem icon={FiFileText} label="Resumes" path="/admin/resumes" />
          <NavItem icon={FiLayers} label="Templates" path="/admin/templates" />
        </VStack>
      </VStack>

      {/* Logout */}
      <Box mt={4}>
        <Divider mb={4} borderColor="whiteAlpha.300" />
        <Button
          leftIcon={<FiLogOut />}
          w="100%"
          colorScheme="red"
          variant="solid"
          borderRadius="xl"
          py={6}
          _hover={{
            transform: "scale(1.02)",
          }}
          transition="all 0.2s ease"
          onClick={() => {
            handleLogout();
            if (onClose) onClose();
          }}

        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSidebar;

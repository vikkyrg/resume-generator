import React from "react";
import {
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  HStack,
  Icon,
  MenuDivider,
  AvatarBadge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiLogOut,
  FiActivity,
} from "react-icons/fi";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  const goToProfile = () => {
    navigate("/admin/profile");
  };

  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.800");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={{ base: 3, md: 6 }}
      h={{ base: "60px", md: "72px" }}
      w="100%"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="sm"
    >
      {/* ================= LEFT SIDE ================= */}
      <HStack
        spacing={{ base: 2, md: 4 }}
        align="center"
        cursor="pointer"
        onClick={() => navigate("/admin")}
      >
        {/* Logo Icon */}
        <Flex
          align="center"
          justify="center"
          w={{ base: "34px", md: "44px" }}
          h={{ base: "34px", md: "44px" }}
          bgGradient="linear(to-br, teal.500, teal.600)"
          borderRadius="xl"
          boxShadow="md"
        >
          <Icon as={FiActivity} color="white" boxSize={{ base: 4, md: 5 }} />
        </Flex>

        {/* Brand Text */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height={{ base: "34px", md: "44px" }}
        >
          {/* Mobile Short Title */}
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="gray.800"
            lineHeight="1"
          >
            <Box as="span" display={{ base: "inline", md: "none" }}>
              Resume Generator
            </Box>
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Resume Generator
            </Box>
          </Text>

          {/* Desktop Subtitle Only */}
          <Text
            fontSize="xs"
            color="teal.500"
            fontWeight="600"
            letterSpacing="0.1em"
            lineHeight="1"
            mt="2px"
            display={{ base: "none", md: "block" }}
          >
            SYSTEM CORE
          </Text>
        </Box>
      </HStack>

      {/* ================= RIGHT SIDE ================= */}
      <Menu placement="bottom-end">
        <MenuButton>
          <HStack
            spacing={{ base: 1, md: 3 }}
            align="center"
            height={{ base: "34px", md: "44px" }}
            px={{ base: 1, md: 3 }}
            borderRadius="lg"
            transition="all 0.2s ease"
            _hover={{ bg: hoverBg }}
          >
            <Avatar
              size={{ base: "xs", md: "sm" }}
              name="Admin"
              bg="teal.500"
              color="white"
              fontWeight="bold"
            >
              <AvatarBadge
                boxSize="0.7em"
                bg="green.400"
                border="2px solid white"
              />
            </Avatar>

            {/* Desktop Only Admin Text */}
            <Text
              fontSize="sm"
              fontWeight="600"
              color="gray.700"
              display={{ base: "none", md: "block" }}
            >
              Admin
            </Text>

          </HStack>
        </MenuButton>

        <MenuList
          borderRadius="xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
          p={2}
          minW="200px"
        >
          <Box px={3} py={2}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Account
            </Text>
          </Box>

          <MenuItem
            icon={<FiUser />}
            onClick={goToProfile}
            borderRadius="md"
            _hover={{ bg: "teal.50", color: "teal.600" }}
          >
            My Profile
          </MenuItem>

          <MenuDivider />

          <MenuItem
            icon={<FiLogOut />}
            onClick={handleLogout}
            borderRadius="md"
            color="red.500"
            _hover={{ bg: "red.50" }}
            fontWeight="600"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AdminNavbar;

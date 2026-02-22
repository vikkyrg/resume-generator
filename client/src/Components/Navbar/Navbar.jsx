// =======================
// React & Hooks
// =======================
import React, { useEffect, useState, useContext } from "react";

// =======================
// UI Library (Chakra UI)
// =======================
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  VStack,
} from "@chakra-ui/react";

// =======================
// Icons
// =======================
import { FaUserCircle } from "react-icons/fa";

// =======================
// Routing
// =======================
import { Link as ReachLink, useNavigate } from "react-router-dom";

// =======================
// Context
// =======================
import ResumeContext from "../../Context/ResumeContext";

// =======================
// Assets
// =======================
import logo from "../../Assets/logo.png";

// =======================
// Component
// =======================
const Navbar = () => {
  const navigate = useNavigate();

  const { setSelectBtn, setShowComponent, setCurrentTheme } =
    useContext(ResumeContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  // ================= FETCH CURRENT USER =================
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log("User fetch failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchCurrentUser();
    }
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);

    setSelectBtn(true);
    setShowComponent(false);
    setCurrentTheme(null);

    navigate("/", { replace: true });
  };

  return (
    <Box
      bg={bgColor}
      px={{ base: 3, md: 6 }}
      width="100%"
      height="64px"
      display="flex"
      alignItems="center"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex width="100%" alignItems="center" justifyContent="space-between">

        {/* ================= LOGO + TITLE ================= */}
        <Flex alignItems="center" gap={{ base: 2, md: 4 }}>
          <ReachLink to="/">
            <Box
              bg="white"
              p={2}
              rounded="lg"
              shadow="sm"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                shadow: "md",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ height: "34px", display: "block" }}
              />
            </Box>
          </ReachLink>

          <Text
            fontSize={{ base: "sm", md: "xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            color={textColor}
            bgGradient="linear(to-r, teal.500, blue.500)"
            bgClip="text"
            whiteSpace="nowrap"
          >
            <Box as="span" display={{ base: "inline", sm: "none" }}>
              Resume
            </Box>

            <Box as="span" display={{ base: "none", sm: "inline" }}>
              Resume Generator
            </Box>
          </Text>
        </Flex>

        {/* ================= RIGHT ACTIONS ================= */}
        <Flex alignItems="center" gap={{ base: 2, md: 4 }}>
          {isLoggedIn ? (
            <>
              {/* USER ICON WITH POPUP */}
            <Menu>
              <MenuButton>
                <Avatar
                  size="sm"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  color="white"
                  icon={<FaUserCircle />}
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{ transform: "scale(1.1)", boxShadow: "md" }}
                />
              </MenuButton>

              <MenuList
                p={4}
                borderRadius="xl"
                boxShadow="xl"
                border="1px solid"
                borderColor="gray.100"
                minW="260px"
              >
                {/* USER INFO CARD */}
                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="lg"
                  mb={3}
                >
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                      NAME
                    </Text>
                    <Text fontWeight="bold" fontSize="md">
                      {user?.name || "User"}
                    </Text>

                    <Text fontSize="xs" color="gray.500" fontWeight="semibold" mt={2}>
                      EMAIL
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      {user?.email}
                    </Text>
                  </VStack>
                </Box>

                <MenuDivider />

                {/* LOGOUT */}
                <MenuItem
                  color="red.500"
                  fontWeight="semibold"
                  borderRadius="md"
                  _hover={{ bg: "red.50" }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>

              {/* ORIGINAL LOGOUT BUTTON (UNCHANGED) */}
              <Button
                px={{ base: 4, md: 6 }}
                size={{ base: "sm", md: "md" }}
                rounded="full"
                bgGradient="linear(to-r, red.400, pink.500)"
                color="white"
                fontWeight="semibold"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <ReachLink to="/login">
              <Button
                px={{ base: 4, md: 6 }}
                size={{ base: "sm", md: "md" }}
                rounded="full"
                bgGradient="linear(to-r, teal.400, blue.500)"
                color="white"
                fontWeight="semibold"
              >
                Login
              </Button>
            </ReachLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
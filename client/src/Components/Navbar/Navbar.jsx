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
  Icon,
} from "@chakra-ui/react";

// =======================
// Icons
// =======================
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

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
                    transition="all 0.25s ease"
                    _hover={{
                      transform: "scale(1.08)",
                      boxShadow: "0 6px 18px rgba(56,178,172,0.35)",
                    }}
                  />
                </MenuButton>

                <MenuList
                  p={0}
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 20px 40px rgba(0,0,0,0.08)"
                  border="1px solid"
                  borderColor="gray.100"
                  minW="280px"
                  sx={{
                    transformOrigin: "top right",
                    animation: "menuPop 0.18s ease-out",
                    "@keyframes menuPop": {
                      "0%": { opacity: 0, transform: "scale(0.96) translateY(-6px)" },
                      "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
                    },
                  }}
                >
                  {/* ===== ATTRACTIVE USER HEADER WITH STYLIZED NAME ===== */}
                  <Box
                    px={5}
                    py={5}
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    borderBottom="1px solid"
                    borderColor="purple.200"
                  >
                    <Text fontSize="xs" color="whiteAlpha.700" fontWeight="semibold" letterSpacing="wide">
                      WELCOME BACK
                    </Text>
                    <Text 
                      fontWeight="extrabold" 
                      fontSize="xl" 
                      color="white"
                      letterSpacing="tight"
                      mt={1}
                      textShadow="0 2px 4px rgba(0,0,0,0.1)"
                    >
                      {user?.name ? (
                        <>
                          {user.name.split(' ').map((word, i, arr) => (
                            <span key={i} style={{ 
                              background: i === 0 ? 'linear-gradient(120deg, #fff, #e0e7ff)' : 'white',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: i === 0 ? 'transparent' : 'white',
                              display: 'inline-block',
                              marginRight: i < arr.length - 1 ? '8px' : '0'
                            }}>
                              {word}
                            </span>
                          ))}
                        </>
                      ) : (
                        <span style={{
                          background: 'linear-gradient(120deg, #fff, #e0e7ff)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          Valued User
                        </span>
                      )}
                    </Text>
                    
                    {/* Stylized Email Display */}
                    <Box
                      mt={3}
                      p={2}
                      bg="whiteAlpha.200"
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                    >
                      <Flex alignItems="center">
                        <FaEnvelope style={{ color: 'rgba(255,255,255,0.8)', marginRight: '8px', fontSize: '14px' }} />
                        <Text fontSize="sm" color="white" fontWeight="medium" isTruncated>
                          {user?.email || "user@example.com"}
                        </Text>
                      </Flex>
                    </Box>
                    
                    {/* Optional: Add a subtle decorative element */}
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      w="80px"
                      h="80px"
                      bg="whiteAlpha.100"
                      borderRadius="full"
                      filter="blur(40px)"
                      pointerEvents="none"
                    />
                  </Box>
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
                  boxShadow: "0 10px 25px rgba(244,63,94,0.4)",
                  bgGradient: "linear(to-r, red.500, pink.600)",
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
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 25px rgba(56,178,172,0.4)",
                  bgGradient: "linear(to-r, teal.500, blue.600)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
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
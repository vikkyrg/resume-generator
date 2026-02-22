/**

* =======================
* React & Hooks
* =======================
  */
  import React, { useEffect, useState, useContext } from "react";

/**

* =======================
* Chakra UI (Single Import — FIXED)
* =======================
  */
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

/**

* =======================
* Routing
* =======================
  */
  import { Link as ReachLink, useNavigate } from "react-router-dom";

/**

* =======================
* Context
* =======================
  */
  import ResumeContext from "../../Context/ResumeContext";

/**

* =======================
* Assets
* =======================
  */
  import logo from "../../Assets/logo.png";

/**

* =======================
* Component
* =======================
  */
  const Navbar = () => {
  const navigate = useNavigate();

const { setSelectBtn, setShowComponent, setCurrentTheme } =
useContext(ResumeContext);

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);

const bgColor = useColorModeValue("gray.100", "gray.900");
const textColor = useColorModeValue("gray.800", "white");

/**

* =======================
* Fetch Current Logged User
* =======================
  */
  const fetchCurrentUser = async () => {
  try {
  const token = localStorage.getItem("token");

  if (!token) {
  setIsLoggedIn(false);
  setUser(null);
  return;
  }

  const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/auth/me`,
  {
  method: "GET",
  headers: {
  Authorization: `Bearer ${token}`,
  },
  }
  );

  if (!res.ok) {
  throw new Error("Token invalid");
  }

  const data = await res.json();

  setUser(data);
  setIsLoggedIn(true);
  } catch (err) {
  console.log("User fetch failed");
  localStorage.clear();
  setIsLoggedIn(false);
  setUser(null);
  }
  };

/**

* =======================
* Run On Load
* =======================
  */
  useEffect(() => {
  fetchCurrentUser();

  const interval = setInterval(() => {
    fetchCurrentUser();
  }, 5000); // re-check every 5 seconds (optional)

  return () => clearInterval(interval);
}, []);

/**

* =======================
* Logout
* =======================
  */
  const handleLogout = () => {
  localStorage.clear();


setIsLoggedIn(false);



setUser(null);

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
> <Flex width="100%" alignItems="center" justifyContent="space-between">


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
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={user?.name || "User"}
              cursor="pointer"
              bgGradient="linear(to-r, teal.400, blue.500)"
            />
          </MenuButton>

          <MenuList p={4} minW="240px">

            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">{user?.name || "User"}</Text>
              <Text fontSize="sm" color="gray.500">
                {user?.email}
              </Text>
            </VStack>

            <MenuDivider />

            <MenuItem onClick={() => navigate("/builder")}>
              My Resume
            </MenuItem>

            <MenuItem onClick={() => navigate("/templates")}>
              Templates
            </MenuItem>

            <MenuDivider />

            <MenuItem color="red.500" onClick={handleLogout}>
              Logout
            </MenuItem>

          </MenuList>
        </Menu>
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

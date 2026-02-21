import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../../Components/AdminSidebar";
import AdminNavbar from "../../Components/AdminNavbar";

const SIDEBAR_WIDTH = "260px";
const NAVBAR_HEIGHT = "70px";

const AdminLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Proper boolean check (no undefined issue)
  const isDesktop = useBreakpointValue({ base: false, lg: true }) ?? false;

  return (
    <Flex minH="100vh" bg="gray.50" overflow="hidden">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        display={{ base: "none", lg: "block" }}
        w={SIDEBAR_WIDTH}
        position="fixed"
        h="100vh"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <AdminSidebar />
      </Box>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="260px">
          <DrawerCloseButton />
          <AdminSidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* ================= RIGHT CONTENT AREA ================= */}
      <Box
        ml={{ base: 0, lg: SIDEBAR_WIDTH }}
        flex="1"
        minH="100vh"
        w="100%"
      >

        {/* NAVBAR */}
        <Box
          position="sticky"
          top="0"
          h={NAVBAR_HEIGHT}
          bg="white"
          zIndex="1000"
          borderBottom="1px solid"
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          px={4}
        >
          {!isDesktop && (
            <IconButton
              icon={<FiMenu />}
              onClick={onOpen}
              mr={3}
              variant="ghost"
              aria-label="Open Menu"
            />
          )}
          <AdminNavbar />
        </Box>

        {/* PAGE CONTENT */}
        <Box p={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>

      </Box>
    </Flex>
  );
};

export default AdminLayout;

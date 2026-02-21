import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Divider,
  useToast,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false); // 👈 NEW
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // ==========================
  // FETCH ADMIN PROFILE
  // ==========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          "http://localhost:5000/api/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdmin({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      } catch (error) {
        toast({
          title: "Failed to load profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchProfile();
  }, [toast]);

  // ==========================
  // UPDATE PROFILE
  // ==========================
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      setLoading(true);

      await axios.put(
        "http://localhost:5000/api/admin/profile",
        admin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Profile update failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // CHANGE PASSWORD
  // ==========================
  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast({
        title: "All password fields are required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "New passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      setLoading(true);

      await axios.put(
        "http://localhost:5000/api/admin/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Password change failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        maxW="520px"
        w="100%"
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
      >
        <Heading size="lg" mb={1} textAlign="center">
          Admin Profile
        </Heading>
        <Text color="gray.500" mb={6} textAlign="center">
          Manage your account information
        </Text>

        <VStack spacing={5} align="stretch">
          {/* ================= PROFILE INFO ================= */}
          <Box>
            <Text fontWeight="semibold" mb={3}>
              Profile Details
            </Text>

            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                value={admin.name}
                placeholder="Enter name"
                focusBorderColor="teal.400"
                onChange={(e) =>
                  setAdmin({ ...admin, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={admin.email}
                placeholder="Enter email"
                focusBorderColor="teal.400"
                onChange={(e) =>
                  setAdmin({ ...admin, email: e.target.value })
                }
              />
            </FormControl>

            <Button
              colorScheme="teal"
              width="100%"
              isLoading={loading}
              onClick={handleUpdateProfile}
              mb={3}
            >
              Update Profile
            </Button>

            {/* 👇 FORGOT PASSWORD BUTTON */}
            <Button
              variant="link"
              colorScheme="purple"
              fontSize="sm"
              onClick={() => setShowSecurity(true)}
            >
              Change Password
            </Button>
          </Box>

          {/* ================= SECURITY SECTION ================= */}
          {showSecurity && (
            <>
              <Divider />

              <Box>
                <Text fontWeight="semibold" mb={3}>
                  Security
                </Text>

                <FormControl mb={4}>
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current password"
                      focusBorderColor="purple.400"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="Toggle password visibility"
                        icon={
                          showCurrentPassword ? (
                            <ViewOffIcon />
                          ) : (
                            <ViewIcon />
                          )
                        }
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="New password"
                    focusBorderColor="purple.400"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    focusBorderColor="purple.400"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <Button
                  colorScheme="purple"
                  width="100%"
                  isLoading={loading}
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Box>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default AdminProfile;

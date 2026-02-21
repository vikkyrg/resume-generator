import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  Container,
  Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import TemplateBackground from "../../Components/TemplateBackground";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/templates`);
      const data = await res.json();
      setTemplates(data);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Choose Resume Template | Resume Builder</title>
      </Helmet>

      {/* ===== THREE JS BACKGROUND ===== */}
      <TemplateBackground />

      {/* ===== TEMPLATE LIST CONTENT ===== */}
      <Box
        position="relative"
        zIndex="1"
        minH="100vh"
        bg="transparent"
      >
        <Container maxW="7xl" py={12}>
          <Box mb={10} textAlign="center">
            <Heading size="xl" mb={2}>
              Choose Your Template
            </Heading>
            <Text color="gray.500">
              Select a layout that best fits your industry
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }}spacing={{ base: 4, md: 6 }}>
            {templates.map((temp) => (
              <Box
                key={temp._id}
                role="group"
                bg="whiteAlpha.800"
                backdropFilter="blur(12px)"
                p={{ base: 3, md: 6 }}
                shadow="xl"
                rounded="2xl"
                transition="all 0.3s ease"
                border="1px solid"
                borderColor="gray.100"
                _hover={{
                  transform: "translateY(-8px)",
                  shadow: "2xl",
                  borderColor: "teal.300",
                }}
              >
                {/* TEMPLATE IMAGE */}
                <Box
                  rounded="lg"
                  overflow="hidden"
                  bg="gray.50"
                  mb={4}
                  height={{ base: "220px", md: "300px" }}
                >
                  <Image
                    src={`${process.env.REACT_APP_API_URL}/uploads/${temp.image}`}
                    alt={temp.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="top"
                    transition="0.5s ease-in-out"
                    _groupHover={{
                      transform: "scale(1.05)",
                    }}
                  />
                </Box>

                {/* FOOTER */}
                <Flex justifyContent="space-between" alignItems="center">
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color="gray.700"
                    textTransform="capitalize"
                  >
                    {temp.name}
                  </Text>

                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="ghost"
                    transition="all 0.3s ease"
                    _groupHover={{
                      bg: "teal.500",
                      color: "white",
                    }}
                    onClick={() => navigate(`/builder/${temp._id}`)}
                  >
                    Use This
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Templates;

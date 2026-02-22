import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Image,
  SimpleGrid,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaCheckCircle, FaFileAlt, FaDownload } from "react-icons/fa";
import './introduction.css';
import homeLogo from './../../Assets/home-logo.png';
import bgVideo from './../../Assets/video/video.mp4';
import ResumeContext from '../../Context/ResumeContext';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import TemplateBackground from "../../Components/TemplateBackground";

export default function Introduction() {
  const [templates, setTemplates] = useState([]);
  const { selectBtn, setSelectBtn } = useContext(ResumeContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = localStorage.getItem("redirectAfterLogin");
    const token = localStorage.getItem("token");

    if (redirect === "selectTemplate" && token) {
      setSelectBtn(false);
      localStorage.removeItem("redirectAfterLogin");
    }
  }, [setSelectBtn]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/templates`)
      .then(res => res.json())
      .then(data => setTemplates(data));
  }, []);

  const handleSelectTemplate = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("redirectAfterLogin", "selectTemplate");
    navigate("/login");
    return;
  }

  // Fade out home
  setIsAnimating(true);

  setTimeout(() => {
    window.scrollTo(0, 0);
    setSelectBtn(false);

    // Small delay before fade-in
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);

  }, 600);
};


  return (
    <>
      <Helmet>
        <title>Resume Generator | Create Professional Resumes</title>
      </Helmet>

      {selectBtn ? (

        /* ================= HOME PAGE ================= */

        <Box
          position="relative"
          minH="100vh"
          overflow="hidden"
          display="flex"
          alignItems="center"
          transition="opacity 0.6s ease"
          opacity={isAnimating ? 0 : 1}
        >

          <Box
            as="video"
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            zIndex="-2"
          />

          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="blackAlpha.600"
            zIndex="-1"
          />

          <Container maxW="7xl" py={{ base: 20, md: 28 }} zIndex={1}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={14} alignItems="center">

              <Stack spacing={8} textAlign={{ base: "center", md: "left" }}>
                <Box>
                  <Text
                    textTransform="uppercase"
                    color="teal.300"
                    fontWeight="bold"
                    fontSize="sm"
                    letterSpacing="widest"
                    mb={3}
                  >
                    Fast & Smart Resume Generator
                  </Text>

                  <Heading
                    fontSize={{ base: "4xl", md: "6xl" }}
                    fontWeight="extrabold"
                    lineHeight="1.1"
                    color="white"
                  >
                    Design a Professional Resume in{" "}
                    <Text as="span" bgGradient="linear(to-r, teal.300, blue.400)" bgClip="text">
                      Minutes
                    </Text>
                  </Heading>
                </Box>

                <Text fontSize="xl" color="gray.200" maxW="500px">
                  Choose a modern template, fill your details, and download an ATS-friendly,
                  professional resume instantly.
                </Text>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  spacing={4}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  <Button
                    size="lg"
                    height="60px"
                    px={10}
                    fontSize="md"
                    bgGradient="linear(to-r, teal.400, blue.500)"
                    color="white"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "2xl",
                    }}
                    transition="all 0.3s ease"
                    onClick={handleSelectTemplate}
                  >
                    Create My Resume
                  </Button>
                </Stack>

                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} pt={6}>
                  <Flex align="center" gap={3}>
                    <Icon as={FaCheckCircle} color="teal.300" boxSize={5} />
                    <Text fontSize="sm" fontWeight="medium" color="white">ATS Friendly</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Icon as={FaFileAlt} color="blue.300" boxSize={5} />
                    <Text fontSize="sm" fontWeight="medium" color="white">Modern Templates</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Icon as={FaDownload} color="purple.300" boxSize={5} />
                    <Text fontSize="sm" fontWeight="medium" color="white">Instant Download</Text>
                  </Flex>
                </SimpleGrid>
              </Stack>

              <Flex justifyContent="center" position="relative">
                <Image
                  src={homeLogo}
                  maxW={{ base: "100%", md: "600px" }}
                  objectFit="contain"
                  zIndex={1}
                  alt="Resume Preview"
                />
              </Flex>

            </SimpleGrid>
          </Container>
        </Box>

      ) : (

        /* ================= TEMPLATE LIST ================= */

        <>
          <TemplateBackground />

          <Box  position="relative" zIndex="1" minH="100vh" opacity={isAnimating ? 0 : 1} transform={isAnimating ? "translateY(20px)" : "translateY(0)"} transition="all 0.6s ease" > 
            <Container maxW="7xl" py={12}>
              <Box mb={10} textAlign="center">
                <Heading size="xl" mb={2}>
                  Choose Your Template
                </Heading>
                <Text color="gray.500">
                  Select a layout that best fits your industry
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={10}>
                {templates.map((temp) => (
                  <Box
                    key={temp._id}
                    role="group"
                    bg="whiteAlpha.800"
                    backdropFilter="blur(12px)"
                    p={5}
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
                    <Box
                      rounded="lg"
                      overflow="hidden"
                      bg="gray.50"
                      mb={4}
                      height="300px"
                    >
                      <Image
                        src={temp.image}
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
      )}
    </>
  );
}

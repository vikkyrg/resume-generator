import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  SimpleGrid,
  Image,
  VStack,
  Text,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";

const Templates = () => {

  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [componentKey, setComponentKey] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ DELETE DIALOG STATE
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

  // ✅ FORM TOP REF (for scrolling)
  const formRef = useRef();

  useEffect(() => {
    fetchTemplates();
  }, []);

  // ==============================
  // FETCH TEMPLATES
  // ==============================
  const fetchTemplates = async () => {

    const res = await fetch(
      "http://localhost:5000/api/templates"
    );

    const data = await res.json();

    setTemplates(data);

  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async () => {

    if (!name) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("componentKey", componentKey);

    if (image) {
      formData.append("image", image);
    }

    if (editingId) {

      await fetch(
        `http://localhost:5000/api/templates/${editingId}`,
        {
          method: "PUT",
          body: formData
        }
      );

    } else {

      await fetch(
        "http://localhost:5000/api/templates",
        {
          method: "POST",
          body: formData
        }
      );

    }

    setName("");
    setImage(null);
    setEditingId(null);
    setComponentKey("");

    fetchTemplates();

    // ✅ After submit also scroll to top (optional)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // ==============================
  // EDIT
  // ==============================
  const handleEdit = (t) => {

    setName(t.name);
    setEditingId(t._id);
    setComponentKey(t.componentKey);

    // ✅ AUTO SCROLL TO TOP SMOOTHLY
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // OR if you want exact form scroll:
    // formRef.current?.scrollIntoView({ behavior: "smooth" });

  };

  // ==============================
  // OPEN DELETE POPUP
  // ==============================
  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  // ==============================
  // CLOSE DELETE POPUP
  // ==============================
  const closeDeleteDialog = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async () => {

    await fetch(
      `http://localhost:5000/api/templates/${deleteId}`,
      {
        method: "DELETE"
      }
    );

    closeDeleteDialog();
    fetchTemplates();
  };

  // ==============================
  // UI
  // ==============================
  return (
    <Box p={6} bg="gray.50" minH="100vh">

      {/* HEADER */}
      <Heading mb={6}>
        Manage Templates
      </Heading>

      {/* FORM CARD */}
      <Box
        ref={formRef}
        bg="white"
        p={6}
        mb={10}
        borderRadius="lg"
        boxShadow="md"
        maxW="450px"
      >

        <VStack spacing={4}>

          <Input
            placeholder="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Component Key (Theme1)"
            value={componentKey}
            onChange={(e) => setComponentKey(e.target.value)}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Button
            colorScheme="purple"
            width="100%"
            onClick={handleSubmit}
          >
            {editingId ? "Update Template" : "Add Template"}
          </Button>

        </VStack>

      </Box>

      {/* TEMPLATE GRID */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>

        {templates.map((temp) => (

          <Box
            key={temp._id}
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >

            <Image
              src={`http://localhost:5000/uploads/${temp.image}`}
              alt={temp.name}
              mb={3}
              borderRadius="md"
              objectFit="cover"
              height="200px"
              width="100%"
            />

            <Text fontWeight="bold" fontSize="lg">
              {temp.name}
            </Text>

            <Text fontSize="sm" color="gray.500">
              {temp.componentKey}
            </Text>

            <Flex mt={4} gap={3}>

              <Button
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={() => handleEdit(temp)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={() => openDeleteDialog(temp._id)}
              >
                Delete
              </Button>

            </Flex>

          </Box>

        ))}

      </SimpleGrid>

      {/* DELETE CONFIRMATION DIALOG */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >

        <AlertDialogOverlay>

          <AlertDialogContent>

            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Template
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this template?
            </AlertDialogBody>

            <AlertDialogFooter>

              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialogOverlay>

      </AlertDialog>

    </Box>
  );
};

export default Templates;

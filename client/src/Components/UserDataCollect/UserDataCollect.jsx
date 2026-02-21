import React, { useContext, useEffect, useState, useCallback, useRef } from 'react'
import './userCollectData.css'
import { IoMdCloudUpload } from 'react-icons/io'
import { 
    FormControl, 
    Input, 
    Heading, 
    Textarea, 
    Button, 
    Box, 
    VStack, 
    HStack, 
    Divider, 
    Text, 
    Flex, 
    Icon
} from '@chakra-ui/react'
import { 
    MdPerson, 
    MdSchool, 
    MdWork, 
    MdCode, 
    MdStars, 
    MdAddCircleOutline, 
    MdLightbulb 
} from 'react-icons/md'
import ResumeContext from '../../Context/ResumeContext'
import axios from 'axios'

const UserDataCollect = () => {
    const {
        themeData,
        setThemeKey,
        checkAward,
        setCheckAward,
        setThemeData,
        checkProj,
        checkWork,
        setCheckProj,
        setCheckWork,
        themeKey
    } = useContext(ResumeContext)

    // State for Dynamic Counts (Initialized to 1 to show first fields)
    const [projectCount, setProjectCount] = useState(1)
    const [educationCount, setEducationCount] = useState(1)
    const [workCount, setWorkCount] = useState(1)

    // State for Data
    const [personalData, setPersonalData] = useState({ 
        profileImage: 'https://www.w3schools.com/howto/img_avatar.png', 
        name: "", 
        summary: "", 
        profile: "", 
        address: "", 
        phone: "", 
        email: "", 
        skill: "",
    })

    const [projectData, setProjectData] = useState({ 
        'projectTitles': { pTitle1: "" }, 
        'projectDesc': { pDescription1: "" } 
    })
    
    const [educationData, setEducationData] = useState({ 
        'educationTitles': { eTitle1: "" }, 
        'educationDesc': { eDescription1: "" } 
    })
    
    const [workData, setWorkData] = useState({ 
        'workTitles': { wTitle1: "" }, 
        'workDesc': { wDescription1: "" } 
    })
    
    const [awardData, setAwardData] = useState({ awards: "" })

    const formRef = useRef(null);


    // ==========================
    // DATABASE FUNCTIONS
    // ==========================
    const loadResumeFromDB = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/resumes/get`, {
                headers: { Authorization: token }
            });
            if (res.data) {
                setPersonalData(res.data.personalData || personalData);
                setProjectData(res.data.projectData || { projectTitles: { pTitle1: "" }, projectDesc: { pDescription1: "" } });
                setEducationData(res.data.educationData || { educationTitles: { eTitle1: "" }, educationDesc: { eDescription1: "" } });
                setWorkData(res.data.workData || { workTitles: { wTitle1: "" }, workDesc: { wDescription1: "" } });
                setAwardData(res.data.awardData || { awards: "" });

                const projKeys = Object.keys(res.data.projectData?.projectTitles || { pTitle1: "" });
                const eduKeys = Object.keys(res.data.educationData?.educationTitles || { eTitle1: "" });
                const workKeys = Object.keys(res.data.workData?.workTitles || { wTitle1: "" });
                
                setProjectCount(projKeys.length || 1);
                setEducationCount(eduKeys.length || 1);
                setWorkCount(workKeys.length || 1);
            }
        } catch (err) {
            console.error("Load Error:", err);
        }
    };

    const saveResumeToDB = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/resumes/save`, 
                { personalData, projectData, educationData, workData, awardData, themeKey },
                { headers: { Authorization: token } }
            );
        } catch (err) {
            console.error("Save Error:", err);
        }
    }, [personalData, projectData, educationData, workData, awardData, themeKey]);

    // ==========================
    // HANDLERS
    // ==========================
    const handleChangePersonal = (e) => {
        const { name, value } = e.target
        if (name === 'profileImage') {
            setPersonalData({ ...personalData, profileImage: URL.createObjectURL(e.target.files[0]) })
        } else {
            setPersonalData({ ...personalData, [name]: value })
        }
    }

    const handleChangeProject = (e) => {
        const { name, value, id } = e.target
        setProjectData(prev => ({
            ...prev,
            projectTitles: name === 'pName' ? { ...prev.projectTitles, [id]: value } : prev.projectTitles,
            projectDesc: name === 'pDescription' ? { ...prev.projectDesc, [id]: value } : prev.projectDesc
        }))
    }

    const handleProjectClick = (e) => {
        e.preventDefault();
        setProjectCount(prev => prev + 1);
    }

    const handleChangeEducation = (e) => {
        const { name, value, id } = e.target
        setEducationData(prev => ({
            ...prev,
            educationTitles: name === 'eName' ? { ...prev.educationTitles, [id]: value } : prev.educationTitles,
            educationDesc: name === 'eDescription' ? { ...prev.educationDesc, [id]: value } : prev.educationDesc
        }))
    }

    const handleEducationClick = (e) => {
        e.preventDefault();
        setEducationCount(prev => prev + 1);
    }

    const handleChangeWork = (e) => {
        const { name, value, id } = e.target
        setWorkData(prev => ({
            ...prev,
            workTitles: name === 'wName' ? { ...prev.workTitles, [id]: value } : prev.workTitles,
            workDesc: name === 'wDescription' ? { ...prev.workDesc, [id]: value } : prev.workDesc
        }))
    }

    const handleWorkClick = (e) => {
        e.preventDefault();
        setWorkCount(prev => prev + 1);
    }

    const handleChangeAwards = (e) => {
        const { name, value } = e.target
        setAwardData({ ...awardData, [name]: value })
    }
    // ==========================
// CLEAR RESUME DATA
// ==========================
const clearResumeData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Clear all resume data?")) return;

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/resumes/clear`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Reset all fields
        setPersonalData({
            profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
            name: "",
            summary: "",
            profile: "",
            address: "",
            phone: "",
            email: "",
            skill: ""
        });

        setProjectData({ projectTitles: { pTitle1: "" }, projectDesc: { pDescription1: "" } });
        setEducationData({ educationTitles: { eTitle1: "" }, educationDesc: { eDescription1: "" } });
        setWorkData({ workTitles: { wTitle1: "" }, workDesc: { wDescription1: "" } });
        setAwardData({ awards: "" });

        setProjectCount(1);
        setEducationCount(1);
        setWorkCount(1);

        alert("Resume Cleared!");
        if (formRef.current) {
            formRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
    } catch (err) {
        console.log(err);
        alert("Failed to clear");
    }
};


    // ==========================
    // USE EFFECTS
    // ==========================
    useEffect(() => {
        loadResumeFromDB();
    }, []);

    useEffect(() => {
        setThemeData({
            ...themeData,
            personalData,
            projectData,
            educationData,
            workData,
            awardData
        });

        const delaySave = setTimeout(() => {
            saveResumeToDB();
        }, 1000);

        return () => clearTimeout(delaySave);
    }, [personalData, projectData, educationData, workData, awardData, setThemeData, saveResumeToDB]);

    // Reusable Header Component for sections
    const SectionHeader = ({ icon, title, isChecked, onSwitchChange }) => (
        <Flex align="center" justify="space-between" mb={3}>
            <HStack spacing={3}>
                <Icon as={icon} boxSize={6} color="teal.500" />
                <Heading as='h4' size='md' fontWeight="600">{title}</Heading>
            </HStack>
        </Flex>
    );

    return (
        <Box ref={formRef} id="form-collect" p={5} bg="gray.50" minH="100vh" overflowY="auto">
            <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
                
                {/* Personal Details Area */}
                <Box bg="white" p={6} rounded="xl" shadow="md" borderTop="4px solid" borderColor="teal.400">
                    <SectionHeader icon={MdPerson} title="Personal Details" />
                    <Divider mb={4} />

                    <FormControl mb={6}>
                    <Flex direction="column" align="center" gap={4}>
                        <Box
                        as="label"
                        htmlFor="input-file"
                        cursor="pointer"
                        p={6}
                        border="2px dashed"
                        borderColor="teal.300"
                        rounded="xl"
                        textAlign="center"
                        w="100%"
                        maxW="400px"
                        transition="0.3s"
                        _hover={{ bg: "teal.50", borderColor: "teal.500" }}
                        >
                        <Icon as={IoMdCloudUpload} boxSize={10} color="teal.500" />
                        <Text fontWeight="bold">Upload Profile Picture</Text>

                        <input
                            accept="image/*"
                            name="profileImage"
                            onChange={handleChangePersonal}
                            id="input-file"
                            type="file"
                            hidden
                        />
                        </Box>

                        {personalData.profileImage && (
                        <Box
                            w="120px"
                            h="120px"
                            rounded="full"
                            overflow="hidden"
                            border="4px solid"
                            borderColor="teal.400"
                        >
                            <img
                            src={personalData.profileImage}
                            alt="Profile Preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            />
                        </Box>
                        )}
                    </Flex>
                    </FormControl>


                    <VStack spacing={3}>
                        <Input variant="filled" name='name' value={personalData.name} onChange={handleChangePersonal} placeholder='Full Name' focusBorderColor="teal.400" />
                        <Input variant="filled" name='profile' value={personalData.profile} onChange={handleChangePersonal} placeholder='Job Title (e.g. Software Engineer)' focusBorderColor="teal.400" />
                        <Textarea variant="filled" name='summary' value={personalData.summary} onChange={handleChangePersonal} placeholder='Professional Summary' focusBorderColor="teal.400" />
                        <Input variant="filled" name='email' value={personalData.email} onChange={handleChangePersonal} type='email' placeholder='Email Address' focusBorderColor="teal.400" />
                        <Input variant="filled" name='phone' value={personalData.phone} onChange={handleChangePersonal} type='tel' placeholder='Phone Number' focusBorderColor="teal.400" />
                        <Input variant="filled" name='address' value={personalData.address} onChange={handleChangePersonal} placeholder='City, Country' focusBorderColor="teal.400" />
                    </VStack>
                </Box>

                {/* Skills Area */}
                <Box bg="white" p={6} rounded="xl" shadow="md">
                    <SectionHeader icon={MdCode} title="Technical Skills" />
                    <Divider mb={4} />
                    <FormControl isRequired>
                        <Textarea 
                            variant="filled" 
                            name='skill' 
                            value={personalData.skill} 
                            onChange={handleChangePersonal} 
                            placeholder='React, Node.js, Python, CSS...' 
                            focusBorderColor="teal.400"
                        />
                        <Text fontSize="xs" mt={2} color="gray.500">Separate skills with commas</Text>
                    </FormControl>
                </Box>

                {/* Education Area */}
                <Box bg="white" p={6} rounded="xl" shadow="md">
                    <SectionHeader icon={MdSchool} title="Education" />
                    <Divider mb={4} />
                    <VStack spacing={4} align="stretch">
                        {[...Array(educationCount)].map((_, index) => {
                            const i = index + 1;
                            return (
                                <Box key={i} p={4} bg="gray.50" rounded="md" border="1px solid" borderColor="gray.100">
                                    <FormControl isRequired mb={2}>
                                        <Input variant="white" fontWeight="bold" id={`eTitle${i}`} name='eName' value={educationData.educationTitles[`eTitle${i}`] || ''} onChange={handleChangeEducation} placeholder='Degree / School Name' />
                                    </FormControl>
                                    <Divider my={3} borderColor="gray.300" borderWidth="1px"/>
                                    <FormControl isRequired>
                                        <Textarea variant="white" id={`eDescription${i}`} name='eDescription' value={educationData.educationDesc[`eDescription${i}`] || ''} onChange={handleChangeEducation} placeholder='Details (GPA, Year, etc.)' />
                                    </FormControl>
                                </Box>
                            )
                        })}
                        <Button leftIcon={<MdAddCircleOutline />} onClick={handleEducationClick} colorScheme='teal' variant='ghost' size="sm">Add Education Field</Button>
                    </VStack>
                </Box>

                {/* Projects Area */}
                <Box bg="white" p={6} rounded="xl" shadow="md" opacity={checkProj ? 0.6 : 1} transition="0.3s">
                    <SectionHeader 
                        icon={MdLightbulb} 
                        title="Projects" 
                        showSwitch={true} 
                        isChecked={checkProj} 
                        onSwitchChange={() => setCheckProj(!checkProj)} 
                    />
                    <Divider mb={4} />
                    {!checkProj && (
                        <VStack spacing={4} align="stretch">
                            {[...Array(projectCount)].map((_, index) => {
                                const i = index + 1;
                                return (
                                    <Box key={i} p={4} bg="gray.50" rounded="md" border="1px solid" borderColor="gray.100">
                                        <FormControl isRequired mb={2}>
                                            <Input variant="white" fontWeight="bold" id={`pTitle${i}`} name='pName' value={projectData.projectTitles[`pTitle${i}`] || ''} onChange={handleChangeProject} placeholder='Project Title' />
                                        </FormControl>
                                        <Divider my={3} borderColor="gray.300" borderWidth="1px"/>
                                        <FormControl isRequired>
                                            <Textarea variant="white" id={`pDescription${i}`} name='pDescription' value={projectData.projectDesc[`pDescription${i}`] || ''} onChange={handleChangeProject} placeholder='Describe what you built...' />
                                        </FormControl>
                                    </Box>
                                )
                            })}
                            <Button leftIcon={<MdAddCircleOutline />} onClick={handleProjectClick} colorScheme='teal' variant='ghost' size="sm">Add Project Field</Button>
                        </VStack>
                    )}
                </Box>

                {/* Work Experience Area */}
                <Box bg="white" p={6} rounded="xl" shadow="md" opacity={checkWork ? 0.6 : 1} transition="0.3s">
                    <SectionHeader 
                        icon={MdWork} 
                        title="Work Experience" 
                        showSwitch={true} 
                        isChecked={checkWork} 
                        onSwitchChange={() => setCheckWork(!checkWork)} 
                    />
                    <Divider mb={4} />
                    {!checkWork && (
                        <VStack spacing={4} align="stretch">
                            {[...Array(workCount)].map((_, index) => {
                                const i = index + 1;
                                return (
                                    <Box key={i} p={4} bg="gray.50" rounded="md" border="1px solid" borderColor="gray.100">
                                        <FormControl isRequired mb={2}>
                                            <Input variant="white" fontWeight="bold" id={`wTitle${i}`} name='wName' value={workData.workTitles[`wTitle${i}`] || ''} onChange={handleChangeWork} placeholder='Company Name & Role' />
                                        </FormControl>
                                        <Divider my={3} borderColor="gray.300" borderWidth="1px"/>
                                        <FormControl isRequired>
                                            <Textarea variant="white" id={`wDescription${i}`} name='wDescription' value={workData.workDesc[`wDescription${i}`] || ''} onChange={handleChangeWork} placeholder='Responsibilities & Achievements...' />
                                        </FormControl>
                                    </Box>
                                )
                            })}
                            <Button leftIcon={<MdAddCircleOutline />} onClick={handleWorkClick} colorScheme='teal' variant='ghost' size="sm">Add Experience Field</Button>
                        </VStack>
                    )}
                </Box>

                {/* Awards & Achievement */}
                <Box bg="white" p={6} rounded="xl" shadow="md" opacity={checkAward ? 0.6 : 1} transition="0.3s">
                    <SectionHeader 
                        icon={MdStars} 
                        title="Awards & Achievement" 
                        showSwitch={true} 
                        isChecked={checkAward} 
                        onSwitchChange={() => setCheckAward(!checkAward)} 
                    />
                    <Divider mb={4} />
                    {!checkAward && (
                        <FormControl isRequired>
                            <Textarea 
                                variant="filled"
                                name='awards' 
                                value={awardData.awards} 
                                onChange={handleChangeAwards} 
                                placeholder='Honors, Certifications, etc.' 
                                focusBorderColor="teal.400"
                            />
                        </FormControl>
                    )}
                </Box>
                
                <Box textAlign="center" py={5}>
                    <Button
                    px={{ base: 4, md: 6 }}
                    size={{ base: "sm", md: "md" }}
                    rounded="full"
                    bgGradient="linear(to-r, red.400, pink.500)"
                    color="white"
                    fontWeight="semibold"
                    transition="all 0.3s ease"
                    mb={3}
                    _hover={{
                        transform: "translateY(-3px)",
                        boxShadow: "lg",
                        bgGradient: "linear(to-r, red.500, pink.600)",
                    }}
                    _active={{
                        transform: "scale(0.95)",
                    }}
                    onClick={clearResumeData}
                    >
                    Clear Resume Data
                    </Button>

                    <Text color="gray.400" fontSize="sm">
                        Changes are automatically saved to your profile
                    </Text>
                </Box>

            </VStack>
        </Box>
    )
}

export default UserDataCollect
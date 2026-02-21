const Resume = require("../models/Resume");


// ===============================
// SAVE OR UPDATE RESUME
// ===============================
exports.saveResume = async (req, res) => {
  try {
    const {
      personalData,
      projectData,
      educationData,
      workData,
      awardData,
      themeKey
    } = req.body;

    // Find resume by logged-in user
    let resume = await Resume.findOne({ user: req.user._id });

    if (resume) {
      resume.personalData = personalData;
      resume.projectData = projectData;
      resume.educationData = educationData;
      resume.workData = workData;
      resume.awardData = awardData;
      if (themeKey) resume.themeKey = themeKey;

      await resume.save();
    } else {
      resume = new Resume({
        user: req.user._id,
        personalData,
        projectData,
        educationData,
        workData,
        awardData,
        themeKey
      });

      await resume.save();
    }

    res.json({ msg: "Resume saved successfully", resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// ===============================
// GET LOGGED-IN USER RESUME
// ===============================
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id })
      .populate("user", "name email");

    res.json(resume);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ===============================
// GET ALL RESUMES (ADMIN)
// ===============================
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate("user", "name email");

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ===============================
// GET RESUME BY ID (ADMIN VIEW)
// ===============================
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .populate("user", "name email");

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ msg: "Resume not found" });
  }
};


// ===============================
// DELETE RESUME (ADMIN DELETE)
// ===============================
exports.deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// ✅ CLEAR LOGGED-IN USER RESUME
// (Used by "Clear Resume Data" button)
// ===============================
exports.clearMyResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findOneAndDelete({
      user: req.user._id
    });

    if (!deletedResume) {
      return res.status(404).json({ message: "No resume found to clear" });
    }

    res.json({ message: "Your resume has been cleared successfully" });
  } catch (error) {
    console.error("Clear Resume Error:", error);
    res.status(500).json({ message: "Server error while clearing resume" });
  }
};

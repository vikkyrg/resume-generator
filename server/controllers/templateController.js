const Template = require("../models/Template");

// Add Template
exports.addTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Template
exports.updateTemplate = async (req, res) => {
  try {
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Template
exports.deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ msg: "Template deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

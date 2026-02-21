const express = require("express");
const router = express.Router();

const {
  addTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate
} = require("../controllers/templateController");

router.post("/", addTemplate);
router.get("/", getTemplates);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;

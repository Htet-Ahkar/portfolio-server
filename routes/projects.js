import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  viewCount,
} from "../controllers/projects.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);
router.patch("/:id/viewCount", viewCount);

export default router;

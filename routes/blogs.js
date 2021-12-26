import express from "express";

import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  viewCount,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.get("/:id", getBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.patch("/:id/viewCount", viewCount);

export default router;

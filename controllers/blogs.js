import mongoose from "mongoose";

//Model
import Blog from "../models/blog.js";

//Controllers
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createBlog = async (req, res) => {
  const { title, snippet, body, categories, selectedFiles } = req.body;

  const newBlog = new Blog({ title, snippet, body, categories, selectedFiles });

  try {
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, snippet, body, categories, selectedFiles } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedBlog = {
    title,
    snippet,
    body,
    categories,
    selectedFiles,
    _id: id,
  };
  await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

  res.status(200).json(updatedBlog);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Blog.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully." });
};

export const viewCount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const blog = await Blog.findById(id);

  const UpdatedBlog = await Blog.findByIdAndUpdate(
    id,
    { viewCount: blog.viewCount + 1 },
    { new: true }
  );

  res.json(UpdatedBlog);
};

import mongoose from "mongoose";

//Model
import Project from "../models/projects.js";

//Controllers
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createProject = async (req, res) => {
  const { name, description, liveURL, codeURL, stacks, selectedFiles } =
    req.body;

  const newProject = new Project({
    name,
    description,
    liveURL,
    codeURL,
    stacks,
    selectedFiles,
  });

  try {
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, liveURL, codeURL, stacks, selectedFiles } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedProject = {
    name,
    description,
    liveURL,
    codeURL,
    stacks,
    selectedFiles,
    _id: id,
  };
  await Project.findByIdAndUpdate(id, updatedProject, { new: true });

  res.status(200).json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Project.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully." });
};

export const viewCount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const project = await Project.findById(id);

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { viewCount: project.viewCount + 1 },
    { new: true }
  );

  res.json(updatedProject);
};

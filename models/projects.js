import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    liveURL: {
      type: String,
      require: true,
    },
    codeURL: {
      type: String,
      require: true,
    },
    stacks: [String],
    viewCount: {
      type: Number,
      default: 0,
    },
    selectedFiles: [String],
  },
  { timestamps: true }
);

var Project = mongoose.model("Project", projectSchema);
export default Project;

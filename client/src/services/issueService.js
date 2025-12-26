import api from "./api";

// Get all issues
export const getAllIssues = async () => {
  const res = await api.get("/issues");
  return res.data;
};

// Create issue with image
export const createIssue = async (issueData) => {
  const formData = new FormData();

  formData.append("title", issueData.title);
  formData.append("description", issueData.description);
  formData.append("category", issueData.category);
  formData.append("location", JSON.stringify(issueData.location));

  if (issueData.image) {
    formData.append("image", issueData.image);
  }

  const res = await api.post("/issues", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

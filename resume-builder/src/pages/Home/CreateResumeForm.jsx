import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { FiArrowRight, FiAlertCircle } from 'react-icons/fi';

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title");
      return;
    }

    setError("");
    setLoading(true);

    //Create Resume API Call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Create New Resume</h3>
        <p className="text-sm text-gray-600 mt-2">
          Give your resume a title to get started. You can edit all details later.
        </p>
      </div>

      <form onSubmit={handleCreateResume} className="space-y-5">
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="Eg: Software Engineer Resume"
          type="text"
        />

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary flex items-center justify-center gap-2 mt-6"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Resume"}
          <FiArrowRight className={loading ? "opacity-50" : ""} />
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
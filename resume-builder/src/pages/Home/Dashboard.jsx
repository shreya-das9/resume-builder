import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { FiPlus, FiSearch } from 'react-icons/fi'
import moment from 'moment'
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const filteredResumes = allResumes?.filter(resume =>
    resume.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return <DashboardLayout>
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-2 text-lg">Create and manage your professional resumes</p>
        </div>

        {/* Search and Create Button */}
        <div className="flex gap-3 flex-col md:flex-row md:items-center">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 outline-none transition-all"
            />
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
            onClick={() => setOpenCreateModal(true)}
          >
            <FiPlus className="text-lg" />
            New Resume
          </button>
        </div>
      </div>

      {/* Resume Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <div
          className="card-hover h-80 flex flex-col gap-5 items-center justify-center p-8 cursor-pointer group"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
            <FiPlus className="text-3xl text-indigo-600" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-lg">Create New Resume</h3>
            <p className="text-sm text-gray-500 mt-2">Start building your professional resume</p>
          </div>
        </div>

        {/* Resume Cards */}
        {filteredResumes.length > 0 ? (
          filteredResumes.map((resume) => (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume.title}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}
            />
          ))
        ) : allResumes && allResumes.length > 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">No resumes match your search</p>
          </div>
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">📄</div>
              <p className="text-gray-500 text-lg">No resumes yet. Create your first one!</p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Create Modal */}
    <Modal
      isOpen={openCreateModal}
      onClose={() => {
        setOpenCreateModal(false);
        fetchAllResumes();
      }}
      hideHeader
    >
      <div>
        <CreateResumeForm />
      </div>
    </Modal>
  </DashboardLayout>;
};

export default Dashboard;

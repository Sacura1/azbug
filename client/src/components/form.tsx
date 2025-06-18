import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'; 
import { useNavigate } from 'react-router-dom';

interface BugFormState {
  bugIssue: string;
  issueImage: File | null;
  solution: string;
  username: string;
}

const BugReportingForm: React.FC = () => {
      const navigate = useNavigate();

  const [formData, setFormData] = useState<BugFormState>({
    bugIssue: '',
    issueImage: null,
    solution: '',
    username: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, issueImage: e.target.files![0] }));
    }
  };

  const handleSolutionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, solution: value }));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  const redirect = () => {
    navigate('/')}

  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("bugIssue", formData.bugIssue);
  formDataToSend.append("solution", formData.solution);
  formDataToSend.append("username", formData.username);

  if (formData.issueImage) {
    formDataToSend.append("issueImage", formData.issueImage);
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/submit`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const id = response.data.id;
    localStorage.setItem(`post${id}`,'true');
    redirect();
    console.log("Data sent successfully:", response.data);
        console.log("Data:", response.data);

  } catch (error) {
    console.error("Error sending data:", error);
  }

  setFormData({
    bugIssue: '',
    issueImage: null,
    solution: '',
    username: '',
  });
};

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'color': [] }], 
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color' 
  ];

  return (
    <>
      <style>{`
        .ql-editor a {
          color: #06b6d4 !important; /* Cyan color for links */
          text-decoration: underline !important;
        }
        .ql-editor a:hover {
          color: #0891b2 !important; /* Darker cyan on hover */
        }
        
        /* Style the color picker button */
        .ql-toolbar .ql-color .ql-picker-label {
          border: 1px solid #4b5563;
          border-radius: 4px;
        }
        
        /* Style the color picker dropdown */
        .ql-color .ql-picker-options {
          background: #374151;
          border: 1px solid #4b5563;
          border-radius: 6px;
        }
        
        /* Make toolbar icons more visible on dark background */
        .ql-toolbar .ql-stroke {
          stroke: #d1d5db;
        }
        .ql-toolbar .ql-fill {
          fill: #d1d5db;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-brfrom-black via-gray-900 to-black flex items-center justify-center p-4">
    <div className="mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700/50 backdrop-blur-sm">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Add New Bug
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="bugIssue" className="block text-sm font-medium text-gray-300 mb-1">
            Bug Issue
          </label>
          <input
            type="text"
            name="bugIssue"
            id="bugIssue"
            value={formData.bugIssue}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
            placeholder="Describe the bug issue briefly"
          />
        </div>

        <div>
          <label htmlFor="issueImage" className="block text-sm font-medium text-gray-300 mb-1">
            Image of the Issue (Optional)
          </label>
          <input
            type="file"
            name="issueImage"
            id="issueImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-300 bg-gray-800/50 border border-gray-600 rounded-lg p-3 backdrop-blur-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-500/20 file:text-cyan-400
              hover:file:bg-cyan-500/30 transition-all duration-200"
          />
          {formData.issueImage && (
            <p className="mt-2 text-sm text-gray-400">
              Selected file: {formData.issueImage.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="solution" className="block text-sm font-medium text-gray-300 mb-1">
            Solution
          </label>
          <div className="mt-1">
            <ReactQuill
              theme="snow"
              value={formData.solution}
              onChange={handleSolutionChange}
              modules={modules}
              formats={formats}
              placeholder="Describe the proposed solution here..."
              className="bg-gray-800/50 rounded-lg shadow-sm border border-gray-600 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 backdrop-blur-sm [&_.ql-editor]:text-white [&_.ql-editor]:bg-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="username"className="block text-sm font-medium text-gray-300 mb-1">
            Your Discord Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
            placeholder="Enter your Discord username"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Post 
          </button>
        </div>
      </form>
    </div>
  </div>
    </>
  );
};

export default BugReportingForm;
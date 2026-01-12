import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash, LuCamera } from "react-icons/lu";

const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    const preview = URL.createObjectURL(file);
    if(setPreview){
      setPreview(preview)
    }
    setPreviewUrl(preview);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreviewUrl(null);
    if(setPreview){
      setPreview(null)
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      processImage(files[0]);
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onChooseFile}
          className={`group relative w-32 h-32 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'bg-indigo-100 scale-105 ring-2 ring-indigo-400 ring-offset-2' 
              : 'bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100'
          } shadow-lg hover:shadow-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white shadow-md group-hover:shadow-lg transition-all">
                <LuCamera className="text-3xl" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-md border-2 border-indigo-500">
                <LuUpload className="text-indigo-500 text-lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">Upload Photo</p>
              <p className="text-xs text-gray-500 mt-1">or drag & drop</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-indigo-100 hover:ring-indigo-300 transition-all duration-300">
            <img
              src={preview || previewUrl}
              alt="profile photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <button
                type="button"
                onClick={onChooseFile}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg"
              >
                <LuCamera className="text-lg" />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="absolute -bottom-2 -right-2 w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white"
            onClick={handleRemoveImage}
            title="Remove photo"
          >
            <LuTrash className="text-lg" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
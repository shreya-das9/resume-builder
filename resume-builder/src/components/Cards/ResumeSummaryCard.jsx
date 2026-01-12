import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {

  const [bgColor, setBgColor] = useState("rgba(99, 102, 241, 0.08)");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("rgba(99, 102, 241, 0.08)");
        });
    }
  }, [imgUrl]);

  return <div
    className="card-hover h-80 flex flex-col overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
    onClick={onSelect}
    style={{ backgroundColor: bgColor }}
  >
    {/* Image Section */}
    <div className="flex-1 overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl opacity-20">📄</div>
          </div>
        </div>
      )}
    </div>

    {/* Info Section */}
    <div className="bg-white p-4">
      <h5 className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors line-clamp-2">
        {title}
      </h5>
      <p className="text-xs text-gray-500 mt-2 flex items-center">
        <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mr-2 flex-shrink-0"></span>
        <span>Updated {lastUpdated}</span>
      </p>
    </div>

    {/* Hover Actions */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 pointer-events-none">
      <button
        className="p-3 rounded-lg bg-white/95 text-indigo-600 hover:bg-white transition-all shadow-lg pointer-events-auto"
        title="Edit Resume"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <FiEdit2 className="text-lg" />
      </button>
    </div>
  </div>
};

export default ResumeSummaryCard;

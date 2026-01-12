import React from "react";

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div className="flex gap-2">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
            index < progress ? "bg-gradient-to-r from-indigo-500 to-indigo-600" : "bg-gray-200"
          }`}
          style={{
            backgroundColor:
              index < progress
                ? color || "rgba(99, 102, 241, 1)"
                : bgColor || "rgba(229, 231, 235, 1)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;

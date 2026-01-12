import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return <div>
    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{label}</label>

    <div className="input-box">
      <input
        type={
          type == "password" ? (showPassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
        value={value}
        onChange={(e) => onChange(e)}
      />

      {type === "password" && (
        <>
          {showPassword ? (
            <FaRegEye
              size={18}
              className="text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={toggleShowPassword}
            />
          )}
        </>
      )}
    </div>
  </div>
};

export default Input;

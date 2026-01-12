import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center gap-4">
        <img
          src={user.profileImageUrl}
          alt={user.name}
          className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full ring-2 ring-indigo-200"
        />
        <div className="hidden sm:block">
          <div className="text-sm font-semibold text-gray-900 leading-tight">
            {user.name || ""}
          </div>
          <button
            className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 transition-colors cursor-pointer flex items-center gap-1 mt-0.5"
            onClick={handelLogout}
          >
            <FiLogOut className="w-3 h-3" />
            Logout
          </button>
        </div>
        <button
          className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={handelLogout}
          title="Logout"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    )
  );
};

export default ProfileInfoCard;

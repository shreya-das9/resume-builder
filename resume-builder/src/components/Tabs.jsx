import React from 'react'

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className="my-4">
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.label
                ? "text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            } cursor-pointer`}
            onClick={() => setActiveTab(tab.label)}
          >
            <span>{tab.label}</span>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
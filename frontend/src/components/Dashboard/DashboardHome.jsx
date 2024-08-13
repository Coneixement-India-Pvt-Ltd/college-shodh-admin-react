import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <div>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
                <button className="text-2xl text-gray-700 dark:text-gray-500">
                  Total Colleges
                </button>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
                <button className="text-2xl text-gray-700 dark:text-gray-500">
                  Add College
                </button>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
                <button className="text-2xl text-gray-700 dark:text-gray-500">
                  Page Views
                </button>
              </div>
            </div>
            <div className="h-80 mb-2 rounded bg-gray-200 dark:bg-gray-800">
              <p className="text-2xl text-gray-700 dark:text-gray-500 p-2">
                Recent Activity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

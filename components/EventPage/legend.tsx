const Legend = () => {
    return (
      <div className="flex justify-center gap-6 mb-4 sm:mb-6 px-2 flex-wrap">
        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-800 rounded-md"></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Unavailable</span>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 px-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primarygradient-600 border border-gray-300 dark:border-gray-600 rounded-md"></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Available</span>
        </div>
      </div>
    );
  };
  
  export default Legend;
  
  
  
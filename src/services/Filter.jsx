import { useState } from 'react';
import { Filter } from 'lucide-react';

export const FilterBar = ({ platforms = [], onFilterChange }) => {
  const [selected, setSelected] = useState([]);

  const togglePlatform = platform => {
    const newSelected = selected.includes(platform)
      ? selected.filter(p => p !== platform)
      : [...selected, platform];

    setSelected(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:w-3/4 mx-auto mt-6">
      { platforms.length !== 0 && <div className="flex items-center gap-3 mb-4">
        <Filter className="text-purple-700" />
        <h2 className="text-md items-center font-semibold text-purple-800">Filter Contests</h2>
      </div>}

      <div className="overflow-x-auto scrollbar-hide no-scrollbar">
        <div className="flex gap-3 w-max pr-2">
          { platforms.length !== 0 && <button
            className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm font-medium transition bg-purple-700 text-white`}
          >
            All
          </button>}
          {platforms.map(platform => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm font-medium transition ${
                selected.includes(platform)
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

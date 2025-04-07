import React, { useState } from "react";

interface FilterValues {
  species: string;
  gender: string;
  age: string;
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterValues>({
    species: "",
    gender: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Filter Pets</h2>

        {/* Species */}
        <label className="block mb-2 font-medium">Species</label>
        <select
          name="species"
          value={filters.species}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Any</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>

        {/* Gender */}
        <label className="block mb-2 font-medium">Gender</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Age */}
        <label className="block mb-2 font-medium">Age</label>
        <select
          name="age"
          value={filters.age}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Any</option>
          <option value="baby">Baby</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

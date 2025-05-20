import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Courses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white focus:outline-none pl-10 pr-4 py-2 rounded-md border border-gray-300"
                aria-label="Search courses"
            />

            {/* Search icon placed at the start of the input field */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 text-[18px] sm:text-[20px]">
                <CiSearch />
            </div>
        </div>
    );
}

export default SearchBar;





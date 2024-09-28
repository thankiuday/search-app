import React from 'react';
import { useRef, useEffect } from 'react';
const Search = ({ searchTerm, setSearchTerm, handleSearch, selectedFilter, setSelectedFilter, selectedSort, setSelectedSort }) => {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus(); // Focus the input element on mount
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control  fw-bold"
                            placeholder="Enter Search Term..."
                            ref={inputRef}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select fw-bold"
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Article">Articles</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-select fw-bold"
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)} // Update sorting option
                        >
                            <option value="views">Most Views</option>
                            <option value="likes">Most Likes</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-outline-primary w-100 fw-bold' onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../features/github/githubSlice';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import { FaGithub, FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;


const HomePage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.github);

  // Debounced suggestion fetcher
  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${value}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`
            }
          }
        );
        const data = await res.json();
        if (data?.items) {
          setSuggestions(data.items.slice(0, 5));
        }
      } catch (err) {
        console.error('Suggestion error:', err);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    fetchSuggestions(val);
  };

  const handleSuggestionClick = (username) => {
    setQuery(username);
    setSuggestions([]);
    dispatch(searchUsers(username)); 
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchUsers(query.trim()));
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const hasSearched = users.length > 0 || loading || error;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Search */}
      <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto px-4 py-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="w-full pl-10 pr-28 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search GitHub Username..."
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 transition-opacity"
          >
            {loading ? '...' : 'Search'}
          </button>

          {/* Suggestions Dropdown */}
          
{suggestions.length > 0 && (
  <ul className="absolute z-10 mt-1 w-full bg-gray-800 text-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-600">
    {suggestions.map((user) => (
      <li
        key={user.id}
        onClick={() => handleSuggestionClick(user.login)}
        className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer transition"
      >
        {user.login}
      </li>
    ))}
  </ul>
)}

        </div>
      </form>

      {/* States */}
      {loading && <Loader />}
      {error && (
        <div className="text-red-600 text-center mt-8">
          Error: {error.message || error.toString()}
        </div>
      )}
      {!hasSearched && !loading && !error && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
          <FaGithub className="text-7xl mb-4" />
          <p className="text-xl">Enter a GitHub username above to begin.</p>
        </div>
      )}

      {/* Grid of cards */}
      {hasSearched && !loading && !error && (
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

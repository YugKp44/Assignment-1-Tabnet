import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../api/github';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import { FaGithub, FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Env var for API auth
console.log('GITHUB_TOKEN:', GITHUB_TOKEN); // Verify token during development

const HomePage = () => {
  const [query, setQuery] = useState(''); // Controlled input state
  const [suggestions, setSuggestions] = useState([]); // Autocomplete list
  const dispatch = useDispatch(); // Dispatch actions
  const { users, loading, error } = useSelector((state) => state.github); // Redux state

  // Debounced API call to fetch suggestions as user types
  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (!value.trim()) { setSuggestions([]); return; } // Clear on empty input
      try {
        const res = await fetch(`https://api.github.com/search/users?q=${value}`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const data = await res.json();
        if (data.items) setSuggestions(data.items.slice(0, 5)); // Top 5
      } catch (err) {
        console.error('Suggestion error:', err); // Log errors
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    fetchSuggestions(val); // Trigger autocomplete
  };

  const handleSuggestionClick = (username) => {
    setQuery(username);
    setSuggestions([]); // Hide dropdown
    dispatch(searchUsers(username)); // Fetch final results
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchUsers(query.trim())); // Dispatch search thunk
      setSuggestions([]); // Clear suggestions
    }
  };

  const hasSearched = users.length > 0 || loading || error; // Determine view state

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto px-4 py-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange} // Update input & suggestions
            className="w-full pl-10 pr-28 py-2 rounded-lg border bg-gray-900"
            placeholder="Search GitHub Username..."
          />
          <button
            type="submit"
            disabled={!query.trim() || loading} // Disable empty or loading
            className="absolute right-0 top-0 h-full px-4 bg-blue-600 rounded-r-lg"
          >{loading ? '...' : 'Search'}</button>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md max-h-60 overflow-auto">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSuggestionClick(user.login)} // Select a suggestion
                  className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
                >{user.login}</li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {loading && <Loader />} {/* Show spinner */}
      {error && <div className="text-red-600 text-center mt-8">Error: {error}</div>} {/* Error message */}
      {!hasSearched && !loading && !error && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
          <FaGithub className="text-7xl mb-4" />
          <p className="text-xl">Enter a GitHub username above to begin.</p>
        </div>
      )}

      {hasSearched && !loading && !error && (
        <div className="flex-1 overflow-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (<UserCard key={user.id} user={user} />))} {/* Render results */}
        </div>
      )}
    </div>
  );
};

export default HomePage;

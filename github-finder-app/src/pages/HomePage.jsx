import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../features/github/githubSlice';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import { FaGithub } from 'react-icons/fa';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.github);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchUsers(query.trim()));
    }
  };

  const hasSearched = users.length > 0 || loading || error;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Search */}
      <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto px-4 py-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search GitHub Username..."
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
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
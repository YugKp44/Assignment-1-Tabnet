import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Thunks for fetching user info and repos
import { getUserDetails, getUserRepos, clearUsers } from '../api/github';
import Loader from '../components/Loader';
import RepoItem from '../components/RepoItem';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaUsers,
  FaUserFriends,
  FaCodepen,
  FaStore,
} from 'react-icons/fa';

// Reusable stat display component
const StatItem = ({ icon, label, value }) => (
  <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-800/90 hover:scale-105">
    {icon}                                {/* Icon for this stat */}
    <p className="text-3xl font-bold mt-2">{value}</p>  {/* Numeric value */}
    <p className="text-sm text-gray-400">{label}</p>    {/* Label text */}
  </div>
);

const UserPage = () => {
  const { username } = useParams();                       // Read username from URL
  const dispatch = useDispatch();
  const { user, repos, loading, error } = useSelector(state => state.github);

  useEffect(() => {
    dispatch(getUserDetails(username));                   // Fetch user profile
    dispatch(getUserRepos(username));                     // Fetch user repos
    return () => dispatch(clearUsers());                  // Cleanup on unmount
  }, [dispatch, username]);

  if (loading) return <Loader />;                         // Show loader while fetching
  if (error)                                             // Show error UI if fetch failed
    return (
      <div className="text-center py-10 text-red-500">
        <h2 className="text-2xl font-bold">Something Went Wrong</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary mt-4">Back to Search</Link>
      </div>
    );

  // Sort repos by star count and take top 5
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#10141b] to-[#0d1117] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button clears state and navigates back */}
        <button
          onClick={() => {
            dispatch(clearUsers());
            window.history.back();
          }}
          className="mb-8 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
          aria-label="Back"
        >
          <FaArrowLeft />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center">
              {/* User avatar with online indicator */}
              <div className="relative inline-block mb-4">
                <img
                  src={user.avatar_url}                       // Avatar URL
                  alt={user.login}
                  className="w-40 h-40 rounded-full ring-4 ring-offset-4 ring-offset-gray-800 ring-transparent bg-gradient-to-tr from-purple-600 to-blue-500"
                />
                <span
                  className="absolute bottom-4 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"
                  title="Online"
                />
              </div>

              <h1 className="text-3xl font-bold">{user.name || user.login}</h1> {/* Display name */}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                @{user.login}                                {/* Link to GitHub */}
              </a>

              {user.location && (                             // Conditionally render location
                <p className="flex items-center justify-center mt-4 text-gray-400">
                  <FaMapMarkerAlt className="mr-2" /> {user.location}
                </p>
              )}

              <p className="text-gray-300 mt-4 text-center text-md leading-relaxed">
                {user.bio}                                    {/* User bio */}
              </p>
            </div>

            {/* Statistics grid */}
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 text-center">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatItem icon={<FaUsers className="text-blue-400 text-3xl"/>} label="Followers" value={user.followers} />
                <StatItem icon={<FaUserFriends className="text-purple-400 text-3xl"/>} label="Following" value={user.following} />
                <StatItem icon={<FaCodepen className="text-green-400 text-3xl"/>} label="Public Repos" value={user.public_repos} />
                <StatItem icon={<FaStore className="text-yellow-400 text-3xl"/>} label="Public Gists" value={user.public_gists} />
              </div>
            </div>
          </div>

          {/* Top repositories list */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Top Repositories</h2>
              <div className="space-y-4">
                {topRepos.length > 0 ? (
                  topRepos.map(repo => (
                    <RepoItem key={repo.id} repo={repo} />   // Render each repo
                  ))
                ) : (
                  <p className="text-gray-400">No repositories found.</p>  // Fallback message
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

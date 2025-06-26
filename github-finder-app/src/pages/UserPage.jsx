import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Assuming you have separate thunks for user and repos
import { getUserDetails, getUserRepos } from '../features/github/githubSlice'; 
import Loader from '../components/Loader';
import RepoItem from '../components/RepoItem';
import { 
    FaArrowLeft, 
    FaMapMarkerAlt, 
    FaUsers, 
    FaUserFriends, 
    FaCodepen, 
    FaStore 
} from 'react-icons/fa';

// A new component for a consistent stat display
const StatItem = ({ icon, label, value }) => (
    <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-800/90 hover:scale-105">
        {icon}
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user, repos, loading, error } = useSelector((state) => state.github);

    useEffect(() => {
        // Dispatch actions to fetch data
        dispatch(getUserDetails(username));
        dispatch(getUserRepos(username));
    }, [dispatch, username]);

    // Handle loading and error states
    if (loading) return <Loader />;
    if (error) return (
        <div className="text-center py-10 text-red-500">
            <h2 className="text-2xl font-bold">Something Went Wrong</h2>
            <p>{error}</p>
            <Link to="/" className="btn btn-primary mt-4">Back to Search</Link>
        </div>
    );

    // Sort repositories by stars to get the top 5
    const topRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

    return (
        // Main container with a subtle gradient background for a premium feel
        <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#10141b] to-[#0d1117] text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link to="/" className="btn btn-ghost mb-8">
                    <FaArrowLeft className="mr-2" />
                    Back To Search
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- LEFT COLUMN (Profile Sidebar) --- */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Avatar and Name Card */}
                        <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center">
                            <div className="relative inline-block mb-4">
                                <img
                                    src={user.avatar_url} // Github Profile Image
                                    alt={user.login}
                                    className="w-40 h-40 rounded-full ring-4 ring-offset-4 ring-offset-gray-800 ring-transparent bg-gradient-to-tr from-purple-600 to-blue-500"
                                />
                                <span className="absolute bottom-4 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800" title="Online"></span>
                            </div>
                            <h1 className="text-3xl font-bold">{user.name || user.login}</h1> {/* Display Name */}
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@{user.login}</a> {/* Profile Link */}

                            {user.location && (
                                <p className="flex items-center justify-center mt-4 text-gray-400">
                                    <FaMapMarkerAlt className="mr-2" /> {user.location} {/* Display Location */}
                                </p>
                            )}

                             <p className="text-gray-300 mt-4 text-center text-md leading-relaxed">{user.bio}</p> {/* Display Bio */}
                        </div>

                        {/* Stats Grid */}
                        <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                             <h2 className="text-xl font-semibold mb-4 text-center">Statistics</h2>
                             <div className="grid grid-cols-2 gap-4">
                                <StatItem icon={<FaUsers className="text-blue-400 text-3xl"/>} label="Followers" value={user.followers} /> {/* Display Followers */}
                                <StatItem icon={<FaUserFriends className="text-purple-400 text-3xl"/>} label="Following" value={user.following} /> {/* Display Following */}
                                <StatItem icon={<FaCodepen className="text-green-400 text-3xl"/>} label="Public Repos" value={user.public_repos} /> {/* Display Public Repos */}
                                <StatItem icon={<FaStore className="text-yellow-400 text-3xl"/>} label="Public Gists" value={user.public_gists} /> {/* Display Public Gists */}
                             </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (Repositories) --- */}
                    <div className="lg:col-span-2">
                         <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6">Top Repositories</h2> {/* List Top 5 Repositories */}
                            <div className="space-y-4">
                                {topRepos.length > 0 ? (
                                    topRepos.map((repo) => (
                                        <RepoItem key={repo.id} repo={repo} />
                                    ))
                                ) : (
                                    <p className="text-gray-400">No repositories found.</p>
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
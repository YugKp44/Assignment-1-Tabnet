import axios from 'axios';

const GITHUB_URL = 'https://api.github.com';

const github = axios.create({
    baseURL: GITHUB_URL,
    // You can add headers here if needed, like an auth token
    // headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` }
});

// Function to search users
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text,
    });

    const response = await github.get(`/search/users?${params}`);
    return response.data.items;
};

// Function to get user and repos
export const getUserAndRepos = async (username) => {
    // Fetch top 5 repos sorted by last updated
    const reposParams = new URLSearchParams({
        sort: 'updated',
        per_page: 5,
    });

    const [user, repos] = await Promise.all([
        github.get(`/users/${username}`),
        github.get(`/users/${username}/repos?${reposParams}`),
    ]);

    return { user: user.data, repos: repos.data };
};
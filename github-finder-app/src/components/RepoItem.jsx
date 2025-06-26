// src/components/RepoItem.jsx
import React from 'react';
import { FaLink, FaStar, FaUtensils, FaInfo, FaCode } from 'react-icons/fa';

const RepoItem = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    forks,
    stargazers_count,
    language,
    open_issues_count,
  } = repo;

  return (
    <div className="mb-4 rounded-lg card bg-background hover:bg-surface border border-surface transition-all duration-300 shadow-lg">
      <div className="card-body p-6">
        <h3 className="mb-2 text-xl font-semibold">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors"
          >
            <FaLink /> {name}
          </a>
        </h3>
        <p className="mb-4 text-secondary">
          {description || 'No description provided.'}
        </p>
        
        {/* --- Stats Badges --- */}
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-outline text-primary border-primary/50 py-3">
            <FaStar className="mr-2" /> {stargazers_count}
          </div>
          <div className="badge badge-outline text-secondary border-secondary/50 py-3">
            <FaUtensils className="mr-2" /> {forks}
          </div>
          <div className="badge badge-outline text-red-400 border-red-400/50 py-3">
            <FaInfo className="mr-2" /> {open_issues_count}
          </div>
          {language && (
            <div className="badge badge-outline text-cyan-400 border-cyan-400/50 py-3">
              <FaCode className="mr-2" /> {language}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoItem;

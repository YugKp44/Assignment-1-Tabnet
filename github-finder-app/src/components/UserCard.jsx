import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

const UserCard = ({ user }) => (
  <Link
    to={`/user/${user.login}`}
    className="
      group
      block
      w-full
      h-40
      bg-white dark:bg-gray-800
      rounded-lg
      overflow-hidden
      shadow-md
      hover:shadow-lg
      transition-shadow duration-300
      flex
    "
  >
    {/* Left: Avatar */}
    <div className="w-2/5 h-full">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="object-cover w-full h-full"
      />
    </div>

    {/* Right: Info */}
    <div className="w-3/5 p-4 flex flex-col justify-between">
      {/* Top: Name & Login */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
          {user.name || user.login}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          @{user.login}
        </p>
      </div>

      {/* Bottom: Type & CTA */}
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase text-primary font-semibold">
          {user.type}
        </span>
        <span className="flex items-center text-primary font-medium group-hover:underline">
          View Profile <FaExternalLinkAlt className="ml-1" />
        </span>
      </div>
    </div>
  </Link>
);

export default UserCard;

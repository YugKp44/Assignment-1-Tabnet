# GitHub Finder App

### A React-based web application to search for GitHub users and view their profiles and repositories. Built for the Tabnet Security Assignment.

This project is a single-page application built with modern web technologies, focusing on clean code, responsive design, and an excellent user experience. It leverages the official GitHub API for all data.

---

## Live Demo & Walkthrough

* **Live Application:** My app is deployed on Vercel—check it out here:  
    🔗 **[https://assignment-1-tabnet-v1rk.vercel.app/](https://assignment-1-tabnet-v1rk.vercel.app/)** 

* **Video Walkthrough:** I recorded a detailed demo and code walkthrough. Watch it here:  
    🎥 **[https://drive.google.com/file/d/1BukVrLSwb3aUkAbJNqNmvnziWjQeLBLH/view?usp=drive_link](https://drive.google.com/file/d/1BukVrLSwb3aUkAbJNqNmvnziWjQeLBLH/view?usp=drive_link)** 

---

## Features

### Core Requirements
-   **User Search:** Search for any GitHub user by their username.
-   **Detailed Profile View:** View a user's detailed profile, including their avatar, name, bio, location, and key statistics (followers, following, public repos, etc.).
-   **Top Repositories:** Displays a user's top 5 repositories sorted by stars.
-   **Responsive Design:** A fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
-   **Clean Routing:** Uses React Router for clean, navigable URLs (`/user/:username`).

### Bonus Features & Enhancements
-   **🚀 Debounced Search with Live Suggestions:** The search bar includes a high-performance autocomplete dropdown that fetches suggestions as the user types, without spamming the API.
-   **🎨 Professional UI/UX:** The application features a permanent, professional dark theme with a consistent and modern design system, built with Tailwind CSS and the daisyUI component library.
-   **✨ Live Deployment:** The application is deployed and accessible via a live Vercel link.

---

## Tech Stack

This project was built using a modern, industry-standard tech stack:

| Technology          | Description                                                                                     |
| :------------------ | :---------------------------------------------------------------------------------------------- |
| **React**           | A JavaScript library for building user interfaces. All components are functional and use Hooks. |
| **Vite**            | A next-generation frontend tooling for a faster and leaner development experience.              |
| **Redux Toolkit**   | The official, recommended toolset for efficient Redux development and state management.         |
| **Tailwind CSS**    | A utility-first CSS framework for rapidly building custom designs.                              |
| **daisyUI**         | A component library for Tailwind CSS to accelerate UI development.                              |
| **Axios**           | A promise-based HTTP client for making API requests.                                            |
| **React Router**    | The standard library for routing in React.                                                      |
| **lodash.debounce** | Used for performance optimization in the search suggestions feature.                            |
| **Vercel**          | The platform used for deploying the live application.                                           |

---

## Screenshots



|          Desktop View          |          Mobile View          |
| :----------------------------: | :---------------------------: |
| *E:\Assignment 1 Tabnet\github-finder-app\Screen_Shots\desktop.png* | *E:\Assignment 1 Tabnet\github-finder-app\Screen_Shots\mobile.png* |
|*E:\Assignment 1 Tabnet\github-finder-app\Screen_Shots\desktop2.png*| *E:\Assignment 1 Tabnet\github-finder-app\Screen_Shots\mobile2.png*|

---

## Local Setup and Installation

To run this project locally, please follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/YugKp44/Assignment-1-Tabnet](https://github.com/YugKp44/Assignment-1-Tabnet.git)
cd Assignment-1-Tabnet/github-finder-app
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**

   You need a GitHub Personal Access Token to avoid API rate-limiting, especially for the search suggestions feature.

   - Create a file named `.env.local` in the root of the `github-finder-app` directory.
   - Add your GitHub token to this file:

     ```
     VITE_GITHUB_TOKEN=your_personal_access_token_here
     ```
   - *You can generate a token [here](https://github.com/settings/tokens). No special permissions are required.*

**4. Start the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## Architectural Decisions & Assumptions

* **Redux for State Management:** I chose Redux Toolkit to manage the global state (like user search results and profile data). This provides a single source of truth and avoids prop-drilling, making the application more scalable and easier to debug.

* **Debounced Suggestions:** To provide a better user experience and optimize performance, the search suggestions are fetched using a debounced function. This ensures the GitHub API is not called on every keystroke, only when the user pauses typing.

* **API Calls in Component vs. Redux:** While the main search and profile data are fetched via Redux Thunks for architectural consistency, the live search suggestions are fetched directly in the component. This was a pragmatic choice to encapsulate the suggestion logic within a local custom hook (`useUserSuggestions`), demonstrating an understanding of both local and global state management patterns.



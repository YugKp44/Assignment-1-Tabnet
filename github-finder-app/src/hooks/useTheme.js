import { useState, useEffect } from 'react';

// This function determines the initial theme. It checks localStorage first,
// and if nothing is there, it defaults to 'dark'.
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
  }
  return 'dark'; // Default to dark theme
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // This effect runs whenever the theme state changes.
  // It adds/removes the 'dark' class on the <html> element
  // and saves the preference to localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old theme class
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    // Add the new theme class
    root.classList.add(theme);
    
    // Save the user's preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
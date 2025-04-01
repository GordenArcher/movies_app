
import React, { createContext, useState, useContext } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [username, setUsername] = useState('Guest');

  const toggleSaveMovie = (movie) => {
    setSavedMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const updateUsername = (newName) => {
    const name = newName || 'Guest';
    setUsername(name);
  };

  return (
    <MovieContext.Provider value={{ savedMovies, toggleSaveMovie, username, updateUsername }}>
      {children}
    </MovieContext.Provider>
  );
};
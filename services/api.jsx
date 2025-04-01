import { useState } from "react";

export const TMBD_CONFIG = {
    BASE_URL : "https://api.themoviedb.org/3",
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async ({ query }) => {
    const endpoint = query 
    ? 
    `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    :  
    `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint, {
        method : "GET",
        headers : TMBD_CONFIG.headers,
    });

    if (!response){
        throw new Error("Error fetching movies")
    }


    const data = await response.json()
    return data.results

}

export const fetchMovieDetails = async (movieId)=> {
    try {
        const response = await fetch(`${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`, {
            method:"GET",
            headers: TMBD_CONFIG.headers
        })

        if(!response.ok) throw new Error("Failed to fetch movie")

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
}


export const fetchRecommendations = async (movieId) => {
  try {
      const response = await fetch(
          `${TMBD_CONFIG.BASE_URL}/movie/${movieId}/recommendations`,
          {
              method: "GET",
              headers: TMBD_CONFIG.headers
          }
      );

      if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error("Error fetching recommendations:", error);
      return [];
  }
};

import { useState } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const MovieContext = createContext();

const movieReducer = (state, action) => {
  let movies;
  switch (action.type) {
    case "SET_POPULAR_MOVIES_DESCENDING":
      return { movies: action.payload };
    case "ADD_POPULAR_MOVIES_DESCENDING":
      movies = state.movies.concat(action.payload);
      return { movies };
    case "SET_POPULAR_MOVIES_ASCENDING":
      return { movies: action.payload };
    case "ADD_POPULAR_MOVIES_ASCENDING":
      movies = state.movies.concat(action.payload);
      return { ...state.movies.concat(action.payload) };
    default:
      break;
  }
};

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, { movies: [] });
  const [page, setPage] = useState(2);

  const getPopularMovies = useCallback(async (pageFilter) => {
    const response = await fetch(
      `http://localhost:3000/api/getPopularMovies?page=${pageFilter}`
    );
    const { results } = await response.json();
    dispatch({ type: "SET_POPULAR_MOVIES_DESCENDING", payload: results });
  }, []);

  const addPopularMovies = useCallback(
    async (pageFilter) => {
      const response = await fetch(
        `http://localhost:3000/api/getPopularMovies?page=${pageFilter}`
      );
      const { results } = await response.json();
      dispatch({ type: "ADD_POPULAR_MOVIES_DESCENDING", payload: results });
    },
    [page]
  );

  const context = useMemo(
    () => ({
      ...state,
      page,
      setPage,
      getPopularMovies,
      addPopularMovies,
    }),
    [state, page, setPage, getPopularMovies, addPopularMovies]
  );

  return (
    <MovieContext.Provider value={context}>{children}</MovieContext.Provider>
  );
}

export const useMovie = () => useContext(MovieContext);

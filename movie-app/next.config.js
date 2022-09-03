const TMDB_APIKEY = process.env.TMDB_APIKEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/google",
        destination: "https://www.google.ca",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/getPopularMovies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_APIKEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${TMDB_APIKEY}`,
      },
    ];
  },
};

module.exports = nextConfig;

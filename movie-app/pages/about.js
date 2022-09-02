import Seo from "../components/Seo";

export default function About() {
  return (
    <div>
      <Seo title="About" />
      <h2>Technologies</h2>
      <ul>
        <li>ReactJS</li>
        <li>NextJS</li>
        <li>Movie APIs</li>
      </ul>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://www.themoviedb.org/" target="_blank">
            TMDB
          </a>
        </li>
        <li>
          <a href="http://localhost:3000/api/getPopularMovies" target="_blank">
            TMDB API example
          </a>
        </li>
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function MovieDetail({ params }) {
  const [title, id] = params || [];
  const [movie, setMovie] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:3000/api/movies/${id}`);
      const movie = await response.json();
      setMovie(movie);
      setImagePath(
        `https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${movie.backdrop_path}`
      );
    };
    fetchMovie();
  }, [id]);

  return (
    <div>
      <Seo title={params} />
      {!movie && <div>Loading...</div>}
      {movie && (
        <>
          <picture>
            <source srcSet={imagePath} type="image/webp" />
            <img
              className="backdrop"
              src={imagePath}
              alt={movie.original_title}
            />
          </picture>
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>
        </>
      )}
      <style jsx>{`
        .backdrop {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  // const movieId = query.params[1];
  // const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);
  // const movie = await response.json();
  return { props: { params } };
}

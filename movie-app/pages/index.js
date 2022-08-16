import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ movies }) {
  const router = useRouter();

  const onClick = (movie) => {
    const { original_title, id } = movie;
    router.push(`/movies/${original_title}/${id}`);
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       title: original_title,
    //     },
    //   },
    //   `/movies/${id}`
    // );
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {movies?.map((movie) => {
        const imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        return (
          <div key={movie.id} className="movie">
            {/** navigate route programmatically using useRouter() */}
            <picture onClick={() => onClick(movie)}>
              <source srcSet={imagePath} type="image/webp" />
              <img src={imagePath} alt={movie.original_title} />
            </picture>
            {/** navigate route using next/link component */}
            <Link
              href={{
                pathname: `/movies/${movie.id}`,
                query: {
                  title: movie.original_title,
                },
              }}
              as={`/movies/${movie.id}`}
            >
              <h4>{movie.title}</h4>
            </Link>
          </div>
        );
      })}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/getPopularMovies");
  const { results } = await response.json();
  return {
    props: {
      movies: results,
    },
  };
}

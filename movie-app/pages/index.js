import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdInfoOutline } from "react-icons/md";
import Seo from "../components/Seo";
import { genres } from "../data/data";

export default function Home({ movies }) {
  const router = useRouter();
  const [backdropUrl, setBackdropUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    setBackdropUrl(
      `https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${movies[0].backdrop_path}`
    );
    setPosterUrl(`https://image.tmdb.org/t/p/w200/${movies[0].poster_path}`);
  }, [movies]);

  const onClick = (movie) => {
    console.log(movie);
    const { original_title, id } = movie;
    router.push(`/movies/${original_title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home" />
      <div className="header">
        <picture className="backdrop">
          <source srcSet={backdropUrl} type="image/webp" />
          <img src={backdropUrl} alt={`${movies[0].original_title}_backdrop`} />
        </picture>
        <div className="view">
          <div className="content">
            <div className="main_poster">
              <picture onClick={() => onClick(movies[0])}>
                <source srcSet={posterUrl} type="image/webp" />
                <img src={posterUrl} alt={`${movies[0].original_title}_main`} />
              </picture>
            </div>
            <div className="info">
              <h1 className="title">{movies[0].original_title}</h1>
              <div className="genres">
                {genres
                  .filter((item) => movies[0].genre_ids.includes(item.id))
                  .map((item) => (
                    <span className="genre" key={item.id}>
                      {item.name}
                    </span>
                  ))
                  .reduce((prev, curr) => [prev, "|", curr])}
              </div>
              <p className="overview">{movies[0].overview}</p>
              <button onClick={() => onClick(movies[0])}>
                <MdInfoOutline />
                <span className="buttonText">More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        {movies?.map((movie) => {
          const imagePath = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
          return (
            <div key={movie.id} className="poster">
              <picture onClick={() => onClick(movie)}>
                <source srcSet={imagePath} type="image/webp" />
                <img src={imagePath} alt={movie.original_title} />
              </picture>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .backdrop {
          position: relative;
          opacity: 0.7;
        }
        .header .backdrop img {
          width: 100%;
          height: 600px;
          overflow: hidden;
        }
        .view {
          position: absolute;
          top: 9%;
          left: 5%;
          z-index: 10;
        }
        .content {
          display: flex;
          flex-direction: row;
          width: 90%;
        }
        .header .view img {
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
        }
        .info {
          margin-left: 1rem;
          padding: 10px;
          border-radius: 12px;
          background: gray;
          opacity: 0.8;
        }
        .title {
          margin: 0.5rem 0.3rem;
        }
        .genres {
          display: flex;
          flex-direction: row;
        }
        .genre {
          margin: 0 0.4rem;
        }
        .overview {
          margin: 1rem 0.4rem;
        }
        button {
          display: flex;
          align-items: center;
          align-self: flex-end;
          margin: 0 0.4rem;
          font-size: 20px;
          cursor: pointer;
        }
        .buttonText {
          margin-left: 0.2rem;
        }
        .wrapper {
          margin: 2rem 4rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          grid-gap: 1.5rem;
          grid-template-areas: "header";
        }
        .main_poster,
        .poster {
          cursor: pointer;
        }
        .poster img {
          min-width: 20%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .poster:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .poster h4 {
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

import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";
import { sorting } from "../../data/data";
import { useMovie } from "../../context/movie";

export default function index() {
  const router = useRouter();
  const [sortCollapse, setSortCollapse] = useState(true);
  const [sortValue, setSortValue] = useState(sorting[0].value);
  const { movies, page, setPage, getPopularMovies, addPopularMovies } =
    useMovie();

  useEffect(() => {
    getPopularMovies(sorting[0].value);
  }, []);

  const onCollapse = (e) => {
    switch (e.target.id) {
      case "sort-open":
      case "sort-close":
        setSortCollapse((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const onSelect = (e) => {
    /** MUST CALL API AGAIN */
    switch (e.target.value) {
      case "popularityAscending":
        break;
      case "popularityDescending":
        break;
      case "ratingAscending":
        break;
      case "ratingDescending":
        break;
      case "releaseAscending":
        console.log("ascending");
        break;
      case "releaseDescending":
        console.log("descending");
        break;
      case "titleAtoZ":
        break;
      default:
        break;
    }
  };

  const onLoadMore = () => {
    setPage((prev) => ++prev);
    addPopularMovies(page);
  };

  const onClick = (movie) => {
    console.log(movie);
    const { original_title, id } = movie;
    router.push(`/movies/${original_title}/${id}`);
  };

  return (
    <div className="container">
      <h2>Popular Movies</h2>
      <div className="wrapper">
        <div className="filter">
          <div className="panel">
            <div className="type">
              <div className="name">Sort</div>
              <div className="collapse">
                {sortCollapse ? (
                  <ExpandMoreIcon id="sort-close" onClick={onCollapse} />
                ) : (
                  <ChevronRightIcon id="sort-open" onClick={onCollapse} />
                )}
              </div>
            </div>
            {sortCollapse && (
              <div className="controller">
                <h3>Sort Results By</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select value={sortValue} onChange={onSelect}>
                    {sorting.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        </div>
        <div className="view">
          <div className="movies">
            {movies ? (
              movies.map((movie) => {
                const imagePath = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
                return (
                  <div key={movie.id} className="moive card">
                    <picture className="poster" onClick={() => onClick(movie)}>
                      <img
                        className="image"
                        src={imagePath}
                        alt={movie.original_title}
                      />
                    </picture>
                    <div className="infos">
                      <div className="rating">
                        <Rating
                          name="read-only"
                          value={parseFloat(movie.vote_average / 2)}
                          precision={0.5}
                          readOnly
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </div>
                      <h2>{movie.title}</h2>
                      <p>{movie.release_date}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <button className="loadmore" onClick={onLoadMore}>
            Load More
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-content: flex-start;
          width: 100%;
          padding-left: 40px;
          padding-right: 40px;
          padding-top: 30px;
          padding-bottom: 30px;
        }
        .wrapper {
          display: flex;
        }
        .filter {
          flex: 20%;
        }
        .panel {
          min-width: 260px;
          width: 260px;
          border: 1px solid #e3e3e3;
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow: hidden;
        }
        .filter .type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .filter .name {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          align-items: center;
          padding: 14px 16px;
        }
        .filter .collapse {
          cursor: pointer;
          padding: 14px 16px;
        }
        .filter .controller {
          width: 100%;
          border-top: 1px solid #eee;
          padding: 14px 16px 16px 16px;
        }
        .filter .controller h3 {
          display: inline-flex;
          align-items: center;
          width: 100%;
          font-size: 1em;
          font-weight: 300;
          margin-bottom: 10px;
        }
        .card {
          box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
          border: 1px solid rgba(211, 211, 211, 1);
          background-color: #fff;
        }
        .view {
          display: flex;
          flex-direction: column;
          flex: 80%;
          padding-left: 30px;
        }
        .movies {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .moive {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          border: 1px solid #e3e3e3;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 5px 20px;
          /* width: min-content; */
          width: calc(
            (
                100vw - 80px - 260px -
                  (
                    var(--discoverColumnPadding) *
                      var(--numberOfDiscoverColumns)
                  )
              ) / var(--numberOfDiscoverColumns)
          );
          max-width: calc(
            (
                var(--maxPrimaryPageWidth) - 80px - 260px -
                  (
                    var(--discoverColumnPadding) *
                      var(--numberOfDiscoverColumns)
                  )
              ) / var(--numberOfDiscoverColumns)
          );
        }
        .poster {
          cursor: pointer;
          width: 100%;
          height: calc(
            (
                100vw - 80px - 260px -
                  (
                    var(--discoverColumnPadding) *
                      var(--numberOfDiscoverColumns)
                  )
              ) / var(--numberOfDiscoverColumns) * 1.5
          );
          max-height: calc(
            (
                var(--maxPrimaryPageWidth) - 80px - 260px -
                  (
                    var(--discoverColumnPadding) *
                      var(--numberOfDiscoverColumns)
                  )
              ) / var(--numberOfDiscoverColumns) * 1.5
          );
        }
        .image {
          width: 100%;
          height: 100%;
        }
        .infos {
          width: 100%;
          padding: 0px 10px 12px 10px;
          position: relative;
          white-space: normal;
          display: flex;
          align-content: flex-start;
          flex-wrap: wrap;
        }
        .rating {
          position: relative;
          left: -3px;
          margin-top: 5px;
        }
        .infos h2 {
          font-size: 1em;
          margin: 0;
          width: 100%;
          word-wrap: normal;
          overflow-wrap: break-word;
          cursor: pointer;
        }
        .infos h2:hover {
          color: #01b4e4;
        }
        .infos p {
          font-size: 1em;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.6);
        }
        .loadmore {
          margin-top: 30px;
          padding: 0;
          max-width: 100%;
          width: 100%;
          height: 50px;
          border-radius: var(--imageBorderRadius);
          background-color: rgba(var(--accountLightBlue), 1);
          font-size: 1.5em;
          font-weight: 700;
          color: #fff;
          border: hidden;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

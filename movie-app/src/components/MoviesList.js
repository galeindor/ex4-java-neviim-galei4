import MovieItem from "./MovieItem";

export default function MoviesList({movies}) {
    return (
        <div>
            {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <MovieItem movie={movie}/>
                        </div>
                    )
                }
            )}
        </div>
    )
}
import MovieItem from "./MovieItem";
import {Row} from "react-bootstrap";

export default function MoviesList({movies}) {
    return (
        <Row>
            {movies.map(movie => {
                    return (
                        <div key={movie.id} className={"col-12 col-sm-5 col-md-3 col-lg-2 m-1"}>
                            <MovieItem movie={movie}/>
                        </div>
                    )
                }
            )}
        </Row>
    )
}
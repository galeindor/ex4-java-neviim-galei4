import SearchBar from "./SearchBar";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import MoviesList from "./MoviesList";

export default function MovieSection() {
    const [movies, setMovies] = useState([]);
    return (
        <Col>
            <Row>
                <SearchBar setMovies={setMovies}/>
            </Row>
            <MoviesList movies={movies}/>

        </Col>
    )
}
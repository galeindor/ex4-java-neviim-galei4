import SearchBar from "./SearchBar";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import MediaList from "./MediaList";

export default function MediaSection() {
    const [movies, setMovies] = useState([]);
    return (
        <Col>
            <Row>
                <SearchBar setMovies={setMovies}/>
            </Row>
            <MediaList movies={movies}/>
        </Col>
    )
}
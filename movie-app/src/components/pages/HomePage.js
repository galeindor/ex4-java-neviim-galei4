import {Col, Container, Row} from "react-bootstrap";
import MovieSection from "../MovieSection"; // TODO: check if needed
import {useState} from "react";
import SearchBar from "../SearchBar";
import MoviesList from "../MoviesList";
import MoviesReducer from "../../reducers/MoviesReducer";
import {useReducer} from "react";
import axios from "axios";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    // const initialState = {
    //     loading: false,
    //     data: [],
    //     error: ''
    // }
    // const [movies, dispatch] = useReducer(MoviesReducer, initialState, () => initialState);
    //
    // const fetchMovies = async (query, isSearch, isMovies,) => {
    //     dispatch({type: 'FETCH_DATA'});
    //     await axios.get(`http://www.omdbapi.com/?apikey=4a3b711b&s=${query}`)
    // }

    return (
        <Container>
            <Col>
                <Row>
                    <SearchBar setMovies={setMovies}/>
                </Row>
                <MoviesList movies={movies}/>

            </Col>
        </Container>
    )
}

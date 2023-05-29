import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "./SearchBar";
import MediaList from "./MediaList";
import MediaReducer from "../../reducers/MediaReducer";
import {useEffect, useReducer, useState} from "react";
import {TMDB_API_KEY, TMDB_BASE_URL} from "../../constants";
import Message from "../Message";
import LoadingSpinner from "../LoadingSpinner";
import {useFetch} from "../../customHooks/useFetch";

/**
 * This component is the home page of the app
 * @returns {JSX.Element} Home Page
 * @constructor Home Page
 * @exports HomePage
 */
export default function HomePage() {
    const [{data, isLoading, errors}, doFetch] = useFetch([]);
    const [media, dispatch] = useReducer(MediaReducer, [], () => {});
    const [message, setMessage] = useState('');
    const setMedia = async (data) => {
        dispatch({type: 'RESET', payload: data});
        for (const item of data) {
            dispatch({type: item.media_type.toUpperCase(), payload: item});
        }
        if (data.length === 0)
            setMessage("No Results");
    }


    useEffect(() => {
        const fetchTrending = async () => {
            const url = `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`;
            doFetch(url);
        }
        fetchTrending();
    }, []);

    useEffect(() => {
        if (errors) {
            setMessage('Error Fetching Data , Please Try Again Later');
        }
        if(data && data.results) {
            setMedia(data.results);
            setMessage("")
        }
    }, [data]);

    return (
        <Container>
            <Col>
                <Row>
                    <SearchBar setMedia={setMedia}/>
                </Row>
                {message && <Message message={message} className={"mb-2"}></Message>}
                <MediaList media={media}/>
                {isLoading && <LoadingSpinner/>}
            </Col>
        </Container>
    )
}

import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "../SearchBar";
import MediaList from "../MediaList";
import MediaReducer from "../../reducers/MediaReducer";
import {useEffect, useReducer, useState} from "react";
import {TMDB_API_KEY} from "../../constants";
import axios from "axios";
import Message from "../Message";
import LoadingSpinner from "../LoadingSpinner";

export default function HomePage() {
    const [media, dispatch] = useReducer(MediaReducer, [], () => {});
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setMedia = async (data) => {
        setMessage('Search Results');
        dispatch({type: 'RESET', payload: data});
        for (const item of data) {
            dispatch({type: item.media_type.toUpperCase(), payload: item});
        }
        if (data.length === 0)
            setMessage("No Results");
    }


    useEffect(() => {
        const fetchTrending = async () => {
            setIsLoading(true)
            const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`;
            try {
                const response = await axios(url);
                const data = response.data;
                await setMedia(data.results);
                setMessage('Trending Today')
            } catch (e) {
                setMessage('Error Fetching Data , Please Try Again Later');
            } finally {
                setIsLoading(false);
            }
        }
        fetchTrending();
    }, []);

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

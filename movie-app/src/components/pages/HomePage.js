import {Col, Container, Row} from "react-bootstrap";
import MediaSection from "../MediaSection"; // TODO: check if needed

import SearchBar from "../SearchBar";
import MediaList from "../MediaList";
import MediaReducer from "../../reducers/MediaReducer";
import {useReducer} from "react";

export default function HomePage() {
    const [media, dispatch] = useReducer(MediaReducer, []);
    const test = [];
    test.map((item) => {
        console.log(item);
    });

    const setMedia = async (data) => {
        dispatch({type: 'RESET', payload: data});
        for (const item of data) {
            dispatch({type: item.media_type.toUpperCase(), payload: item});
        }
    }

    return (
        <Container>
            <Col>
                <Row>
                    <SearchBar setMedia={setMedia}/>
                </Row>
                <MediaList media={media}/>

            </Col>
        </Container>
    )
}

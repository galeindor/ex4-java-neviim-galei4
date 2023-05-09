import {Container, Row} from "react-bootstrap";
import MovieSection from "../MovieSection";

export default function HomePage() {
    return (
        <Container>
            <Row>
                <MovieSection/>
            </Row>
        </Container>
    )
}

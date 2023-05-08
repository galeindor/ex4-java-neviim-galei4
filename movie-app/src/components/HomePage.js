import {Container, Row} from "react-bootstrap";
import MovieSection from "./MovieSection";

export default function HomePage() {
    return (
        <Container>
            <Row>
                <MovieSection/>
                <div className={"col-0 col-lg-6"}></div>
            </Row>
        </Container>
    )
}

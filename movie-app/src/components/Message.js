import {Row} from "react-bootstrap";

export default function Message({message, className}) {
    return (
        <Row className={"text-center " + className} style={{fontFamily:"sans-serif"}}>
            <h2>{message}</h2>
        </Row>
    )
}
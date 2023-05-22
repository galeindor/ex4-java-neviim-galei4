import {Spinner} from "react-bootstrap";

export default function LoadingSpinner() {

    const style = {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: "999"
    }
    return (
        <span className="d-flex justify-content-center" style={style}>
            <Spinner animation="border" />
        </span>
    )
}
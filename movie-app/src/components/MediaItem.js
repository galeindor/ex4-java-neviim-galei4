import {Card, Col, Modal, Row, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {REST_API_URL, TMDB_IMAGE_BASE_URL} from "../constants";
export default function MediaItem({item}) {

    const posterPath = `${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`;
    const img_url = item.poster_path ? posterPath : './default.png';

    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const addToCart = async () => {
        const data = {
            "id": item.id,
            "name": item.name,
            "posterUrl": posterPath,
            "overview": item.overview,
            "price": 3.99,
        };
        try {
            const response = await axios.post(REST_API_URL, data);
            const success = await response.data;
            console.log(success);
            setMessage(success ? "Item added to cart" : "Item already in cart")
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (message !== "") {
            const timer = setTimeout(() => {
                console.log("timer executed");
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const MouseOver = () => setIsHovered(true);
    const MouseOut = () => setIsHovered(false);


    return (
        <>
            <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} onClick={handleShow}
                  style={{backgroundColor: isHovered ? "#CCD1D1" : "#E5E8E8", borderWidth: 3, fontFamily: "serif"}}>
                <img src={img_url} alt={item.name} className="img-fluid m-1"/>
                <h4>{item.name}</h4>
                <h6>{item.release_date}</h6>
            </Card>

            {message &&
                <ToastContainer className="p-3" style={{position:"fixed",right:"10px",bottom:"10px"}}>
                    <Toast >
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img src={img_url} alt={item.name} width={"auto"} className="img-fluid m-1"/>
                        </Col>
                        <Col>
                            <p className={"m-1"}>{item.overview}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <img src={"./icons/add_to_cart.png"} alt={"item.name"} onClick={addToCart}/>
                </Modal.Footer>
            </Modal>

        </>
    )
}
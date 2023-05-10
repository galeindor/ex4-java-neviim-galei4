import {Card, Col, Modal, Row, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {cartConsts, ITEM_FIXED_PRICE, REST_API_URL, TMDB_IMAGE_BASE_URL} from "../constants";

export default function MediaItem({item}) {

    const posterPath = `${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`;
    const img_url = item.poster_path ? posterPath : './default.png';
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const addToCart = async () => {
        const data = {
            "id": item.id,
            "name": item.name,
            "posterUrl": posterPath,
            "overview": item.overview,
            "price": ITEM_FIXED_PRICE
        };
        try {
            const response = await axios.post(REST_API_URL, data);
            const success = await response.data;
            console.log(success);
            setMessage(success ? cartConsts.ADD_SUCCESS : cartConsts.ADD_FAILURE)
        } catch (e) {
            setMessage(cartConsts.ADD_ERROR);
            console.log(e);
        }
    }

    useEffect(() => {
        setSuccess(message === cartConsts.ADD_SUCCESS )
        if (message !== "") {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const MouseOver = () => setIsHovered(true);
    const MouseOut = () => setIsHovered(false);

    let styles = {
        card: {
            backgroundColor: isHovered ? "#ced0d2" : "#eff1f1",
            borderWidth: 3,
            fontFamily: "serif"
        },
        toast: {
            position: "fixed",
            right: "10px",
            bottom: "10px",
        }
    }

    return (
        <>
            <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} onClick={handleShow}
                  style={styles.card}>
                <img src={img_url} alt={item.name} className="img-fluid m-1"/>
                <h4>{item.name}</h4>
                <h6>{item.release_date}</h6>
            </Card>

            {message &&
                <ToastContainer className={success ? "bg-success" : "bg-danger"} style={styles.toast}>
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
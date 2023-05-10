import {Card, Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
export default function MediaItem({item}) {
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);


    const addToCart = async () => {
        const url = `http://localhost:8080/media`;
        const data = {
            "id": item.id,
            "name": item.name,
            "poster_path": item.poster_path,
            "overview": item.overview,
            "media_type": item.media_type
        };
        try {
            const response = await axios.post(url, data);
            const data = response.data;
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const MouseOver = () => setIsHovered(true);
    const MouseOut = () => setIsHovered(false);

    const posterPath = `https://image.tmdb.org/t/p/original${item.poster_path}`;
    const img_url = item.poster_path ? posterPath : './default.png';

    return (
        <>
            <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} onClick={handleShow}
                  style={{backgroundColor: isHovered ? "#CCD1D1" : "#E5E8E8", borderWidth: 3, fontFamily: "serif"}}>
                <img src={img_url} alt={item.name} className="img-fluid m-1"/>
                <h4>{item.name}</h4>
                <h6>{item.release_date}</h6>
            </Card>

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
                    <img src={"./icons/add_to_cart.png"} alt={"item.name"}/>
                </Modal.Footer>
            </Modal>
        </>
    )
}
import {Card, Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {
    CURRENCY,
    ITEM_FIXED_PRICE,
    ITEM_ORIGINAL_PRICE,
    TMDB_IMAGE_BASE_URL
} from "../../constants";

export default function MediaItem({item, addToCart}) {

    // Constants for the item
    const posterPath = `${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`;
    const img_url = item.poster_path ? posterPath : './default.png';

    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);

    function addItem() {
        const itemData = {
            "id": item.id,
            "name": item.name,
            "posterUrl": posterPath,
            "overview": item.overview,
            "price": ITEM_FIXED_PRICE
        };
        addToCart(itemData);
    }


    // Modal functions and styles for the item card
    // functions handle the modal show and close and item card hover
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
    }

    return (
        <>
            <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} onClick={handleShow}
                  style={styles.card}>
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
                    <p className={"fw-bold text-decoration-line-through"}> {ITEM_ORIGINAL_PRICE + CURRENCY}</p>
                    <p className={"col fw-bold text-danger"}> {ITEM_FIXED_PRICE + CURRENCY}</p>
                    <Row>
                        <img src={"./icons/add_to_cart.png"} alt={"item.name"} onClick={addItem}/>
                    </Row>
                </Modal.Footer>
            </Modal>

        </>
    )
}
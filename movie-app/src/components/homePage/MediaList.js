import MediaItem from "./MediaItem";
import {Row, Toast, ToastContainer} from "react-bootstrap";
import {cartConstants, REST_API_URL} from "../../constants";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../CartContext";

/**
 * Media list component that renders a list of media items
 * @param media - array of media items
 * @returns {JSX.Element} - Media list component
 * @constructor MediaList
 */
export default function MediaList({media}) {
    const [cart, setCart] = useContext(CartContext)
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    /**
     * Add item to cart
     * @returns {Promise<void>}
     */
    const addToCart = async (itemData) => {
        try {
            const response = await axios.post(
                REST_API_URL,
                JSON.stringify(itemData),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            const success = await response.data;
            setMessage(success ? cartConstants.ADD_SUCCESS : cartConstants.ADD_FAILURE)
            if (success) // add to cart only if success
                setCart([...cart, itemData]);
        } catch (e) {
            setMessage(cartConstants.ADD_ERROR);
            console.log(e);
        }
    }

    useEffect(() => {
        setSuccess(message === cartConstants.ADD_SUCCESS)
        if (message !== "") {
            const timer = setTimeout(() => {
                setMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    let styles = {
        toast: {
            position: "fixed",
            right: "20px",
            bottom: "20px",
        }
    }

    return (
        <>
            <Row>
                {Array.isArray(media) && media.map(item => {
                        return (
                            <div key={item.id} className={"col-12 col-sm-6 col-md-4 col-lg-3 p-3"}>
                                <MediaItem item={item} addToCart={addToCart}/>
                            </div>
                        )
                    }
                )}
            </Row>
            {message &&
                <ToastContainer className={success ? "bg-success" : "bg-danger"} style={styles.toast}>
                    <Toast>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            }
        </>
    )
}
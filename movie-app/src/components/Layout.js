import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../CartContext";

/**
 * Layout component for the app that contains the navbar and the outlet for the routes to be rendered
 * @returns {JSX.Element}
 * @constructor
 */
export default function Layout() {
    const [cart, setCart] = useContext(CartContext);
    const [length, setLength] = useState(0);

    useEffect(() => {
        setLength(cart.length);
    }, [cart]);

    return (
        <>
            <Navbar bg="secondary" variant={"light"}>
                <Container fluid={true}>
                    <Navbar.Brand>
                        <img src={"../logo.png"} width={60} height={60} alt={"logo"}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to={"/"}>
                            <Badge pill bg={"secondary"}>
                                <img src={"../icons/movie.png"} width={40} height={40} alt={"home"}/>
                            </Badge>
                        </Link>
                        <Link to={"/cart"}>
                            <Badge pill bg={"secondary"}>
                                <img src={"../icons/cart.png"} width={40} height={40} alt={"cart"}/>
                                <span>{length}</span>
                            </Badge>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        <Outlet />
        </>
    )
}
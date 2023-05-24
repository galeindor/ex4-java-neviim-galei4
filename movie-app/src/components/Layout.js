import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../CartContext";

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
                        <Nav.Link href="/">
                            <Badge pill bg={"secondary"}>
                                <img src={"../icons/movie.png"} width={40} height={40} alt={"home"}/>
                            </Badge>
                        </Nav.Link>
                        <Nav.Link href="/cart">
                            <Badge pill bg={"secondary"}>
                                <img src={"../icons/cart.png"} width={40} height={40} alt={"cart"}/>
                                <span>{length}</span>
                            </Badge>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        <Outlet />
        </>
    )
}
import {Container, Nav, Navbar} from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <img src={"./logo.png"} width={50} height={50} alt={"logo"}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Choose Movies</Nav.Link>
                        <Nav.Link href="/cart">Shopping Cart</Nav.Link>
                        <Nav.Link href="/checkout">Checkout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        {/*<Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Choose Movies</Navbar.Brand>
                <Navbar.Brand href="/cart">Shopping Cart</Navbar.Brand>

            </Container>
        </Navbar>*/}
        <Outlet />
        </>
    )
}
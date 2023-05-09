import {Container, Navbar} from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Choose Movies</Navbar.Brand>
                <Navbar.Brand href="/cart">Shopping Cart</Navbar.Brand>

            </Container>
        </Navbar>
        <Outlet />
        </>
    )
}
import {Button, Container, Form, Offcanvas, Row} from "react-bootstrap";
import {useState} from "react";

export default function SearchFilter({dispatchFilters, setCurrentSearch, currentSearch, onSubmit}) {
    const [show, setShow] = useState(false);
    const [genres, setGenres] = useState([]); // genres from TMDB
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeGenres = (e) => {
        const value = e.target.value;
        const checkedGenres = e.target.checked ? [...genres, value] : genres.filter((genre) => genre !== value);
        checkedGenres.filter((genre) => genre !== "");
        dispatchFilters({
            type: "WITH_GENRES",
            payload: checkedGenres
        });
        setGenres(checkedGenres);
        console.log(checkedGenres);
    };

    return (
        <>
            <img src={"./icons/filter.png"} height={"30"} className={"mt-1"} onClick={handleShow} alt={"filterIcon"}/>

            <Offcanvas show={show} onHide={handleClose} scroll={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit(e.target[0].value)
                            handleClose();
                        }}>
                            <Row>
                                <Form.Label className={"col-4"}>Search Query</Form.Label>
                                <Form.Control className={"col mb-3"} type={"text"} placeholder={"Search Query"}
                                              value={currentSearch}
                                              onChange={(e) => setCurrentSearch(e.target.value)}/>
                            </Row>

                            <Row>
                                <Form.Label className={"col-4"}>Media Type</Form.Label>
                                <Form.Select className={"col mb-3"}
                                             onChange={(e) => dispatchFilters({
                                                 type: "MEDIA_TYPE",
                                                 payload: e.target.value
                                             })}>
                                    < option value={"multi"}>All</option>
                                    <option value={"movie"}>Movies</option>
                                    <option value={"tv"}>TV Shows</option>
                                </Form.Select>
                            </Row>

                            <Row>
                                <Form.Label className={"col-4"}>Release Year</Form.Label>
                                <Form.Control className={"col mb-3"} type="text" placeholder="Release Year"
                                              onChange={(e) => dispatchFilters({
                                                  type: "RELEASE_YEAR",
                                                  payload: e.target.value
                                              })}/>
                            </Row>

                            <Row>
                                <Form.Label className={"col-4"}>Genres</Form.Label>
                                <div onChange={changeGenres}>
                                    <Form.Check type={"checkbox"} label={"Action"} value={"Action"}></Form.Check>
                                    <Form.Check type={"checkbox"} label={"Adventure"} value={"Adventure"}></Form.Check>

                                    <Form.Check type={"checkbox"} label={"Animation"} value={"Animation"}></Form.Check>

                                    <Form.Check type={"checkbox"} label={"Comedy"} value={"Comedy"}></Form.Check>
                                </div>
                            </Row>

                            <Row>
                                <Button variant={"outline-secondary"} type={"submit"}>Search</Button>
                            </Row>
                        </Form>
                    </Container>
                </Offcanvas.Body>

            </Offcanvas>
        </>
    )
}
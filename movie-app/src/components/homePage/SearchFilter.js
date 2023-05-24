import {Button, Container, Form, Offcanvas, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {BG_COLOR, mediaTypes, TMDB_API_KEY, TMDB_BASE_URL} from "../../constants";

export default function SearchFilter({searchFilters, dispatchFilters, setCurrentSearch, currentSearch, onSubmit}) {
    const [show, setShow] = useState(false);
    const [genres, setGenres] = useState({movie_genres: [], tv_genres: []}); // genres from TMDB
    const [genreIds, setGenreIds] = useState([]); // genres selected by the user [ids
    const [genresOptions, setGenresOptions] = useState([]); // genres selected by the user [ids
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeGenres = (e) => {
        const value = e.target.value;
        const currGenreId = genres.movie_genres.find((genre) => genre.name === value)?.id ||
            genres.tv_genres.find((genre) => genre.name === value)?.id;
        const checkedGenres = e.target.checked ? [...genreIds, currGenreId] : genreIds.filter((genreId) => genreId !== currGenreId);
        checkedGenres.filter((genre) => genre !== "");
        dispatchFilters({
            type: "WITH_GENRES",
            payload: checkedGenres
        });
        setGenreIds(checkedGenres);
    };

    const setReleaseYear = (e) => {
        // set media type to movie if it is not already
        dispatchFilters({
            type: "RELEASE_YEAR",
            payload: e.target.value
        });
    };

    const setMediaType = (e) => {
        // set media type to movie if it is not already
        dispatchFilters({
            type: "MEDIA_TYPE",
            payload: e.target.value
        });
    }

    useEffect(() => {
        const fetchGenres = async () => {
            const genres = {};
            const types = ["movie", "tv"]
            for (const type of types) {
                const url = `${TMDB_BASE_URL}/genre/<type>/list?api_key=${TMDB_API_KEY}&language=en-US`
                    .replace("<type>", type)

                const response = await fetch(url);

                const data = await response.json();
                genres[type + "_genres"] = data.genres;
            }
            setGenres(genres);
        }
        fetchGenres(); // fetch genres from TMDB
    }, []);

    useEffect(() => {
        console.log(searchFilters);
        if (searchFilters.media_type === "movie") {
            setGenresOptions(genres.movie_genres);
            // remove tv genres from genreIds
            setGenreIds(genreIds.filter((genreId) => {
                const genre = genres.movie_genres.find((genre) => genre.id === genreId);
                return genre !== undefined;
            }));
        } else if (searchFilters.media_type === "tv") {
            setGenresOptions(genres.tv_genres);
            // remove movie genres from genreIds
            setGenreIds(genreIds.filter((genreId) => {
                const genre = genres.tv_genres.find((genre) => genre.id === genreId);
                return genre !== undefined;
            }));
        }

    }, [searchFilters]);

    return (
        <>
            <img src={"./icons/filter.png"} height={"30"} className={"mt-1"} onClick={handleShow} alt={"filterIcon"}/>

            <Offcanvas show={show} onHide={handleClose} scroll={true} style={{backgroundColor: BG_COLOR}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            setGenreIds([])
                            onSubmit(e.target[0].value, true) // search with filters
                            handleClose();
                        }}>

                            <Row>
                                <Form.Label className={"col-4"}>Search Query</Form.Label>
                                <Form.Control className={"col mb-3"} type={"text"}
                                              placeholder= {"Search Query"}
                                              value={currentSearch}
                                              onChange={(e) => setCurrentSearch(e.target.value)}
                                              disabled={searchFilters.discover}/>
                            </Row> {/*search query*/}

                            <Row>
                                <Form.Label className={"col-4"}>Media Type</Form.Label>
                                <Form.Select className={"col mb-3"} onChange={setMediaType} id={"media_type"}>
                                    {!searchFilters.discover &&
                                        <option defaultChecked={searchFilters.media_type === "multi"}
                                                value={mediaTypes.ALL}>All</option>
                                    }
                                    <option defaultChecked={searchFilters.media_type === "movie"}
                                            value={mediaTypes.MOVIE}>Movies
                                    </option>
                                    <option defaultChecked={searchFilters.media_type === "tv"}
                                            value={mediaTypes.TV}>TV Shows
                                    </option>
                                </Form.Select>
                            </Row> {/*media type*/}

                            <Row>
                                <Form.Label className={"col-4"}>Release Year</Form.Label>
                                <Form.Control className={"col mb-3"}
                                              type="text"
                                              placeholder="Release Year"
                                              value={searchFilters.release_year}
                                              onChange={setReleaseYear}/>
                            </Row> {/*release year*/}

                            <Row>
                                <Form.Label className={"col-4"}>Genres</Form.Label>
                                <div className={"row mb-3"}>
                                    {Array.isArray(genresOptions) && genresOptions.map((genre) => {
                                        return (
                                            <Form.Check
                                                key={genre.id}
                                                type={"switch"}
                                                label={genre.name}
                                                value={genre.name}
                                                checked={genreIds.includes(genre.id)}
                                                onChange={changeGenres}
                                                className={"col-6 mb-2"}
                                            />
                                        )
                                    })}
                                </div>
                            </Row> {/*genres*/}

                            <Row>
                                <Button variant={"outline-secondary"} type={"submit"}>Search</Button>
                            </Row> {/*search button*/}
                        </Form>
                    </Container>
                </Offcanvas.Body>

            </Offcanvas>
        </>
    )
}
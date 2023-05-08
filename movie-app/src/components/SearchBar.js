import {Button, Form, InputGroup} from "react-bootstrap";

export default function SearchBar({setMovies}) {

    const TMDB_API_KEY = 'b7ef44e0770027ed8afb1e9de0dc646b'; // TODO: must be in .env file
    const search_url = "https://api.themoviedb.org/3/search/movie?api_key=<api_key>&query=<query>&include_adult=false";

    async function onSubmit(e) {
        e.preventDefault();
        const url = search_url
            .replace("<api_key>", TMDB_API_KEY)
            .replace("<query>", e.target.form[0].value);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
    }

    return (
        <Form className={"mt-2"}>
            <InputGroup className="m-2">
                <Form.Control
                    type="text"
                    name={"search"}
                    placeholder="Search for a movie"
                    aria-label="Search for a movie"
                    aria-describedby="movie-search"
                />
                <Button variant="outline-secondary" type="submit" onClick={onSubmit}>Submit</Button>
            </InputGroup>
        </Form>
    )
}

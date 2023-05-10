import {Button, Form, InputGroup} from "react-bootstrap";
import axios from "axios";

export default function SearchBar({setMedia}) {

    const TMDB_API_KEY = 'b7ef44e0770027ed8afb1e9de0dc646b'; // TODO: must be in .env file
    const search_url = "https://api.themoviedb.org/3/search/multi?api_key=<api_key>&query=<query>&include_adult=false";

    async function onSubmit(e) {
        e.preventDefault();
        const url = search_url
            .replace("<api_key>", TMDB_API_KEY)
            .replace("<query>", e.target[0].value);
        try {

            const response = await axios.get(url);
            const data = response.data;
            console.log(data);
            setMedia(data.results);
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <Form className={"mt-2"} onSubmit={onSubmit}>
                <InputGroup className="m-2">
                    <Form.Control
                        type="text"
                        name={"search"}
                        placeholder="Search for a item"
                        aria-label="Search for a item"
                        aria-describedby="item-search"
                    />
                    <Button variant="outline-secondary" type="submit">Submit</Button>
                </InputGroup>
            </Form>
    )
}

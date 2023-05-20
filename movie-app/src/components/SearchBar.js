import {Button, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import {TMDB_API_KEY, TMDB_BASE_URL} from "../constants";
import SearchHistory from "./SearchHistory";
import {useReducer, useState} from "react";
import SearchFilter from "./SearchFilter";
import SearchFiltersReducer from "../reducers/SearchFiltersReducer";


export default function SearchBar({setMedia}) {
    const initialSearchFilters = {
        media_type: "multi", discover: false, release_year: "", with_genres: []
    };
    const [searchHistory, setSearchHistory] = useState([]);
    const [currentSearch, setCurrentSearch] = useState("");
    const [searchFilters, dispatch] = useReducer(SearchFiltersReducer, initialSearchFilters, () => initialSearchFilters);
    const search_url = "<TMDB_BASE_URL>/<is_search>/<media_type>?api_key=<api_key>&query=<query>&include_adult=false";

    async function onSubmit(value) {
        setCurrentSearch(value);
        if (!searchHistory.includes(value)) { // if the search history does not include the current search
            setSearchHistory([...searchHistory, value]);
        }
        const url = createUrl();
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.results.length > 0) {
                const filteredData = filterResults(data.results);
                console.log(filteredData);
                setMedia(filteredData);
            } else {
                setMedia([]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function createUrl() {
        console.log(searchFilters);
        let url = search_url
            .replace("<TMDB_BASE_URL>", TMDB_BASE_URL)
            .replace("<api_key>", TMDB_API_KEY)
            .replace("<query>", currentSearch)
            .replace("<media_type>", searchFilters.media_type)
            .replace("<is_search>", searchFilters.discover ? "discover" : "search")

        if (searchFilters.discover) {
            if (searchFilters.release_year !== "") {
                url += "&primary_release_year=" + searchFilters.release_year;
            }

            if (searchFilters.with_genres && searchFilters.with_genres.length > 0) {
                url += "&with_genres=" + searchFilters.with_genres.join(",");
            }
        }


        return url;

    }

    function filterResults(results) {
        let filteredResults = results;
        // add media_type to each item in the results
        filteredResults = filteredResults.map((item) => {
            if (!item.media_type) item.media_type = searchFilters.media_type;
            return item;
        });
        return filteredResults;
    }


    return (<Form className={"mt-2"} onSubmit={(e) => {
        e.preventDefault();
        onSubmit(currentSearch);
    }}>
        <InputGroup className="m-2">
            <SearchFilter searchFilters={searchFilters}
                          dispatchFilters={dispatch}
                          setCurrentSearch={setCurrentSearch}
                          currentSearch={currentSearch}
                          onSubmit={onSubmit}
            />
            <Form.Control onInput={(e) => setCurrentSearch(e.target.value)}
                          type="text"
                          autoComplete={"off"}
                          name={"search"}
                          value={currentSearch}
                          placeholder="Search for a item"
                          aria-label="Search for a item"
                          aria-describedby="item-search"
            />
            <Button variant="outline-secondary" type="submit">Submit</Button>
        </InputGroup>
        <SearchHistory history={searchHistory} currentSearch={currentSearch} setCurrentSearch={setCurrentSearch}/>
    </Form>)
}

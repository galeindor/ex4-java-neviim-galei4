import {Dropdown} from "react-bootstrap";

export default function SearchFilter({searchFilters, dispatchFilters}) {

    const setSearchFilters = (filter) => {
        dispatchFilters({type: "MEDIA_TYPE", payload: filter});
    }

        return (
            <Dropdown >
                <Dropdown.Toggle variant={"outline-secondary"} size={"sm"}>
                   <img src={"./icons/filter.png"} height={"30"}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSearchFilters("multi")} active={searchFilters === "multi"}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchFilters("movie")} active={searchFilters === "movie"}>Movies</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchFilters("tv")} active={searchFilters === "tv"}>TV Shows</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
}
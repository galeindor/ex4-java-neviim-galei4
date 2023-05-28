import {Button, ListGroup} from "react-bootstrap";

export default function SearchHistory({history, setHistory, currentSearch, setCurrentSearch, dispatchFilters}) {

    const hover = (event) => {
        event.target.setAttribute("style", "background-color: #e9ecef")
    }
    const unhover = (event) => {
        event.target.setAttribute("style", "background-color: white")
    }
    const insertToSearchBar = (event, item) => {
        event.preventDefault();
        event.target.active = true;
        dispatchFilters({type: "MEDIA_TYPE", payload: item.media_type});
        setCurrentSearch(item.query);
    }
    const removeFromHistory = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target.parentElement.innerText);
        const text = event.target.parentElement.innerText;
        setHistory(history.filter(item => item.text !== text));
    }
    return (<ListGroup as="ul">
            {Array.isArray(history) && history.map((item, index) => {
                if (item.query.startsWith(currentSearch) && item !== currentSearch) {
                    return (<ListGroup.Item
                            as="li"
                            key={index}
                            className={"mx-2"}
                            onClick={(e) => insertToSearchBar(e, item)}
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                        >
                            {item.text}
                            <Button type={"button"} className={"btn-close float-end"} onClick={removeFromHistory}
                                    aria-label={"Close"}/>
                        </ListGroup.Item>)
                }
            })}
        </ListGroup>);
}
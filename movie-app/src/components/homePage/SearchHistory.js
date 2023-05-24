import {Button, ListGroup} from "react-bootstrap";

export default function SearchHistory({history, setHistory, currentSearch, setCurrentSearch}) {

    const hover = (event) => {
        event.target.setAttribute("style", "background-color: #e9ecef")
    }
    const unhover = (event) => {
        event.target.setAttribute("style", "background-color: white")
    }
    const insertToSearchBar = (event, text) => {
        event.preventDefault();
        event.target.active = true;
        console.log(text);
        setCurrentSearch(text);
    }

    const removeFromHistory = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target.parentElement.innerText);
        const text = event.target.parentElement.innerText;
        setHistory(history.filter(item => item !== text));
    }
    return (
        <ListGroup as="ul">
            {Array.isArray(history) && history.map((item, index) => {
                if (item.startsWith(currentSearch) && item !== currentSearch) {
                    return (
                        <ListGroup.Item
                            as="li"
                            key={index}
                            className={"mx-2"}
                            onClick={(e) => insertToSearchBar(e, item)}
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                        >
                            {item}
                            <Button type={"button"} className={"btn-close float-end"} onClick={removeFromHistory}
                                    aria-label={"Close"}/>
                        </ListGroup.Item>
                    )
                }
            })
            }
        </ListGroup>
    );
}
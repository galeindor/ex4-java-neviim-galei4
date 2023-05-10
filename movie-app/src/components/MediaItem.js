import {Button, Card} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function  MediaItem({item}) {
    const posterPath = `https://image.tmdb.org/t/p/original<poster_path>`;
    const [isHovered, setIsHovered] = useState(false);
    const [longOverview, setLongOverview] = useState(false);
    const [overview, setOverview] = useState(item.overview);
    const [show, setShow] = useState(false);

    function MouseOver() {
        setIsHovered(true);
    }

    function MouseOut() {
        setIsHovered(false);
    }

    const img_url = item.poster_path ?posterPath.replace("<poster_path>",item.poster_path) : './default.png';

    useEffect(() => {
        if (overview && overview.length > 100) {
            showLessOverview();
        }
    }, []);

    function showLessOverview() {
        const words = item.overview.split(" ");
        let newOverview = "";
        while (newOverview.length < 50) {
            newOverview += " " + words.shift();
        }
        newOverview += "...";
        setOverview(newOverview);
        if (!longOverview) setLongOverview(true);
        setShow(false);
    }

    function showAllOverview() {
        setOverview(item.overview);
        setShow(true);
    }

    return (
        <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} style={{backgroundColor: isHovered ?"#CCD1D1" : "#E5E8E8",borderWidth: 3 , fontFamily: "serif"}}>
            <h3>{item.name}</h3>
            <img src={img_url} alt={item.name} className="img-fluid m-1"/>
            <p className={"m-1"}>{overview}</p>
            {longOverview && <Button variant="outline-secondary" className={"m-1"} onClick={show ? showLessOverview : showAllOverview } >Read more</Button>}
        </Card>
    )
}
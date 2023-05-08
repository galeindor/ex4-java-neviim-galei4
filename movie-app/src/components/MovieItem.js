import {Button, Card} from "react-bootstrap";
import {useEffect, useState} from "react";
export default function MovieItem({movie}) {
    const [isHovered, setIsHovered] = useState(false);
    const [longOverview, setLongOverview] = useState(false);
    const [overview, setOverview] = useState(movie.overview);
    const [show, setShow] = useState(false);
    function MouseOver() {
        setIsHovered(true);
    }
    function MouseOut(){
        setIsHovered(false);
    }
    const img_url = movie.poster_path ?`https://image.tmdb.org/t/p/original${movie.poster_path}` : './default.jpg';

    useEffect(() => {
        if(overview.length > 100) {
            showLessOverview();
        }
    }, []);

    function showLessOverview() {
        console.log("show less");
        const words = movie.overview.split(" ");
        let newOverview = "";
        while (newOverview.length < 100) {
            newOverview += " " + words.shift();
        }
        newOverview += "...";
        setOverview(newOverview);
        if(!longOverview) setLongOverview(true);
        setShow(false);
    }

    function showAllOverview() {
        setOverview(movie.overview);
        setShow(true);
    }

    return (
        <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} style={{backgroundColor: isHovered ?"#CCD1D1" : "#E5E8E8",borderWidth: 3 , fontFamily: "serif"}}>
            <h2>{movie.title}</h2>
            <img src={img_url} alt={movie.title} className="img-fluid m-1"/>
            <p className={"m-1"}>{overview}</p>
            {longOverview && <Button variant="outline-secondary" className={"m-1"} onClick={show ? showLessOverview : showAllOverview } >Read more</Button>}
        </Card>
    )
}
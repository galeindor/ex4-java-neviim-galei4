import {Card} from "react-bootstrap";
import {useState} from "react";
export default function MovieItem({movie}) {
    const [isHovered, setIsHovered] = useState(false);
    function MouseOver() {
        setIsHovered(true);
    }
    function MouseOut(){
        setIsHovered(false);
    }
    const img_url = movie.poster_path ?`https://image.tmdb.org/t/p/original${movie.poster_path}` : './default.jpg';
    return (
        <Card onMouseEnter={MouseOver} onMouseLeave={MouseOut} style={{backgroundColor: isHovered ?"#CCD1D1" : "#E5E8E8",borderWidth: 3 , fontFamily: "serif"}}>
            <h2>{movie.title}</h2>
            <img src={img_url} alt={movie.title} className="img-fluid m-1"/>
            <p className={"m-1"}>{movie.overview}</p>
        </Card>
    )
}
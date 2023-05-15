import MediaItem from "./MediaItem";
import {Row} from "react-bootstrap";

export default function MediaList({media}) {
    return (
        <Row>
            {media && media.map(item => {
                    return (
                        <div key={item.id} className={"col-12 col-sm-5 col-md-3 col-lg-2 m-1"}>
                            <MediaItem item={item}/>
                        </div>
                    )
                }
            )}
        </Row>
    )
}
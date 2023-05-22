import MediaItem from "./MediaItem";
import {Row} from "react-bootstrap";

export default function MediaList({media}) {
    return (
        <Row>
            {Array.isArray(media) && media.map(item => {
                    return (
                        <div key={item.id} className={"col-12 col-sm-6 col-md-4 col-lg-3 p-3"}>
                            <MediaItem item={item}/>
                        </div>
                    )
                }
            )}
        </Row>
    )
}
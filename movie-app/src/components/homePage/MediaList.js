import MediaItem from "./MediaItem";
import {Row} from "react-bootstrap";

/**
 * Media list component that renders a list of media items
 * @param media - array of media items
 * @returns {JSX.Element} - Media list component
 * @constructor MediaList
 */
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
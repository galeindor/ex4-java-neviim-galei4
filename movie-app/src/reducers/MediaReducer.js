/**
 * Reducer for media state
 * @param media - array of media objects
 * @param action - action object with type and payload
 * @returns {*[]} - new state
 * payload possible types:
 * MOVIE - movie object
 * TV - tv object
 * MULTI - multi object (movie or tv)
 * PERSON - person object
 * RESET - reset media state to empty array
 */
export default function MediaReducer(media, action) {
    const {poster_path, name, title, overview, id, release_date, media_type} = action.payload;
    switch (action.type) {
        case 'RESET':
            return [];
        case 'MOVIE':
            return [...media, {name: title, poster_path, overview, id, release_date, media_type}];
        case 'TV':
            return [...media, {name, poster_path, overview, id, release_date, media_type}];
        case 'MULTI':
            return [...media, {name, poster_path, overview, id, release_date, media_type}];
        case 'PERSON':
            return media; // prevent adding person type items to media
        default:
            return media;
    }
}
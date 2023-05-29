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
            console.log("MediaReducer: default case " + action.type + " not found");
            return media;
    }
}
export default function MediaReducer(media, action) {
    const {poster_path, name, title, overview, id, release_date} = action.payload;
    switch (action.type) {
        case 'RESET':
            return [];
        case 'MOVIE':
            return [...media, {name: title, poster_path, overview, id, release_date}];
        case 'TV':
            return [...media, {name, poster_path, overview, id, release_date}];
        case 'PERSON':
            return media; // prevent adding person type items to media
        default:
            throw new Error();
    }
}
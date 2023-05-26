import {mediaTypes} from "../constants";

export default function SearchFiltersReducer(filters, action) {

    const discoverMediaType = filters.media_type !== mediaTypes.ALL ? filters.media_type : mediaTypes.MOVIE;
    switch (action.type) {
        case 'RESET':
            return {
                media_type: "multi",
                discover: false,
                release_year: "",
                with_genres: []
            }
        case 'MEDIA_TYPE':
            return {...filters, media_type: action.payload};
        case 'RELEASE_YEAR':
            return {
                ...filters,
                release_year: action.payload,
                discover: action.payload !== "",
                media_type: discoverMediaType
            };
        case 'WITH_GENRES':
            return {
                ...filters,
                with_genres: action.payload,
                discover: (action.payload.length > 0),
                media_type: discoverMediaType
            };
        default:
            throw new Error("Invalid action type");
    }
}
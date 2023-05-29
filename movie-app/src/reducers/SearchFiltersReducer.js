import {mediaTypes} from "../constants";

/**
 * Reducer for search filters state
 * @param filters - current state
 * @param action - action to be performed
 * possible actions types:
 * - RESET - reset all filters
 * - MEDIA_TYPE - set media type
 * - RELEASE_YEAR - set release year
 * - WITH_GENRES - set genres
 * @returns {(*&{discover: boolean, media_type: (string|*), with_genres})|{discover: boolean, media_type: (string|*), release_year: string, with_genres: *[]}|*|(*&{media_type})|(*&{discover: boolean, media_type: (string|*), release_year})}
 * @constructor - SearchFiltersReducer
 */
export default function SearchFiltersReducer(filters, action) {

    const discoverMediaType = filters.media_type !== mediaTypes.ALL ? filters.media_type : mediaTypes.MOVIE;
    switch (action.type) {
        case 'RESET':
            return {
                media_type: filters.media_type ? filters.media_type : mediaTypes.ALL,
                discover: false,
                release_year: "",
                with_genres: []
            }
        case 'MEDIA_TYPE':
            return {...filters, media_type: action.payload};
        case 'RELEASE_YEAR':
            return {
                ...filters, release_year: action.payload, discover: action.payload !== "", media_type: discoverMediaType
            };
        case 'WITH_GENRES':
            return {
                ...filters,
                with_genres: action.payload,
                discover: (action.payload.length > 0),
                media_type: discoverMediaType
            };
        default:
            return filters
    }
}
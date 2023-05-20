export default function SearchFiltersReducer(filters, action) {

    const discoverMediaType = filters.media_type !== "multi" ? filters.media_type : "movie";
    switch (action.type) {
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
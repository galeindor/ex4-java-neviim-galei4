export default function SearchFiltersReducer(filters, action) {

    switch (action.type) {
        case 'MEDIA_TYPE':
            return {...filters, media_type: action.payload};
        case 'RELEASE_YEAR':
            return {...filters, release_year: action.payload, discover: true};
        case 'WITH_GENRES':
            return {...filters, with_genres: action.payload, discover: true};
        case 'WITH_KEYWORDS':
            return {...filters, with_keywords: action.payload, discover: true};
        default:
            throw new Error("Invalid action type");
    }
}
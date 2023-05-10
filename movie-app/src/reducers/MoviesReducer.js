
export default function MoviesReducer(movies, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...movies, loading: true };
        case 'FETCH_DATA_SUCCESS':
            return { ...movies, loading: false, data: action.payload };
        case 'FETCH_DATA_ERROR':
            return { ...movies, loading: false, error: action.payload };
        default:
            throw new Error();
    }
}
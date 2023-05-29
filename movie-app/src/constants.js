/**
 * @fileoverview This file contains all the constants used in the application
 * some of them are supposed to be in .env file but due to issues with the .env file they are here
 */

export const TMDB_API_KEY = 'b7ef44e0770027ed8afb1e9de0dc646b'; // TODO: must be in .env file

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const REST_API_URL = 'http://localhost:3000/media/';

export const REST_API_CHECKOUT_URL = 'http://localhost:3000/purchases/';
export const ITEM_FIXED_PRICE = 3.99;

export const BG_COLOR = "#E0E0E0";
export const ITEM_ORIGINAL_PRICE = 5.99;

export const formErrors = {
    EMPTY: "Please fill out all fields",
    INVALID_EMAIL: "Please enter a valid email",
    INVALID_FIRST_NAME: "Please enter a valid first name (letters only)",
    INVALID_LAST_NAME: "Please enter a valid last name (letters only)",
}
export const mediaTypes = {
    MOVIE: "movie",
    TV: "tv",
    ALL: "multi",
}
export const cartConstants = {
    EMPTY_CART_SUCCESS: "Your cart is empty, Go Shop Movies! Please =)",
    EMPTY_CART_ERROR: "Error emptying cart , please try again later",
    ADD_SUCCESS: "Item added to cart",
    ADD_FAILURE: "Item already in cart",
    ADD_ERROR: "Problem saving item to cart, Please try again",
}

export const CURRENCY = '$';
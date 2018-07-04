export const BASE_URL = 'https://api.github.com';
export const GIST_LIST = (username, page = 1) => `${BASE_URL}/users/${username}/gists?per_page=10&page=${page}`;
export const SEARCH_USERS = term => `${BASE_URL}/search/users?per_page=9&q=${term}in:login`;

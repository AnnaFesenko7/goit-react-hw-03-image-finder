const API_KEY = '26884137-1496ffbfb9f3a2601523745ce';
const BASE_URL = 'https://pixabay.com';

export const fetchQuery = (nextSearchQuery, page) =>
  fetch(
    `${BASE_URL}/api/?q=${nextSearchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Nothing found on the topic ${nextSearchQuery}`)
    );
  });

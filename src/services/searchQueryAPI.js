export const fetchQuery = (nextSearchQuery, page) =>
  fetch(
    `https://pixabay.com/api/?q=${nextSearchQuery}&page=${page}&key=26884137-1496ffbfb9f3a2601523745ce&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Nothing found on the topic ${nextSearchQuery}`)
    );
  });

// const api = { fetchQuery };
// export default api;

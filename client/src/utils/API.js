// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save action data for a logged in user
// export const seeAction = (actionData, token) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(actionData),
//   });
// };



// make a google map api call
  //"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
export const searchGooglemaps = (query) => {
  return fetch(`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMaps?q=${query}`);
};
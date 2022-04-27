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

// save apiary data for a logged in user
export const addApiary = (apiaryData, token) => {
  return fetch('/api/users/apiary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(apiaryData),
  });
};

// save hive data for a logged in user and apiary
export const addHive = (hiveData, token) => {
  return fetch('/api/users/apiary/hive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(hiveData),
  });
};

// save apiary data for a logged in user
export const addBeeFeeder = (beeFeederData, token) => {
  return fetch('/api/users/apiary/beeFeeder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(beeFeederData),
  });
};


// remove saved apiary data for a logged in user
export const deleteApiary = (apiaryId, token) => {
  return fetch(`/api/users/apiary/${apiaryId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};



// make a google map api call
  //"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
export const searchGooglemaps = (query) => {
  return fetch(`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMaps?q=${query}`);
};

const baseUrl = 'http://127.0.0.1:3000';

const httpGet = async (url, token) => {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
};

const httpPost = async (url, token, data) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
};

export const getUserData = async () => {
  const url = `${baseUrl}/user`;
  return httpGet(url, '123');
};

export const postUserLogin = (data) => {
  const url = `${baseUrl}/user/login`;
  return httpPost(url, '123', data);
};

export const postAddUser = async (data) => {
  const url = `${baseUrl}/user`;
  return httpPost(url, '123', data);
};
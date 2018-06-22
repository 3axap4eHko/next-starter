const fetch = require('isomorphic-unfetch');

async function request(url, options = {}) {
  const { headers, ...requestOptions } = options;

  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      ...headers,
    },
    ...requestOptions,
  });
  if (response.status !== 200) {
    throw new Error(await response.text());
  }
  return response.json();
}

request.get = function (url) {
  return request(url);
};

request.post = function (url, body) {
  return request(url, { method: 'POST', body: JSON.stringify(body) });
};

module.exports = request;

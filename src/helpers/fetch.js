function _fetch(url, method, config) {
  return fetch(new Request(url), Object.assign({credentials: 'same-origin', method}, config || {}));
}

/**
 * Performs a GET request
 * @param {string}  url     The url to perform the request from.
 * @param {object}  config  An optional config object to override the fetch settings
 * @returns {Promise}       The result of the get request
 */
export function get(url, config) {
  return _fetch(url, 'GET', config);
}

/**
 * Performs a POST request
 * @param {string}  url     The url of the request
 * @param {object}  body    The body of the post request; if an object sends as json, otherwise sends directly.
 * @param {object}  config  An optional config object to override the fetch settings
 * @returns {Promise}       The result of the post request
 */
export function post(url, body = null, config = {}) {
  const bodyConfig = !body ? {} : typeof body === 'object' ?
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    } :
    {
      body
    };

  return _fetch(url, 'POST', Object.assign(bodyConfig, config || {}));
}
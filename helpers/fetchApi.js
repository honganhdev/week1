let fetch = require("node-fetch");

async function fetchApi(route) {
  const resp = await fetch("https://jsonplaceholder.typicode.com" + route);

  return resp.json();
}

module.exports = fetchApi;

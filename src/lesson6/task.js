import fetch from 'isomorphic-fetch';

// с помощью Fetch API и swapi.co API получить следующие данные

// Климат на любой планете по её имени
// {planetName} – String

const baseUrl = 'https://swapi.co/api';

const getClimate = function (planetName) {
  const url = `${baseUrl}/planets?search=${planetName}`;
  return fetch(url)
    .then(res => res.json())
    .then(response => response.results[0].climate)
    .catch(error => { throw new Error(`Error while fetching planet: ${error}`); });
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = function (name) {
  const url = `${baseUrl}/people?search=${name}`;
  return fetch(url)
    .then(res => res.json())
    .then(response => response.results[0])
    .catch(error => { throw new Error(`Error while fetching name: ${error}`); });
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = function (starshipName) {
  const url = `${baseUrl}/starships?search=${starshipName}`;
  return fetch(url)
    .then(res => res.json())
    .then(response => response.results[0].pilots)
    .then(pilots => Promise.all(pilots.map(pilot => fetch(pilot).then(r => r.json()).then(r => r.name))))
    .catch(error => { throw new Error(`Error while fetching pilots: ${error}`); });
};


export default {
  getClimate,
  getProfile,
  getPilots,
};

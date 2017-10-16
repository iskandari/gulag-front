import { dataToken } from '../config/tokens';
import stylesUrl from '../config/map';

const options = { headers: { Authorization: `Bearer ${dataToken}` } };

export const groupById = arr => (
  arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {})
);

export const getData = () => (
  Promise.all([
    fetch('https://gulagmap.ru/api/public/camps.json', options).then(res => res.json()),
    fetch('https://gulagmap.ru/api/public/uploads.json', options).then(r => r.json()),
    fetch('https://gulagmap.ru/api/public/activities.json', options).then(r => r.json()),
    fetch('https://gulagmap.ru/api/public/places.json', options).then(r => r.json()),
    fetch('https://gulagmap.ru/api/public/types.json', options).then(r => r.json()),
    fetch('https://gulagmap.ru/api/public/periods.json', options).then(r => r.json())
  ])
    .then(([prisons, photos, activities, places, types, periods]) => ({
      prisons: groupById(prisons),
      photos,
      activities,
      places: groupById(places),
      types: groupById(types),
      periods: groupById(periods)
    }))
);

export const getStyle = () => (
  fetch(stylesUrl.styles)
    .then(response => response.json())
    .then(json => json)
);

export const splitDigits = digit => String(digit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');

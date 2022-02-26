import { fromJS } from 'immutable';

export default () =>
  new Promise((resolve, reject) => {
    const checkStatus = res => (res.status !== 200 ? reject(res) : res.json());
    console.log(process.env.BASE_URL, process.env);
    return Promise.all([
      fetch(`${process.env.PUBLIC_URL}/camps`).then(checkStatus),
      fetch(`${process.env.PUBLIC_URL}/camp-activities`).then(checkStatus),
      fetch(`${process.env.PUBLIC_URL}/camp-regions`).then(checkStatus),
      fetch(`${process.env.PUBLIC_URL}/camp-types`).then(checkStatus),
      fetch(`${process.env.PUBLIC_URL}/periods`).then(checkStatus)
    ])
      .then(([camps, activities, regions, types, periods]) =>
        resolve(fromJS({ camps, activities, regions, types, periods })))
      .catch(err => reject(err));
  });

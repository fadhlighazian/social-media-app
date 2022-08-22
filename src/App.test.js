/* eslint-disable jest/no-conditional-expect */
import axios from 'axios';

it('Api Testing', async function () {
  await axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const data = response.data;
      expect(data[0].name).toEqual('Leanne');
    })
    .catch((error) => {
      console.log(error);
    });
});

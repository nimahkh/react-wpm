import * as axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

function generateText({sentences, lorem}) {
  const url = `https://baconipsum.com/api/?type=all-meat&sentences=${sentences}&start-with-lorem=${lorem}`

  return axios.get(url, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  })
}

export {
  cancel,
  generateText
}

import React from 'react';
import * as axios from 'axios';

export function generateText({sentences, lorem}){
  const url=`https://baconipsum.com/api/?type=all-meat&sentences=${sentences}&start-with-lorem=${lorem}`

  return axios.get(url)
}

import * as axios from 'axios';

const apiAddress = 'https://api.jsonbin.io'
const secretKey = "$2b$10$CTIE3CqB38LaQ4H/jJvb6O8J7g2HuXuwKT2LWp9ttTFl/0E85kmnO";
const collectionId = "5da2372f5fa9966eec31ceb3"
const isPrivate = false
const binName = "armenia_test"

export function postHistory(data) {
  let req = new XMLHttpRequest();
  req.open("POST",`${apiAddress}/b`, true);
  req.setRequestHeader("Content-type", "application/json");
  req.setRequestHeader("private", isPrivate);
  req.setRequestHeader("secret-key", secretKey);
  req.send(data);

  return req;

}

export function getHistory(id) {
  let req = new XMLHttpRequest();
  req.open("GET",`${apiAddress}/b/${id}`, true);
  req.setRequestHeader("Content-type", "application/json");
  req.setRequestHeader("secret-key", secretKey);
  req.send();

  return req;

}

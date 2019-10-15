import axios from 'axios';
import {generateText} from "./generateText"
let params = {
  sentences: 1,
  lorem: 0
};
const url = `https://baconipsum.com/api/?type=all-meat&sentences=${params.sentences}&start-with-lorem=${params.lorem}`
const responseText = ["Jowl turkey shoulder, pig tail corned beef kevin."]
const resp = {
  data: responseText
};

jest.mock('axios');

describe('generate Text mock', () => {
  it('should call generateText mock', () => {
    axios.get.mockResolvedValue(resp);
    return generateText(params).then(data => expect(data.data).toEqual(responseText));
  });
})

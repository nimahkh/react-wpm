import {postHistory, getHistory} from "./history"

let open,
  send,
  status,
  onload,
  setRequestHeader;

const data = {
  "sample": "Hello World"
}

let response = JSON.stringify([
  {
    "success": true,
    "data": {
      "Sample": "Hello World"
    },
    "id": "123456789"
  }
]);

export function createXHRmock() {
  open = jest.fn();
  setRequestHeader = jest.fn()
  status = 200;
  response = response;

  send = jest.fn().mockImplementation();

  const xhrMockClass = function() {
    return {open, send, status, setRequestHeader, response};
  };

  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}

const url = 'https://api.jsonbin.io/b'

describe('generate History mock', () => {

  it('should call postHistory mock', () => {
    createXHRmock();

    postHistory(data)

    expect(open).toBeCalledWith('POST', url, true);
    expect(send).toBeCalled()

  });

  it('should call getHistory mock', () => {
    createXHRmock();

    getHistory(1)

    expect(open).toBeCalledWith('GET', `${url}/1`, true);
    expect(send).toBeCalled()

  });
})

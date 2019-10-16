### React WPM Gaming test

#### Demo

You can check it online. Follow the link below:
http://wpm_nima.surge.sh/

##### Commands :
- running jest test
`npm run test`

- deploy on surge.sh
`npm run deploy`

#### tests
The tests are writing by Jest + Enzyme + React testing library. enzyme is rendering some stateless functions and jest will expect them. React testing library has Act() function to handle asyncs hooks.

#### The API
The API is by an online API provider named : https://baconipsum.com


#### Structure
The Components are Reusable and writing with Feature First structure.
All the requests are Promise to mock them in test.

#### State Management
The State Management is Context API.

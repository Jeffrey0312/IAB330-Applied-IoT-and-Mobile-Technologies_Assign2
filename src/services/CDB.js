import axios from 'axios';
import { encode } from 'js-base64';

//Using environmental variables embeded in React build
const cloudantDBURL = process.env.REACT_APP_CLOUDANT_URL
const username = process.env.REACT_APP_CLOUDANT_USERNAME
const password = process.env.REACT_APP_CLOUDANT_PASSWORD

//base64 encoded username password creates authkey
const authKeyEncode = encode(`${username}:${password}`)

export default axios.create({
    baseURL: `${cloudantDBURL}`,
    headers: {
        'Authorization': `Basic ${authKeyEncode}`,
    }
});
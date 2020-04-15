import * as axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.vk.com/method/'
})

let getQuery = async (method, params, token) => {
	const data = await instance.get(`${method}?${params}&access_token=${token}&v=5.103`);
	return data.data;
}

export default getQuery;
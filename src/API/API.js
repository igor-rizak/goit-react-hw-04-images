import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const requestApi = async (value, page = 1) => {
    const response = await axios.get('', {
        params: {
            q: value,
            page,
            key: '36675802-f1fae2e3ce3b586e4e267c1aa',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12
        }
    });

    return response.data;
}
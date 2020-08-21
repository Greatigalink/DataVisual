import api from './index'


const Test = () => api('get', 'http://101.37.83.157:3000/images/callimg/WeChat.png', '');

export default Test;
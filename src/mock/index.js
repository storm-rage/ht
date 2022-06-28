const Mock = require('mockjs')
Mock.setup({
  timeout:'200-600'
});
let configs = [];
const files = require.context('./',true,/\/(.*)Mock\.js$/)
files.keys().forEach((key) => {
  configs = configs.concat(files(key).default);
});
configs.forEach((item) => {
  for(let [path,target] of Object.entries(item)) {
    let protocol = path.split('|');
    Mock.mock(new RegExp('^'+protocol[1]),protocol[0],target);
  }
})
export default Mock

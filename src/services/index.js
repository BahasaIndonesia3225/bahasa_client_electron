import { extend } from "umi-request";

let lineUrl = "";
// 函数来创建 request 实例
const createRequest = () => {
  return extend({
    prefix: lineUrl,
    timeout: 10000,
    errorHandler: function (error) {
      window.location.href = "/#/login";
    },
  });
};

// 更新线路url
let request = createRequest();
const updateLineUrl = (url) => {
  lineUrl = url; // 更新线路
  request = createRequest(); // 重新创建请求实例
};

//请求拦截
request.interceptors.request.use((url, options) => {
  //设置登陆token
  const token = localStorage.getItem("token");
  const headers = { token };
  return {
    url,
    options: { ...options, headers }
  }
})

//响应拦截
request.interceptors.response.use(async (response, options) => {
  const { url, status } = response;
  if(status === 200) {
    let data = await response.clone().json();
    console.log(data)
  }else if(status === 401) {
    //未登录或登录失效
    props.dispatch({
      type: "user/changeToken",
      payload: ""
    })

    props.dispatch({
      type: "user/changeWaterMarkContent",
      payload: ""
    })

    props.dispatch({
      type: "user/changeCourseList",
      payload: []
    })
  }
  return response
})

export { request, updateLineUrl };


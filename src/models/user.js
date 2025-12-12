//随机水印
const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

export default {
  namespace: 'user',
  state: {
    token: "",
    waterMarkContent: generatesRandomNumber(),
    courseList: [],
    deviceNum: 0,
    deviceList: [],
  },
  reducers: {
    changeToken(state, { payload }) {
      localStorage.setItem("token", payload);
      return { ...state, token: payload };
    },
    clearToken(state) {
      localStorage.removeItem("token");
      return { ...state, token: "" };
    },
    changeWaterMarkContent(state, { payload }) {
      return { ...state, waterMarkContent: payload };
    },
    changeCourseList(state, { payload }) {
      return { ...state, courseList: payload };
    },
    changeDeviceNum(state, { payload }) {
      return { ...state, deviceNum: payload };
    },
    changeDeviceList(state, { payload }) {
      return { ...state, deviceList: payload };
    }
  },
  effects: {

  }
};

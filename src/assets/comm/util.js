// import api from './api.js'
let util = {
  // 手机号测试
  regPhone:function (data) {
    let reg = /1\d{10}/;
    return reg.test(data);
  },
  // base64转换
  toBase64:function(files){
    // debugger
    // let reader = new FileReader();
    // let imgFile;
    // // let that = this
    // reader.readAsDataURL(files)
    // reader.onload = e => {
    //   imgFile = e.target.result;
    //   let arr = imgFile.split(',')
    //   var faceBase64 = arr[1]
    //   // console.log(imgFile)
    //   console.log(faceBase64)
    //   return faceBase64;
    // }
  }

};

export default { util }

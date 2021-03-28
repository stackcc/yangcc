# aboutyou

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

###  elementUi
```
npm install element-ui -S
```
###  axios
```
npm install axios
npm install vue-axios
```
###  qrcode
```
npm install qrcode
```
###  cookie
```
npm install --save vue-cookies 
```
### 动态title
```
npm install --save vue-wechat-title

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

<router-view v-wechat-title='$route.meta.title' />
```

###  端口异常
```
npm install portfinder@1.0.21
```
###  markdown / 解析 / 高亮
```
npm install mavon-editor --save
npm install marked 
npm install --save vue-highlightjs
npm install --save highlight.js
```
###  less
```
npm i less@2.7.3 less-loader --save
```

### [sass](https://cli.vuejs.org/config/).
```
npm install -D sass-loader node-sass
```

### excel
```
// 解析excel
npm insall -S xlsx
// 导出excel
npm install -S file-saver
```

###  threejs
```
npm install three --save
npm install imports-loader and exports-loader --save-dev
npm install import-three-examples --save-dev

vue-config.js
const ThreeExamples = require('import-three-examples')
pluginOptions: { ...ThreeExamples}

view
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
  
```

### webpack
```
npm install webpack webpack-cli -g
```


###  particles
[^_^]: # (粒子特效)
```
原版
npm install vue-particles --save-dev   
修改版 -- 实时响应
npm install https://github.com/stackGithub/vue-particle-edit.git --save-dev
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 内容
```
/flower
花语 - 3D
```

```
/mapg
地图
```

```
/stack
历程 - 使用markdown
```
[^_^]: # (stack:页面只有一个输入框 + 提示，列出快捷路径)
[^_^]: # (添加建议提交)

```
/start
导航 - 输入路径进入页面
```

```
/css
```
[^_^]: # (css 3D 特效)
```

/wallpaper
```
[^_^]: # (壁纸)







[^_^]: # (修改复制事件)
[^_^]: # (请求时间做统一返回的状态处理)








<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
  import * as THREE from "three";
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
  export default {
    name:'three-1',
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        controls:null,

        w_width:window.innerWidth,
        w_height:window.innerHeight,
      };
    },
    mounted() {
      this.load();
    },
    methods: {
      // 初始化
      load(){
        let that = this;
        //创建场景
        this.scene = new THREE.Scene();

        //创造网格模型
        var geometry = new THREE.BoxGeometry(100,100,100);  //创造一个正方体几何体
        //创造几何体材料
        var material = new THREE.MeshBasicMaterial({
          color:0x00ff00
        });
        var cube = new THREE.Mesh(geometry,material);  //几何体和材料结合
        cube.rotation.x = 0.3;
        // cube.rotation.y = 0.3;
        this.scene.add(cube);  //把 网格 放到场景中


        //创造一个相机
        //第一参数是  视角  视锥体垂直视野角度，从视图的底部到顶部，默认50
        //第二参数是  纵横比  宽度/高度
        var aspect = this.w_width/this.w_height;
        //第三参数是  近面的距离
        //第四参数是  远面的距离 ，默认 2000
        var camera = new THREE.PerspectiveCamera(65,aspect,100,10000);
        camera.position.z = 500; // 给相机设置位置


        //创造一个渲染器
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.w_width,this.w_height);  //设置渲染区域大小
        // document.body.appendChild(renderer.domElement);  //把纯碱好的canvas添加到页面
        document.getElementById("container").appendChild(renderer.domElement);  //把创建好的canvas添加到页面
        renderer.render(this.scene,camera);  //渲染

        // 动画
        function animate(){
          requestAnimationFrame(animate);  //自动执行下帧
          cube.rotation.x += .01;
          cube.rotation.y += .01;
          renderer.render(that.scene,camera);

        }

        animate();


      },
    }
  };
</script>

<style scoped>
  #container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

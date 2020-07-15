<template>
  <div>
    <div id="content"></div>
  </div>
</template>
<script>
  import * as THREE from "three";
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
  export default {
    name:'three-1',
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,

        width:window.innerWidth,
        height:window.innerHeight,

        countX:100,  //横向点数
        countY:100,  //纵向点数
        space:120,  //间隔距离


      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        let that = this;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(65,this.width/this.height,100,10000);
        this.camera.position.z =1000;

        var nums = this.countX * this.countY;  //总点数
        var positions = new Float32Array(nums*3);  //记录每个点的位置，每个点三个位置，xyz
        var scales = new Float32Array(nums);  //记录每个点的缩放
        var i=0,j=0;
        for (let x = 0; x < this.countX; x++) {
          for (let y = 0; y < this.countY; y++) {
              positions[i] = x*this.space - (this.countX*this.space)/2;
              positions[i+1] = 0
              positions[i+2] = y*this.space - (this.countY*this.space)/2;
              //每个点三个坐标 xyz，所以positions中的个数为点个数的三倍，数组中每三个值为一个点的坐标
              scales[j] = 30;
              i+= 3;
              j++;
          }
        }
        console.log(positions)
        console.log(scales)

        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
        geometry.addAttribute('scale',new THREE.BufferAttribute(scales,1));

        var material = new THREE.ShaderMaterial({
          uniform:{
            color: { value : new THREE.Color(0x097bdb),type:'c' }
          },
          vertexShader:'',
          fragmentShader:'',
        });

        var points = new THREE.Points(geometry.material)
        this.scene.add(points)

        this.renderer = new THREE.WebGLRenderer({
          antialias:true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio);  //设置设备像素
        this.renderer.setSize(this.width,this.height);
        this.renderer.setClearColor(0x2a366f);
        document.getElementById('content').appendChild(this.renderer.domElement);

        this.renderer.render(this.scene,this.camera)

        function render(){
          that.camera.position.x = 0.56
          that.camera.position.y = 500
          that.camera.lookAt(that.scene.position);  //坐在场景的位置看
          debugger
          var positions = points.geometry.attributes.position.array;
          var scales = points.geometry.attributes.scale.array;
          var i=0,j=0;
          for (let x = 0; x < that.countX; x++) {
            for (let y = 0; y < that.countY; y++) {
              positions[i+1] = Math.sin(x*0.3)*80 + Math.sin(y*0.3)*80;
              scales[j] = Math.sin(x*0.2+1)*20 + Math.sin(y*0.6+1) *30;
              i+=3;
              j++;
            }
          }
          points.geometry.attributes.position.needsUpdate = true;
          points.geometry.attributes.scale.needsUpdate = true;
          that.renderer.render(that.scene,that.camera)
        }

        function  animate() {
          // requestAnimationFrame(animate);
          // render();
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

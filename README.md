#### 数图（可视化配置平台说明）

##### 关键功能实现说明：

1. 可视化图表渲染依赖于自定义组件库[dengta-components](https://www.npmjs.com/package/dengta-components)。
2. 首页拖动使用了[vue-grid-layout](https://github.com/jbaysolutions/vue-grid-layout)
3. 可视化组件图片生成使用html2canvas
4. 可视化组件视频生成使用的是canvas转视频和recordRTC
5. 可视化组件gif生成使用的是gif.js和gif.worker.js



##### 关于使用visual-component-configuration的坑：

- 自定义组件标签绑定有两种方式：

​		第一种是脱离文档，将自定义的组件绑定到shadow root中，与文档隔离，互相不受影响

​		第二种是不脱离文当，将自定义的组件绑定到文档流中

 		<!--第一种方式的优点在于互相隔离，但是因为是脱离了文档，因此无法被html2canvas选中渲染，由于需要将可视化组件转化为图片、视频、gif，因此选择的是第一种方式。-->

- 自定义组件事件

  ​	监听事件：

  ​		通过window上绑定的事件监听方法监听，例如addEventListener

  ​	发送事件：

  ​		除了dom事件外，还可以自定义事件，通过new CustomEvent的方式创建自定义事件，通过dispatchEvent触发自定义事件。

- 创建dom组件

  ​	目前是通过js的方式创建，希望可以找到一种像html或者template一样直接写dom的方式


##### 关于element

​	为降低打包后的体积，通过按需引入的方式加载相关组件




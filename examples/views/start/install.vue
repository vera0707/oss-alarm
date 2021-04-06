<template>
  <div>
    <h2>全局安装</h2>
    <p class="tip">
      推荐使用 npm 的方式安装，它能更好地和
      <a class="link" href="https://webpack.js.org/">webpack</a>
      打包工具配合使用。<br />
    </p>
    <pre v-highlightjs>
      <code class="javascript">
        npm install oss-alam
      </code>
    </pre>
    <pre v-highlightjs>
      <code class="javascript">
        import Vue from 'vue'

        import OssAlarm from 'oss-alarm'

        Vue.use(OssAlarm)
      </code>
    </pre>
  </div>
</template>
<script>
export default {};
</script>

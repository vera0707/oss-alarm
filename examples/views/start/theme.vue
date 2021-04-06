<template>
    <div>
        <h2>全局主题</h2>
        <div>OssAlarm 主要使用 Element-UI 组件库默认主题，可设置主题风格。使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 OssAlarm 的样式变量。覆写以下内容：</div>
        <pre v-highlightjs>
      <code class="javascript">
        /* 改变主题色变量 */
        $--color-primary: teal;

        /* 改变 icon 字体路径变量，必需 */
        $--font-path: '~element-ui/lib/theme-chalk/fonts';
      </code>
    </pre>
    </div>
</template>
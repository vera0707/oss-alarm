const requireComponent = require.context('../packages', true, /\.js/)
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const components = {};

requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const key = upperFirst(camelCase(filePath.split('/')[1]))
  components[key] = componentConfig.default || componentConfig
});

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    const component = components[key]
    Vue.component(component.name, component)
    console.log('========',component.name);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default{
  install,
  ...components
}
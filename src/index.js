import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context('../packages', true, /\.js/);
const components = {};

requireComponent.keys().forEach((filePath) => {
  const componentConfig = requireComponent(filePath);
  const key = upperFirst(camelCase(filePath.split('/')[1]));
  components[key] = componentConfig.default || componentConfig;
});


const install = (Vue) => {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    const component = components[key];
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};

import OssAlarmWindow from './alarm-window';

export { OssAlarmWindow };

const components = [
  OssAlarmWindow,
];

export function install(app) {
  components.forEach((component) => component.install(app));
}

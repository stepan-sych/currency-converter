import Route from '@ember/routing/route';
export default class ConverterRoute extends Route {
  model() {
    return ['Result USD', 'Result EUR', 'Result BTC'];
  }
}

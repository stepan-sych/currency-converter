import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Convert extends Component {
  @tracked result = "";
  @tracked value = "";

  @action
  convert(eventClick) {
    eventClick.preventDefault();
    console.log(eventClick);
    this.result = this.value;
  }

  @action
  inputValue(eventInput) {
    console.log(eventInput.data);
    this.value += eventInput.data.toString();
  }
}

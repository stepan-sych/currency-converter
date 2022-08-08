import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ConverterComponent extends Component {
  @tracked result = "";
  @tracked value = "";

  @action
  convert(eventClick) {
    eventClick.preventDefault();
    console.log(eventClick);
    this.result = this.value * 2;
  }

  @action
  inputValue(eventInput) {
    console.log(eventInput.data);
    this.value += eventInput.data.toString().replace(/[^\d.]/g, "");
  }

  @action
  selectCurrency(eventSelect) {
    console.log(eventSelect.target.value);
    this.selectValue = eventSelect.target.value;
  }

}

import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ConverterComponent extends Component {
  @tracked result = "";
  @tracked currentInputValue = "";
  @tracked selectValue;
  @tracked responseValue;

  constructor() {
    super(...arguments);

    fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.responseValue = data;
        console.log(this.responseValue[1].buy);
      });
  }

  @action
  convert(eventClick) {
    eventClick.preventDefault();
    console.log(eventClick);
    for (const responseValueElement of this.responseValue) {
      if (responseValueElement.ccy === this.selectValue) {
        return this.result = this.currentInputValue * responseValueElement.sale + ` ${responseValueElement.base_ccy}`;
      }
    }

  }

  @action
  inputValue(eventInput) {
    console.log(eventInput.data);
    this.currentInputValue += eventInput.data.toString().replace(/[^\d.]/g, "");
  }

  @action
  selectCurrency(eventSelect) {
    console.log(eventSelect.target.value);
    this.selectValue = eventSelect.target.value;
  }

}

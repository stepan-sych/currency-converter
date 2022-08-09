import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ConverterComponent extends Component {
  @tracked result = "";
  @tracked currentInputValue = "";
  @tracked selectValue = "";
  @tracked responseValue = [];
  @tracked historyList = [];

  constructor() {
    super(...arguments);

    fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.responseValue = data;
      });
  }

  @action
  convert(eventClick) {
    eventClick.preventDefault();
    console.log(eventClick);
    for (const responseValueElement of this.responseValue) {
      if (responseValueElement.ccy === this.selectValue) {
        this.result = ` ${this.currentInputValue} ${this.selectValue} =
         ${Number(this.currentInputValue * responseValueElement.sale).toFixed(2)} ${responseValueElement.base_ccy} `;
        this.historyList.unshift(this.result);
        this.historyList = this.historyList;
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

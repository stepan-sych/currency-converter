import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ConverterComponent extends Component {
  @tracked result = "";
  @tracked currentInputValue = "";
  @tracked selectValue = this.responseValue[0].ccy;
  @tracked responseValue = [];
  @tracked historyList = [];
  @tracked finallyHistoryList = [];

  constructor() {
    super(...arguments);

    fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.responseValue = data;
      })
      .catch((error) => {
        console.error("Error gating currency!", error.message);
      });
  };

  @action
  convert(eventClick) {
    eventClick.preventDefault();
    this.responseValue
      .filter((responseValueElement) => responseValueElement.ccy === this.selectValue)
      .map((responseValueElement) => {
        this.result = `${this.currentInputValue} ${responseValueElement.ccy} =
         ${Number(this.currentInputValue * responseValueElement.sale).toFixed(2)} ${responseValueElement.base_ccy}`;
        this.historyList.unshift(this.result);
        this.finallyHistoryList = this.historyList;
      });
  }

  @action
  inputValue(eventInput) {
    this.currentInputValue += eventInput.data.toString().replace(/[^\d.]/g, "");
  }

  @action
  selectCurrency(eventSelect) {
    this.selectValue = eventSelect.target.value;
  }
}

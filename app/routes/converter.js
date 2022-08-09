import Route from "@ember/routing/route";

export default class ConverterRoute extends Route {
  model() {
    return fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) =>  {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        return data
      });
  }
}

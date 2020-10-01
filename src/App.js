import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Counters from "./components/counters";

class App extends Component {
  state = {
    milkItem: { quantity: 0, Fat: 0, SNF: 0 },
    milkData: [],
  };

  handleOnchange = (e) => {
    const { milkItem } = this.state;
    this.setState({
      milkItem: { ...milkItem, [e.target.name]: e.target.value },
    });
    console.log(this.state, "state");
  };

  handleAddMilkItem = () => {
    const { milkData, milkItem } = this.state;

    if (milkItem.Fat && milkItem.SNF && milkItem.quantity) {
      milkData.push(milkItem);
      let emptyMilkItem = { quantity: 0, Fat: 0, SNF: 0 };

      this.setState({
        milkData,
        milkItem: emptyMilkItem,
      });
    } else alert("Fill all details");
  };

  getMilkTotal = () => {
    const { milkData } = this.state;

    return milkData.reduce((total, item) => {
      return Number(total) + Number(item.quantity);
    }, 0);
  };

  getTotalMilkFat = () => {
    const { milkData } = this.state;

    let totalMilkFat = milkData.reduce((total, item) => {
      return Number(total) + Number(item.quantity * item.Fat);
    }, 0);

    return totalMilkFat.toFixed(2);
  };

  getTotalMilkSNF = () => {
    const { milkData } = this.state;
    let totalMilkSNF = milkData.reduce((total, item) => {
      return Number(total) + Number(item.quantity * item.SNF);
    }, 0);
    return totalMilkSNF.toFixed(2);
  };

  getAvrageFat = () => {
    const totalFat = this.getTotalMilkFat();
    const totalMilk = this.getMilkTotal();
    let avrageFat = Number(totalFat) / Number(totalMilk);
    return avrageFat.toFixed(2);
  };

  getAvrageSNF = () => {
    const totalSNF = this.getTotalMilkSNF();
    const totalMilk = this.getMilkTotal();
    let avrageSNF = Number(totalSNF) / Number(totalMilk);
    return avrageSNF.toFixed(2);
  };

  handleDelete = (selectedIndex) => {
    const { milkData } = this.state;
    let newMilkData = milkData.filter((item, index) => index != selectedIndex);
    this.setState({ milkData: newMilkData });
  };

  render() {
    const { quantity, Fat, SNF } = this.state.milkItem;
    return (
      <React.Fragment>
        <main className="container">
          <section>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Milk</th>
                  <th>Fat</th>
                  <th>SNF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={quantity}
                      className="form-control"
                      onChange={this.handleOnchange.bind(this)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={Fat}
                      name="Fat"
                      onChange={this.handleOnchange.bind(this)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="SNF"
                      onChange={this.handleOnchange.bind(this)}
                      value={SNF}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="submit"
                      onClick={this.handleAddMilkItem.bind(this)}
                      className="btn btn-primary"
                    >
                      Add item
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </section>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Milk </th>
                <th scope="col">Fat</th>
                <th scope="col">SNF</th>
                <th scope="col">Milk * Fat</th>
                <th scope="col">Milk * SNF</th>
              </tr>
            </thead>
            <tbody>
              {this.state.milkData.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.quantity}</td>
                    <td>{item.Fat}</td>
                    <td>{item.SNF}</td>
                    <td>{(item.quantity * item.Fat).toFixed(2)}</td>
                    <td>{(item.quantity * item.SNF).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => this.handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              <th scope="row">Total</th>
              <td>{this.getMilkTotal()}</td>
              <td>-</td>
              <td>-</td>
              <td>{this.getTotalMilkFat()}</td>
              <td>{this.getTotalMilkSNF()}</td>
            </tbody>
          </table>
          Avarage Fat ={this.state.milkData.length > 0 && this.getAvrageFat()}
          <br />
          Avarage SNF ={this.state.milkData.length > 0 && this.getAvrageSNF()}
          <br />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

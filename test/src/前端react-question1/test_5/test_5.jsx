import React from "react";
import ReactDOM from "react-dom";

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleAddCount = this.handleAddCount.bind(this);
  }

  //   handleAddCount() {
  //     this.setState({ count: this.state.count + 1 });
  //     this.setState({ count: this.state.count + 1 });
  //     this.setState({ count: this.state.count + 1 });
  //   }

  /**
   * 每個 setState 中都依賴於 this.state.count 的當前值來進行加法操作。
   * 這會導致與原始的問題相同，因為每個 setState 都是異步操作，
   * 可以在 setState 的函數形式中使用先前的狀態值來進行更新，
   * 而不是直接使用當前的狀態值。這樣可以確保每次更新都是基於前一次更新後的最新值。*/
  handleAddCount() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleAddCount}>Add</button>
      </div>
    );
  }
}

ReactDOM.render(<Count />, document.getElementById("root"));

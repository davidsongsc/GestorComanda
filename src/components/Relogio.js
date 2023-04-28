import React, { Component } from 'react';

class Relogio extends Component {
  constructor(props) {
    super(props);
    this.state = { horario: new Date() };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.atualizarHorario(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  atualizarHorario() {
    this.setState({ horario: new Date() });
  }

  render() {
    return (
      <div>
        <h1>{this.state.horario.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

export default Relogio;

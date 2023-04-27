import React from 'react';
import { decodeHTML } from '../lib';

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {style: {}}
  }

  render() {
    return (
      <button
        onClick={()=> {
          this.props.handleGuess(this.props.answer);
          (this.props.answer == this.props.correct_answer)
          ? this.setState({style : {backgroundColor: "green", color: "white"}})
          : this.setState({style : {backgroundColor: "red", color: "white"}});
        }}
        className='btn btn-outline-primary'
        style={(this.props.guessed && (this.props.guess == this.props.answer)) ? this.state.style : {}}
      >
        {decodeHTML(this.props.answer)}
      </button>
    );
  }
}

export { AnswerButton };

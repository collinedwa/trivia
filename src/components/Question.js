import React from 'react';
import { AnswerButton } from './';
import { decodeHTML, randomizeArray } from '../lib';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      guessed: false,
      guess: ''
    };
  }

  mixAnswers() {
    this.setState({answers: randomizeArray([
      ...this.props.question.incorrect_answers,
      this.props.question.correct_answer,
    ]), guessed: false, guess: ''});
  }

  componentDidMount(){
    this.mixAnswers();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.question != this.props.question)
    this.mixAnswers();
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
  };

  render() {
    return (
      <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.state.answers.map((answer) => (
            <AnswerButton
              key={answer}
              answer={answer}
              correct_answer={this.props.question.correct_answer}
              handleGuess={this.handleGuess}
              guessed={this.state.guessed}
              guess={this.state.guess}
            />
          ))}
        </div>

        {/* Dynamically render correct/incorrect here! */}
        {this.state.guessed ? <>
        <div>
          {console.log(this.state.guess)}
          {(this.state.guess == this.props.question.correct_answer) 
          ? "Correct!" 
          : `Wrong! The correct answer is ${this.props.question.correct_answer}`}
        </div>
        </> 
          : null}
      </div>
    );
  }
}

export { Question };

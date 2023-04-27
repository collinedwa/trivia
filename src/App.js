import React, { Component } from 'react';
import { Question } from './components';
import { categories } from './lib';

class App extends Component {

  constructor() {
    super();
    this.state = {
      question : null,
      category: '',
      amount: 5
    };
  }

  async fetchResults () {
    const TRIVIA_API = `https://opentdb.com/api.php?amount=${this.state.amount}&category=${this.state.category}&difficulty=easy`;
    const res = await fetch(TRIVIA_API);
    const json = await res.json();
    this.setState({question: json.results});
    console.log(json.results)
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount != prevState.amount || this.state.category != prevState.category)
    this.fetchResults();
  }


  render() {
    return (
      <div className='container l:w-50 p-5'>
        <h1 className='display-1'>Trivia</h1>
        <h2 className='fw-lighter fs-5 mb-4'>
          (we couldn&lsquo;t think of a better name,{' '}
          <span className='fw-bolder'>sorry</span>)
        </h2>
        <div>
        Category: 
        <select onChange={(e)=>{
          this.setState({category: e.target.value});
        }}>
          {categories.map((category)=>
            <option value={category.id}>{category.value}</option>
          )}
        </select>
        </div>
        <div>
        Number of Questions: 
        <input type="number" id="quantity" name="quantity" min="1" max="5" onChange={(e)=>this.setState({amount: e.target.value})}/>
        </div>
        <hr />
        <div>
          {this.state.question && this.state.question.map((q) => <Question question={q}/>)}
        </div>
      </div>
    );
  }
}

export { App };

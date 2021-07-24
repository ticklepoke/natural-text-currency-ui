import { currencyParser } from '@ticklepoke/natural-text-currency';
import React, { FormEvent, useState } from 'react';
import './bootstrap.css'
import './App.css'

const DEFAULT_STATE = [
  ['1000 dollars', '1000'],
  ['10,000 singapore dollars', '10000'],
  ['123,456 cents', '1234.56']
]
function App() {
  const [input, setInput] = useState("")
  const [approvedList, setApprovedList] = useState<string[][]>(DEFAULT_STATE)
  const [isError, setIsError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === "") return
    try {
      const money = currencyParser.tryParse(input)
      setApprovedList([...approvedList, [input, money.value]])
      setInput("")
    } catch (e) {
      setIsError(true)
    }
  }
  return (
    <div className="container pt-3">
      <a className="github-fork-ribbon right-bottom" href="https://github.com/ticklepoke/natural-text-currency" target="_blank" rel="noreferrer" data-ribbon="View me on GitHub" title="View me on GitHub">Fork me on GitHub</a>
      <h3>Free-form currency input</h3>
      <span>Typing currency values can be easy and fun. Try different ways to type a currency value and let us do the formatting!</span>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className={`col-sm-10 form-group${isError ? " has-danger" : ""}`}>
          <input
            type="text"
            className={`form-control-plaintext${isError ? " is-invalid" : ""}`}
            value={input}
            placeholder="100 singapore dollars"
            onChange={(e) => {
              setInput(e.target.value);
              setIsError(false);
            }} />
          <div className="invalid-feedback">This format is not supported!</div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
      {approvedList.length > 0 && (
        <>
          <h5 className="mt-4">Supported values</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Input</th>
                <th scope="col">Formatted Value</th>
              </tr>
            </thead>
            <tbody>
              {approvedList.map(([input, formatted], idx) =>
                <tr className="table-light" key={idx} >
                  <td>{input}</td>
                  <td>${formatted}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )
      }
    </div>
  );
}

export default App;

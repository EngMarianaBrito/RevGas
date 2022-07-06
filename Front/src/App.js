import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('')
  const [banks, setBanks] = useState([])
  const [bankID, setBankID] = useState('')


  useEffect(() => {
    if(!!bankID) {
      fetch(
        process.env.REACT_APP_API_URL + `/bank/${bankID}`
      )
      .then((res) => res.json())
      .then((bank_data) => {
        if(!(bank_data.error != undefined)) {
          setBanks([bank_data])
          setMessage('')
        } else {
          setMessage('Não existe esse ID')
          setBanks([])
        }
      })
    } else {
      fetch(
        process.env.REACT_APP_API_URL + "/banks"
      )
      .then((res) => res.json())
      .then((banks_data) => {
        if(banks_data) {
          setBanks(banks_data)
        }
      })
    }
  }, [bankID])

  const handleBankIDInput = (event) => {
    const id = event.target.value
    setBankID(id)
  }


  return <>
    <h1>RevGas</h1>
    <h5>Lista de bancos disponíveis</h5>

    <input onChange={(event) => handleBankIDInput(event)} placeholder='Código de identificação' name='id' type='text' />

    {message && <div>
      {message}
    </div>}
    
    <table>
      <thead>
        <tr>
          <td >ID</td>
          <td>Nome</td>
        </tr>
      </thead>
      <tbody>
        {banks && banks.map((bank, i) => {
          return <tr key={`${i}-${bank.title}`}>
            <td>
              {bank.id}
            </td>

            <td>
              {bank.title}
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </>
}

export default App;

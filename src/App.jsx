
import './App.css'

function App() {
  const userPromise = fetch('http://localhost:3000/users').then(res => res.json ())

  
  return (
    <>
      <h1>users management</h1>
    </>
  )
}

export default App

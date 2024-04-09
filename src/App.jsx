import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ListMovie from './components/ListMovie'
import Rate from './components/Rate'

function App() {
  const [ratingValue, setRatingValue] = useState(1)

  return (
    <>
    <Header/>
    <div className="bg-black">
      <Rate setRatingValue= {setRatingValue}/>
      <ListMovie ratingValue={ratingValue} />
    </div>
    </>
  )

}

export default App

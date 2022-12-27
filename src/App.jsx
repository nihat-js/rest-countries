import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
function App() {
   const [inpSearch,setInpSearch] = useState('')

   const [mainData,setMainData] = useState([])
   const [filteredData,setFilteredData] = useState([])
   useEffect(()=>{
      axios.get('https://restcountries.com/v3.1/all')
      .then (res => {
         setMainData(res.data)
         setFilteredData(res.data)
      })
   },[])
   
   const handleInput = (e) => {
      setInpSearch(e.target.value)
   }

   useEffect(()=>{
      console.log(inpSearch)
      const fd = mainData.filter ( x => {
         return x.name.common.toLowerCase().substring(0,inpSearch.length)  == inpSearch.toLowerCase()
      }  )
      setFilteredData(fd)
   },[inpSearch])

  return (
    <div className='app'>
      <div className="container">
         <h2 className="heading">Where in the world</h2>
         <input className='input-search' onChange={ (e) => handleInput(e) }  type="text" value={inpSearch}  />
      </div>
      <div className="container">
            <div className="cards">
            {filteredData.map( (item,index) => <Card key={index} data = {item} > </Card> )}
         </div>
      </div>

    </div>
  )
}


function Card (props){
   return (
      <div className="card">
         <figure>
            <img src={props.data.flags.svg} alt="" />
         </figure>
         <h3 className="heading"> {props.data.name.common } </h3>
         <div className="population">
            <h3 className="heading"> Population</h3>
            <span className='text'> {props.data.population} </span>
         </div>
         <div className="region">
            <h3 className="heading"> Region</h3>
            <span className='text'> {props.data.region} </span>
         </div>
         <div className="capital">
            <h3 className="heading"> Capital</h3>
            <span className='text'> {props.data.capital} </span>
         </div>



      </div>
   )
}

export default App

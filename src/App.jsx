import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
function App() {
   const [mainData, setMainData] = useState([])
   const [filteredData, setFilteredData] = useState([])
   const [filter, setFilter] = useState({})
   useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
         .then(res => {
            setMainData(res.data)
            setFilteredData(res.data)
         })
   }, [])



   useEffect(() => {
      const fd = mainData.filter(x => {
         let foo1 = true;
         let foo2 = true ;
         if (filter.search) {
            foo1 = x.name.common.toLowerCase().substring(0, filter.search.length) == filter.search.toLowerCase()
         }
         if (filter.region && filter.region != 'all'){
            foo2 =  x.region.toLowerCase() == filter.region.toLowerCase()
         }

         return foo1 && foo2

      })

      setFilteredData(fd)
   }, [filter])

   return (
      <div className='app'>
         <div className="container">
            <h2 className="heading">Where in the world</h2>
            <div className="filter">
               <input className='input-search' onChange={(e) => setFilter({ ...filter, search: e.target.value })} type="text"  />
               <select name="" id="" onChange={(e) => setFilter({...filter,region : e.target.value})   }>
                  <option value="all"></option>
                  <option value='africa' > Africa</option>
                  <option value='americas' > Americas </option>
                  <option value="asia"> Asia  </option>
                  <option value="europe"> Europe </option>
                  <option value="oceania"> Ocenia </option>

               </select>
            </div>
         </div>
         <div className="container">
            <div className="cards">
               {filteredData.map((item, index) => <Card key={index} data={item} > </Card>)}
            </div>
         </div>

      </div>
   )
}


function Card(props) {
   return (
      <div className="card">
         <figure>
            <img src={props.data.flags.svg} alt="" />
         </figure>
         <h3 className="heading"> {props.data.name.common} </h3>
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

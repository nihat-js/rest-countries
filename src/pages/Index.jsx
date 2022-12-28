import { useEffect, useReducer, useState } from 'react'
import './Index.scss'
import axios from 'axios'

export default function Index() {
  useEffect(() => {
    async function fetcher() {
      let response = await axios.get('https://restcountries.com/v3.1/all')
      dispatch({ type: 'setMainData', data: response.data })
    }
    fetcher()
  }, [])

  function reducer(state, action) {
    switch (action.type) {
      case 'setMainData':
        return { ...state, mainData: action.data }
      case 'setFilter':
        return { ...state, filter: { ...state.filter, [action.key]: action.value } }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    mainData: [],
    filter: { region: 'all' },

  })

  useEffect(() => {
    console.log('rendered')
  }, [state.filter])

  return (
    <div className='app'>
      <div className="container">
        <h2 className="heading" > </h2>
        <div className="filter">
          <input className='input-search' onChange={(e) => dispatch({ type: 'setFilter', key: 'search', value: e.target.value })} type="text" />
          <select name="" id="" onChange={(e) => dispatch({ type: 'setFilter', key: 'region', value: e.target.value })}>
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
          {state.mainData.map((item, index) => {
            if (item.name.common.toLowerCase().includes(state.filter.search || '') && (state.filter.region == '' || state.filter.region == 'all' ? true : state.filter.region == item.region.toLowerCase())) {
              return <Card key={index} data={item} > </Card>
            }
          })}
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


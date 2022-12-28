import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

import './Country.scss'

export default function Country() {

  let params = useParams()
  let navigate = useNavigate()
  useEffect(() => {
    async function fetcher() {
      let data = await axios.get('https://restcountries.com/v3.1/all')
      data.data.forEach(x => {

        if (x.name.common.toLowerCase().includes(params.name)) {
          dispatch({ 'type': 'setMainData', data: x });
          dispatch({ type: 'setIsLoading', data: false })
          return ''
        }
        Object.keys(state.mainData).length == 0 ? navigate('/') : ''
      })
    }
    fetcher()
  }, [])

  function reducer(state, action) {
    switch (action.type) {
      case 'setMainData':
        return { ...state, mainData: action.data }
        break;
      case 'setIsLoading':
        return { ...state, isLoading: action.data }
    }
  }


  const [state, dispatch] = useReducer(reducer, {
    mainData: {},
    isLoading: true,
  })

  return (
    <div className='country-page'>
      <div className="container">
        {!state.isLoading && <Main data={state.mainData} />}
      </div>
    </div>
  )
}

function Main(props) {
  return (
    <div className='row'>
      <div className="left-column">
        <figure>
          <img src={props.data.flags.svg} alt="" />
        </figure>

      </div>
      <div className="right-column">
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

    </div>
  )
}
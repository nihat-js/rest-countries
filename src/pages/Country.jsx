import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

export default function Country() {

  let params = useParams()
  useEffect( ()=> {
    async function fetcher(){
      let data = await axios.get('https://restcountries.com/v3.1/all')
      data.data.forEach ( x => {
        
        if (x.name.common.toLowerCase().includes(params.name)  ) {
          console.log('aye',x)
          dispatch({ 'type': 'setMainData', data: data.data }) ;  
          return ''
        }
      })
    }
    fetcher()
  },[])

  function reducer(action) {
    switch (action.type) {
      case 'setMainData':
        return { ...state, mainData: action.data }
    }
  }


  const [state, dispatch] = useReducer(reducer, {
    mainData: {},
    'test' : 'test'

  })

  return (
    <div>
        {/* <h3 className="name"> Country  {state.mainData || ''} </h3> */}
    </div>
  )
}

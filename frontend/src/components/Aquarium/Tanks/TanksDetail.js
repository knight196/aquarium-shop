import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TanksInfo from './TanksInfo'
import Loaders from '../../Loaders'
import {singleProduct} from '../../GraphQLData/GetProducts'
import {useQuery} from '@apollo/client'

export default function TanksDetail() {
  
  
  const {slug} = useParams();

  const {data} = useQuery(singleProduct, {variables:{slug:slug}})

  const [details,setdetails] = useState([])

  const [loading,setloading] = useState(false)

  const fetchData = async () => {
    if(data){
      setdetails(data.product)
      setloading(true)
    }
  }

  useEffect(()=> {
    fetchData();
  },[data])
  
    return (
    <>
      {loading ?
      <div>
      <TanksInfo detail={details}/>
      </div> : <Loaders/>
    }
    </>
  )
}

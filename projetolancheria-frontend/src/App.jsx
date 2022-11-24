import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [frase, setFrase] = useState('');

  useEffect(()=>{
    const fetchPenis = async () =>{
      const {data} = await axios.get(
        "https://localhost:7159/test"
      )
      setFrase(data)
    }
    fetchPenis();
  },[])

  return (
    <div className="App">
      <h1>{frase}</h1>
    </div>
  );
}

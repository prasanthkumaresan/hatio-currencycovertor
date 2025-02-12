import React,{useRef, useState} from 'react';
import { SiConvertio } from "react-icons/si";
import { data } from './data';
import '../App.css'


function Convertor() {

  //STATE MANAGEMENT

  const [rate,setRate] = useState(null);
  const [rateApi,setRateApi] = useState("INITIAL");
  const [converted,setConverted] = useState(0);
  const [convApi,setConvApi] = useState("INITIAL");
  const from = useRef("");
  const to = useRef("");
  const amount = useRef(0);

  //EVENT HANDLERS

  const fetchRate = async () => {
    setRateApi("Fetching");//UI HANDLING WITH API
    //Error handling
    try{
    const response = await fetch(`http://localhost:8080/api/rates?base=${from.current.value}`);
    const data = await response.json();
    const filterData = data.conversion_rates[to.current.value];
    setRateApi("Success")//UI HANDLING WITH API
    setRate(filterData);
    }catch(err){
      setRateApi("Failed");//UI HANDLING WITH API
    }
}
const convertor = async () =>{
  setConvApi("Fetching"); //UI HANDLING WITH API
  const body = {
    from : from.current.value,
    to : to.current.value,
    amount: amount.current.value,
  };
  const options = {
    method: "POST",
    headers:{
      "Content-type": "application/json",
    },
    body: JSON.stringify(body)
  };

//ERROR HANDLING

  try{
  const response = await fetch('http://localhost:8080/api/convert',options);
  const data = await response.json();
  setConvApi("Success");//UI HANDLING WITH API
  setConverted(parseInt(data));
  }catch(err){
    setConvApi("Failed");
  }
}

  return (
    <div className='convertor-container'>
      <h2 className='convertor-header'>Currency Convertor</h2>
      <div className='select-maincontainer'>
        <div className='convertor-selection'>
            <label className='convertor-selection-from' htmlFor='base'>From</label>
            <select ref={from} className='select-container' name='base' id='base'>
                {data.map(each =><option key={each} value={each}>{each}</option>)}
            </select>
        </div>
        <div className='symbol-con'>
            <SiConvertio className='convert-symbol' />
        </div>
        <div className='convertor-selection'>
            <label className='convertor-selection-from' htmlFor='to'>To</label>
            <select ref={to} className='select-container' name='to' id='to'>
            {data.map(each =><option key={each} value={each}>{each}</option>)}
            </select>
        </div>
      </div>
      <button onClick={fetchRate} className='rate-btn'>{rateApi === "Failed"? "retry⟳":`Get Conversion Rate`}</button>

      {/* UI HANDLING ACCORDING TO API RESPONSE */}

      {rateApi === "Fetching" && <p className='api-status'>Getting conversion rate....</p>}
      {rateApi === "Success" && <input className='convertor-readinput' type='text' readOnly value={`💰 ${from.current.value} to ${to.current.value} conversion rate = ${rate}`} />}
      {rateApi === "Failed" && (
        <div className='err-container'>
          <p className='error'>Please try again</p>
        </div>)}

      {/* AMOUNT CONVERTOR */}

      <label className='convertor-label'>
            Amount :
      </label>
    <div className='convert-inputcont'>
        <input ref={amount} type='number' className='amount-input' required />
        <button onClick={convertor} className='convert-btn'>{convApi === "Failed"?"retry⟳":'Convert'}</button>
      </div>
      {convApi === "Fetching" && <p className='api-status'>Converting amount.....</p>}
      {convApi === "Success" && <p className='converted-amt-desc'>{`✔ Converted Amount = ${converted} ${to.current.value}`}</p>}
      {convApi === "Failed" && (
        <div>
          <p className='error'>Please try again</p>
        </div>)}
    </div>
  )
}

export default Convertor

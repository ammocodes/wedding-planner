// CouplesQuestionnaire.js

import React from 'react';
import './CouplesQuestionnaire.css';
import Female from './Female.png';
import Male from './Male.png';
import {useState} from 'react';
import {useEffect} from 'react';


const CouplesQuestionnaire = () => {
  const [endPoint,setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [finalPoint,setFinalPoint] = useState('');


  useEffect(() => {
    fetchMe()
  },[finalPoint])


  const fetchMe = (results) => {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6817ac6575mshbf20e33bdd895d5p18213ejsnf66db56b5f76',
      'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
    }
  };
  
  fetch(`https://local-business-data.p.rapidapi.com/search?query=Wedding%20Venues%20in%20${endPoint}limit=6&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=uk`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(object => {
      setContainer(object)
    })
    .catch(err => console.error(err));
  }
    const onChangeHandler = (e) => {
      setEndPoint(e.target.value)
    }

    const submitHandler = e => {
      e.preventDefault()
      setFinalPoint(endPoint)
    }

  return (
    <div className="questionnaire">
      <h1 className="questionnaire-title">Couples Questionnaire</h1>
      <form onSubmit={submitHandler} className="questionnaire-form">
        <div className="gender-select">
        <label>
            <input type="radio" name="gender" value="male" />
            <img src={Male} alt="Male icon" className="male-icon" />
          </label>
          <label>
            <input type="radio" name="gender" value="female" />
            <img src={Female} alt="Female icon" className="female-icon" />
          </label>        </div>
        <input type="text" className="questionnaire-input" placeholder="Couple's Name" />
        <input type="text" className="questionnaire-input" placeholder="Wedding Theme" />
        <input type="text" value={endPoint} onChange={onChangeHandler} className="questionnaire-input"/>
        <input type="date" className="questionnaire-input" placeholder="Wedding Date" />
        <button className="submit-button" type="submit">Submit</button>
      </form>

      {container?.map((item) => {
        return (
          <div>
            <img src={item.photos_sample.photo_url} alt="" />
            <p>{item.name}</p>
          </div>
        )
      })}
    </div>
  );
};

export default CouplesQuestionnaire;
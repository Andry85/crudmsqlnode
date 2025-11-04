'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Home() {

  const [movieName, setMovieName]= useState('');
  const [review, setReview]= useState('');
  const [movieReviewList, setMovieReviewList]= useState([]);
  const [newReview, setNewReview]= useState('');

  useEffect(()=> {
    axios.get('http://localhost:3001/api/get').then(function (response) {
      console.log(response.data);
      setMovieReviewList(response.data);
    });
  },[]);

  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert', {
        movieName: movieName, 
        movieReview: review
      })
      .then(function (response) {
         setMovieReviewList([...movieReviewList, {movieName: movieName, movieReview: review}]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReview = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    axios.put("http://localhost:3001/api/update", {movieName: movie, movieReview: newReview});
    setNewReview("");
  };


  return (
    <div className="app">
      <h1>CRUD APP</h1>
      <div className="form">
        <label>Movie name</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value);
        }} />
        <label>Review</label>
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value);
          }} />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val) => {
          return (<div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e)=>{
                setNewReview(e.target.value);
              }}/>
              <button onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>);
        })}
      </div>
    </div>
  );
}

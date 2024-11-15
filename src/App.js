import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './images/search.png';

function App() {
  const searchData = useRef(null)
  const [searchText, setSearchText] = useState('mountains')
  const [imageData, setImageData] = useState([])

  useEffect(() => {
    const params = { 
      method: "flickr.photos.search",
      api_key: "f28f51310436540bb9e6ded07a4bd99d",
      text: searchText,
      sort: "",
      per_page: 40,
      license: "4",
      format: "json",
      nojsoncallback: 1, 
    }
    //to get the photos form flickr we need -  form id secret server
    const parameters = new URLSearchParams(params) //flickr api use URLSearchParams - it will generate query Parameters 
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        const arr = res.data.photos.photo.map((imgData) => {
          return fetchFlickrImageUrl(imgData)
        })
      
        setImageData(arr)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      })
  }, [searchText])

  const fetchFlickrImageUrl = (photo, size) => {
    
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    
    if (size) {
      url += `_${size}`;
    }
  
    url += `.jpg`;
    return url;
  }

  return (
    <>
      <h1 className='header'>Pixel library</h1>

      {/*we r using useRef bcz we dont want reloading- we want data only when user click on the search button */}
      <div className="container">
        <input onChange={(e) => { searchData.current = e.target.value }} placeholder="search your snapshot" type="text" />
        <button onClickCapture={() => { setSearchText(searchData.current) }} className='search-button'>
          <img src={SearchBar} alt="search-icon" className='search-icon' />
        </button>
      </div>



      <section className='button'>
        <button onClick={() => { setSearchText('mountains') }}>Mountains</button>
        <button onClick={() => { setSearchText('Beaches') }}>Beaches</button>
        <button onClick={() => { setSearchText("Birds") }}>Birds</button>
        <button onClick={() => { setSearchText('Foods') }}>Foods</button>
      </section>

     
      <section className='image-container'>
        {imageData.map((imageurl, key) => {
          return (
            <article key={imageurl} >
              <img src={imageurl} className="images" alt='imgs' />
            </article>
          )
        })}
      </section>

    </>
  );
}

export default App;
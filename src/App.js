import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";

const CLIENT_ID = "324e5602e5dd4c5a8f75c594f274413c";
const CLIENT_SECRET = "630c21c1010f46889dbd5904df0a2b50";

function App() {

  const [searchInput, setSearchInput] = useState("");
  // GETTING TOKEN AFTER USEEFFECT AND THEN USING STATE TO SAVE IT
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  


  useEffect(() => {
  
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, 
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    // ACCESS TO TOKEN AS STRING USE.ACCESS_TOKEN
    .then(data => setAccessToken(data.access_token))
  },[])


  //SEARCH
  // ASYNC MAKE SOME FUNCTIONS WAIT ITS TURN
  async function search() {
    console.log("Search for " + searchInput);

// GET REQUEST TO GET ARTIST ID

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => { return data.artists.items[0].id }) // ARTIST ID


    console.log("artist id " + artistID);
    

    // WITH ARTIST ID GET ALBUMS 
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    // HANDLES RESPONSE OF WHAT FETCH RETURNS
    .then( response => response.json())
    .then (data => {
      console.log(data);

      setAlbums(data.items);
    });
    // DISPLAY ALBUMS
  }

  console.log(albums);

  return (
    <div className="App">
    
    
    <Container>
    <a href='/' style={{color: "black", textDecoration: "none"}}><h1>SPOTIFY API</h1></a>
      <InputGroup className='mb-3' size= 'lg'>
        <FormControl 
          placeholder='Search Artists'
          type= 'input'
          onKeyPress={event => {
            if (event.key === "Enter") {
              search();
            }
          }}
       onChange= {(event) => setSearchInput(event.target.value)}
        />
      <Button onClick = {() => search()}>Search</Button>
       
      </InputGroup>
    </Container>

    <Container>
    <Row className='mx-2 row row-cols-4'>
    {albums.map((album, i) => {
        return (
          <Card>
       <a href= {album.external_urls.spotify}> <Card.Img src = {album.images[0].url} alt= {album.name}/> </a>
        <Card.Body>
          <Card.Title>
            {album.name}
          </Card.Title>
        </Card.Body>
      </Card>
        )
    })}
   

  
    </Row>
   
    </Container>
    </div>
  );
}

export default App;
 
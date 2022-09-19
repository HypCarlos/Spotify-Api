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

    var artistParameters = {
      method: `GET`,
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
    .then(response => response.json())
    .then(data => console.log(data))
    // GET REQUEST TO GET ARTIST ID

    // WITH ARTIST ID GET ALBUMS 


    // DISPLAY ALBUMS
  }

  return (
    <div className="App">
    
    
    <Container>
    <h1>SPOTIFY API</h1>
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
      <Button onClick = {() => {console.log("clicked button")}}>Search</Button>
       
      </InputGroup>
    </Container>

    <Container>
    <Row className='mx-2 row row-cols-4'>
    <Card>
        <Card.Img src = '#'/>
        <Card.Body>
          <Card.Title>
            Album name
          </Card.Title>
        </Card.Body>
      </Card>

  
    </Row>
   
    </Container>
    </div>
  );
}

export default App;
 
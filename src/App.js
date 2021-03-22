import './App.css';
import {Table, Button, Container, Card } from 'reactstrap';
import React, { Component } from 'react';
import  {datas} from './dataJson';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      hits: null,
      hits2: null,
      goodNot: "",
      data:[]
    }
  }

check = () =>{
  const dataJson = datas;

  dataJson.map((name,i) => {
    var value1 = fetch(`https://login.windows.net/${name.FIELD1}/.well-known/openid-configuration/`)
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        hits: responseData.token_endpoint,
      });
    })
    Promise.all([value1]).then(values => 
      {
        if(this.state.hits != undefined){
            var hits = this.state.hits.replace('https://login.windows.net/','').replace('/oauth2/token','')
          }else{
            var hits = "undefined";
          }
        this.setState(prevState => ({
          data: [...prevState.data, [i, name.FIELD1, name.FIELD2, hits, "this.state.hits2", "this.state.goodNot"]]
        }))
      })
  })
}

check2 = () =>{
  const dataJson = datas;

  dataJson.map((name,i) => {
    var value1 = fetch(`https://login.windows.net/${name.FIELD2}/.well-known/openid-configuration/`)
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        hits2: responseData.token_endpoint,
      });
    })
    Promise.all([value1]).then(values => 
      {
        if(this.state.hits2 != undefined){
            var hits2 = this.state.hits2.replace('https://login.windows.net/','').replace('/oauth2/token','')
          }else{
            var hits2 = "undefined";
          }
        const elementsIndex = this.state.data.findIndex(element => (element[0] ==  i))
        let newArray = [...this.state.data]
        var validate = ''
        console.log(newArray[elementsIndex][3])
        if(newArray[elementsIndex][3] === hits2)
        {
          validate = "same"
        }else{
          validate = "not"
        }
        newArray[elementsIndex] = {...newArray[elementsIndex], 4: hits2, 5:validate}
        this.setState({
          data: newArray,
          });
      })
  })
}
 
  render() {
    const { data } = this.state;
    
    return (
      
      <div>
        <Container>
 
          { <Button onClick={this.check.bind(this)}>START</Button> }
          { <Button onClick={this.check2.bind(this)}>START2</Button> }
    
        <Table striped>
        <thead>
         <tr>
         <th>
           id
         </th>
           <th>
           Depart
         </th>
         <th>
           azure
         </th>
         <th>
           depart token
         </th>
         <th>
           azure token
         </th>
         <th>
           validate
         </th>
         </tr>
         </thead>
         <tbody>
            { data.map(hit =>
            <tr>
              <th>
                {hit[0]}
              </th>
              <th>
                {hit[1]}
              </th>
              <th>
                {hit[2]}
              </th>
              <th>
                {hit[3]}
              </th>
              <th>
                {hit[4]}
              </th>
              <th>
                {hit[5]}
              </th>
            </tr>
        ) }
        </tbody>
       </Table>
        </Container>
      </div>
    );
  }
}

export default App;


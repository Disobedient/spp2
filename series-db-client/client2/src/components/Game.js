import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
 
class Game extends Component {
    constructor(props){
        super(props);
        this.state = { values: [],
            title: "",
            titleadd: "",
            countValues: 2,
            valuesNames: [],
            isEdit:false};
                           

    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        axios.get('http://localhost:3000/Games')
          .then(response => {
            console.log("good");
            this.setState({ values: response.data.values ,
                title: response.data.title,
                //titleadd: response.data.titleadd,
                countValues: response.data.countValues,
                valuesNames: response.data.valuesNames,
                isEdit:response.data.isEdit,});
            
          })
          .catch(function (error) {
            console.log(error);
          })
          if (this.AuthHelper.loggedIn()) {
            const confirm = this.AuthHelper.getConfirm();
            if (confirm) {
                this.setState({
                    confirmed: true
                })
            }
        }
      }         

               
    render() {
        console.log("render");
        return(
            <div>
            <nav class="navbar navbar-light bg-light">
                <Link to="/Games/add" class="float-right"   title="add">Add {this.state.title}</Link>
            </nav>
            <table class="table table-hovered">
            <thead class="thead-dark">
                <tr>
                    {
                    this.state.valuesNames.map(function(name){
                       return  (<th scope="col">{name}</th>)
                        })
                    }
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>{
            this.state.values.map(function(value){
                return(
                    <tr>
                        {
                        value.map(function(value2){
                            return (<td>{value2}</td>)
                        })
                    }

                            <td>
                                 <Link to={"/Games/edit/" + value[0]}  class="btn btn-sm btn-success">Edit</Link>

                                <Link to={"delete/Games/" + value[0]} class="btn btn-sm btn-danger">Delete</Link>
                            </td>
                        
                    </tr>)
                }
                )
            }
                
            </tbody>
        </table>
        </div>
        )
    }
}
 
export default Game;
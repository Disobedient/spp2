import React, { Component } from 'react';
import axios from 'axios';
import AuthHelper from './auth/AuthHelper';
 
class EditComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            Name:"",
            Game: 0,
         }
         this.onChangeCommentName = this.onChangeCommentName.bind(this);
         this.onChangeCommentGame= this.onChangeCommentGame.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }
        
    AuthHelper = new AuthHelper();

    componentDidMount(){
        console.log("entry");
        let id = this.props.match.params.id;
        axios.get('http://localhost:3000/Comments/edit/'+id)
          .then(response => {
            console.log("good");
            this.setState({ message: response.data.message ,
                });
            
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

      onChangeCommentName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeCommentGame(e) {
        this.setState({
            Game: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.Name,
        };
        let id = this.props.match.params.id;
        axios.post('http://localhost:3000/Comments/edit/' + id, obj)
            .then((response) => {
                console.log(response.data)
                this.statusCode = response.status
            })
            .then(response => {
                console.log("good");
                this.setState({ message: response.data.message ,
                    });
                
              })
              .catch(function (error) {
                console.log(error);
              })
    }

               
    render() {
        console.log("render");
        return(
            <div>
            <nav class="navbar navbar-light bg-light">
                <a class="float-right" href="/add" title="add">Add {this.state.title}</a>
            </nav>

    <div class="container">
            <p class="text-center text-danger">{this.state.message}</p>
        <form class="add-game-form" action="" onSubmit={this.onSubmit} enctype="multipart/form-data">
            <div class="form-row">                       
                    <div class="form-group col-md-4">
                        <input type="text" class="form-control" name="name" id="name" placeholder="name" onChange={this.onChangeCommentName} required></input>
                    </div>

            </div>
            <button type="submit" class="btn btn-primary float-right">Add</button>
            
        </form>
    </div>
        </div>
        )
    }
}
 
export default EditComment;
import React, { Component } from 'react';
import Axios from 'axios'
// import { readmoreAction } from './../redux/actions'
import { CARTHISTORY } from './../redux/actions'
import { connect } from 'react-redux'
import { url } from './../support/ApiURL'
import Coverflow from 'react-coverflow';
import { Badge,Jumbotron,Container,Spinner,Button, Card,CardBody,CardHeader,CardTitle,CardText,CardFooter, Modal,ModalBody,ModalHeader  } from 'reactstrap';
import { Link,Redirect } from 'react-router-dom'

class Home extends Component {
    state = { 
        dataMovies:[],
        sinopsis: [],
        idterpilih:4,
        trailerModal:false,
        trailerURL: []
     }

     componentDidMount(){
        Axios.get(`${url}movies`)
        .then((res)=>{
            this.setState({
                dataMovies: res.data
            })
        }).catch((err)=>{
            console.log(err)
        })
     }

     renderFilm = () =>{
         return <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                    active={0}
                    >
                        {this.state.dataMovies.map((val,index)=>{
                            return(
                <div onClick={()=>this.setState({idterpilih:index})} key={index}>
                                        <img src={val.image} alt="movie's image" style={{ display: 'block', width: '100%' }} />
                                </div>)
                        })}
                </Coverflow>
     }

     deskripsiFilm = (id) =>{
         
         if (this.state.dataMovies.length === 0) {
             console.log('Ini loading!')
             return(
                 <div>
                        <Spinner type="grow" color="secondary" /> 
                        <Spinner type="grow" color="info" /> 
                        <Spinner type="grow" color="warning" /> 
                    </div>
                )
            }
        console.log(id)
        // this.setState({trailerURL: this.state.dataMovies[this.state.idterpilih].trailer})
        var trailerURL= (this.state.dataMovies[this.state.idterpilih].trailer)
        // this.setState({trailerURL:trailerURL})
        // console.log(this.state.dataMovies[this.state.idterpilih])

        var awal=true
        if(id>=0){
            awal=false
        }
        console.log(awal)
        console.log(id)

        if(awal){
            return(
                <div>
                    <div className="gambaar1">
                        {/* //link buat ke Movie Detail========================================================================< */}
                            <img src={this.state.dataMovies[4].image} alt="Movie's Image" />
                    </div>
                    <h3><Badge color="danger">{this.state.dataMovies[4].durasi}</Badge></h3>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.dataMovies[4].title}</h5>
                            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">{this.state.dataMovies[4].genre}</i></a>
                        <p className="card-text">
                                <a>{this.state.dataMovies[4].sutradara}</a>
                                <br></br>
                                <a>{this.state.dataMovies[4].produksi}</a>
                                <br></br><br></br>
                                <Button outline color="danger" onClick={()=>this.setState({trailerModal:true , trailerURL:trailerURL})}>Trailer</Button>
                        </p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="gambaar1">
                        <img src={this.state.dataMovies[id].image} alt="Movie's Image" />
                    </div>
                    <h3><Badge color="danger">{this.state.dataMovies[id].durasi}</Badge></h3>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.dataMovies[id].title}</h5>
                            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">{this.state.dataMovies[id].genre}</i></a>
                        <p className="card-text">
                                <a>{this.state.dataMovies[id].sutradara}</a>
                                <br></br>
                                <a>{this.state.dataMovies[id].produksi}</a>
                                <br></br><br></br>
                                <Button outline color="danger" onClick={()=>this.setState({trailerModal:true, trailerURL:trailerURL})}>Trailer</Button>
                        </p>
                    </div>
                </div>
            )
        }
        }
    
     sinopsis = () =>{
        if (this.state.dataMovies.length === 0) {
            console.log('Ini loading!')
            return(
                    <div>
                        <Spinner type="grow" color="secondary" /> 
                        <Spinner type="grow" color="info" /> 
                        <Spinner type="grow" color="warning" /> 
                    </div>
                )
        }

        return(
            <Card style={{width:'960px'}}>
                <CardHeader tag="h3">{this.state.dataMovies[this.state.idterpilih].title}</CardHeader>
                <CardBody>
                <CardTitle></CardTitle>
                <CardText>{this.state.dataMovies[this.state.idterpilih].sinopsis}</CardText>
                    <div>
                            <Link to={'/moviedetail/'+this.state.dataMovies[this.state.idterpilih].id}>
                                <Button outline color="warning">Click Here to Order Seat!</Button>
                            </Link>
                    </div>
                </CardBody>
                <CardFooter className="text-muted">Magnificent Cinema Studios</CardFooter>
            </Card>
        )

     }

    render() { 
        if (this.state.dataMovies.length === 0) {
            console.log('Ini loading!')
            return(
                    <div>
                        <Spinner type="grow" color="secondary" /> 
                        <Spinner type="grow" color="info" /> 
                        <Spinner type="grow" color="warning" /> 
                    </div>
                )
        }

        return (
            <div>
                <div>
                <Jumbotron fluid>
                    <Container fluid>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfqRCJSe_dGsRvmZKVHn3iuSWHPMTrFRiVD6B9wMbb7M2OMQBK5Q&s" alt="studios" width='30%'/>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeuYr4OqMZ4NNKuIxfzUYcGqC2lWTAdyVt2zKko_X7rOsR0Qu1cQ&s" alt="studios" width='30%'/>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHg7ckuJZ1rgk9Wfqvn54i-FqSM4-atia2ALvBgWXfl_PqwiiH&s" alt="studios" width='25%'/>
                    <p className="lead" style={{textAlign:'center'}}><h1>The Convenience Of <span style={{color:'#111d5e'}}>Watching Movies</span> in a <span style={{color:'#b21f66'}}>Click!</span></h1></p>
                    </Container>
                </Jumbotron>
                </div>
                <div className='d-flex row'>
                    <div style={{paddingLeft: '5%', paddingRight: '10%'}}>
                        <div>
                            {this.renderFilm()}
                        </div>

                        <Modal isOpen={this.state.trailerModal} toggle={()=>this.setState({trailerModal:false})}>
                            <ModalHeader style={{backgroundColor:'#b21f66'}}>{this.state.dataMovies[this.state.idterpilih].title}</ModalHeader>
                            <ModalBody className='trailer'>
                            <iframe width="100%" height="100%" src={this.state.trailerURL}
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            ></iframe>
                            </ModalBody>
                        </Modal>

                        <div>
                            {this.sinopsis(this.state.idterpilih)}
                        </div>
                    </div>
                    <div className="card" style={{width: '22%'}}>
                            {this.deskripsiFilm(this.state.idterpilih)}
                    </div>
                </div>
            </div>
            
         );
        
    }
}

 
export default Home;
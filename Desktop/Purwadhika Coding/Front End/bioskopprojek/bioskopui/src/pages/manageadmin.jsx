import React, { Component } from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios';
import { url } from '../support/ApiURL';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import Fade from 'react-reveal/Fade'
import NotFound from './page404'

class ManageAdmin extends Component {
    state = { 
        datafilm: [],
        datastudio: [],
        readmoreselected: -1,
        addModal: false,
        renderconfDelete: false,
        indexDelete: 0,
        editModal: false,
        indexEdit: 0,
        jadwal: [12,14,16,18,20,22],
        studio: [1,2,3],
        genre: [ 'Action', 'Animation', 'Comedy', 'Crime', 'Drama', 'Adventure', 'Fantasy', 'Historical', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Western']
     }

    componentDidMount(){
        Axios.get(`${url}movies`)
            .then((res)=>{
                Axios.get(`${url}studios`)
                .then((res1)=>{
                    this.setState({
                        datafilm: res.data,
                        datastudio: res1.data
                    })
                })
                // this.setState({
                //     datafilm:res.data
                // })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    updateFilm = () =>{
        var jadwal = []
        for(var i=0; i<this.state.jadwal.length; i++){
            if(this.refs[`editjadwal${i}`].checked){
                jadwal.push(this.state.jadwal[i])
            }
        }

        var genre = []
        for(var i=0; i<this.state.genre.length; i++){
            if(this.refs[`editgenre${i}`].checked){
                genre.push(this.state.genre[i])
            }
        }

        var title = this.refs.edittitle.value
        var image = this.refs.editimage.value
        var sinopsis = this.refs.editsinopsis.value
        var jadwal = jadwal
        var sutradara = this.refs.editsutradara.value
        var durasi = this.refs.editdurasi.value
        var studioId = this.refs.editstudioId.value
        var trailer = this.refs.edittrailer.value
        var genre = genre

        var datafilmedit = {
            title,
            image,
            sinopsis,
            jadwal,
            sutradara,
            durasi,
            studioId,
            trailer,
            genre
        }

        var index = this.state.indexEdit
        console.log('index='+index)
        console.log('data film edit='+datafilmedit.title)

        Axios.put(`${url}movies/${index+1}`,datafilmedit)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${url}movies`)
            this.setState({
            datafilm:res.data,
            editModal:false
            }).catch((err1)=>{
                console.log('err1: '+err1)
            })
        }).catch((err)=>{
            console.log('err: '+err)
        })
    }

    saveFilmBaru = () =>{
        var jadwal = []
        for(var i=0; i<this.state.jadwal.length; i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(this.state.jadwal[i])
            }
        }

        var genre = []
        for(var i=0; i<this.state.genre.length; i++){
            if(this.refs[`genre${i}`].checked){
                genre.push(this.state.genre[i])
            }
        }

        var id = (this.state.datafilm[this.state.datafilm.length-1].id)+1
        // console.log(id)

        var title = this.refs.title.value
        var image = this.refs.image.value
        var sinopsis = this.refs.sinopsis.value
        var jadwal = jadwal
        var sutradara = this.refs.sutradara.value
        var durasi = this.refs.durasi.value
        var studioId = this.refs.studioId.value
        var trailer = this.refs.trailer.value
        var genre = genre

        var datafilmbaru = {
            id,
            title,
            image,
            sinopsis,
            jadwal,
            sutradara,
            durasi,
            studioId,
            trailer,
            genre
        }

        Axios.post(`${url}movies`,datafilmbaru)
        .then(()=>{
            Axios.get(`${url}movies`)
            .then((res)=>{
                this.setState({
                    datafilm: res.data,
                    addModal: false
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderFilm =()=>{
        return this.state.datafilm.map((val,index)=>{
            return(
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt='gambar' height='200px'/></TableCell>
                    
                    {
                        this.state.readmoreselected===index?(
                            <TableCell width='250px' style={{textAlign:'justify'}}>
                                {val.sinopsis}
                                <span style={{color:'blue'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                    <br></br>..Read Less
                                </span>
                            </TableCell>
                        ):(
                            <TableCell width='250px' style={{textAlign:'justify'}}>
                                {val.sinopsis.split('').filter((val, index)=>index<=50)}
                                <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:index})}>
                                    <br></br>Read More..
                                </span>

                            </TableCell>
                        )
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell style={{width:'200px'}}>{val.genre}</TableCell>
                    <TableCell>{val.durasi}</TableCell>
                    <TableCell>
                        <Button className='mr-3' outline color="primary" onClick={()=>this.setState({editModal:true,indexEdit: (index)})}>Edit</Button>
                        <Button outline color="danger" onClick={()=>this.setState({renderconfDelete: true, indexDelete: (val.id)})}>Delete</Button>
                    </TableCell>
                </TableRow>
        )
        })
    }

    deleteMovie = () =>{
        var index = (this.state.indexDelete)
        console.log(index)

        {
            Axios.delete(`${url}movies/${index}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`${url}movies`)
                .then((res)=>{
                    this.setState({
                        datafilm:res.data,
                        renderconfDelete: false
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })

            }).catch((err)=>{
                console.log(err)
            }) 
        }

        // this.setState({indexDelete:0})
    }

    renderAddCheckbox = () =>{
        if(this.state.editModal===true){
            return this.state.jadwal.map((val,index)=>{
                return (
                    <div key={index}>
                        <input type="checkbox" ref={`editjadwal${index}`} />
                        <span className='mr-2'>{val}.00</span>
                    </div>
                )
            })
        }
        else if(this.state.addModal===true){
            return this.state.jadwal.map((val,index)=>{
                return (
                    <div key={index}>
                        <input type="checkbox" ref={`jadwal${index}`} />
                        <span className='mr-2'>{val}.00</span>
                    </div>
                )
            })
        }

    }

    renderStudioOption = () =>{
        return this.state.studio.map((val,index)=>{
            return(
            <option key={index} value={index+1}>Studio {index+1}</option>
            )
        })
    }

    renderGenreCheckbox = () =>{
        if(this.state.editModal===true){
            return this.state.genre.map((val,index)=>{
                return(
                    <div key={index}>
                    <input type="checkbox" ref={`editgenre${index}`} /><span className='mr-2'>{val}</span>
                    </div>
                )
            })
        }
        else if(this.state.addModal===true){
            return this.state.genre.map((val,index)=>{
                return(
                    <div key={index}>
                    <input type="checkbox" ref={`genre${index}`} /><span className='mr-2'>{val}</span>
                    </div>
                )
            })
        }
    }

    render() {
        // const {datafilm, indexEdit} = this.state
    if(this.props.Auth.login && this.state.namauser==='admin'){
        if(this.state.datafilm.length === 0){
            console.log('Ini loading!')
            return(
                <div>
                        <Spinner type="grow" color="secondary" /> 
                        <Spinner type="grow" color="info" /> 
                        <Spinner type="grow" color="warning" /> 
                    </div>
                )
            }
        else{
            console.log('index delete: '+this.state.indexDelete)
            console.log('index edit: '+this.state.indexEdit)
            console.log(this.state.datafilm[0].title)
            let indextampilDelete = this.state.indexDelete-1
            // console.log(this.state.datafilm[this.state.indexDelete])
        return(
            <div>
{/* =========================================Modal Edit Start=================================================================== */}
            {/* {
                this.state.indexEdit===undefined?(
                    <Modal isOpen={this.state.editModal} toggle={()=>this.setState({editModal:false})}>
                            <ModalHeader style={{backgroundColor:'#b21f66'}}>Edit Movie</ModalHeader>
                            <ModalBody>
                                Index Edit =undifined
                            </ModalBody>
                        </Modal>

                ):(  */}


                    <Modal isOpen={this.state.editModal} toggle={()=>this.setState({editModal:false})}>
                            <ModalHeader style={{backgroundColor:'#b21f66'}}>
                                Edit Movie: {this.state.datafilm[this.state.indexEdit].title}
                            </ModalHeader>
                            <ModalBody>
                                <input type="text" ref='edittitle' defaultValue={this.state.datafilm[this.state.indexEdit].title} placeholder="Movie's Title" className='form-control mt-2'/>
                                <input type="text" ref='editimage' defaultValue={this.state.datafilm[this.state.indexEdit].image} placeholder="Movie's Image URL" className='form-control mt-2'/>
                                <textarea rows='5' type="text" defaultValue={this.state.datafilm[this.state.indexEdit].sinopsis} ref='editsinopsis'  placeholder="Synopsis" className='form-control mt-2 mb-2'/>

                                Jadwal: &nbsp;&nbsp;
                                <div className="d-flex">
                                    {this.renderAddCheckbox()}
                                </div>
                                <input type="text"  ref='edittrailer' defaultValue={this.state.datafilm[this.state.indexEdit].trailer} placeholder="Trailer's URL" className='form-control mt-2'/>
                                <select ref='editstudioId' className='form-control mt-2'>
                                    {this.renderStudioOption()}
                                </select>

                                <input type="text"  ref='editsutradara' defaultValue={this.state.datafilm[this.state.indexEdit].sutradara} placeholder='Sutradara' className='form-control mt-2'/>
                                <input type="number"  ref='editdurasi' defaultValue={this.state.datafilm[this.state.indexEdit].durasi} placeholder='Duration' className='form-control mt-2'/>

                                Genre: &nbsp;&nbsp;
                                {this.renderGenreCheckbox()}
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={()=>this.updateFilm()}>Save</Button>
                            <Button color="secondary" onClick={()=>this.setState({editModal:false})}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {/* )
            } */}
            

{/* =========================================Modal Edit End=================================================================== */}
{/* =========================================Modal Delete Confirmation Start=================================================================== */}
                            <Modal isOpen={this.state.renderconfDelete} toggle={()=>this.setState({renderconfDelete:false})}>
                            <ModalBody>
                            Are you sure want to delete the movie?
                            {/* {this.state.datafilm[indextampilDelete].title} */}
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={()=>this.deleteMovie()}>Delete</Button>
                            <Button color="secondary" onClick={()=>this.setState({renderconfDelete: false})}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
{/* =========================================Modal Delete Confirmation End=================================================================== */}
{/* =========================================Modal Add Movie Start=================================================================== */}
                <Fade>
                    <Modal isOpen={this.state.addModal} toggle={()=>this.setState({addModal:false})}>
                        <ModalHeader style={{backgroundColor:'#b21f66'}}>Add Movie</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='title'  placeholder="Movie's Title" className='form-control mt-2'/>
                            <input type="text" ref='image' placeholder="Movie's Image URL" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='sinopsis'  placeholder="Synopsis" className='form-control mt-2 mb-2'/>

                            Jadwal: &nbsp;&nbsp;
                            <div className="d-flex">
                                {this.renderAddCheckbox()}
                            </div>
                            <input type="text"  ref='trailer' placeholder="Trailer's URL" className='form-control mt-2'/>
                            <select ref='studioId' className='form-control mt-2'>
                                {this.renderStudioOption()}
                            </select>

                            <input type="text"  ref='sutradara' placeholder='Sutradara' className='form-control mt-2'/>
                            <input type="number"  ref='durasi' placeholder='Duration' className='form-control mt-2'/>

                            Genre: &nbsp;&nbsp;
                            {this.renderGenreCheckbox()}
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={()=>this.saveFilmBaru()}>Add to Movie List</Button>
                        <Button color="secondary" onClick={()=>this.setState({addModal:false})}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
{/* =========================================Modal Add Movie End=================================================================== */}
{/* =========================================Print Tabel Header Start=================================================================== */}
                    <Table size='small' >
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Judul</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Sinopsis</TableCell>
                                <TableCell>Jadwal</TableCell>
                                <TableCell>Sutradara</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Durasi</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {this.renderFilm()}
                    </TableBody>
                    </Table>
                </Fade>
                <br></br>
                    <center><Button outline color="success" onClick={()=>this.setState({addModal:true})}>Add Movies</Button></center>
                <br></br>
                {this.renderModal}
{/* =========================================Print Tabel Header End=================================================================== */}
            </div>
        )
        }
    }
    else{
        return(
            <NotFound />
        )
    }
        
    }
}
 
export default ManageAdmin;
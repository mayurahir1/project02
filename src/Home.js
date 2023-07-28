import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

let dataArray = []
export default class Home extends Component {



    state = {
        array: [],
        name: '',
        text: '',
        tel: '',
        file: '',
        textarea: '',
        imagePreviewUrl: '',
        editEmail: '',
    }



    name = (e) => {
        this.setState({ name: e.target.value })
    }
    text = (e) => {
        this.setState({ text: e.target.value })
    }

    tel = (e) => {
        this.setState({ tel: e.target.value })
    }



    // file = (e) => {
    //     this.setState({ file: e.target.value })
    // }
    textarea = (e) => {
        this.setState({ textarea: e.target.value })
    }


    edit = (item) => {
        this.setState({ name: item.name, editEmail: item.id, text: item.text, tel: item.tel, imagePreviewUrl: item.file, textarea: item.textarea, file: item.imagePreviewUrl, })
    }

    update = (id) => {


        let objIndex = dataArray.findIndex(item => item.id === this.state.editEmail)
        console.log(objIndex)
        console.log(dataArray)

        dataArray[objIndex].name = this.state.name
        dataArray[objIndex].text = this.state.text
        dataArray[objIndex].tel = this.state.tel
        dataArray[objIndex].file = this.state.imagePreviewUrl
        dataArray[objIndex].textarea = this.state.textarea
        this.setState(dataArray)


        this.setState({ name: '', text: '', tel: '', file: '', textarea: '', imagePreviewUrl: '' })
    }



    remove = (id) => {
        dataArray = dataArray.filter(item => item.id !== id)
        console.log(dataArray)
        this.setState({ array: dataArray })
    }



    onloadend = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({

                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }



    submit = () => {
        let data = {
            name: this.state.name,
            text: this.state.text,
            textarea: this.state.textarea,
            tel: this.state.tel,
            file: this.state.imagePreviewUrl,
            id: Date.now()

        }

        {

            dataArray.push(data)
            this.setState({ array: dataArray })
            console.log(this.state.array)
            localStorage.setItem('data', JSON.stringify(this.state.array))
        }



        this.setState({ name: '', text: '', tel: '', file: '', textarea: '', imagePreviewUrl: '' })
    }
    render() {
        return (
            <section>
                <div className='container img mt-5'>
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-5 col-sm-5 col-md-5'>
                            <h1>MAYUR ENTERPRISE</h1>
                            <Form.Group className="mt-5 " >
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="name" onChange={this.name} value={this.state.name} placeholder="name" />
                            </Form.Group>
                            <Form.Group className="mt-3" >
                                <Form.Label>Product Id</Form.Label>
                                <Form.Control type="text" onChange={this.text} value={this.state.text} placeholder="Product Id" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label> Product Price</Form.Label>
                                <Form.Control type="tel" onChange={this.tel} value={this.state.tel} placeholder="Price" />
                            </Form.Group>
                            <Form.Group className="mb-5 mt-3" >
                                <Form.Label>Product image</Form.Label>
                                <Form.Control type="file" onChange={this.onloadend} value={this.state.file} placeholder="File" />
                            </Form.Group>
                            <img src={this.state.imagePreviewUrl} />
                            <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Discription</Form.Label>
                                <Form.Control as="textarea" onChange={this.textarea} value={this.state.textarea} rows={3} />
                            </Form.Group>
                            <Button variant="primary" className='mt-5 mb-5' onClick={this.submit} type="submit">
                                Submit
                            </Button>
                            <Button variant="primary" className='mt-5 mb-5' onClick={this.update} type="update">
                                Update
                            </Button>
                            <div>


                                <tr>

                                    <th>Product Name</th>
                                    <th>Product Id</th>
                                    <th>Product Price</th>
                                    <th>Discription</th>
                                    <th>Product image</th>
                                    <th>Remove</th>
                                    <th>Edit</th>
                                </tr>


                                {this.state.array.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.text}</td>
                                            <td>{item.tel}</td>
                                            <td>{item.textarea}</td>
                                            <td><img src={item.file} /></td>
                                            <td><button onClick={() => this.remove(item.id)}>Remove</button></td>
                                            <td><button onClick={() => this.edit(item)}>Edit</button></td>
                                        </tr>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

import CDB from '../services/CDB';
import {LineChart, Line} from 'recharts';
import React, {Component} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , Legend} from 'recharts';
import '../index.css';


export default class Doctor extends Component {
    state = {
        newDocs: [],
        newDoc: [],
        data:[],
        doctorData:[],
        nurseData:[],
        selectedOption: null
    }



    constructor(props) {
        super(props);
       
      }
    
      min = 0;
      max = 5;
    
      handleClick = () => {
        this.setState({random: this.min + (Math.floor(Math.random() * (this.max - this.min)))});
      };

    componentDidMount() {
        this.getAllDocuments();
        this.state = {
            random: null,
          }
    }

    getAllDocuments() {
        CDB.get(`/new/_all_docs?limit=10`, {
            responseType: 'json',
        })
            .then(response => {
                const newDocs = response.data.rows;
                this.setState({newDocs})
            })
            .catch(error => console.error(`error: ${error}`))
    }

    getOneDocument(docid) {
        CDB.get(`/new/${docid}`, {
            responseType: 'json',
        })
            .then(response => {
                if(response.data.topic==="nurse")
                this.state.data.push({x:response.data.latitude,y:response.data.longitude})
                if(response.data.topic==="patient")
                this.state.doctorData.push({x:response.data.latitude,y:response.data.longitude})
                if(response.data.topic==="doctor")
                this.state.nurseData.push({x:response.data.latitude,y:response.data.longitude})
                const newData = response.data;
                const newDoc = newData.topic;
                const newDoc1 = newData.user;
                const newDoc2 = newData.timestamp;
                // const newDoc = response.data;
                this.setState({newDoc})
                this.setState({newDoc1})
                this.setState({newDoc2})
                console.log(newDoc)
                // const data=JSON.stringify(response.data)
            })
            .catch(error => console.error(`error: ${error}`))


        // const d = Object.entries(this.state.newDoc).map(([key, value]) => (
        //     <option key={key}>{key} - {value}</option>
        // ));
        const d = (this.state.newDoc)
        const c = (this.state.newDoc1)
        const f = (this.state.newDoc2)

        return (<div>User: {c} <br></br> User Type: {d} <br></br>Timestamp: {f}</div>)
    }

    render() {
        const mydoc = this.getOneDocument();

        const renderLineChart = (
            <ScatterChart
				width={1200}
				height={400}
				margin={{
					top: 20,  bottom: 20, left: 180,
				}}
                padding={{
					top: 20,  bottom: 20, left: 180,
				}}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis type="number"  dataKey="x" name="longitude"  />
				<YAxis type="number" domain={[153.0281, 153.0282]} dataKey="y" name="latitude" />
				<Tooltip cursor={{ strokeDasharray: '10 10' }} />
                <Legend />
				<Scatter name="Patient" data={this.state.data} fill="#8884d8" />
                <Scatter name="Nurse" data={this.state.nurseData} fill="#82ca9d" />
                <Scatter name="Doctor" data={this.state.doctorData} fill="#ff8000" />
			</ScatterChart>
        );

        return (
            <div>
                {/* <p>{JSON.stringify(this.state.newDocs)}</p>
                <p>{JSON.stringify(this.state.newDoc)}</p>
                <p>{JSON.stringify(this.state.data)}</p> */}
                <br></br>
                <h1 font="55px">User Location Tracking</h1>
                <br></br>
                {renderLineChart}

                {/* <ul id="docs">
                    {this.state.newDocs.map((item) =>
                        <li key={item.id}>
                            {item.id}
                            <button onClick={() => this.getOneDocument(item.id)}>Get Document</button>
                        </li>
                    )}
                </ul> */}
                <br></br>
                <p>Choose <b>USER ID</b> to track their location</p>
                <select onChange={(selectedOption) => this.getOneDocument(selectedOption.target.value)}>
                    {this.state.newDocs.map((option) => (
                        <option key={option.id}>{option.id}</option>
                    ))}
                </select>
                        
                {mydoc}
                <br></br>
                <button class="inline" onClick={this.handleClick}>Clinical Room 1: 
                
                </button><p><b>{this.state.random}</b> people in total</p>
            </div>
        )
    }

}

import CDB from '../services/CDB';
import {LineChart, Line} from 'recharts';
import React, {Component} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , Legend} from 'recharts';





export default class Doctor extends Component {
    state = {
        newDocs: [],
        newDoc: [],
        data:[],
        doctorData:[],
        nurseData:[],
        selectedOption: null
    }


    componentDidMount() {
        this.getAllDocuments();
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
                const newDoc = response.data;
                this.setState({newDoc})
                console.log(newDoc)
                // const data=JSON.stringify(response.data)
            })
            .catch(error => console.error(`error: ${error}`))


        const d = Object.entries(this.state.newDoc).map(([key, value]) => (
            <option key={key}>{key} - {value}</option>
        ));

        return (<div>{d}</div>)
    }

    render() {
        const mydoc = this.getOneDocument();

        const renderLineChart = (
            <ScatterChart
				width={1200}
				height={400}
				margin={{
					top: 20, right: 20, bottom: 20, left: 20,
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

                {renderLineChart}

                {/* <ul id="docs">
                    {this.state.newDocs.map((item) =>
                        <li key={item.id}>
                            {item.id}
                            <button onClick={() => this.getOneDocument(item.id)}>Get Document</button>
                        </li>
                    )}
                </ul> */}

                <select onChange={(selectedOption) => this.getOneDocument(selectedOption.target.value)}>
                    {this.state.newDocs.map((option) => (
                        <option key={option.id}>{option.id}</option>
                    ))}
                </select>

                {mydoc}

            </div>
        )
    }

}

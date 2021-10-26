import CDB from '../services/CDB';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

const dummy = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];


export default class Educator extends Component {
    state = {
        w12Docs: [],
        w12Doc: [],
        selectedOption: null
    }




    componentDidMount() {
        this.getAllDocuments();
    }

    getAllDocuments() {
        CDB.get(`/w12/_all_docs`, {
            responseType: 'json',
        })
            .then(response => {
                const w12Docs = response.data.rows;
                this.setState({ w12Docs })
            })
            .catch(error => console.error(`error: ${error}`))
    }

    getOneDocument(docid) {
        CDB.get(`/w12/${docid}`, {
            responseType: 'json',
        })
            .then(response => {
                const w12Doc = response.data;
                this.setState({ w12Doc })
                console.log(w12Doc)
            })
            .catch(error => console.error(`error: ${error}`))


        const d = Object.entries(this.state.w12Doc).map(([key, value]) => (
            <option key={key}>{key} - {value}</option>
        ));

        return (<div>{d}</div>)
    }

    render() {
        const mydoc = this.getOneDocument();

        const renderLineChart = (
            <LineChart width={400} height={400} data={dummy}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        );

        return (
            <div>
                <ul id="docs">
                    {this.state.w12Docs.map((item) =>
                        <li key={item.id}>
                            {item.id}
                            <button onClick={() => this.getOneDocument(item.id)}>Get Document</button>
                        </li>
                    )}
                </ul>

                <select onChange={(selectedOption) => this.getOneDocument(selectedOption.target.value)}>
                    {this.state.w12Docs.map((option) => (
                        <option key={option.id}>{option.id}</option>
                    ))}
                </select>

                {mydoc}

                {renderLineChart}
            </div>
        )
    }

}

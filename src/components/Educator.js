import React from 'react';
import CDB from '../services/CDB';
import { LineChart, Line } from 'recharts';

export default class extends Component {
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
            <LineChart width={400} height={400} data={dummydata}>
                <Line type="monotone" dataKey="iab330" stroke="#8884d8" />
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
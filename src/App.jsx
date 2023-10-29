import { useState, useEffect } from 'react';
import './App.css';
import { Card, Text, Metric, Flex, BadgeDelta } from '@tremor/react';
import { readString } from 'react-papaparse';
//import csvFile from '../public/acoes.csv';
import Papa from 'papaparse';

async function getData(company) {
    const data = Papa.parse(await fetchCsv(company));
    return data;
}

async function fetchCsv(company) {
    const response = await fetch(`../public/csv_por_acao/${company}.csv`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

function variation(initial, final) {
    const change = final - initial;
    const percentChange = (change / Math.abs(initial)) * 100;

    return Math.round(percentChange * 100) / 100;
}

function App() {
    const [company, setCompany] = useState('GOOGL');
    const [date, setDate] = useState([]);
    const [open, setOpen] = useState([]);
    const [close, setClose] = useState([]);
    const [high, setHigh] = useState([]);
    const [low, setLow] = useState([]);
    const [volume, setVolume] = useState([]);
    const [diff, setDiff] = useState([]);
    const [len, setLen] = useState(0);

    useEffect(() => {
        getData(company).then((res) => {
            const data = res.data;
            console.log(data);
            setDate(data[0]);
            setOpen(data[1]);
            setHigh(data[2]);
            setLow(data[3]);
            setClose(data[4]);
            setVolume(data[5]);
            setDiff(data[6]);
            setLen(data[0].length);
        });
    }, [company]);

    console.log(close[len - 1] - open[len - 1]);
    console.log(close[len - 1] / open[len - 1]);

    return (
        <>
            <h1>{company}</h1>
            <Card className="max-w-xs mx-auto">
                <Flex>
                    <Text>Valor da ação</Text>
                    <BadgeDelta
                        deltaType={
                            variation(close[len - 2], close[len - 1]) < 0
                                ? 'decrease'
                                : 'increase'
                        }
                    >
                        {variation(close[len - 2], close[len - 1]) + '%'}
                    </BadgeDelta>
                </Flex>
                <Metric>$ {close[len - 1]}</Metric>
            </Card>
        </>
    );
}

export default App;

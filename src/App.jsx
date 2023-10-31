import { useState, useEffect } from 'react';
import useViewport from './hooks/useViewport';
import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';

function variation(initial, final) {
    const change = final - initial;
    const percentChange = (change / Math.abs(initial)) * 100;

    return round(percentChange);
}

function round(val) {
    return Math.round(val * 100) / 100;
}

function aggregateByYear(arr) {
    return arr.reduce((acc, curr) => {
        const found = acc.find((el) => el.Ano === curr.Ano);
        if (found) {
            found.volume += curr.volume;
        } else {
            acc.push({ Ano: curr.Ano, volume: curr.volume });
        }
        return acc;
    }, []);
}

function App() {
    const [stockName, setStockName] = useState('AAL');
    const [company, setCompany] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [volumeByYear, setVolume] = useState([]);

    const width = useViewport();

    useEffect(() => {
        fetch('../public/empresas.txt')
            .then((r) => r.text())
            .then((text) => {
                const temp = text.split('\r\n');
                temp.pop();
                setCompanies(temp);
                return temp[0];
            });
    }, []);

    useEffect(() => {
        fetch(`../public/JSONs/${stockName}.json`).then((json) => {
            json.text().then((str) => {
                const result = JSON.parse(str);
                setCompany(result);

                result.forEach((cmp) => {
                    cmp['Ano'] = cmp['date'].slice(0, 4);
                });

                setVolume(aggregateByYear(result));
            });
        });
    }, [stockName]);

    console.log(company);

    return width < 1280 ? (
        <MobileLayout
            company={company}
            companies={companies}
            stockName={stockName}
            setStockName={setStockName}
            volumeByYear={volumeByYear}
            variation={variation}
            round={round}
        />
    ) : (
        <DesktopLayout
            company={company}
            companies={companies}
            stockName={stockName}
            setStockName={setStockName}
            volumeByYear={volumeByYear}
            variation={variation}
            round={round}
        />
    );
}

export default App;

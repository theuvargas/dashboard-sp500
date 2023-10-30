import { useState, useEffect } from 'react';
import './App.css';
import {
    Card,
    Text,
    Metric,
    Flex,
    BadgeDelta,
    SearchSelect,
    SearchSelectItem,
    Grid,
    Col,
    LineChart,
    Title,
    AreaChart,
    DonutChart,
    BarChart,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeaderCell,
} from '@tremor/react';

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

    return (
        <>
            <Flex className="mb-4" justifyContent="between">
                <h1 className="text-3xl">{stockName}</h1>
                <SearchSelect
                    className="max-w-xs"
                    placeholder="Procurar ação..."
                    onValueChange={(e) => setStockName(e)}
                    value={''}
                >
                    {companies.map((cmp) => {
                        return <SearchSelectItem key={cmp} value={cmp} />;
                    })}
                </SearchSelect>
            </Flex>
            <Card decoration="top">
                <Text>Valor da ação</Text>
                <Metric>
                    $ {company[company?.length - 1]?.close.toLocaleString()}
                </Metric>
            </Card>
            <Card decoration="top">
                <Text>Volume do dia (ações)</Text>
                <Metric>
                    {company[company?.length - 1]?.volume.toLocaleString()}
                </Metric>
            </Card>
            <Card>
                <Flex>
                    <Text>Variação (dia)</Text>
                </Flex>
                {variation(
                    company[company?.length - 1]?.open,
                    company[company?.length - 1]?.close
                ) < 0 ? (
                    <Metric color="red">
                        {variation(
                            company[company?.length - 1]?.open,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                ) : (
                    <Metric color="green">
                        +
                        {variation(
                            company[company?.length - 1]?.open,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                )}
            </Card>
            <Card>
                <Flex>
                    <Text>Variação (mês)</Text>
                </Flex>
                {variation(
                    company[company?.length - 31]?.close,
                    company[company?.length - 1]?.close
                ) < 0 ? (
                    <Metric color="red">
                        {variation(
                            company[company?.length - 31]?.close,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                ) : (
                    <Metric color="green">
                        +
                        {variation(
                            company[company?.length - 31]?.close,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                )}
            </Card>
            <Card>
                <Flex>
                    <Text>Variação (ano)</Text>
                </Flex>
                {variation(
                    company[company?.length - 366]?.close,
                    company[company?.length - 1]?.close
                ) < 0 ? (
                    <Metric color="red">
                        {variation(
                            company[company?.length - 366]?.close,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                ) : (
                    <Metric color="green">
                        +
                        {variation(
                            company[company?.length - 366]?.close,
                            company[company?.length - 1]?.close
                        ) + '%'}
                    </Metric>
                )}
            </Card>
            <Card>
                <Title>Valor da ação pelo tempo</Title>
                <AreaChart
                    data={company}
                    index="date"
                    categories={['close']}
                    colors={['cyan']}
                    valueFormatter={(n) => `$${n.toLocaleString()}`}
                    startEndOnly={true}
                    showAnimation={true}
                />
            </Card>
            <Card>
                <Title className="mb-6">
                    Volume de ações por ano (em milhões)
                </Title>
                <BarChart
                    data={volumeByYear}
                    index="Ano"
                    categories={['volume']}
                    valueFormatter={(val) => Math.round(val / 1_000_000)}
                    showAnimation={true}
                    showLegend={false}
                    colors={['cyan']}
                />
            </Card>
            <Card>
                <Title>Resumo dos últimos 5 dias</Title>
                <Table className="mt-4">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Dia</TableHeaderCell>
                            <TableHeaderCell>Volume</TableHeaderCell>
                            <TableHeaderCell>Abertura</TableHeaderCell>
                            <TableHeaderCell>Fechamento</TableHeaderCell>
                            <TableHeaderCell>Variação</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {company
                            .slice(company.length - 5)
                            .reverse()
                            .map((day) => (
                                <TableRow key={day.date}>
                                    <TableCell>{day.date}</TableCell>
                                    <TableCell>
                                        {day.volume.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        ${day.open.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        ${day.close.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {day.close >= day.open ? (
                                            <BadgeDelta deltaType="moderateIncrease">
                                                +
                                                {round(
                                                    variation(
                                                        day.open,
                                                        day.close
                                                    )
                                                )}
                                                %
                                            </BadgeDelta>
                                        ) : (
                                            <BadgeDelta deltaType="moderateDecrease">
                                                {round(
                                                    variation(
                                                        day.open,
                                                        day.close
                                                    )
                                                )}
                                                %
                                            </BadgeDelta>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}

export default App;

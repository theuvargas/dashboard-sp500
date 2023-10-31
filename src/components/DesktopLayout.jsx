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
import MetricCard from './MetricCard';
import VariationCard from './VariationCard';
import VolumeCard from './VolumeCard';
import AreaCard from './AreaCard';
import TableCard from './TableCard';
import DonutCard from './DonutCard';

function DesktopLayout({
    company,
    stockName,
    setStockName,
    companies,
    volumeByYear,
    variation,
    round,
    profit,
}) {
    return (
        <main className="bg-gray-200 px-8 py-8 h-screen">
            <div className="mx-auto max-w-screen-2xl h-full">
                <Flex alignItems="start" className="gap-4 h-full">
                    <div className="w-1/2 h-full flex flex-col justify-between">
                        <Flex justifyContent="between">
                            <h1 className="text-3xl ml-4 underline decoration-4 decoration-cyan-600 decoration-double">
                                {stockName}
                            </h1>
                            <SearchSelect
                                className="w-48"
                                placeholder="Procurar ação..."
                                onValueChange={(e) => setStockName(e)}
                                value={''}
                            >
                                {companies.map((cmp) => {
                                    return (
                                        <SearchSelectItem
                                            key={cmp}
                                            value={cmp}
                                        />
                                    );
                                })}
                            </SearchSelect>
                        </Flex>
                        <Flex className="gap-10">
                            <MetricCard
                                title="Valor da ação"
                                stat={`$${company[
                                    company?.length - 1
                                ]?.close.toLocaleString()}`}
                            />
                            <MetricCard
                                title="Volume do dia"
                                stat={company[
                                    company?.length - 1
                                ]?.volume.toLocaleString()}
                            />
                        </Flex>
                        <AreaCard company={company} />
                        <Flex className="gap-8">
                            <div className="w-1/2 h-full flex flex-wrap gap-4 justify-between">
                                <VariationCard
                                    company={company}
                                    variation={variation}
                                    type="dia"
                                />
                                <VariationCard
                                    company={company}
                                    variation={variation}
                                    type="mês"
                                    offset={31}
                                />
                                <VariationCard
                                    company={company}
                                    variation={variation}
                                    type="ano"
                                    offset={366}
                                />
                                <VariationCard
                                    company={company}
                                    variation={variation}
                                    type="máx"
                                    offset={company?.length}
                                />
                            </div>
                            <DonutCard
                                company={company}
                                stockName={stockName}
                                round={round}
                                profit={profit}
                                classes={'w-1/2'}
                            />
                        </Flex>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-between">
                        <VolumeCard volumeByYear={volumeByYear} />
                        <TableCard
                            company={company}
                            round={round}
                            variation={variation}
                        />
                    </div>
                </Flex>
            </div>
        </main>
    );
}

export default DesktopLayout;

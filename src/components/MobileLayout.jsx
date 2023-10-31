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
import AreaCard from './AreaCard';
import VolumeCard from './VolumeCard';
import TableCard from './TableCard';
import DonutCard from './DonutCard';

function MobileLayout({
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
        <main className="bg-gray-200 px-2 py-6 mx-auto">
            <div className="max-w-3xl mx-auto">
                <Flex className="mb-6">
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
                            return <SearchSelectItem key={cmp} value={cmp} />;
                        })}
                    </SearchSelect>
                </Flex>
                <Flex className="h-56 mb-4 sm:gap-10">
                    <div className="w-1/2 flex flex-col h-full justify-between">
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
                    </div>
                    <DonutCard
                        company={company}
                        stockName={stockName}
                        round={round}
                        profit={profit}
                        classes={'w-5/12 sm:w-1/2 p-4 h-full'}
                    />
                </Flex>
                <AreaCard company={company} />
                <div className="mx-auto mt-4 mb-4 grid grid-rows-2 grid-cols-2 gap-4 sm:grid-rows-1 sm:grid-cols-4">
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
                <VolumeCard volumeByYear={volumeByYear} />
                <TableCard
                    company={company}
                    round={round}
                    variation={variation}
                />
            </div>
        </main>
    );
}

export default MobileLayout;

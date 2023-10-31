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

function DesktopLayout({
    company,
    stockName,
    setStockName,
    companies,
    volumeByYear,
    variation,
    round,
}) {
    return (
        <main className="bg-gray-100 px-8 py-8">
            <div className="mx-auto max-w-screen-2xl">
                <Flex alignItems="start" className="gap-4 mb-6">
                    <div className="w-1/2">
                        <Flex justifyContent="between" className="mb-6">
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
                        <Flex className="justify-start mb-6">
                            <MetricCard
                                title="Valor da ação"
                                stat={`$
                            ${company[
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
                        <div className="mx-auto mt-4 mb-4 grid grid-rows-2 grid-cols-2 gap-4 2xl:grid-rows-1 2xl:grid-cols-4">
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
                                type="mês"
                                offset={366}
                            />
                            <VariationCard
                                company={company}
                                variation={variation}
                                type="máx"
                                offset={company?.length}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
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

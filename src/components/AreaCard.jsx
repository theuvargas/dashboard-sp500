import { AreaChart, Card, Title } from '@tremor/react';

function AreaCard({ company }) {
    return (
        <Card decoration="">
            <Title className="mb-6">Valor da ação pelo tempo</Title>
            <AreaChart
                data={company}
                index="date"
                categories={['close']}
                colors={['cyan']}
                valueFormatter={(n) => `$${n.toLocaleString()}`}
                startEndOnly={true}
                showLegend={false}
                showAnimation={true}
            />
        </Card>
    );
}

export default AreaCard;

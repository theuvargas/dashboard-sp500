import { BarChart, Card, Title } from '@tremor/react';

function VolumeCard({ volumeByYear, classes }) {
    return (
        <Card className={classes}>
            <Title>Volume de ações por ano (em milhões)</Title>
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
    );
}

export default VolumeCard;

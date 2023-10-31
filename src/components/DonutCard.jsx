import { Card, DonutChart, Text, Title } from '@tremor/react';

function DonutCard({ profit, round, classes }) {
    return (
        <Card className={classes}>
            <Title className="w-fit">Dias de alta</Title>
            <DonutChart
                className="mx-auto"
                data={profit}
                category="Dias"
                index="Situação"
                label={`${round(
                    (100 * profit[0]?.Dias) /
                        (profit[0]?.Dias + profit[1]?.Dias)
                )}%`}
                colors={['emerald', 'rose']}
            />
        </Card>
    );
}

export default DonutCard;

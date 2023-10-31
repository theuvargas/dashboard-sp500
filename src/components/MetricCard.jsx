import { Card, Metric, Text } from '@tremor/react';

function MetricCard({ title, stat }) {
    return (
        <Card className="">
            <Text>{title}</Text>
            <Metric>{stat}</Metric>
        </Card>
    );
}

export default MetricCard;

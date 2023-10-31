import { Card, Metric, Text } from '@tremor/react';

function MetricCard({ title, stat }) {
    return (
        <Card className="w-44 sm:mr-4">
            <Text>{title}</Text>
            <Metric>{stat}</Metric>
        </Card>
    );
}

export default MetricCard;

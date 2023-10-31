import { AreaChart, Card, Title, Flex } from '@tremor/react';
import { useState } from 'react';
import AreaCardButton from './AreaCardButton';

function AreaCard({ company }) {
    const [selected, setSelected] = useState(0);

    return (
        <Card decoration="">
            <Flex className="mb-6 align-center justify-between">
                <Title className="">Valor da ação pelo tempo</Title>
                <Flex className="w-min gap-3">
                    <AreaCardButton
                        selected={selected}
                        target={30}
                        text={'1m'}
                        setSelected={setSelected}
                    />
                    <AreaCardButton
                        selected={selected}
                        target={90}
                        text={'3m'}
                        setSelected={setSelected}
                    />
                    <AreaCardButton
                        selected={selected}
                        target={180}
                        text={'6m'}
                        setSelected={setSelected}
                    />
                    <AreaCardButton
                        selected={selected}
                        target={365}
                        text={'1a'}
                        setSelected={setSelected}
                    />
                    <AreaCardButton
                        selected={selected}
                        target={0}
                        text={'Máx'}
                        setSelected={setSelected}
                    />
                </Flex>
            </Flex>
            <AreaChart
                data={company.slice(-selected)}
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

import { Card, Text, Flex, Metric } from '@tremor/react';

function VariationCard({ company, variation, type, offset }) {
    return (
        <>
            {type == 'dia' ? (
                <Card className="w-40">
                    <Flex>
                        <Text>Variação ({type})</Text>
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
            ) : (
                <Card className="w-40">
                    <Flex>
                        <Text>Variação ({type})</Text>
                    </Flex>
                    {variation(
                        company[company?.length - offset]?.close,
                        company[company?.length - 1]?.close
                    ) < 0 ? (
                        <Metric color="red">
                            {variation(
                                company[company?.length - offset]?.close,
                                company[company?.length - 1]?.close
                            ) + '%'}
                        </Metric>
                    ) : (
                        <Metric color="green">
                            +
                            {variation(
                                company[company?.length - offset]?.close,
                                company[company?.length - 1]?.close
                            ) + '%'}
                        </Metric>
                    )}
                </Card>
            )}
        </>
    );
}

export default VariationCard;

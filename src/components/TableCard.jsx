import {
    Card,
    BadgeDelta,
    Title,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeaderCell,
} from '@tremor/react';

function TableCard({ company, round, variation }) {
    return (
        <Card className="mt-4">
            <Title>Resumo dos últimos 5 dias</Title>
            <Table className="mt-4">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>Volume</TableHeaderCell>
                        <TableHeaderCell>Abertura</TableHeaderCell>
                        <TableHeaderCell>Fechamento</TableHeaderCell>
                        <TableHeaderCell>Variação</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {company
                        .slice(company.length - 5)
                        .reverse()
                        .map((day) => (
                            <TableRow key={day.date}>
                                <TableCell>{day.date}</TableCell>
                                <TableCell>
                                    {day.volume.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    ${day.open.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    ${day.close.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {day.close >= day.open ? (
                                        <BadgeDelta deltaType="moderateIncrease">
                                            +
                                            {round(
                                                variation(day.open, day.close)
                                            )}
                                            %
                                        </BadgeDelta>
                                    ) : (
                                        <BadgeDelta deltaType="moderateDecrease">
                                            {round(
                                                variation(day.open, day.close)
                                            )}
                                            %
                                        </BadgeDelta>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default TableCard;

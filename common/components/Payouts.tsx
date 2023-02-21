import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { calculatePayouts } from '../utils/payouts';

interface OwnProps {
  gridSize: number;
  cost: number;
  reverse?: boolean;
}

const Payouts = ({ gridSize, cost, reverse }: OwnProps) => {
  const payouts = calculatePayouts(cost, gridSize, reverse);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>1st</Th>
            <Th>2nd</Th>
            <Th>3rd</Th>
            <Th>Final</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight={600} fontSize="xs" color="yellow.500">
              Payout
            </Td>
            <Td>${payouts.first}</Td>
            <Td>${payouts.second}</Td>
            <Td>${payouts.third}</Td>
            <Td>${payouts.fourth}</Td>
          </Tr>
          {reverse ? (
            <Tr>
              <Td fontWeight={600} fontSize="xs" color="yellow.500">
                Reverse
              </Td>
              <Td>${payouts.firstReverse}</Td>
              <Td>${payouts.secondReverse}</Td>
              <Td>${payouts.thirdReverse}</Td>
              <Td>${payouts.fourthReverse}</Td>
            </Tr>
          ) : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Payouts;

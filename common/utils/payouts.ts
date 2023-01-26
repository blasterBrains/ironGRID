enum Quarter {
  first = 0.2,
  second = 0.2,
  third = 0.2,
  fourth = 0.4,
}

enum InverseQuarter {
  first = 0.15,
  firstInverse = 0.05,
  second = 0.15,
  secondInverse = 0.05,
  third = 0.15,
  thirdInverse = 0.05,
  fourth = 0.3,
  fourthInverse = 0.1,
}

export const calculatePayouts = (
  squareCost = 1,
  gridSize: number,
  inverse = false
) => {
  const total = squareCost * gridSize;
  if (inverse) {
    return {
      first: total * InverseQuarter.first,
      firstInverse: total * InverseQuarter.firstInverse,
      second: total * InverseQuarter.second,
      secondInverse: total * InverseQuarter.secondInverse,
      third: total * InverseQuarter.third,
      thirdInverse: total * InverseQuarter.thirdInverse,
      fourth: total * InverseQuarter.fourth,
      fourthInverse: total * InverseQuarter.fourthInverse,
    };
  }
  return {
    first: total * Quarter.first,
    second: total * Quarter.second,
    third: total * Quarter.third,
    fourth: total * Quarter.fourth,
  };
};

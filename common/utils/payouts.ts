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
    let remainder = 0;

    let first = total * InverseQuarter.first;
    remainder += first - Math.floor(first);
    let firstInverse = total * InverseQuarter.firstInverse;
    remainder += firstInverse - Math.floor(firstInverse);

    let second = total * InverseQuarter.second;
    remainder += second - Math.floor(second);
    let secondInverse = total * InverseQuarter.secondInverse;
    remainder += secondInverse - Math.floor(secondInverse);

    let third = total * InverseQuarter.third;
    remainder += third - Math.floor(third);
    let thirdInverse = total * InverseQuarter.thirdInverse;
    remainder += thirdInverse - Math.floor(thirdInverse);

    let fourthInverse = total * InverseQuarter.fourthInverse;
    remainder += fourthInverse - Math.floor(fourthInverse);

    return {
      first: Math.floor(first),
      firstInverse: Math.floor(firstInverse),
      second: Math.floor(second),
      secondInverse: Math.floor(secondInverse),
      third: Math.floor(third),
      thirdInverse: Math.floor(thirdInverse),
      fourth: total * InverseQuarter.fourth + remainder,
      fourthInverse: Math.floor(fourthInverse),
    };
  }
  let remainder = 0;
  let first = total * Quarter.first;
  remainder += first - Math.floor(first);
  let second = total * Quarter.second;
  remainder += second - Math.floor(second);
  let third = total * Quarter.third;
  remainder += third - Math.floor(third);
  return {
    first: Math.floor(first),
    second: Math.floor(second),
    third: Math.floor(third),
    fourth: total * Quarter.fourth + remainder,
  };
};

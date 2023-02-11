enum Quarter {
  first = 0.2,
  second = 0.2,
  third = 0.2,
  fourth = 0.4,
}

enum ReverseQuarter {
  first = 0.15,
  firstReverse = 0.05,
  second = 0.15,
  secondReverse = 0.05,
  third = 0.15,
  thirdReverse = 0.05,
  fourth = 0.3,
  fourthReverse = 0.1,
}

export const calculatePayouts = (
  squareCost = 1,
  gridSize: number,
  reverse = false
) => {
  const total = squareCost * gridSize;
  if (reverse) {
    let remainder = 0;

    let first = total * ReverseQuarter.first;
    remainder += first - Math.floor(first);
    let firstReverse = total * ReverseQuarter.firstReverse;
    remainder += firstReverse - Math.floor(firstReverse);

    let second = total * ReverseQuarter.second;
    remainder += second - Math.floor(second);
    let secondReverse = total * ReverseQuarter.secondReverse;
    remainder += secondReverse - Math.floor(secondReverse);

    let third = total * ReverseQuarter.third;
    remainder += third - Math.floor(third);
    let thirdReverse = total * ReverseQuarter.thirdReverse;
    remainder += thirdReverse - Math.floor(thirdReverse);

    let fourthReverse = total * ReverseQuarter.fourthReverse;
    remainder += fourthReverse - Math.floor(fourthReverse);

    return {
      first: Math.floor(first),
      firstReverse: Math.floor(firstReverse),
      second: Math.floor(second),
      secondReverse: Math.floor(secondReverse),
      third: Math.floor(third),
      thirdReverse: Math.floor(thirdReverse),
      fourth: total * ReverseQuarter.fourth + remainder,
      fourthReverse: Math.floor(fourthReverse),
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

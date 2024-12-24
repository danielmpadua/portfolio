export const handlePercentageLimit = (value?: number) => {
  if (!value && value !== 0) return undefined;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

export const handleValueLimit = (
  value?: number,
  upLimit?: number,
  downLimit?: number
) => {
  if (!value && value !== 0) return undefined;
  const hasUp = Boolean(upLimit || upLimit === 0);
  const hasDown = Boolean(downLimit || downLimit === 0);

  if (!hasUp && !hasDown) return value;
  if (hasUp && value > (upLimit as number)) return upLimit;
  if (hasDown && value < (downLimit as number)) return downLimit;
  return value;
};

export const ruleOfThree = (a?: number, aResult?: number, b?: number) => {
  if (a === undefined || aResult === undefined || b === undefined)
    return undefined;

  const result = (aResult * b) / a;
  const bResult = isNaN(result) ? undefined : result;
  return bResult;
};

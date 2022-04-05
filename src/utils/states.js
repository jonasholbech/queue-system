const questionStates = ["Waiting", "Getting Help", "Can Help Others"];
export function getNextState(current) {
  const index = questionStates.findIndex((s) => s === current);
  if (index === questionStates.length - 1) {
    return questionStates[0];
  }
  return questionStates[index + 1];
}

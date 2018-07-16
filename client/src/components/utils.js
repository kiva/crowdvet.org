import _ from "lodash";

function getScoreAndAccuracy(votes, officialVotes) {
  if (_.isEmpty(officialVotes)) return;
  const absValues = _.map(votes, (vote, index) => {
    return Math.abs(vote - officialVotes[index]);
  });
  const signs = _.map(absValues, value => {
    switch (value) {
      case 0:
        return "x";
        break;
      case 1:
        return "y";
        break;
      case 2:
        return "y";
        break;
      case 3:
        return "z";
        break;
      case 4:
        return "z";
        break;
      case 5:
        return "z";
        break;
      default:
        return;
    }
  });

  const counted = _.reduce(
    signs,
    (counter, sign) => {
      switch (sign) {
        case "x":
          counter["x"].count += 1;
          return counter;
          break;
        case "y":
          counter["y"].count += 1;
          return counter;
          break;
        case "z":
          counter["z"].count += 1;
          return counter;
          break;
        default:
          return counter;
      }
    },
    { x: { count: 0 }, y: { count: 0 }, z: { count: 0 } }
  );

  return scoreAccuracyConversion(counted);
}

function scoreAccuracyConversion(data) {
  let result = { Score: 0, Accuracy: 0 };
  if (data["y"].count === 3) {
    result.Score = 0;
    result.Accuracy = -100;
  } else if (
    data["x"].count === 0 &&
    data["y"].count === 1 &&
    data["z"].count === 2
  ) {
    result.Score = 2;
    result.Accuracy = -75;
  } else if (
    data["x"].count === 1 &&
    data["y"].count === 0 &&
    data["z"].count === 2
  ) {
    result.Score = 3;
    result.Accuracy = -50;
  } else if (
    data["x"].count === 0 &&
    data["y"].count === 2 &&
    data["z"].count === 1
  ) {
    result.Score = 4;
    result.Accuracy = -25;
  } else if (
    data["x"].count === 0 &&
    data["y"].count === 3 &&
    data["z"].count === 0
  ) {
    result.Score = 5;
    result.Accuracy = 0;
  } else if (
    data["x"].count === 1 &&
    data["y"].count === 1 &&
    data["z"].count === 1
  ) {
    result.Score = 5;
    result.Accuracy = "0";
  } else if (
    data["x"].count === 1 &&
    data["y"].count === 2 &&
    data["z"].count === 0
  ) {
    result.Score = 6;
    result.Accuracy = 25;
  } else if (
    data["x"].count === 2 &&
    data["y"].count === 0 &&
    data["z"].count === 1
  ) {
    result.Score = 7;
    result.Accuracy = 50;
  } else if (
    data["x"].count === 2 &&
    data["y"].count === 1 &&
    data["z"].count === 0
  ) {
    result.Score = 8;
    result.Accuracy = 75;
  } else if (
    data["x"].count === 3 &&
    data["y"].count === 0 &&
    data["z"].count === 0
  ) {
    result.Score = 10;
    result.Accuracy = 100;
  }
  return result;
}

function getOverallResults(userEvaluations, officialEvaluations) {
  if (_.isEmpty(userEvaluations) || _.isEmpty(officialEvaluations)) return;

  const result = _.reduce(
    userEvaluations,
    (results, evaluation) => {
      if (officialEvaluations[evaluation.enterprise_id]) {
        const answer = getValues(evaluation.Votes, "Answer");
        const officialAnswer = getValues(
          officialEvaluations[evaluation.enterprise_id].Votes,
          "Answer"
        );

        const result = getScoreAndAccuracy(
          getValues(answer, "score"),
          getValues(officialAnswer, "score")
        );
        results.GeneralScore = results.GeneralScore + result.Score;
        results.GeneralAccuracy = results.GeneralAccuracy + result.Accuracy;
        results.count = results.count + 1;
        return results;
      }
      return results;
    },
    { GeneralScore: 0, GeneralAccuracy: 0, count: 0 }
  );

  result.GeneralAccuracy = _.round(result.GeneralAccuracy / result.count, 2);
  return result;
}

function getValues(data, value) {
  return _.map(data, value); // [12, 14, 16, 18]
}

function getCrowdResults() {

}
export default {
  getScoreAndAccuracy,
  getOverallResults,
  getValues,
  getCrowdResults
};

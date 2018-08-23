import _ from "lodash";
import moment from "moment";
import React from 'react';

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

  if (data["z"].count === 3) {
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
    result.Accuracy = 0;
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
        const answer = [evaluation.model, evaluation.prioritization, evaluation.impact];
        const officialAnswer = [officialEvaluations[evaluation.enterprise_id].model, officialEvaluations[evaluation.enterprise_id].prioritization,
        officialEvaluations[evaluation.enterprise_id].impact]

        const result = getScoreAndAccuracy(
          answer,
          officialAnswer
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
  return _.map(data, value);
}

function isPending(officialEvaluation) {
  if (!officialEvaluation) {
    return true;
  }
  return _.get(officialEvaluation, "status") === "Pending";
}

function isOpen(enterprise) {
  return moment().isBefore(enterprise.endDate);
}

function getPage(enterprise, officialEvaluation) {
  if (isOpen(enterprise)) {
    const page = `/users/evaluations/${enterprise.id}`;
    return page;
  }
  if (!isOpen(enterprise) && isPending(officialEvaluation)) {
    const page = `/users/evaluations/results/${enterprise.id}`;
    return page;
  }
  if (!isOpen(enterprise) && !isPending(officialEvaluation)) {
    const page = `/users/evaluations/results/${enterprise.id}`;
    return page;
  }
}

function getMessage(enterprise, evaluation, officialEvaluation) {
  if (
    isOpen(enterprise) &&
    !_.isEmpty(evaluation) &&
    !isPending(officialEvaluation)
  ) {
    return {
      message: "BELOW ARE THE RESULTS YOU SUBMITTED",
      page: "/user",
      text: "EXit"
    };
  }

  if (
    isOpen(enterprise) &&
    !_.isEmpty(evaluation) &&
    isPending(officialEvaluation)
  ) {
    return {
      message: "BELOW ARE THE RESULTS YOU SUBMITTED",
      page: "/user",
      text: "Exit"
    };
  }

  if (
    !isOpen(enterprise) &&
    !_.isEmpty(evaluation) &&
    isPending(officialEvaluation)
  ) {
    return {
      message: "KIVA WILL POST A DECISION SOON",
      page: "/user",
      text: "EXit"
    }
  }
  if (
    !isOpen(enterprise) &&
    !_.isEmpty(evaluation) &&
    !isPending(officialEvaluation)
  ) {
    return {
      message: "BELOW ARE THE RESULTS YOU SUBMITTED",
      page: `/evaluations/results/${enterprise.id}`,
      text: "Evaluation Results"
    }
  }
}

function timeRenderer({ days, hours, minutes, seconds }) {
  let renderText = "";
  if (days) {
    renderText = `${days} Days, ${hours} Hours`;
  } else if (hours) {
    renderText = `${hours} Hours, ${minutes} minutes`;
  } else if (minutes) {
    renderText = `${minutes} minutes, ${seconds} seconds`;
  }
  return <span> {renderText} left</span>;
}

const initialValues = { 1 :{ score:1, count:0}, 2:{ score:2, count:0},
  3:{ score:3, count:0}, 4: { score:4, count:0}, 5:{ score:5, count:0},
  6:{ score:6, count:0} }

function getCrowdVotes(data, name) {
    const reducedValues = _.reduce(data, (result, item) => {
      result[item[name]].count = result[item[name]].count + 1;
      return result;
    },  _.cloneDeep(initialValues) )

  return _.map(reducedValues, (item, v) => item)
}

export default {
  getScoreAndAccuracy,
  getOverallResults,
  getValues,
  getPage,
  getMessage,
  isOpen,
  timeRenderer,
  getCrowdVotes
};

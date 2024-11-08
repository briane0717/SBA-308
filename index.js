// The provided course information.
const courseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 0
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: "boo"
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  try {

    if (courseInfo.id !== assignmentGroup.course_id) {
      throw Error("These assignments don't belong to this course");
    }

    const results = {};
    const currentDate = new Date();
    
    for (let assignment of assignmentGroup.assignments) {
      const dueDate = new Date(assignment.due_at);
      if (dueDate > currentDate) {
        continue;
      }


      for (let submission of learnerSubmissions) {
        if (submission.assignment_id === assignment.id) {
          const learnerId = submission.learner_id;
          const submittedDate = new Date(submission.submission.submitted_at);
          let score = submission.submission.score;
          const pointsPossible = assignment.points_possible;
         
          if (typeof score !== 'number' || typeof pointsPossible !== 'number') {
            console.error(`Invalid data for learner ${learnerId}, assignment ${assignment.id}: score or points_possible is not a number.`);
            continue;
          } 

          if (!results[learnerId]) {
            results[learnerId] = { id: learnerId, avg: 0, assignments: {}, totalScore: 0, totalPossible: 0 };
          }


          if (submittedDate > dueDate) {
            score *= 0.9;
          }

          results[learnerId].totalScore += score;
          results[learnerId].totalPossible += pointsPossible;

          if (pointsPossible > 0) {
            const scorePercentage = (score / pointsPossible) * 100;
            results[learnerId].assignments[assignment.id] = scorePercentage;
          }else {
            console.error(`Invalid points_possible for assignment ${assignment.id}: must be greater than zero.`);
        }
        }
      }
    }
    for (let learnerId in results) {
      if (results[learnerId].totalPossible > 0) {
        results[learnerId].avg = (results[learnerId].totalScore / results[learnerId].totalPossible) * 100;
      }
    }

    return Object.values(results);

  } catch (error) {
    console.log(error);
  }
}

const finalResults = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(finalResults);

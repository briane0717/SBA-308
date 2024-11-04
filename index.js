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
      points_possible: 150
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
      score: 47
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
try{
if (courseInfo.id !== assignmentGroup.course_id){
  throw Error("These assignments don't belong to this course")
}
const results = {}
const currentDate = new Date()
// console.log(currentDate);

for (let assignment of assignmentGroup.assignments){
  const dueDate = new Date(assignment.due_at)
  if (dueDate > currentDate){
    continue;
  } console.log(`${assignment.name}, due on ${dueDate}`);
  for (let submission of learnerSubmissions) {
    if (submission.assignment_id === assignment.id) {
      const learnerId = submission.learner_id;
      console.log(learnerId);
      const submittedDate = new Date(submission.submission.submitted_at);
      let score = submission.submission.score;
      let pointsPossible = assignment.points_possible
      console.log(score , pointsPossible);
      results[learnerId] = {id: learnerId, avg: 0, assignments:{}, totalScore: 0, totalPossible: 0 }
    }
  }console.log(results);
  return results
}
} catch (error){
  console.log(error);
}
}getLearnerData(courseInfo,assignmentGroup,learnerSubmissions)
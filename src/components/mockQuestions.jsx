const mockQuestions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Computer Personal Unit",
        "Central Process Unit",
        "Computer Processing Unit"
      ]
    },
    {
      category: "Entertainment: Music",
      type: "boolean",
      difficulty: "medium",
      question: "Daft Punk originated in France.",
      correct_answer: "True",
      incorrect_answers: ["False"]
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "hard",
      question: "Which English king was married to Eleanor of Aquitaine?",
      correct_answer: "Henry II",
      incorrect_answers: ["Richard I", "Henry I", "Henry V"]
    },
    // Add more mock questions here if needed
  ];
  
  export default mockQuestions;
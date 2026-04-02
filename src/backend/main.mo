import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import HttpOutcall "http-outcalls/outcall";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type QuizAnswer = {
    questionId : Nat;
    selectedOption : Nat;
  };

  type CareerPath = {
    title : Text;
    skillMap : [Text];
    collegeRecommendations : [Text];
  };

  type ChatSession = {
    questions : [Text];
    answers : [Text];
  };

  type CareerQuiz = {
    questions : [Question];
  };

  type QuizResult = {
    resultId : Text;
    careerScore : [Nat];
    recommendedJob : Text;
    timestamp : Int;
  };

  type Question = {
    id : Nat;
    text : Text;
    options : [Text];
  };
  // Comparison modules
  module QuizResult {
    public func compare(a : QuizResult, b : QuizResult) : Order.Order {
      Text.compare(a.resultId, b.resultId);
    };
  };

  module Question {
    public func compare(a : Question, b : Question) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  // Data Structures
  let quizResultsMap = Map.empty<Principal, QuizResult>();
  let quizQuestions = Map.empty<Nat, Question>();
  var nextQuestionId = 0;

  let careerPaths = Map.fromIter<Nat, CareerPath>([
    (
      1,
      {
        title = "Web Development";
        skillMap = [
          "Learn HTML, CSS, and JavaScript",
          "Master front-end frameworks like React or Angular",
          "Understand back-end technologies like Node.js, Django, or Ruby on Rails",
          "Learn databases (SQL, NoSQL)",
          "Version control with Git",
        ];
        collegeRecommendations = [
          "Stanford University - Computer Science",
          "Massachusetts Institute of Technology (MIT) - Software Engineering",
          "University of California, Berkeley - Web Technologies",
        ];
      },
    ),
    (
      2,
      {
        title = "Cybersecurity";
        skillMap = [
          "Learn networking fundamentals",
          "Understanding operating systems (Linux, Windows)",
          "Master cybersecurity tools and techniques",
          "Learn ethical hacking and penetration testing",
          "Security certifications (CISSP, CEH, CompTIA Security+)",
        ];
        collegeRecommendations = [
          "Carnegie Mellon University - Cybersecurity",
          "Stanford University - Network Security",
          "University of Maryland - Information Assurance",
        ];
      },
    ),
    (
      3,
      {
        title = "Data Science";
        skillMap = [
          "Learn programming languages (Python, R)",
          "Mathematics and statistics",
          "Data analysis and visualization tools (Pandas, Matplotlib)",
          "Machine learning algorithms",
          "Big data technologies (Hadoop, Spark)",
        ];
        collegeRecommendations = [
          "Harvard University - Data Science",
          "University of California, Berkeley - Data Analytics",
          "Massachusetts Institute of Technology (MIT) - AI/ML",
          "Stanford University - Computational Data Science",
        ];
      },
    ),
    (
      4,
      {
        title = "UI/UX Design";
        skillMap = [
          "Learn design principles and color theory",
          "Master design tools (Adobe XD, Figma, Sketch)",
          "Understanding user research and personas",
          "Prototype and wireframe creation",
          "Web and mobile app design best practices",
        ];
        collegeRecommendations = [
          "California College of the Arts - Interaction Design",
          "Savannah College of Art and Design (SCAD) - UX/UI Art",
          "Rhode Island School of Design (RISD) - Digital Design",
          "Carnegie Mellon University - Human-Computer Interaction",
        ];
      },
    ),
    (
      5,
      {
        title = "Cloud Computing";
        skillMap = [
          "Learn cloud platforms (AWS, Azure, Google Cloud)",
          "Understanding virtualization and containerization",
          "Cloud architecture and DevOps",
          "Cloud security best practices",
          "Cloud certifications (AWS Certified Solutions Architect, Google Cloud Professional Cloud Architect)",
        ];
        collegeRecommendations = [
          "University of Texas at Austin - Cloud Computing",
          "Stanford University - Distributed Computing",
          "Carnegie Mellon University - Systems Programming",
          "California Institute of Technology (Caltech) - Cloud Engineering",
        ];
      },
    ),
  ].values());

  // Career Quiz Methods

  public query ({ caller }) func getPredefinedPath(key : Nat) : async CareerPath {
    switch (careerPaths.get(key)) {
      case (null) { Runtime.trap("Path not found. ") };
      case (?path) { path };
    };
  };

  public shared ({ caller }) func addQuestion(question : Question) : async () {
    let newQuestion : Question = {
      question with id = nextQuestionId;
    };
    quizQuestions.add(nextQuestionId, question);
    nextQuestionId += 1;
  };

  public query ({ caller }) func getQuestions() : async [Question] {
    quizQuestions.values().toArray().sort();
  };

  public shared ({ caller }) func submitAnswers(answers : [QuizAnswer], recommendedJob : Text) : async () {
    let score = calculateCareerScore(answers);

    let result : QuizResult = {
      resultId = caller.toText();
      careerScore = score;
      recommendedJob;
      timestamp = 1717177154256;
    };

    quizResultsMap.add(caller, result);
  };

  public query ({ caller }) func hasQuizResults() : async Bool {
    quizResultsMap.containsKey(caller);
  };

  public query ({ caller }) func getQuizResult(user : Principal) : async QuizResult {
    switch (quizResultsMap.get(user)) {
      case (null) { Runtime.trap("User never took the test.") };
      case (?results) { results };
    };
  };

  // Calculate career scoring based on answers
  func calculateCareerScore(answers : [QuizAnswer]) : [Nat] {
    let score = Array.repeat(0, 4);
    score;
  };

  // Session Data
  public query ({ caller }) func transform(input : HttpOutcall.TransformationInput) : async HttpOutcall.TransformationOutput {
    HttpOutcall.transform(input);
  };

  public shared ({ caller }) func fetchAiResponse(endpoint : Text, headers : [HttpOutcall.Header], body : Text) : async Text {
    await HttpOutcall.httpPostRequest(endpoint, headers, body, transform);
  };

  // Chat Session Management
  public query ({ caller }) func getUserAnswers() : async [Text] {
    quizResultsMap.values().toArray().map(func(result) { result.recommendedJob });
  };

  public query ({ caller }) func getAllCareerPaths() : async [CareerPath] {
    careerPaths.values().toArray();
  };
};

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Spinner, Button, Dropdown } from "react-bootstrap";
import mockQuestions from "./mockQuestions";

const TriviaPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [filteredQuestion, setFilteredQuestion] = useState([]);
  const [search, setSearch] = useState('');

  // Function to get one random question
  const loadRandomQuestion = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockQuestions.length);
      const oneQuestion = mockQuestions[randomIndex];
      setQuestions([oneQuestion]); // Keep in array for .map
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadRandomQuestion(); // Load one on initial render
  }, []);
  const filteredByDifficulty = (level) =>{
    const results = mockQuestions.filter(q => q.difficulty === level);
    setFilteredQuestion(results);
  }

  // const handleSearch = (e) => {
  //   e.preventDefault()
    const filterByAns = (ans) => {
      const results = mockQuestions.filter(a => a.correct_answer === ans);
      if (search.trim().toLowerCase() === results.toLowerCase()){
        alert("Correct!");
      }else{
        alert("Try again...")
      }
    }
    // };

    // const handleSubmit = (question) => {
    //   if(search.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()){
    //     alert("✅ Correct!");
    //   } else {
    //     alert("❌ Try again...");
      
    //   }
    // };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h1 className="mb-4">Random Trivia Question</h1>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Difficulty
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => filteredByDifficulty("easy")}>
              Easy
            </Dropdown.Item>
            <Dropdown.Item onClick={() => filteredByDifficulty("medium")}>Medium</Dropdown.Item>
            <Dropdown.Item onClick={() => filteredByDifficulty("hard")}>Hard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Row className="row1">
          {filteredQuestion.map((question, index) => (
            <Col key={index} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Text
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <div>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="answerInput" 
                    placeholder="Answer here.."
                    onChange={e => setSearch(e.target.value)}
                    value={search}/>
                  </div>
                </Card.Body>
                <Button variant="primary" className="submitBtn" onClick={filterByAns}>
                  Submit
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Button variant="primary" onClick={() => window.location.reload()}>
          🔄 Load New Question
        </Button>
      </Container>
    </>
  );
};

export default TriviaPage;
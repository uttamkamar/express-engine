// src/ExpressionEngineUI.js
import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ExpressionEngineUI = () => {
  const [rules, setRules] = useState([
    { key: "age", output: { value: "", operator: ">=", score: "" } },
  ]);
  const [combinator, setCombinator] = useState("and");

  const handleAddRule = () => {
    setRules([
      ...rules,
      { key: "age", output: { value: "", operator: ">=", score: "" } },
    ]);
  };

  const handleDeleteRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index].output[field] = value;
    setRules(updatedRules);
  };

  const handleSubmit = () => {
    const output = {
      rules: [...rules],
      combinator: combinator,
    };
    console.log(output); // Log the output to the console (in a real app, you might send it to a server)
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Expression Engine UI</h2>

      <Form>
        {rules.map((rule, index) => (
          <Row key={index} className="mb-3 ui">
            <Col>
              <Form.Group>
                <Form.Label>Rule Type</Form.Label>
                <Form.Control as="select" value={rule.key} disabled>
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  as="select"
                  value={rule.output.operator}
                  onChange={(e) =>
                    handleInputChange(index, "operator", e.target.value)
                  }
                >
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value=">=">{">="}</option>
                  <option value="<=">{"<="}</option>
                  <option value="=">{"="}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  value={rule.output.value}
                  onChange={(e) =>
                    handleInputChange(index, "value", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  value={rule.output.score}
                  onChange={(e) =>
                    handleInputChange(index, "score", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col xs="auto" className="d-flex align-items-end">
              <Button variant="danger" onClick={() => handleDeleteRule(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Form.Group>
          <Form.Label>Connector Type</Form.Label>
          <Form.Control
            as="select"
            value={combinator}
            onChange={(e) => setCombinator(e.target.value)}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>
        <div className="mt-3">
          <Button className="button" variant="primary" onClick={handleAddRule}>
            Add Rule
          </Button>

          <Button className="button" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ExpressionEngineUI;

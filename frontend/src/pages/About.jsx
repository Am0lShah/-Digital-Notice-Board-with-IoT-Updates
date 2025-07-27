import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center text-center mb-4">
        <Col lg={8}>
          <h2 className="mb-3">About Our Recycling Platform</h2>
          <p className="text-muted">
            Our mission is to promote a sustainable lifestyle through community-driven recycling awareness and goal tracking. Whether you're a beginner or an eco-warrior, we provide a platform to share, learn, and grow together.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>User-Friendly Authentication</Card.Title>
              <Card.Text>
                Users can securely register and log in to access personalized features and interact with the community.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Create & Share Tips</Card.Title>
              <Card.Text>
                Share your recycling tips and tricks through posts. Create, update, or delete posts easily, and help spread awareness.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Like, Comment & Share</Card.Title>
              <Card.Text>
                Engage with the community by liking, commenting on, and sharing helpful posts to motivate others.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Track Your Daily Goals</Card.Title>
              <Card.Text>
                Set daily recycling goals and track your progress over weekly and monthly periods with our intuitive dashboard.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Community-Driven Growth</Card.Title>
              <Card.Text>
                Our platform grows with your input — learn from others, motivate yourself, and make an impact together.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Eco-Friendly Mission</Card.Title>
              <Card.Text>
                We aim to educate and inspire people of all ages to take simple steps toward a cleaner, greener planet.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

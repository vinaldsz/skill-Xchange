import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function About() {
  const steps = [
    {
      title: "Sign Up & Create Profile",
      text: "Register and showcase your skills, expertise levels, and what you're interested in learning.",
    },
    {
      title: "Find Your Match",
      text: "Browse skills, connect with potential matches, and propose skill exchanges that benefit both parties.",
    },
    {
      title: "Exchange & Grow",
      text: "Teach what you know, learn what you don't, and rate each other after successful exchanges.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-24 px-4 mb-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            About Skill Xchange
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto leading-relaxed">
            A platform designed to foster learning and collaboration by enabling
            individuals to trade skills.
          </p>
        </div>
      </section>
      <div>
        <h1></h1>
      </div>
      {/* Mission Section */}
      <section className="mb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Mission
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that knowledge should be shared and accessible to
              everyone. Our goal is to create a community-driven learning space
              where people can empower each other through skill exchange. By
              connecting individuals with complementary skills, we foster
              meaningful connections and make learning more personal, practical,
              and engaging.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section - Bootstrap Card Style */}
      <section className="bg-gray-100 py-24 px-4 mb-16">
        <Container>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
            How It Works
          </h2>

          <Row className="justify-content-center g-4">
            {steps.map((step, index) => (
              <Col xs={12} md={4} key={index}>
                <Card bg="dark" text="white" className="h-100">
                  <Card.Header className="text-center fw-bold">
                    Step {index + 1}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{step.title}</Card.Title>
                    <Card.Text>{step.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Start Exchanging Skills?
          </h2>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-md transition">
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2025 Skill Xchange. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

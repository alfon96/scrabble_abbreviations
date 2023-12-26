import React, { useEffect, useState } from "react";
import { Button, Form, Card, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Points = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [toReset, setToReset] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (points > 0) {
      setTotalPoints((prevValue) => prevValue + points);
    }
  };

  useEffect(() => {
    const savedPoints = localStorage.getItem("totalPoints");
    if (savedPoints) {
      setTotalPoints(Number(savedPoints));
    }
  }, []);

  useEffect(() => {
    if (totalPoints > 0) {
      localStorage.setItem("totalPoints", totalPoints);
    }
    if (totalPoints === 0 && toReset) {
      localStorage.setItem("totalPoints", totalPoints);
      setToReset(false);
    }
  }, [totalPoints]);

  const handleReset = () => {
    setTotalPoints(0);
    setShowModal(false);
    setToReset(true);
  };

  return (
    <>
      <Card className="my-5 mx-4 mx-md-5 rounded-5 shadow-sm ">
        <Card.Body className="mx-4 d-flex flex-column align-items-center justify-content-center">
          <Card.Title className="display-5 text-center">Punteggio</Card.Title>
          <Form
            className="row justify-content-center align-items-center my-2"
            onSubmit={handleSubmit}
          >
            <Form.Group className="col-3 text-center">
              <Form.Label className="text-muted fw-semibold">Totale</Form.Label>
              <Form.Control
                type="number"
                placeholder="000"
                readOnly
                className="text-center"
                value={totalPoints}
              />
            </Form.Group>
            <Form.Group className="col-7 text-center">
              <Form.Label>Aggiungi</Form.Label>
              <Form.Control
                type="number"
                className="text-center"
                value={points}
                onChange={(e) => setPoints(Math.max(0, Number(e.target.value)))}
              />
            </Form.Group>
            <Form.Group className="col-2 align-self-end">
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(true)}
                title="Reset"
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </Button>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="col-12 mt-3 d-none"
            >
              Aggiungi
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal size="md" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Azzera Punteggio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sei sicuro di voler azzerare il punteggio?</p>
          <Row className="justify-content-end">
            <Button
              variant="outline-secondary"
              className="col-2 me-2"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
            <Button variant="primary" className="col-3" onClick={handleReset}>
              Sì
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(Points);

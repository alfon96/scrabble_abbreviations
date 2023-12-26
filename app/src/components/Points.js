import React, { useEffect, useState } from "react";
import { Button, Form, Card, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Points = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const [toReset, setToReset] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redo, setRedo] = useState([]);
  const [undo, setUndo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (points > 0) {
      if (totalPoints) {
        setUndo((points) =>
          points ? [...points, totalPoints] : [totalPoints]
        );
      }
      setTotalPoints((prevValue) => prevValue + points);

      setPoints(0);
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

  const handleChangePointsToAdd = (e) => {
    const value = e.target.value;
    const pointsToAdd =
      value && !isNaN(value) && Number(value) >= 0 ? Number(value) : "";
    setPoints(pointsToAdd);
  };

  const handleUndo = () => {
    if (undo && undo.length > 0) {
      const previousValue = undo[undo.length - 1];
      setTotalPoints(previousValue);
      setUndo((prevValue) => (prevValue ? prevValue.slice(0, -1) : []));
      setRedo((prevValue) =>
        prevValue ? [...prevValue, totalPoints] : [totalPoints]
      );
    }
  };

  const handleRedo = () => {
    if (redo && redo.length > 0) {
      const valueToRestore = redo[redo.length - 1];
      setTotalPoints(valueToRestore);
      setRedo((prevValue) => (prevValue ? prevValue.slice(0, -1) : []));
      setUndo((prevValue) =>
        prevValue ? [...prevValue, totalPoints] : [totalPoints]
      );
    }
  };

  return (
    <>
      <Card className="my-5 mx-4 mx-md-5 rounded-5 shadow-sm ">
        <Card.Body className=" d-flex flex-column align-items-center justify-content-center">
          <Card.Title className="display-5 text-center">Punteggio</Card.Title>
          <Form
            className="container-fluid row justify-content-center align-items-center my-2"
            onSubmit={handleSubmit}
          >
            <Form.Group className="col-4 col-md-3 text-center  col-xl-2">
              <Form.Label className="text-muted fw-semibold ">
                Totale
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="000"
                readOnly
                className="text-center"
                value={totalPoints}
              />
            </Form.Group>
            <Form.Group className="col-5 col-md-3 text-center col-xl-2">
              <Form.Label>Aggiungi</Form.Label>
              <Form.Control
                type="text"
                className="text-center"
                placeholder="0"
                value={points}
                onChange={handleChangePointsToAdd}
              />
            </Form.Group>
            <ButtonGroup
              aria-label="Comandi Punteggio"
              className="col-7 mt-4 mt-md-0 col-md-3  col-xl-2 justify-content-center align-self-end"
            >
              <Button
                variant="outline-secondary"
                onClick={handleUndo}
                title="Annulla"
                className={`${undo.length <= 0 && "disabled"} `}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </Button>

              <Button
                variant="outline-secondary"
                onClick={handleRedo}
                title="Ripeti"
                className={`${redo.length <= 0 && "disabled"} `}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
              </Button>

              <Button
                variant="outline-dark"
                onClick={() => setShowModal(true)}
                title="Azzera Punteggio"
                className={`${totalPoints <= 0 && "disabled"} `}
              >
                <FontAwesomeIcon icon={faEraser} />
              </Button>
            </ButtonGroup>

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

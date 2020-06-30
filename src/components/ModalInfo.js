import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const ModalInfo = ({ toggle, handleClose, data }) => {
  const formatDate = (date) => {
    const localDate = new Date(date);
    return `${localDate.getDay()}/${localDate.getMonth()}/${localDate.getFullYear()}`;
  };
  const [image, setImage] = useState();
  useEffect(() => {
    if (toggle) {
      import(`../assets/static/${data.name}.jpg`).then((img) => {
        console.log(img);
        setImage(img.default);
      });
    }
  }, [toggle]);
  return (
    <div>
      <Modal isOpen={toggle} className="" backdrop keyboard size="lg">
        <ModalHeader toggle={handleClose}> {data.name}</ModalHeader>
        <ModalBody>
          {/* <img width="200px" src={ImageNave} alt="" /> */}
          <Container>
            <Row>
              <Col>
                <Card>
                  <CardImg top width="100%" src={image} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>
                      <strong>Cost in credits:</strong> {data.cost_in_credits}
                    </CardTitle>
                    <CardSubtitle></CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="6">
                <ListGroup>
                  <ListGroupItem>
                    <strong>MGLT:</strong> {data.MGLT}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Cargo capacity:</strong> {data.cargo_capacity}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Consumables:</strong> {data.consumables}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Crew:</strong> {data.crew}
                  </ListGroupItem>

                  <ListGroupItem>
                    <strong>Created:</strong> {formatDate(data.created)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Edited:</strong> {formatDate(data.edited)}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="6">
                <ListGroup>
                  <ListGroupItem>
                    <strong>Hyperdrive rating:</strong> {data.hyperdrive_rating}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Length:</strong> {data.length}
                  </ListGroupItem>

                  <ListGroupItem>
                    <strong>Max atmosphering speed:</strong>{" "}
                    {data.max_atmosphering_speed}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Model:</strong> {data.model}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Passengers:</strong> {data.passengers}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Starship class:</strong> {data.starship_class}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Manufacturer:</strong> {data.manufacturer}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInfo;

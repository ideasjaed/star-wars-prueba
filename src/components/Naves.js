import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import ModalInfo from "../components/ModalInfo";
import { getShips, searchData } from "../actions";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Naves = ({ getShips, searchData, ships, pages }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState(null);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  useEffect(() => {
    setShowLoader(true);
    getShips(1, () => {
      setShowLoader(false);
    });
  }, []);

  const handleShowModal = (index) => {
    setItemSelect(index);
    setShowModal(true);
  };

  const getPage = (page) => {
    console.log(page);
    console.log(pageIndex);
    if (page !== pageIndex) {
      setPageIndex(page);
      setShowLoader(true);
      getShips(page, () => {
        setShowLoader(false);
      });
    }
  };

  const handleSearch = (page = 1) => {
    setShowLoader(true);
    setPageIndex(page);
    
    searchData(searchQuery, searchFilter,  page, () => {
      setShowLoader(false);
    }); 
  }; 

  const resetFilter = () =>{
    setSearchQuery('');
    setSearchFilter(null);
    searchData('', null,  1, () => {
      setShowLoader(false);
    }); 
  }

  return (
    <div className="listado_naves">
      <br />
      <Container>
        <Row>
          <Col xs="12" md="12">
            <InputGroup>
            <InputGroupButtonDropdown addonType="prepend" isOpen={splitButtonOpen}  toggle={toggleSplit}>
              <Button outline>
                {searchFilter === null && 'Seleccionar filtro' }
                {searchFilter === 'name' && 'Nombre' }
                {searchFilter === 'model' && 'Modelo' }
              </Button>
              <DropdownToggle split outline />
              <DropdownMenu>
                <DropdownItem onClick={() => resetFilter()}>Borrar Filtro</DropdownItem>
                <DropdownItem onClick={() => setSearchFilter('name')}>Nombre</DropdownItem>
                <DropdownItem onClick={() => setSearchFilter('model')}>Modelo</DropdownItem>
              </DropdownMenu>
              </InputGroupButtonDropdown>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button  color="info" onClick={() => {handleSearch();}}>
                  Search
                </Button>
              </InputGroupAddon>

            </InputGroup>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs="12">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Cost in credits</th>
                  <th>Passengers</th>
                  <th>Cargo capacity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ships.length &&
                  ships.map((el, index) => (
                    <tr key={index.toString()}>
                      <td>{el.name}</td>
                      <td>{el.model}</td>
                      <td>{el.cost_in_credits}</td>
                      <td>{el.passengers}</td>
                      <td>{el.cargo_capacity}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => handleShowModal(index)}
                        >
                          Ver mas
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Pagination>
              {[...Array(pages.pageCount).keys()].map((el, index) => (
                <PaginationItem
                  active={index + 1 === pageIndex}
                  key={index.toString()}
                >
                  <PaginationLink
                    onClick={() => {
                      if (searchQuery.length) {
                        handleSearch(el + 1);
                      } else {
                        getPage(el + 1);
                      }
                    }}
                  >
                    {el + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </Pagination>
          </Col>
        </Row>
        <ModalInfo
          toggle={showModal}
          handleClose={() => setShowModal(false)}
          data={ships.length && ships[itemSelect]}
        />
      </Container>
      {showLoader && <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ships: state.naves.ships,
  pages: state.pages,
});
const mapDispatchToProps = {
  getShips,
  searchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Naves);

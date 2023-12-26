import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { useCallback, useEffect, useState } from "react";
import GroupedAbbreviations from "./components/GroupedAbbreviations";
import abbreviazioni from "./data/abbreviazioni.json";
import { createSubDicts, matchesSearchQuery } from "./utils/utils";
import Points from "./components/Points";

function App() {
  const [filteredData, setFilteredData] = useState(abbreviazioni);
  const [resultShown, setResultShown] = useState([]);

  useEffect(() => {
    // Create sub dictionaries for displaying the letter and the list of abbreviations that meets the filter.
    const filterResult = createSubDicts(filteredData);
    setResultShown(filterResult);
  }, [filteredData]);

  const handleInput = useCallback((e) => {
    const searchQuery = e.target.value;
    // Find the search query in the dictionary keys if its not none
    if (searchQuery !== "") {
      const newData = Object.entries(abbreviazioni).filter(([key, value]) =>
        matchesSearchQuery(key, searchQuery)
      );
      const newDataObj = Object.fromEntries(newData);

      setFilteredData(newDataObj);
    }
    // If there's no query return all the dictionary
    else {
      setFilteredData(abbreviazioni);
    }
  }, []);

  return (
    <>
      <Points />
      <Card className="my-5 mx-4 mx-md-5 rounded-5 shadow-sm ">
        <Card.Body className="mx-4 d-flex flex-column align-items-center justify-content-center">
          <Card.Title className="display-5 text-center">
            Abbreviazioni
          </Card.Title>
          <InputGroup className="mb-3 mt-4 w-75">
            <Form.Control
              placeholder="ex. SPQR"
              aria-label="Cerca abbreviazioni"
              aria-describedby="button-search"
              className="text-center "
              onChange={handleInput}
            />
            <Button variant="outline-secondary" id="button-search">
              Cerca
            </Button>
          </InputGroup>

          <section className="container-fluid row align-items-center gy-3 mt-4">
            {resultShown.length > 0 ? (
              resultShown.map((group, index) => (
                <GroupedAbbreviations key={index} group={group} />
              ))
            ) : (
              <p className="text-center my-5 fst-italic">
                Non ci sono abbreviazioni per queste lettere.
              </p>
            )}
          </section>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;

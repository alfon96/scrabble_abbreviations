import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

const abbreviazioni = {
  "a.C.": "Avanti Cristo",
  "A.C.I.": "Automobile Club It.",
  "A.M.": "Aeronautica Militare",
  ABS: "Anti Brake-locking System, sistema frenante antibloccaggio",
  AG: "Agrigento",
  AL: "Alessandria",
  AN: "Ancona",
  AO: "Aosta",
  AP: "Ascoli Piceno",
  AQ: "L’Aquila",
  AR: "Arezzo",
  ASL: "Azienda Sanitaria Locale",
  AT: "Asti",
  AV: "Avellino",
  BA: "Bari",
  BCE: "Banca Centrale Europea",
  BG: "Bergamo",
  BI: "Biella",
  BIT: "Binary Digit, in informatica è l’unità minima di informazione",
  BL: "Belluno",
  BN: "Benevento",
  BO: "Bologna",
  BR: "Brindisi",
  BS: "Brescia",
  BZ: "Bolzano",
  "C.A.I": "Club Alpino Italiano",
  "C.A.P.": "Codice avviamento postale",
  "C.R.I.": "Croce Rossa Italiana",
  CA: "Cagliari",
  CAF: "Commissione di Appello Federale",
  CB: "Campobasso",
  CC: "Corpo Carabineiri",
  CD: "Corpo diplomatico",
  CDA: "Consiglio Di Amministrazione",
  CE: "Caserta",
  CEI: "Conferenza Episcopale Italiana",
  CH: "Chieti",
  CIA: "Central Inteligence Agency",
  CIO: "Comitato Internazionale Olimpico",
  CL: "Caltanisetta",
  cm: "Centimetro",
  CN: "Cuneo",
  CNN: "Cable News Network",
  CNR: "Consiglio Nazionale delle Ricerche",
  CO: "Como",
  CPU: "Central Processing Unit",
  CR: "Cremona",
  CS: "Cosenza",
  CSM: "Consiglio Superiore della Magistratura",
  CT: "Catania",
  cv: "Cavallo vapore",
  CZ: "Catanzaro",
  "d.C.": "Dopo Cristo",
  dag: "Decagrammo",
  dam: "Decametro",
  DDL: "Disegno Di Legge",
  dg: "Decigrammo",
  DIGOS: "Divisione Investigazioni Generali e Operazioni Speciali",
  dl: "Decilitro",
  dm: "Decimetro",
  DNA: "DesossiriboNucleic Acid, Acido desossiribonucleico",
  DOC: "Denominazione di Origine Controllata",
  DOS: "Disk Operating system",
  DPEF: "Documento di Programmazione Economica e Finanziaria",
  DPR: "Decreto del Presidente della Repubblica",
  DVD: "Digital Versatile Disc",
  "E.I.": "Esercito Italiano",
  "ecc.": "eccetera",
  EN: "Enna",
  EQ: "Equatore",
  "es.": "esempio",
  ET: "Egitto",
  FAQ: "Frequently Asked Questions",
  FBI: "Federal Bureau Investigation",
  FC: "Forlì-Cesena",
  FE: "Ferrara",
  FG: "Foggia",
  FI: "Firenze",
  FL: "Liechtenstein",
  FMI: "Fondo Monetario Internazionale",
  FR: "Frosinone",
  FS: "Ferrovie dello Stato",
  GB: "Gran Bretagna",
  GBZ: "Gibilterra",
  GDF: "Guardia Di Finanza",
  GE: "Genova",
  GIF: "Graphic Interchange Format",
  GIP: "Giudice per la Indagini Preliminari",
  GO: "Gorizia",
  GPL: "Gas di Petrolio Liquefatto",
  GR: "Grosseto",
  GU: "Gazzetta Ufficiale",
  HAG: "Dal nome della società tedesca",
  HD: "Hard Disk",
  HP: "cavallo potenza",
  HTML: "HyperText Markup Language",
  Http: "HyperText Transfer Protocol",
  IM: "Imperia",
  INRI: "Jesus Nazarenus Rex Judaeorum",
  IS: "Isernia",
  LAN: "Local Area Network",
  LASER: "Laser",
  "lat.": "Latitudine",
  LC: "Lecco",
  LCD: "Liquid Cristal Display",
  LE: "Lecce",
  LED: "Light Emitting diode",
  LI: "Livorno",
  LO: "Lodi",
  "long.": "Longitudine",
  LT: "Latina",
  LU: "Lucca",
  MB: "Megabyte",
  MC: "Macerata",
  ME: "Messina",
  MI: "Milano",
  MIB: "Milano Indice Borsa",
  MIBTEL: "Milano Indice Borsa TELematico",
  MIN: "Minuto",
  MM: "Marina Militare",
  MMS: "Multimedia Message System",
  MN: "Mantova",
  MO: "Modena",
  "mq.": "Metro quadrato",
  MS: "Massa Carrara",
  MT: "Matera",
  NA: "Napoli",
  NAS: "Nucleo Antisofisticazione Sanità",
  NASA: "National Aeronautic and Space Administration",
  NASDAQ: "National Association of Securities Dealers Automated Quotations",
  NB: "Nota Bene",
  NO: "Novara",
  NU: "Nuoro",
  OGM: "Organismo Geneticamente Modificato",
  ONU: "Organizzazione Nazioni Unite",
  OR: "Oristano",
  PA: "Palermo",
  PAL: "Phase Ateration Line",
  "par.": "paragrafo",
  PC: "Piacenza",
  PD: "Padova",
  PE: "Pescara",
  PG: "Perugia",
  PH: "In chimica indica il grado di acidità o di basicità di una soluzione.",
  PI: "Pisa",
  PIL: "Prodotti Interno Lordo",
  PIN: "Personal Identification Number",
  PL: "Polonia",
  PN: "Pordenone",
  PO: "Prato",
  POP: "Genere musicale",
  PR: "Parma",
  PT: "Pistoia",
  PU: "Pesaro-Urbino",
  PV: "Pavia",
  PVC: "Polivinilcloruro",
  PZ: "Potenza",
  QB: "Quanto basta",
  QC: "Qualcuno",
  QG: "Quartier Generale",
  QI: "Quoziente Intellettivo",
  RA: "Ravenna",
  RAI: "Radiotelevisione Italiana",
  RAM: "Random Access Memory, memoria ad accesso casuale",
  RC: "Reggio Calabria",
  RCA: "Responsabilità Civile Autoveicoli",
  RE: "Reggio Emilia",
  REM: "Rapid Eye Movements",
  RG: "Ragusa",
  RH: "Fattore antigene del sangue",
  RI: "Rieti",
  RM: "Roma",
  RN: "Rimini",
  RO: "Rovigo",
  ROM: "Read Only Memory, memoria a sola lettura",
  RSVP: "Repondez S’il Vous Plait",
  "S.O.S.": "Save Our Souls",
  "S.P.Q.R.": "Senatus Populusque Romanus",
  SA: "Salerno",
  SCART: "Tipo di connettore (televisore e computer)",
  SI: "Siena",
  SIM: "Scheda telefonica",
  SMS: "Short Message System",
  SO: "Sondrio",
  SP: "La Spezia",
  SPA: "Società per azioni",
  SR: "Siracusa",
  SRL: "Società a Responsabilità Limitata",
  SS: "Sassari",
  SV: "Savona",
  TA: "Taranto",
  TE: "Teramo",
  TFR: "Trattamento Fine Rapporto",
  TG: "TeleGiornale",
  TN: "Trento",
  TNT: "Tritolo",
  TO: "Torino",
  TP: "Trapani",
  TR: "Terni",
  TS: "Trieste",
  TV: "Treviso",
  TVB: "Ti Voglio Bene",
  TVTB: "Ti Voglio Tanto Bene",
  UD: "Udine",
  UE: "Unione Europea",
  URL: "Uniform Resource Locator",
  UT: "Antico nome della nota musicale DO",
  "V.M.": "Vietato ai Minori",
  VA: "Varese",
  VB: "Verbania",
  VC: "Vercelli",
  VE: "Venezia",
  VF: "Vigili del Fuoco",
  VI: "Vicenza",
  VR: "Verona",
  VT: "Viterbo",
  VV: "Vibo Valentia",
  ZIP: "In informatica ormai diventato sinonimo di compressione di file",
};

function App() {
  const [filteredData, setFilteredData] = useState(abbreviazioni);
  const [resultShown, setResultShown] = useState([]);

  useEffect(() => {
    // Create sub dictionaries for displaying the letter and the list of abbreviations that meets the filter.
    const filterResult = createSubDicts(filteredData);
    setResultShown(filterResult);
  }, [filteredData]);

  const matchesSearchQuery = (key, searchQuery) => {
    // Cerca la corrispondenza delle lettere nell'abbreviazione anche non nell' ordine corretto.
    searchQuery = searchQuery.toLowerCase();
    key = key.toLowerCase();

    for (let char of searchQuery) {
      if (!key.includes(char)) {
        return false;
      }
    }
    if (searchQuery.length > key.length) {
      return false;
    }

    if (searchQuery.length === key.length) {
      const regex = new RegExp([...searchQuery.toLowerCase()].join(".*"), "i");
      return regex.test(key);
    }

    return true;
  };

  const createSubDicts = (data) => {
    const resultArray = [];

    Object.keys(data).forEach((key) => {
      const firstLetter = key.charAt(0).toUpperCase();
      let group = resultArray.find((item) => item.letter === firstLetter);

      if (!group) {
        group = { letter: firstLetter, items: [] };
        resultArray.push(group);
      }

      group.items.push({ key, value: data[key] });
    });

    return resultArray;
  };

  const handleInput = (e) => {
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
  };

  // e poi usalo nel tuo filtro

  return (
    <Card className="my-5 mx-4 mx-md-5 rounded-5 shadow-sm ">
      <Card.Body className="mx-4 d-flex flex-column align-items-center justify-content-center">
        <Card.Title className="display-5 text-center">Abbreviazioni</Card.Title>
        <InputGroup className="mb-3 mt-4 w-75">
          <Form.Control
            placeholder="Cerca abbreviazioni"
            aria-label="Cerca abbreviazioni"
            aria-describedby="button-search"
            className="text-center "
            onChange={handleInput}
          />
          <Button variant="outline-secondary" id="button-search">
            Cerca
          </Button>
        </InputGroup>

        <div className="container-fluid row align-items-center gy-3 mt-4">
          {resultShown.length > 0 &&
            resultShown.map((group, index) => (
              <>
                <h3 className="col-12 col-lg-3 col-xl-4  text-center">
                  {group.letter}
                </h3>
                <ul className="col-12 col-lg-9 col-xl-8  list-group list-group-flush">
                  {group.items.map((item) => (
                    <li key={item.key} className="list-group-item">
                      <span className="fw-bold">{item.key}</span>: {item.value}
                    </li>
                  ))}
                </ul>
                <hr />
              </>
            ))}
        </div>
        {resultShown.length <= 0 && (
          <p className="text-center my-5 fst-italic">
            Non ci sono abbreviazioni per queste lettere.
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export default App;

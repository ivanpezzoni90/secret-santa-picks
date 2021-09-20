import styled from 'styled-components';
import React, { useCallback, useState } from 'react';

import SwitchToggle from '../ui/SwitchToggle';
import AddNameComponent from './AddNameComponent';

import { generateSanta } from '../helpers';

const GenerateSantaButton = styled.button`
  padding: 1em;
  border-radius: .5em;
  background-color: #ba0c2f;
  &:hover {
    background-color: #d4183e;
  }
  color: white;
  font-size: 18px;
  border: none;
`;

const ButtonWrapper = styled.div`
  padding: 2em;
`;

const GeneralWrapper = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PicksTable = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const Pick = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  text-align: left;
`;

const NameWrapper = styled.div`
  padding: 0 0.5em;
  width: 5em;
`;

// TODO: Temp addressMap, retrieve map from interface
const addressMap = {
  Ivan: "ivan.pezzoni@gmail.com",
  Emma: "lascogna@gmail.com",
  Filippo: "redeneck@gmail.com",
  Cecilia: "lascogna@gmail.com",
  Aleo: "Aleo@aa",
  Alea: "Alea@aa",
  Erica: "Erica@bb",
  Poddi: "Poddi@cc",
  Nic: "Nic@dd",
  Giada: "Giada@bb",
  Carva: "Carva@mm",
  Enrico: "Enry@bbb"
};

const exc = {
  Ivan: ["Emma", "Filippo"],
  Emma: ["Ivan", "Filippo"],
  Filippo: ["Cecilia", "Emma", "Ivan"],
  Cecilia: ["Filippo"],
  Aleo: ["Alea"],
  Alea: ["Aleo"],
  Erica: ["Poddi"],
  Poddi: ["Erica"],
  Nic: ["Giada"],
  Giada: ["Nic"],
  Carva: [],
  Enrico: []
};

const getSecretSantaMessage = (sender, receiver) => {
  return `Ciao ${sender}, <br/> Il tuo secret santa di quest'anno e' ${receiver}.`;
};

const printSecretSantaResults = (picks, exceptions) => {
  console.log(picks);
  // TODO: PRINT RESULTS INSIDE REACT APP
};

const sendSecretSantaMails = (picks, addressMap, exceptions) => {
    Object.keys(picks).forEach(pick => {
      console.log('Secret santa for ', pick, ' is ', picks[pick]);
      console.log('Sending email to ', addressMap[pick], ': "Your secret santa is ', picks[pick], '".');
      console.log('Email body: ', getSecretSantaMessage(pick, picks[pick]));
      // TODO: Capire come usare SMTPjs
      // Email.send("{sender}",
      //   addressMap[pick],
      //   "Secret Santa",
      //   getSecretSantaMessage(pick, picks[pick]),
      //   "{smtp}",
      //   "{account}",
      //   "{code}",
      //   function done(message) { console.log("sent", message) });
    });
};

const SecretSantaComponent = () => {
  const [shouldPrintResults, setShouldPrintResults] = useState(false);
  const [picks, setPicks] = useState({});

  const generateSantaCb = useCallback(() => {
    const picks = generateSanta(addressMap, exc);
    setPicks(picks);
    if (shouldPrintResults) {
      console.log(picks);
    }
  }, [setPicks, shouldPrintResults]);

  const onPrintResultsChange = useCallback(() => {
    setShouldPrintResults(!shouldPrintResults);
  }, [shouldPrintResults]);

  return (
    <GeneralWrapper>
      <AddNameComponent/>
      <SwitchToggle
        label="Print results"
        onClick={onPrintResultsChange}
      />
      <ButtonWrapper>
        <GenerateSantaButton
          onClick={generateSantaCb}
        >
          Generate Santa!
        </GenerateSantaButton>
      </ButtonWrapper>
      {
        Object.keys(picks).length > 0 ? (
          <PicksTable>
            <Pick>
              <NameWrapper>Gifter</NameWrapper>
              <NameWrapper>Receiver</NameWrapper>
            </Pick>
            {
              Object.entries(picks).map(([name, pick]) => {
                return (
                  <Pick
                    key={`${name}_${pick}`}
                  >
                    <NameWrapper>{name}</NameWrapper>
                    <NameWrapper>{pick}</NameWrapper>
                  </Pick>
                )
              })
            }
          </PicksTable>
        ) : null
      }
    </GeneralWrapper>
  );
}

export default SecretSantaComponent;
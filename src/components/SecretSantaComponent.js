import styled from 'styled-components';
import React, { useCallback, useState, useMemo } from 'react';
import JSONEditor from './JsonEditor';

import SwitchToggle from '../ui/SwitchToggle';

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
  ${props => props.disabled
    ? (`
      opacity: 0.5;
      pointer-events: none,
      cursor: not-allowed
    `)
    : ''
  }
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

const placeholder = [
  {
    name: "Mario",
    email: "mmmm@bbbb.it",
    exceptions: ["Luigi"]
  },
  {
    name: "Luigi",
    email: "mmmm@bbbb.it",
    exceptions: ["Luigi"]
  },
  {
    name: "Bowser",
    email: "mmmm@bbbb.it",
    exceptions: []
  },
  {
    name: "Wario",
    email: "mmmm@bbbb.it",
    exceptions: []
  }
];

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
  const [shouldPrintResults, setShouldPrintResults] = useState(true);
  const [picks, setPicks] = useState({});
  const [data, setData] = useState([]);

  const { addressMap, exc } = useMemo(
    () => {
      return data.reduce((acc, d) => {
        return Object.assign({}, acc, {
          addressMap: Object.assign({}, acc.addressMap, {
            [d.name]: d.email
          }),
          exc: Object.assign({}, acc.exc, {
            [d.name]: d.exceptions
          })
        })
      }, {});
    },
    [data]
  );
  console.log(addressMap, exc);

  const generateSantaCb = useCallback(() => {
    const p = generateSanta(addressMap, exc);
    setPicks(p);
    if (shouldPrintResults) {
      console.log(p);
    }
  }, [addressMap, exc, shouldPrintResults]);

  const onPrintResultsChange = useCallback(() => {
    setShouldPrintResults(!shouldPrintResults);
  }, [shouldPrintResults]);

  const onChangeData = useCallback((newData) => {
    console.log('json ', newData);
    setData(newData);
  }, [setData]);

  return (
    <GeneralWrapper>
      <JSONEditor
        json={placeholder}
        onChangeJSON={onChangeData}
      />
      {/* <SwitchToggle
        label="Print results"
        onClick={onPrintResultsChange}
      /> */}
      <ButtonWrapper>
        <GenerateSantaButton
          disabled={data.length === 0}
          onClick={generateSantaCb}
        >
          Generate Santa!
        </GenerateSantaButton>
      </ButtonWrapper>
      {shouldPrintResults ? (
        // TODO: Move this in separate function
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
      ) : null}
    </GeneralWrapper>
  );
}

export default SecretSantaComponent;
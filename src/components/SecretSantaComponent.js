import styled from 'styled-components';
import React, { useCallback, useState, useMemo, Fragment } from 'react';
import emailjs, { init } from 'emailjs-com';
import JSONEditor from './JsonEditor';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

import { generateSanta } from '../helpers';
import ParticipantsComponent from './ParticipantsComponent';

const ButtonWrapper = styled.div`
  padding: 2em;
`;

const GeneralWrapper = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
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

const WizardButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const WizardButton = styled.div`
  padding: 0.5em 1em 0.5em 1em;
`;

const placeholder = [
  {
    name: "",
    email: "",
    exceptions: [""]
  }
];

const getSecretSantaMessage = (sender, receiver) => {
  // TODO: Customize/locale message?
  return `Ciao ${sender}, <br/> Il tuo secret santa di quest'anno e' ${receiver}.`;
};

const printResults = (picks) => {
  return Object.keys(picks).length > 0 ? (
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
};

const sendSecretSantaMails = (picks, addressMap) => {
    Object.keys(picks).forEach(pick => {
      console.log('Secret santa for ', pick, ' is ', picks[pick]);
      console.log('Sending email to ', addressMap[pick], ': "Your secret santa is ', picks[pick], '".');
      console.log('Email body: ', getSecretSantaMessage(pick, picks[pick]));

      // TODO: INSERT EMAILJS service and template id
      // emailjs.send('default_service', 'template_xxxxxxxxx', {
      //   user_name: pick,
      //   user_email: addressMap[pick],
      //   message: getSecretSantaMessage(pick, picks[pick])
      // })
      // .then(function(response) {
      //   console.log('SUCCESS!', response.status, response.text);
      // }, function(error) {
      //   console.log('FAILED...', error);
      // });
    });
};

// TODO: Insert EmailJS user
// init("");

const SecretSantaComponent = () => {
  const [shouldPrintResults, setShouldPrintResults] = useState(true);
  const [shouldSendEmails, setShouldSendEmails] = useState(false);
  // TODO: JSON should not be default once participants feature is completed
  // const [shouldUseJson, setShouldUseJson] = useState(false);
  const [shouldUseJson, setShouldUseJson] = useState(true);

  const [picks, setPicks] = useState({});
  const [data, setData] = useState([]);
  const [wizardStatus, setWizardStatus] = useState(0);

  const { addressMap = [], exc = [] } = useMemo(
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
  console.log('map + exc', addressMap, exc);

  const generateSantaCb = useCallback(() => {
    const p = generateSanta(addressMap, exc);
    setPicks(p);
    if (shouldPrintResults) {
      console.log(p);
    }
    if (shouldSendEmails) {
      sendSecretSantaMails(p, addressMap);
    }
  }, [addressMap, exc, shouldPrintResults, shouldSendEmails]);

  const onPrintResultsChange = useCallback(() => {
    setShouldPrintResults(!shouldPrintResults);
  }, [shouldPrintResults]);

  const onSendEmailsChange = useCallback(() => {
    setShouldSendEmails(!shouldSendEmails);
  }, [shouldSendEmails]);

  const onUseJsonChange = useCallback(() => {
    setShouldUseJson(!shouldUseJson);
  }, [shouldUseJson]);

  const onChangeJSONData = useCallback((newData) => {
    setData(newData);
  }, [setData]);

  const onUpdateNames = useCallback((newNames) => {
    // Generate data from names only
    const newData = data.length === 0
      ? newNames.map(n => ({ name: n }))
      : data.map((d, i) => (Object.assign({}, d, { name: newNames[i] })));
    setData(newData);
  }, [data]);

  const onNextWizardStep = useCallback(() => {
    setWizardStatus(wizardStatus + 1);
  }, [wizardStatus]);

  const onPreviousWizardStep = useCallback(() => {
    setWizardStatus(wizardStatus - 1);
  }, [wizardStatus]);

  return (
    <Fragment>
      <GeneralWrapper>
        {wizardStatus === 0 ? (
          <Fragment>
            {/** TODO: Enable checkbox once participants feature is completed */}
            {/* <Checkbox
              checked={shouldUseJson}
              label="Use JSON data"
              onChange={onUseJsonChange}
            /> */}
            {shouldUseJson ? (
               <JSONEditor
               json={placeholder}
               onChangeJSON={onChangeJSONData}
             />
            ) : (
              <ParticipantsComponent
                addressMap={addressMap}
                onUpdateNames={onUpdateNames}
              />
            )}
          </Fragment>
        ) : null}
        {wizardStatus === 1 ? (
          <Fragment>
            <Checkbox
              checked={shouldPrintResults}
              label="View results"
              onChange={onPrintResultsChange}
            />
            <Checkbox
              checked={shouldSendEmails}
              label="Send emails"
              onChange={onSendEmailsChange}
            />
            <ButtonWrapper>
              <Button
                disabled={data.length === 0}
                label="Generate Santa!"
                onClick={generateSantaCb}
              />
            </ButtonWrapper>
            {shouldPrintResults ? (
              printResults(picks)
            ) : null}
          </Fragment>
        ) : null}
      </GeneralWrapper>
      <WizardButtonsWrapper>
        {wizardStatus !== 0 ? (
          <WizardButton>
            <Button
              label="Previous"
              color="#666"
              hoverColor="#666"
              fontSize="14px"
              onClick={onPreviousWizardStep}
            />
          </WizardButton>
        ) : null}
        {wizardStatus !== 1 ? (
        <WizardButton>
          <Button
            label="Next"
            color="#666"
            hoverColor="#666"
            fontSize="14px"
            onClick={onNextWizardStep}
          />
        </WizardButton>
        ) : null}
      </WizardButtonsWrapper>
    </Fragment>
  );
}

export default SecretSantaComponent;
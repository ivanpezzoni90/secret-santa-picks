import styled from 'styled-components';
import React, { useCallback, useState, useMemo, Fragment } from 'react';
import emailjs, { init } from 'emailjs-com';
import JSONEditor from './JsonEditor';
import { generateID } from '../helpers';

import { generateSanta } from '../helpers';
import ParticipantsComponent from './ParticipantsComponent';
import ExceptionsComponent from './ExceptionsComponent';

import {Checkbox, Button, Input} from 'react-interface-elements';
import { useEffect } from 'react';

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

const JSONPlaceholder = [
    {
        'name': '',
        'email': '',
        'exceptions': ['']
    }
];

const EMPTY_ARRAY = [];

const dataPlaceholder = [{
    id: generateID(),
    name: '',
    email: '',
    exceptions: []
}];

const getSecretSantaMessage = (sender, receiver) => {
    return `Hi ${sender}, Your secret santa is ${receiver}.`;
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
                    );
                })
            }
        </PicksTable>
    ) : null;
};

const sendSecretSantaMails = (picks, addressMap, emailJSService, emailJSTemplate) => {
    Object.keys(picks).forEach(pick => {
        console.log('Secret santa for ', pick, ' is ', picks[pick]);
        console.log('Sending email to ', addressMap[pick], ': "Your secret santa is ', picks[pick], '".');
        console.log('Email body: ', getSecretSantaMessage(pick, picks[pick]));

        emailjs.send(emailJSService, emailJSTemplate, {
            user_name: pick,
            user_email: addressMap[pick],
            message: getSecretSantaMessage(pick, picks[pick])
        })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
};

const SecretSantaComponent = () => {
    const [shouldPrintResults, setShouldPrintResults] = useState(true);
    const [shouldSendEmails, setShouldSendEmails] = useState(false);
    const [shouldUseJson, setShouldUseJson] = useState(false);

    const [emailJSUser, setEmailJSUser] = useState(null);
    const [emailJSService, setEmailJSService] = useState(null);
    const [emailJSTemplate, setEmailJSTemplate] = useState(null);

    const [picks, setPicks] = useState({});
    const [data, setData] = useState(dataPlaceholder);
    const [wizardStatus, setWizardStatus] = useState(0);

    const {
        addressMap = [],
        exc = []
    } = useMemo(() => {
        return data.reduce((acc, d) => {
            return Object.assign({}, acc, {
                addressMap: Object.assign({}, acc.addressMap, {
                    [d.name]: d.email
                }),
                exc: Object.assign({}, acc.exc, {
                    [d.name]: d.exceptions || EMPTY_ARRAY
                })
            });
        }, {});
    },
    [data]
    );

    useEffect(() => {
        if (shouldSendEmails && emailJSUser) {
            init(emailJSUser);
        }
    }, [shouldSendEmails, emailJSUser]);

    const generateSantaCb = useCallback(() => {
        const p = generateSanta(addressMap, exc);
        setPicks(p);
        if (shouldPrintResults) {
            console.log(p);
        }
        if (shouldSendEmails) {
            if (!emailJSUser || !emailJSService || !emailJSTemplate) {
                alert('Insert EMAILJS data to send emails');
            } else {
                sendSecretSantaMails(p, addressMap, emailJSService, emailJSTemplate);
            }
        }
    }, [addressMap, emailJSService, emailJSTemplate, emailJSUser, exc, shouldPrintResults, shouldSendEmails]);

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

    const onUpdateParticipants = useCallback((participants) => {
        const newData = participants.map((p, i) => {
            // Map exceptions inside participant, or return new participant
            if (data[i]) {
                return Object.assign({}, p, {
                    exceptions: data[i].exceptions
                });
            }
            return p;
        });
        setData(newData);
    }, [data]);

    const onUpdateExceptions = useCallback((exceptions, index) => {
        const newData = data.map((d, i) => {
            if (i === index) {
                return Object.assign({}, d, {
                    exceptions
                });
            }
            return d;
        });
        setData(newData);
    }, [data]);

    const checkData = useCallback(() => {
    // Check data integrity after each step

        // Filter out blank names
        const newData = data.filter(d => d.name !== '');
        setData(newData);

        if (newData.length > 0) {
            return true;
        }
        return false;
    }, [data]);

    const onNextWizardStep = useCallback(() => {
        const valid = checkData();
        if (valid) {
            setWizardStatus(wizardStatus + 1);
        } else {
            alert('Insert at least one valid name');
        }
    }, [wizardStatus, checkData]);

    const onLastWizardStep = useCallback(() => {
        const valid = checkData();
        if (valid) {
            setWizardStatus(2);
        } else {
            alert('Insert at least one valid name');
        }
    }, [checkData]);

    const onPreviousWizardStep = useCallback(() => {
        setWizardStatus(wizardStatus - 1);
    }, [wizardStatus]);

    return (
        <Fragment>
            <GeneralWrapper>
                {wizardStatus === 0 ? (
                    <Fragment>
                        <Checkbox
                            checked={shouldUseJson}
                            label="Use JSON data"
                            shadow={false}
                            onChange={onUseJsonChange}
                        />
                        {shouldUseJson ? (
                            <JSONEditor
                                json={JSONPlaceholder}
                                onChangeJSON={onChangeJSONData}
                            />
                        ) : (
                            <ParticipantsComponent
                                data={data}
                                onUpdateParticipants={onUpdateParticipants}
                            />
                        )}
                    </Fragment>
                ) : null}
                {wizardStatus === 1 ? (
                    <Fragment>
                        <ExceptionsComponent
                            data={data}
                            onUpdateExceptions={onUpdateExceptions}
                        />
                    </Fragment>
                ) : null}
                {wizardStatus === 2 ? (
                    <Fragment>
                        <Checkbox
                            checked={shouldPrintResults}
                            label="View results"
                            shadow={false}
                            onChange={onPrintResultsChange}
                        />
                        <Checkbox
                            checked={shouldSendEmails}
                            label="Send emails"
                            shadow={false}
                            onChange={onSendEmailsChange}
                        />
                        {shouldSendEmails && (
                            <div>
                                <div>Insert EMAILJS info</div>
                                <Input
                                    label="User ID"
                                    onChange={(newValue) => {
                                        setEmailJSUser(newValue);
                                    }}
                                />
                                <Input
                                    label="Service"
                                    onChange={(newValue) => {
                                        setEmailJSService(newValue);
                                    }}
                                />
                                <Input
                                    label="Template ID"
                                    onChange={(newValue) => {
                                        setEmailJSTemplate(newValue);
                                    }}
                                />
                            </div>
                        )}
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
                            fontSize="14px"
                            onClick={onPreviousWizardStep}
                        />
                    </WizardButton>
                ) : null}
                {wizardStatus !== 2 ? (
                    <WizardButton>
                        <Button
                            label="Next"
                            color="#666"
                            fontSize="14px"
                            // Go to last step when using JSON
                            onClick={shouldUseJson ? onLastWizardStep : onNextWizardStep}
                        />
                    </WizardButton>
                ) : null}
            </WizardButtonsWrapper>
        </Fragment>
    );
};

export default SecretSantaComponent;
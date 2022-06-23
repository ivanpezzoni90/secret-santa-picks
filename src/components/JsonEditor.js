import styled from 'styled-components';

import React, { useEffect, useRef } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

const EditorWrapper = styled.div`
  width: 50em;
  height: 20em;
  padding-bottom: 2em;
`;

const Editor = (props) => {
    const {
        json,
        onChangeJSON
    } = props;

    const jsoneditor = useRef();
    const container = useRef();
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            const options = {
                mode: 'code',
                onChangeJSON: onChangeJSON,
                onValidate: function(json) {
                    // TODO: Can apply validation rules if needed
                    const errors = [];
  
                    onChangeJSON(json);
                    return errors;
                }
            };
  
            jsoneditor.current = new JSONEditor(container.current, options);
            jsoneditor.current.set(json);
        } else {
            if (jsoneditor.current) {
                jsoneditor.current.update(json);
            }
        }

        return () => {
            if (jsoneditor.current) {
                jsoneditor.current.destroy();
            }
        };

    }, [json, onChangeJSON]);

    return (
        <EditorWrapper
            className="jsoneditor-react-container"
            ref={elem => (container.current = elem)}
        />
    );
};

export default Editor;
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {
  TextField,
} from "../../../src";

export default () => (
  <section>
    <h1>Textfield examples</h1>
    <div>
      <TextField label="Demo1" />
    </div>
    <div style={{ padding: "16px" }}>
      <TextField label="Demo2" defaultValue="Hello" />
    </div>
    <div style={{ padding: "16px" }}>
      <TextField label="Demo2" defaultValue="Hello" disabled />
    </div>
    <div style={{ padding: "16px" }}>
      <TextField label="Demo1" dense />
    </div>
    <div style={{ padding: "16px" }}>
      <TextField label="Demo2" defaultValue="Hello" leadingIcon="event" />
    </div>
    <div style={{ padding: "16px" }}>  
      <TextField label="Demo2" defaultValue="Hello" trailingIcon="delete" disabled />
    </div>
    <div style={{ padding: "16px" }}>  
      <TextField label="Demo2" defaultValue="Hello" trailingIcon="delete" isTextarea />
    </div>
    <div style={{ padding: "16px" }}>                  
      <TextField label="Demo2" defaultValue="Hello" trailingIcon="delete" isTextarea fullwidth />
    </div>
    <div style={{ padding: "16px" }}>  
      <TextField label="Demo2" required pattern=".{8,}" helperText="Must be at least 8 characters" />
    </div>
    <div style={{ padding: "16px" }}>  
      <TextField label="Demo1" dense outlined />
    </div>
    <div style={{ padding: "16px" }}>                
      <TextField label="Demo2" required pattern=".{8,}" helperText="Must be at least 8 characters" isBoxed />
    </div>
  </section>
);

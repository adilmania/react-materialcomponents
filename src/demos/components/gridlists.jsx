/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {
  GridList, Tile,
} from "../../../src/libs";

export default () => (
  <section>
    <h1>GridList examples </h1>
    <div style={{ padding: "16px" }}>
      <GridList width="320px" tileWidth="76px" tileBackground="#212121" >
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
        <Tile title="text" />
      </GridList>
    </div>
  </section>
);

/*
 * Copyright 2017 Evgeni Zharkov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

import Input from "./input";
import {IBrowserFormOptions} from "./interfaces";
import * as types from "./types";

interface IForm {
  InputElements: Input[];
  OnSubmit?: Array<(IForm) => void>;
  Options?: IBrowserFormOptions;
  Style?: types.TInputStyle;
  StyleAlign?: types.TInputStyleAlign;
}

export default class Form {
  private InputElements: Input[];
  private OnSubmit: Array<(input: HTMLInputElement, next: string) => any>;
  private Options: IBrowserFormOptions;
  private Style: types.TInputStyle;
  private StyleAlign: types.TInputStyleAlign;

  constructor(construct: IForm) {
    this.InputElements = construct.InputElements;
    this.Style = construct.Style || "outside";
    this.StyleAlign = construct.StyleAlign || "left";
  }
}

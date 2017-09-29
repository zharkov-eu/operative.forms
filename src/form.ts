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

import * as errors from "./error";
import Input, {IInput} from "./input";
import {IBrowserFormOptions} from "./interfaces";
import * as types from "./types";

interface IForm {
  FormQuerySelector: string;
  OnSubmit?: Array<(IForm) => void>;
  Options?: IBrowserFormOptions;
  Style?: types.TInputStyle;
  StyleAlign?: types.TInputStyleAlign;
}

export default class Form {
  private HTMLForm: HTMLElement;
  private InputElements: Input[];
  private OnSubmit: Array<(input: HTMLInputElement, next: string) => any>;
  private Options: IBrowserFormOptions;
  private Style: types.TInputStyle;
  private StyleAlign: types.TInputStyleAlign;

  constructor(construct: IForm) {
    this.HTMLForm = document.querySelector(construct.FormQuerySelector) as HTMLElement;
    if (!this.HTMLForm) {
      throw new errors.HTMLElementNotFound("HTMLForm", construct.FormQuerySelector);
    }
    this.Style = construct.Style || "outside";
    this.StyleAlign = construct.StyleAlign || "left";
    this.InputElements = [];
  }

  public addInput(querySelector: string, options?: IInput): Input {
    const HTMLInput = this.HTMLForm.querySelector(querySelector) as HTMLInputElement;
    if (HTMLInput) {
      const input = new Input(HTMLInput, options);
      this.InputElements.push(input);
      return input;
    } else {
      throw new errors.HTMLElementNotFound("HTMLInput", querySelector);
    }
  }
}

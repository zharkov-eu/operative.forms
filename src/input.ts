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
 * distributed un/der the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

import {IBrowserInputOptions} from "./interfaces";
import * as types from "./types";
import * as validate from "./validate";

interface IInput {
  Name: string;
  Type: types.TInputType;
  Icon?: string;
  View?: types.TInputView;
  Transform?: (value: string) => any;
  Mask: (value: string) => any;
  Required?: boolean;
  Options?: IBrowserInputOptions;
}

class InputBase {
  public Element: HTMLInputElement;
  private Name: string;
  private Type: types.TInputType;
  private Value: string;
  private RawValue: string;
  private Required: boolean;

  constructor(element: HTMLInputElement, options?: IInput) {
    this.Element = element;
    this.Name = options ? options.Name || element.name : element.name;
    this.Type = options ? options.Type || "string" : "string";
    this.Required = options ? options.Required || false : false;
    this.RawValue = element.value;
  }
}

class InputEvents extends InputBase {
  private OnKeyDown: Array<(InputBase, event, next?) => void>;
  private OnInput: Array<(InputBase, event, next?) => void>;
  private OnChange: Array<(InputBase, event, next?) => void>;

  constructor(element: HTMLInputElement, options?: IInput) {
    super(element, options);
    this.OnKeyDown = [];
    this.OnInput = [];
    this.OnChange = [];
    this.Element.addEventListener("keydown", this.handleKeyDown());
    this.Element.addEventListener("input", this.handleInput());
    this.Element.addEventListener("change", this.handleChange());
  }

  public onKeyDown(func: (that: Input, event: KeyboardEvent) => void) {
    this.OnKeyDown.push(func);
  }

  public onChange(func: (that: Input, event: Event) => void) {
    this.OnChange.push(func);
  }

  public onInput(func: (that: Input, event: Event) => void) {
    this.OnInput.push(func);
  }

  private handleKeyDown() {
    return (e: KeyboardEvent) => {
      for (const func of this.OnKeyDown) {
        func(this, e);
      }
    };
  }

  private handleChange() {
    return (e: Event) => {
      for (const func of this.OnChange) {
        func(this, e);
      }
    };
  }

  private handleInput() {
    return (e: Event) => {
      for (const func of this.OnInput) {
        func(this, e);
      }
    };
  }
}

export default class Input extends InputEvents {
  private Icon: string;
  private Validate: (value: string) => boolean;
  private View: types.TInputView;
  private Transform: (value: string) => any;
  private Mask: (value: string) => any;

  constructor(element: HTMLInputElement, options?: IInput) {
    super(element, options);

  }
}

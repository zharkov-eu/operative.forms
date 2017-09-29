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
import {validate} from "./validate";

interface IInputClass {
  ActiveClass: string;
  ErrorClass: string;
  SuccessClass: string;
}

export interface IInput {
  Name?: string;
  Type?: types.TInputType;
  Icon?: string;
  View?: types.TInputView;
  Transform?: (value: string) => any;
  Validate?: (value: string) => boolean;
  Mask?: (value: string) => any;
  Active?: boolean;
  Required?: boolean;
  Class?: IInputClass;
  Options?: IBrowserInputOptions;
}

class InputBase {
  public HTML: HTMLInputElement;
  protected Name: string;
  protected Type: types.TInputType;
  protected Value: string;
  protected RawValue: string;
  protected Active: boolean;
  protected Required: boolean;

  constructor(element: HTMLInputElement, options?: IInput) {
    this.HTML = element;
    this.Name = options ? options.Name || element.name : element.name;
    this.Type = options ? options.Type || "notEmptyString" : "notEmptyString";
    this.Active = options ? options.Active || true : true;
    this.Required = options ? options.Required || false : false;
    this.RawValue = element.value;
  }
}

class InputEvents extends InputBase {
  protected OnKeyDown: Array<(InputBase, event, next?) => void>;
  protected OnInput: Array<(InputBase, event, next?) => void>;
  protected OnChange: Array<(InputBase, event, next?) => void>;

  constructor(element: HTMLInputElement, options?: IInput) {
    super(element, options);
    this.OnKeyDown = [];
    this.OnInput = [];
    this.OnChange = [];
    this.HTML.addEventListener("keydown", this.handleKeyDown());
    this.HTML.addEventListener("input", this.handleInput());
    this.HTML.addEventListener("change", this.handleChange());
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
  public Valid: boolean;
  private Class: IInputClass;
  private Icon: string;
  private Validate: (value: string) => boolean;
  private View: types.TInputView;
  private Transform: (value: string) => any;
  private Mask: (value: string) => any;

  constructor(element: HTMLInputElement, options?: IInput) {
    super(element, options);
    this.Class = {
      ActiveClass: "",
      ErrorClass: "",
      SuccessClass: "",
    };
    if (options && options.Class) {
      this.Class.ActiveClass = options.Class.ActiveClass || "active";
      this.Class.ErrorClass = options.Class.ErrorClass || "error";
      this.Class.SuccessClass = options.Class.SuccessClass || "success";
    }
    this.Validate = options ?
      typeof options.Validate === "function" ? options.Validate : validate[this.Type] : validate[this.Type];

    this.onInput((that, e) => {
      that.RawValue = that.HTML.value;
      that.HTML.classList.remove(that.Class.ErrorClass);
    });
    this.onChange((that, e) => {
      that.Valid = that.Validate(that.RawValue);
      if (!that.Valid) { that.HTML.classList.add(that.Class.ErrorClass); }
    });
    if (!this.Active) {
      this.onInput((that, e) => {
        that.HTML.classList.remove(that.Class.ActiveClass);
        e.preventDefault();
      });
    }
  }

  public activate() {
    this.Active = true;
    this.HTML.classList.add(this.Class.ActiveClass);
  }
}

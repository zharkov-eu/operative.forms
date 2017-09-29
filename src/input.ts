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

import Dispatcher from "./dispatcher";
import {IBrowserInputOptions} from "./interfaces";
import * as types from "./types";
import {validate} from "./validate";

interface IInputClass {
  InactiveClass: string;
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
  Inactive?: boolean;
  Required?: boolean;
  Class?: IInputClass;
  Options?: IBrowserInputOptions;
}

class InputBase {
  public HTML: HTMLInputElement;
  public Value: string;
  protected Name: string;
  protected Type: types.TInputType;
  protected RawValue: string;
  protected Inactive: boolean;
  protected Required: boolean;

  constructor(element: HTMLInputElement, options?: IInput) {
    this.HTML = element;
    this.Name = options ? options.Name || element.name : element.name;
    this.Type = options ? options.Type || "notEmptyString" : "notEmptyString";
    this.Inactive = options ? options.Inactive || false : false;
    this.Required = options ? options.Required || false : false;
    this.RawValue = element.value;
  }
}

class InputEvents extends InputBase {
  protected Dispatcher: Dispatcher;
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
    this.Dispatcher = new Dispatcher(this);
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

  public onSuccess(func: (that: Input) => void) {
    this.Dispatcher.on("success", func);
  }

  public onActivate(func: (that: Input) => void) {
    this.Dispatcher.on("activate", func);
  }

  public onError(func: (that: Input) => void) {
    this.Dispatcher.on("error", func);
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
      ErrorClass: "error",
      InactiveClass: "inactive",
      SuccessClass: "success",
    };
    if (options && options.Class) {
      this.Class.InactiveClass = options.Class.InactiveClass || "inactive";
      this.Class.ErrorClass = options.Class.ErrorClass || "error";
      this.Class.SuccessClass = options.Class.SuccessClass || "success";
    }
    this.Validate = options ?
      typeof options.Validate === "function" ? options.Validate : validate[this.Type] : validate[this.Type];
    this.Transform = options ?
      typeof options.Transform === "function" ? options.Validate : (value) => value : (value) => value;
    if (this.Inactive) { this.clearActivate(); }

    this.onInput((that, e) => {
      that.RawValue = that.HTML.value;
      that.Valid = that.Validate(that.RawValue);
      that.Value = that.Valid ? that.Transform(that.RawValue) : "";
      that.clearError();
    });
    this.onChange((that, e) => {
      if (!that.Valid) { that.error(); }
    });
  }

  public activate() {
    this.Inactive = false;
    this.HTML.classList.remove(this.Class.InactiveClass);
    this.HTML.disabled = false;
    this.Dispatcher.emit("activate");
  }

  public clearActivate() {
    this.Inactive = true;
    this.HTML.classList.add(this.Class.InactiveClass);
    this.HTML.disabled = true;
  }

  public error() {
    this.HTML.classList.add(this.Class.ErrorClass);
    this.Dispatcher.emit("error");
  }

  public clearError() {
    this.HTML.classList.remove(this.Class.ErrorClass);
  }

  public success() {
    this.HTML.classList.add(this.Class.SuccessClass);
    this.Dispatcher.emit("success");
  }

  public clearSuccess() {
    this.HTML.classList.remove(this.Class.SuccessClass);
  }
}

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

import * as types from "./types";

export interface IBrowserFormOptions {
  "accept-charset": string; // UTF-8
  action: string;
  autocomplete: types.TOnOff; // HTML5
  enctype: types.TFormEnctype;
  method: types.TFormMethod;
}

export interface IBrowserInputOptions {
  type: types.TInputView;
  accept?: string; // Comma-separated list, ex: ".jpg,.png,.doc"
  autocomplete?: types.TOnOff; // HTML5
  checked?: boolean;
  disabled?: boolean;
  inputmode?: types.TInputMode;
  name: string; // Submitted with the form data
  placeholder?: string; //  Applies when the value of the type attribute is text, search, tel, url, email
  readonly?: boolean; // Ignored if type attribute is hidden, range, color, checkbox, radio, file, button
  spellcheck: boolean;
  size?: number; //  Pixels, applies only when the type attribute is set to text, search, tel, url, email, password
  value?: string;
}

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

import {IBrowserInputOptions} from "./interfaces";
import * as types from "./types";

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

export class Input {
  public Value: any;
  private Name: string;
  private Type: types.TInputType;
  private Icon?: string;
  private View?: types.TInputView;
  private Transform?: (value: string) => any;
  private Handler?: Array<(input: HTMLInputElement, next: string) => any>;
  private Required?: boolean;
  private Options?: IBrowserInputOptions;
}

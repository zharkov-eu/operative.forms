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

export default class Dispatcher {
  private context: any;
  private listeners: {[event: string]: Array<(that: any) => void>} = {};

  constructor(context: any) {
    this.context = context;
  }

  public on(event: string, func: (that: any) => void) {
    if (!this.listeners[event]) { this.listeners[event] = []; }
    if (typeof func === "function" && Array.isArray(this.listeners[event])) {
      this.listeners[event].push(func);
    }
  }

  public emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      args.unshift(this.context);
      for (const func of this.listeners[event]) {
        func.apply(undefined, args);
      }
    }
  }
}

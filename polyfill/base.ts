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

export function checkInputTypeSupport(type: string): boolean {
  const input = document.createElement("input");
  input.setAttribute("type", type);

  const nonValidValue = "non-valid-input-type-10000_00000";
  input.setAttribute("value", nonValidValue);

  return (input.type === type && input.value !== nonValidValue);
}

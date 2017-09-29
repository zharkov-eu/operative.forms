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

import Form from "./src/form";
import Input from "./src/input";

const formElement = document.querySelector("#form");
const emailInput = formElement.querySelector("input[name=email]") as HTMLInputElement;
const passwordInput = formElement.querySelector("input[name=password]") as HTMLInputElement;
const checkboxInput = formElement.querySelector("input[name=checkbox]") as HTMLInputElement;

const email = new Input(emailInput);
email.onChange((input, event) => {
  console.log(input.HTML.value);
});
const password = new Input(passwordInput);
const checkbox = new Input(checkboxInput);
const form = new Form({
  InputElements: [email, password, checkbox],
});

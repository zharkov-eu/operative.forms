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

const form = new Form({FormQuerySelector: "#form"});
const email = form.addInput(`input[name="email"]`, {
  Type: "float",
});

const password = form.addInput(`input[name="password"]`);
password.onInput((that, e) => {
  console.log(that);
  if (that.Value === "12345") {
    that.success();
  } else {
    that.clearSuccess();
  }
});
password.onSuccess((that) => {
  console.log(that.Value);
});

const required = form.addInput(`input[name="required"]`, {
  Required: true,
});

const checkbox = form.addInput(`input[name="checkbox"]`);

const text = form.addInput(`input[name="text"]`, {
  Inactive: true,
});

const submit = form.addInput(`input[type="submit"]`);
// form.addInput(`input[type="subas"]`);

checkbox.onChange((that, e) => {
  console.log(that);
  text.activate();
});

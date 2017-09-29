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

export type TOnOff =
  "off" |
  "on";

export type TFormEnctype =
  "application/x-www-form-urlencoded" | // Default
  "multipart/form-data" | // Type: file
  "text/plain"; // HTML5

export type TFormMethod =
  "get" |
  "post";

export type TInputView =
  "button" |
  "checkbox" |
  "file" |
  "hidden" |
  "image" |
  "password" |
  "radio" |
  "reset" |
  "submit" |
  "text" |
  "color" | // HTML5
  "date" | // HTML5
  "datetime" | // HTML5
  "datetime-local" | // HTML5
  "email" | // HTML5
  "number" | // HTML5
  "range" | // HTML5
  "search" | // HTML5
  "tel" | // HTML5
  "time" | // HTML5
  "url" | // HTML5
  "month" | // HTML5
  "week"; // HTML5

export type TInputMode =
  "verbatim" | // Alphanumeric, non-prose content such as usernames and passwords.
  "latin" | // Latin-script input in the user's preferred language with typing aids such as text prediction enabled.
  "latin-name" | // As latin, but for human names.
  "latin-prose" | // As latin, but with more aggressive typing aids.
  "full-width-latin" | // As latin-prose, but for the user's secondary languages.
  "kana" | // Kana or romaji input, typically hiragana input, using full-width character. Japanese text input.
  "katakana" | // Katakana input, using full-width characters. Intended for Japanese text input.
  "numeric" | // Numeric input, including keys for the digits 0 to 9,
              // the user's preferred thousands separator character, and the character for indicating negative numbers.
              // Intended for numeric codes, e.g. credit card numbers.>
  "tel" | // Telephone input, including asterisk and pound key.
  "email" | // Email input.
  "url"; // URL input.

export type TInputStyle =
  "outside" |
  "shifting" |
  "vanishing";

export type TInputStyleAlign =
  "top" |
  "right" |
  "bottom" |
  "left";

export type TInputType = "float" | "integer" | "nonZeroFloat" | "nonZeroInteger" | "notEmptyString";

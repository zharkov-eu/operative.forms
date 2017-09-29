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

/**
 * Validation integer numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
function integer(numeric: any): boolean {
  return numeric && Number.isNaN(parseInt(numeric.toString(), 10));
}

/**
 * Validation non-zero integer numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
function nonZeroInteger(numeric: any): boolean {
  return numeric && Boolean(parseInt(numeric.toString(), 10));
}

/**
 * Validation float numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
function float(numeric: any): boolean {
  return numeric && Number.isNaN(parseFloat(numeric.toString()));
 }

/**
 * Validation non-zero float numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
function nonZeroFloat(numeric: any): boolean {
  return numeric && Boolean(parseFloat(numeric.toString()));
}

/**
 * Validation non-empty string
 * @param text - conceivably string
 * @returns {boolean}
 */
function notEmptyString(text: any): boolean {
  return (text && typeof text === "string");
}

export const validate = {
  float,
  integer,
  nonZeroFloat,
  nonZeroInteger,
  notEmptyString,
};

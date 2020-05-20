/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useMemo } from 'react';

const parentStyle = `
width:30px;
height:30px;
overscroll-behavior: contain;
overflow-y: auto;
-webkit-overflow-scrolling: touch;
-ms-overflow-style: -ms-autohiding-scrollbar;
scrollbar-width: var(--scrollbar-ff-width);`;

const childStyle = 'width:100%; height:40px;';

function browserHasObtrusiveScrollbars() {
  const parent = document.createElement('div');
  parent.setAttribute('style', parentStyle);

  const child = document.createElement('div');
  child.setAttribute('style', childStyle);
  parent.appendChild(child);

  document.body.appendChild(parent);

  // Measure the child element, if it is not 30px wide the scrollbars are obtrusive.
  const scrollbarWidth = 30 - parent.firstChild.clientWidth;
  document.body.removeChild(parent);

  return Boolean(scrollbarWidth);
}

/**
 * Custom hook to detect whether scrollbars are obtrusive or hidden until scrolled.
 *
 * @see https://www.filamentgroup.com/lab/scrollbars/
 *
 * @return {boolean} Whether scrollbars are obtrusive.
 */
function useObtrusiveScrollbars() {
  return useMemo(() => browserHasObtrusiveScrollbars(), []);
}

export default useObtrusiveScrollbars;
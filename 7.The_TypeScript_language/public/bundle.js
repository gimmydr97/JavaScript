/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Action.ts":
/*!***********************!*\
  !*** ./src/Action.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Action = void 0;\r\nvar Action;\r\n(function (Action) {\r\n    Action[Action[\"DAY_EARLIER\"] = 0] = \"DAY_EARLIER\";\r\n    Action[Action[\"DAY_LATER\"] = 1] = \"DAY_LATER\";\r\n    Action[Action[\"HOUR_EARLIER\"] = 2] = \"HOUR_EARLIER\";\r\n    Action[Action[\"HOUR_LATER\"] = 3] = \"HOUR_LATER\";\r\n})(Action = exports.Action || (exports.Action = {}));\r\n;\r\n\n\n//# sourceURL=webpack://exercise7/./src/Action.ts?");

/***/ }),

/***/ "./src/Meeting.ts":
/*!************************!*\
  !*** ./src/Meeting.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.move = void 0;\r\nconst Action_1 = __webpack_require__(/*! ./Action */ \"./src/Action.ts\");\r\n;\r\nconst move = (meeting, action) => {\r\n    const newDate = new Date(meeting.date.getTime());\r\n    switch (action) {\r\n        case Action_1.Action.DAY_EARLIER:\r\n            newDate.setDate(newDate.getDate() - 1);\r\n            break;\r\n        case Action_1.Action.DAY_LATER:\r\n            newDate.setDate(newDate.getDate() + 1);\r\n            break;\r\n        case Action_1.Action.HOUR_EARLIER:\r\n            newDate.setHours(newDate.getHours() - 1);\r\n            break;\r\n        case Action_1.Action.HOUR_LATER:\r\n            newDate.setHours(newDate.getHours() + 1);\r\n            break;\r\n    }\r\n    if (newDate.getHours() < 8 || newDate.getHours() + meeting.duration > 20) {\r\n        throw new Error('Meetings can only be held between 08:00 and 20:00!');\r\n    }\r\n    return { ...meeting, date: newDate };\r\n};\r\nexports.move = move;\r\n/*\r\nfor (let m of meeting){\r\n    for(let a of action){\r\n        console.log(move(m,a));\r\n    }\r\n    }*/ \r\n\n\n//# sourceURL=webpack://exercise7/./src/Meeting.ts?");

/***/ }),

/***/ "./src/meeting-component.ts":
/*!**********************************!*\
  !*** ./src/meeting-component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Meeting_1 = __webpack_require__(/*! ./Meeting */ \"./src/Meeting.ts\");\r\nconst Parse_1 = __webpack_require__(/*! ./Parse */ \"./src/Parse.js\");\r\nclass MeetingComponent extends HTMLElement {\r\n    meetings = [\r\n        { title: 'M1', date: new Date(2022, 11, 26, 12), duration: 2 },\r\n        { title: 'M2', date: new Date(2022, 11, 24, 14), duration: 1 },\r\n        { title: 'M3', date: new Date(2022, 11, 22, 16), duration: 2 }\r\n    ];\r\n    display() {\r\n        this.innerHTML = '';\r\n        for (let meeting of this.meetings) {\r\n            this.innerHTML += `<b>Title:</b> ${meeting.title} <b>Date:</b> ${meeting.date} <b>Duration:</b> ${meeting.duration} <br/>`;\r\n        }\r\n    }\r\n    perform(text) {\r\n        const actions = (0, Parse_1.parse)(text.split(' '));\r\n        for (let action of actions)\r\n            for (let meetingId in this.meetings)\r\n                this.meetings[meetingId] = (0, Meeting_1.move)(this.meetings[meetingId], action);\r\n        this.display();\r\n    }\r\n    connectedCallback() {\r\n        this.display();\r\n    }\r\n}\r\ncustomElements.define('meeting-component', MeetingComponent);\r\n\n\n//# sourceURL=webpack://exercise7/./src/meeting-component.ts?");

/***/ }),

/***/ "./src/Parse.js":
/*!**********************!*\
  !*** ./src/Parse.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parse\": () => (/* binding */ parse)\n/* harmony export */ });\n/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Action */ \"./src/Action.ts\");\n\n\nconst parse = strings => {\n    let actions = [];\n    for (let string of strings) {\n        switch(string) {\n            case 'd-':\n                actions.push(_Action__WEBPACK_IMPORTED_MODULE_0__.Action.DAY_EARLIER);\n                break;\n            case 'd+':\n                actions.push(_Action__WEBPACK_IMPORTED_MODULE_0__.Action.DAY_LATER);\n                break;\n            case 'h-':\n                actions.push(_Action__WEBPACK_IMPORTED_MODULE_0__.Action.HOUR_EARLIER);\n                break;\n            case 'h+':\n                actions.push(_Action__WEBPACK_IMPORTED_MODULE_0__.Action.HOUR_LATER);\n                break;\n        }\n    }\n    return actions;\n}\n\n\n//# sourceURL=webpack://exercise7/./src/Parse.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/meeting-component.ts");
/******/ 	
/******/ })()
;
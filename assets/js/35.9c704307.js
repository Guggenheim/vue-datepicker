(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{288:function(e,t,o){"use strict";o.r(t);var a=o(6),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"migration"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#migration"}},[e._v("#")]),e._v(" Migration")]),e._v(" "),o("h2",{attrs:{id:"_2-x-x-to-3-x-x"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-x-x-to-3-x-x"}},[e._v("#")]),e._v(" 2.x.x to 3.x.x")]),e._v(" "),o("ul",[o("li",[e._v("removed "),o("code",[e._v("monday-first")]),e._v(" in favor of "),o("code",[e._v("first-day-of-week")]),e._v(". If you had "),o("code",[e._v('<Datepicker :monday-first="true"/>')]),e._v(" you need to change it to "),o("code",[e._v('<Datepicker first-day-of-week="mon"/>')])]),e._v(" "),o("li",[e._v("The build process was redone. The filenames inside the dist folder changed from "),o("code",[e._v("vuejs-datepicker.js")]),e._v(" to "),o("code",[e._v("Datepicker.js")]),e._v(". Same goes with the css file.\nThe umd and cjs build are now going through babel and will include needed polyfills automatically while the esm build is free of any polyfills.\nSame with the locale files which now have a esm and cjs build, too.")])]),e._v(" "),o("h2",{attrs:{id:"from-vuejs-datepicker-1-6-2-to-sum-cumo-vue-datepicker-2-x-x"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#from-vuejs-datepicker-1-6-2-to-sum-cumo-vue-datepicker-2-x-x"}},[e._v("#")]),e._v(" From "),o("code",[e._v("vuejs-datepicker 1.6.2")]),e._v(" to "),o("code",[e._v("@sum.cumo/vue-datepicker 2.x.x")])]),e._v(" "),o("p",[e._v("This is a fork from the project "),o("a",{attrs:{href:"https://github.com/charliekassel/vuejs-datepicker",target:"_blank",rel:"noopener noreferrer"}},[e._v("vuejs-datepicker"),o("OutboundLink")],1),e._v(" with some changes.\nTo migrate from "),o("code",[e._v("vuejs-datepicker 1.6.2")]),e._v(" to "),o("code",[e._v("@sum.cumo/vue-datepicker 2.x.x")]),e._v(" there are only a few breaking changes that you need to consider:")]),e._v(" "),o("ol",[o("li",[e._v("Events are changed to be always "),o("code",[e._v("kebab-case")]),e._v(".")]),e._v(" "),o("li",[e._v("The CSS is extracted to its own file. You can check it out in the "),o("a",{attrs:{href:"https://sumcumo.github.io/vue-datepicker/guide/#usage",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("li",[e._v("The custom formatter now requires a custom parser. An example is in the "),o("a",{attrs:{href:"https://sumcumo.github.io/vue-datepicker/guide/DateFormatting/#function-formatter",target:"_blank",rel:"noopener noreferrer"}},[e._v("documentation"),o("OutboundLink")],1),e._v(".\nIf you are using a third party library to format the dates like date-fns this is just as easy as adding the custom formatter function.")]),e._v(" "),o("li",[e._v("The default formatter had undergone some changes")])]),e._v(" "),o("ul",[o("li",[e._v("su -> o for st, rd, nd, th additions")]),e._v(" "),o("li",[e._v("D -> E for the day of the week")])]),e._v(" "),o("p",[e._v("The rest should be the same. Checkout the "),o("a",{attrs:{href:"https://github.com/sumcumo/vue-datepicker/blob/master/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("changelog"),o("OutboundLink")],1),e._v(" for all other changes.")])])}),[],!1,null,null,null);t.default=r.exports}}]);
// d3-scale library: https://www.d3indepth.com/scales/

// Attempted Import methods:

// ReferenceError: require is not defined
//const d3Scale = require("https://d3js.org/d3-scale.v3.min.js");

// SyntaxError: requested module does not provide export named 'scaleBand'
// (same error for scaleLinear)
//import { scaleBand, scaleLinear } from "https://d3js.org/d3-scale.v3.min.js";

// ReferenceError: scaleLinear is not defined
//import "https://d3js.org/d3-scale.v3.min.js";

// SyntaxError: unexpected identifier (12:9)
//import * from "https://d3js.org/d3-scale.v3.min.js";

// TypeError: d3Scale.scaleLinear is not a function
// import * as d3Scale from "https://d3js.org/d3-scale.v3.min.js";

// TypeError: failed to resolve module specifier.
// 				relative references must start with either "/","./" or "../"
//import "@d3-scale/scaleBand";
//import "@d3-scale/scaleLinear"


export default {
	name: "BarChart",
	data() {
		return {
			height : 200,
			width : 500,
			data : [
				[3, 5],
				[4, 10],
			],
		};
	},
	computed: {
		x() {
			return scaleLinear().range([0, this.width])
							  .domain(this.data.map(d => d[0]))
							  .padding(0.3);
		},
		y() {
			let values = this.data.map(d => d[1]);
			return scaleLinear().range([this.height, 0])
								.domain([0, Math.max(... values)]);
		},
		bars() {
			let bars = this.data.map(d => {
				return {
					xLabel : d[0],
					x : this.x(d[0]),
					y : this.y(d[1]),
					width : this.x.bandwidth(),
					height : this.height - this.y(d[1])
				};
			}); // end data.map
			return bars;
		}
	},
	template: (`
	<svg class="barchart" :width="width" :height="height">
		<g class="bars" fill="none">
			<rect v-for = "(bar,index) in bars"
				  fill = "pink"
				  :key = "index"
				  :height = "bar.height"
				  :width = "bar.width"
				  :x = "bar.x"
				  :y = "bar.y">
			</rect>
		</g>
	</svg>`),
};

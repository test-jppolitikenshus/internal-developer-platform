// The MIT License (MIT)

// Copyright (c) 2017 Zalando SE

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const LEGEND_SPACING = 15;
const EXTEND_GRID_LINES_BY = 20;

function radar_visualization(config) {

  /*const rings = [
    { radius: 130 },
    { radius: 220 },
    { radius: 310 },
    { radius: 400 }
  ];*/
  const rings = config.rings;
  const MAX_RADIUS = rings[rings.length - 1].radius;
  const HALF_WIDTH = config.width / 2;
  const HALF_HEIGHT = config.height / 2;

  // verify entries, removing entries belong to rings that does not exists
  // and setting ring number from ring name
  config.entries = config.entries.filter(entry => {
    if (config.disableMove) entry.moved = 0;
    entry.ring = rings.findIndex(ring => ring.name === entry.ringName);
    return (entry.ring !== -1);
  });

  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295
  var seed = 42;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function random_between(min, max) {
    return min + random() * (max - min);
  }

  function normal_between(min, max) {
    return min + (random() + random()) * 0.5 * (max - min);
  }

  // radial_min / radial_max are multiples of PI
  const quadrants = [
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 }
  ];

  const title_offset =
    { x: -HALF_WIDTH, y: -420 };

  const footer_offset =
    { x: -HALF_WIDTH, y: 420 };

  const legend_offset = [
    { x: MAX_RADIUS + 100, y: 110 },
    { x: - HALF_WIDTH, y: 110 },
    { x: - HALF_WIDTH, y: - MAX_RADIUS + 100 },
    { x: MAX_RADIUS + 100, y: - MAX_RADIUS + 100 }
  ];

  const legend_offset_state = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ];

  function polar(cartesian) {
    var x = cartesian.x;
    var y = cartesian.y;
    return {
      t: Math.atan2(y, x),
      r: Math.sqrt(x * x + y * y)
    }
  }

  function cartesian(polar) {
    return {
      x: polar.r * Math.cos(polar.t),
      y: polar.r * Math.sin(polar.t)
    }
  }

  function bounded_interval(value, min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
  }

  function bounded_ring(polar, r_min, r_max) {
    return {
      t: polar.t,
      r: bounded_interval(polar.r, r_min, r_max)
    }
  }

  function bounded_box(point, min, max) {
    return {
      x: bounded_interval(point.x, min.x, max.x),
      y: bounded_interval(point.y, min.y, max.y)
    }
  }

  function segment(quadrant, ring) {
    var polar_min = {
      t: quadrants[quadrant].radial_min * Math.PI,
      r: ring === 0 ? 30 : rings[ring - 1].radius
    };
    var polar_max = {
      t: quadrants[quadrant].radial_max * Math.PI,
      r: rings[ring].radius
    };
    var cartesian_min = {
      x: 15 * quadrants[quadrant].factor_x,
      y: 15 * quadrants[quadrant].factor_y
    };
    var cartesian_max = {
      x: MAX_RADIUS * quadrants[quadrant].factor_x,
      y: MAX_RADIUS * quadrants[quadrant].factor_y
    };
    return {
      clipx: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.x = cartesian(p).x; // adjust data too!
        return d.x;
      },
      clipy: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.y = cartesian(p).y; // adjust data too!
        return d.y;
      },
      random: function() {
        return cartesian({
          t: random_between(polar_min.t, polar_max.t),
          r: normal_between(polar_min.r, polar_max.r)
        });
      }
    }
  }

  // position each entry randomly in its segment
  for (var i = 0; i < config.entries.length; i++) {
    var entry = config.entries[i];
    entry.segment = segment(entry.quadrant, entry.ring);
    var point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = entry.active || config.print_layout ? rings[entry.ring].color : config.colors.inactive;
  }

  // partition entries according to segments
  var segmented = new Array(4);
  for (var quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = [];
    rings.forEach((ring, index) => {
      segmented[quadrant][index] = [];
    })
  }
  for (var i = 0; i < config.entries.length; i++) {
    var entry = config.entries[i];
    segmented[entry.quadrant][entry.ring].push(entry);
  }

  // assign unique sequential id to each entry
  var id = 1;
  for (var quadrant of [2, 3, 1, 0]) {
    rings.forEach((ring, index) => {
      var entries = segmented[quadrant][index];
      entries.sort(function(a, b) { return a.label.localeCompare(b.label); })
      for (var i = 0; i < entries.length; i++) {
        entries[i].id = "" + id++;
      }
    })
  }

  function translate(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  function viewbox(quadrant) {
    //console.log(quadrants[quadrant].factor_x);
    return [
      Math.max(0, quadrants[quadrant].factor_x * HALF_WIDTH) - HALF_WIDTH,
      Math.max(0, quadrants[quadrant].factor_y * HALF_HEIGHT) - HALF_HEIGHT,
      HALF_WIDTH,
      HALF_HEIGHT
    ].join(" ");
  }

  var svg = d3.select("svg#" + config.svg_id)
    .attr("class", "tech-radar");

  var radar = svg.append("g");
  if ("zoomed_quadrant" in config) {
    svg.attr("viewBox", viewbox(config.zoomed_quadrant));
  } else {
    const viewbox = [
      - (config.width / 2),
      - (config.height * 0.47),
      config.width,
      config.height
    ].join(" ");
    svg.attr("viewBox", viewbox);
  }

  var grid = radar.append("g").attr("class", "grid");

  const gridLineLength = MAX_RADIUS + EXTEND_GRID_LINES_BY
  // draw grid lines
  grid.append("line")
    .attr("x1", 0).attr("y1", - gridLineLength)
    .attr("x2", 0).attr("y2", gridLineLength);
  grid.append("line")
    .attr("x1", -gridLineLength).attr("y1", 0)
    .attr("x2", gridLineLength).attr("y2", 0);

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  var defs = grid.append("defs");
  var filter = defs.append("filter")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", 1)
    .attr("id", "solid");
  filter.append("feFlood")
    .attr("flood-color", "rgb(255, 0, 0, 0.8)");
  filter.append("feComposite")
    .attr("in", "SourceGraphic");

  // draw rings
  for (var i = 0; i < rings.length; i++) {
    grid.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", rings[i].radius);
    if (config.print_layout) {
      // .text(config.rings[i].name)
      grid.append("text")
        .text(rings[i].name)
        .attr("y", -rings[i].radius + 62)
        .attr("text-anchor", "middle")
        .attr("class", "ring-headers ring-header" + i);
    }
  }

  function legendSetPositionFromPreviousState(quadrant) {
    var dx = legend_offset_state[quadrant].x;
    var dy = legend_offset_state[quadrant].y + LEGEND_SPACING;

    legend_offset_state[quadrant].x = dx;
    legend_offset_state[quadrant].y = dy;

    return translate(
      legend_offset[quadrant].x + dx,
      legend_offset[quadrant].y + dy - 40
    );
  }

  function legend_transform(quadrant, ring, index = null) {
    var dx = ring < 2 ? 0 : 120;
    var dy = (index == null ? - LEGEND_SPACING : index * LEGEND_SPACING);
    if (ring % 2 === 1) {
      dy = dy + 36 + segmented[quadrant][ring - 1].length * LEGEND_SPACING;
    }
    return translate(
      legend_offset[quadrant].x + dx,
      legend_offset[quadrant].y + dy
    );
  }

  // draw title and legend (only in print layout)
  if (config.print_layout) {
    // title
    if ("title" in config) {
      radar.append("text")
        .attr("transform", translate(title_offset.x, title_offset.y))
        .text(config.title)
        .attr("class", "headertitle");
    }

    // footer
    if ("footer" in config) {
      radar.append("text")
        .attr("transform", translate(footer_offset.x, footer_offset.y))
        .text(config.footer)
        .attr("xml:space", "preserve")
        .attr("class", "footer");
    }

    // legend
    var legend = radar.append("g");
    for (var quadrant = 0; quadrant < 4; quadrant++) {
      legend_offset_state[quadrant].y = - (LEGEND_SPACING * 1.5);
      legend.append("text")
        .attr("transform", translate(
          legend_offset[quadrant].x,
          legend_offset[quadrant].y - 80
        ))
        .text(config.quadrants[quadrant].name)
        .attr("class", "quadrant-headers");
      rings.forEach((ring, index) => {
        legend.append("text")
          .attr("transform", legendSetPositionFromPreviousState(quadrant))
          .text(ring.name)
          .attr("class", `ringcategory ringcategory${index}`);
        legend.selectAll(".legend" + quadrant + index)
          .data(segmented[quadrant][index])
          .enter()
          .append("a")
          .attr("href", function(d, i) {
            return d.link ? d.link : "#"; // stay on same page if no link was provided
          })
          .append("text")
          .attr("transform", function(d, i) { return legendSetPositionFromPreviousState(quadrant); })
          .attr("class", `legend${quadrant + index} quadrant-tech`)
          .attr("id", function(d, i) { return "legendItem" + d.id; })
          .text(function(d, i) { return d.id + ". " + d.label; })
          .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
          .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });
        legend_offset_state[quadrant].y = legend_offset_state[quadrant].y + LEGEND_SPACING;
      });
    }
  }

  // layer for entries
  var rink = radar.append("g")
    .attr("id", "rink");

  // rollover bubble (on top of everything else)
  var bubble = radar.append("g")
    .attr("id", "bubble")
    .attr("x", 0)
    .attr("y", 0);
  bubble.append("rect")
    .attr("rx", 4)
    .attr("ry", 4);
  bubble.append("text");
  bubble.append("path")
    .attr("d", "M 0,0 10,0 5,8 z");

  function showBubble(d) {
    if (d.active || config.print_layout) {
      var tooltip = d3.select("#bubble text")
        .text(d.label);
      var bbox = tooltip.node().getBBox();
      d3.select("#bubble")
        .attr("transform", translate(d.x - bbox.width / 2, d.y - 26))
        .style("opacity", 0.8);
      d3.select("#bubble rect")
        .attr("x", -5)
        .attr("y", -bbox.height)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 6);
      d3.select("#bubble path")
        .attr("transform", translate(bbox.width / 2 - 5, 3));
    }
  }

  function hideBubble(d) {
    var bubble = d3.select("#bubble")
      .attr("transform", translate(0, 0))
      .style("opacity", 0);
  }

  function highlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.setAttribute("filter", "url(#solid)");
    legendItem.setAttribute("fill", "white");
  }

  function unhighlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.removeAttribute("filter");
    legendItem.removeAttribute("fill");
  }

  // draw blips on radar
  // .attr("transform", function(d, i) { return legend_transform(d.quadrant, d.ring, i); })

  var blips = rink.selectAll(".blip")
    .data(config.entries)
    .enter()
    .append("g")
    .attr("class", "blip")
    .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
    .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });

  // configure each blip
  blips.each(function(d) {
    var blip = d3.select(this);

    // blip link
    if (!config.print_layout && d.active && d.hasOwnProperty("link")) {
      blip = blip.append("a")
        .attr("xlink:href", d.link);
    }

    // blip shape
    let blibAttr;
    if (d.moved > 0) {
      blibAttr = ["path", "d", "M -11,5 11,5 0,-13 z"]  // triangle pointing up
    } else if (d.moved < 0) {
      blibAttr = ["path", "d", "M -11,-5 11,-5 0,13 z"] // triangle pointing down
    } else {
      blibAttr = ["circle", "r", 14]                     // circle
    }

    blip.append(blibAttr[0])
      .attr(blibAttr[1], blibAttr[2])
      .attr("class", `r${d.ring} q${d.quadrant}`);

    // blip text
    if (d.active || config.print_layout) {
      var blip_text = config.print_layout ? d.id : d.label.match(/[a-z]/i);
      // .style("font-size", function(d) { return blip_text.length > 2 ? "8px" : "9px"; })
      blip.append("text")
        .text(blip_text)
        .attr("y", 5)
        .attr("text-anchor", "middle");
    }
  });

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr("transform", function(d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    })
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(config.entries)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force("collision", d3.forceCollide().radius(18).strength(0.85))
    .on("tick", ticked);

  // set event handlers
  const allIcons = document.querySelectorAll('#topbar .icon');
  const svgQuadrants = document.querySelectorAll('.svg-quadrant');
}

/**
 * Created by eamonnmaguire on 04/06/15.
 */


var CMSVis2D = {};

CMSVis2D.variables = {};
CMSVis2D.options = {

    colors: {
        "muon_chambers": "#E64C3C", // red,
        "hcal": "#F7CD00", // yellow,
        "ecal": "#14A085", // green,
        "beam_pipe": "#95A5A5", // dark grey,
        "outer_barrel": "#2C3E50", // dark blue,
        "solenoid": "#2C3E50" // dark blue,
    }
};

CMSVis2D.rendering = {

    render: function (placement, event, options) {

        CMSVis2D.options.width = options.width;
        CMSVis2D.options.height = options.height;
        CMSVis2D.variables.svg = d3.select(placement)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height)
            .append("g")
            .attr("transform", "scale(.9)");

        CMSVis2D.rendering.draw_detector();

    },

    draw_detector: function () {
        CMSVis2D.rendering.draw_outer_muon_chambers();
        CMSVis2D.rendering.draw_inner_muon_chambers();
        CMSVis2D.rendering.draw_solenoids(4);
        CMSVis2D.rendering.draw_outer_barrel();
        CMSVis2D.rendering.draw_hcal();
        CMSVis2D.rendering.draw_ecal();

        CMSVis2D.rendering.draw_beam_pipe();
    },

    draw_ecal: function () {
        CMSVis2D.variables.svg.append("circle")
            .attr("cx", CMSVis2D.options.width / 2)
            .attr("cy", CMSVis2D.options.height / 2).attr("r", CMSVis2D.options.width * 0.06)
            .style("stroke", CMSVis2D.options.colors.ecal)
            .style("stroke-width", CMSVis2D.options.width * 0.03)
            .style("fill", "#fff")
    },

    draw_hcal: function () {
        CMSVis2D.variables.svg.append("circle")
            .attr("cx", CMSVis2D.options.width / 2)
            .attr("cy", CMSVis2D.options.height / 2).attr("r", (CMSVis2D.options.width * 0.11))
            .style("stroke", CMSVis2D.options.colors.hcal)
            .style("stroke-width", CMSVis2D.options.width * .07)
            .style("fill", "#fff")
    },


    draw_outer_barrel: function () {

        CMSVis2D.variables.svg.append("circle")
            .attr("cx", CMSVis2D.options.width / 2)
            .attr("cy", CMSVis2D.options.height / 2).attr("r", CMSVis2D.options.width * 0.1)
            .style("stroke", "#2C3E50")
            .style("stroke-width", CMSVis2D.options.width * 0.01)
            .style("fill", "#fff");
    },

    draw_inner_muon_chambers: function () {

        var to_draw = [{"x": -9.75, "y": 98, "rot": 0},
            {"x": 16, "y": 97, "rot": 28},
            {"x": 38, "y": 83, "rot": 60},
            {"x": 49.2, "y": 60, "rot": 90},
            {"x": 47.5, "y": 34, "rot": 120},
            {"x": 33, "y": 12, "rot": 150},
            {"x": 10, "y": 0, "rot": 180},
            {"x": -16, "y": 1.5, "rot": 210},
            {"x": -37.5, "y": 16, "rot": 240},
            {"x": -49.4, "y": 39, "rot": 270},
            {"x": -48, "y": 65, "rot": 300},
            {"x": -33, "y": 86.4, "rot": 330}
        ];

        var central_x = (CMSVis2D.options.width / 2);
        var central_y = CMSVis2D.options.height / 2;

        var chamber_dimensions = CMSVis2D.options.width * 0.59;
        var segment_size = CMSVis2D.options.width * 0.12;

        var scaleX = d3.scale.linear()
            .domain([-50, 50])
            .range([0, chamber_dimensions]);

        var scaleY = d3.scale.linear()
            .domain([0, 100])
            .range([chamber_dimensions, 0]);

        var chambers = CMSVis2D.variables.svg.append("g").attr("class", "chambers")
            .attr("transform", "translate(" + (central_x - (chamber_dimensions / 2)) + ", " + ((central_y - (chamber_dimensions / 2))) + ")");

        for (var idx in to_draw) {

            var group = chambers.append("g").attr("class", "chamber");
            group.append("rect")
                .attr("x", 0)
                .attr("y", CMSVis2D.options.width * 0.05)
                .attr("width", segment_size)
                .attr("height", CMSVis2D.options.width * 0.015)
                .style("stroke-width", 0)
                .style("fill", CMSVis2D.options.colors.muon_chambers)
                .attr('transform', 'rotate(' + to_draw[idx].rot + ')');

            group.append("rect")
                .attr("x", 0)
                .attr("y", CMSVis2D.options.width * 0.04)
                .attr("width", segment_size)
                .attr("height", CMSVis2D.options.width * 0.015)
                .style("stroke-width", 0)
                .style("fill", "#ECF0F1")
                .attr('transform', 'rotate(' + to_draw[idx].rot + ')');

            group.attr('transform', 'translate(' + scaleX(to_draw[idx].x) + ', ' + scaleY(to_draw[idx].y) + ')')
        }
    },

    draw_chamber_layer: function (dimensions, central_x, central_y) {

        var scaleX = d3.scale.linear()
            .domain([-50, 50])
            .range([0, dimensions["size"]]);

        var scaleY = d3.scale.linear()
            .domain([0, 100])
            .range([dimensions["size"], 0]);

        var poly = [{"x": -11.75, "y": 100},
            {"x": 11.75, "y": 100},
            {"x": 35.5, "y": 87.125},
            {"x": 48.5, "y": 64.5},
            {"x": 48.5, "y": 38.75},
            {"x": 35.5, "y": 16},
            {"x": 11.75, "y": 0},
            {"x": -11.75, "y": 0},
            {"x": -35.5, "y": 16},
            {"x": -48.5, "y": 38.75},
            {"x": -48.5, "y": 64.5},
            {"x": -35.5, "y": 87.125},
            {"x": -11.75, "y": 100}
        ];

        var chamber = CMSVis2D.variables.svg.append("g").attr("transform", "translate(" + ((central_x - (dimensions["size"] / 2))) + ", " + (central_y - (dimensions["size"] / 2)) + ")");
        chamber.selectAll("polygon")
            .data([poly])
            .enter().append("polygon")
            .attr("points", function (d) {
                return d.map(function (d) {
                    return [scaleX(d.x), scaleY(d.y)].join(",");
                }).join(" ");
            })
            .attr("stroke", CMSVis2D.options.colors.muon_chambers)
            .attr("fill", dimensions["fill"] ? dimensions["fill"] : "#ECF0F1")
            .attr("stroke-width", dimensions["stroke"]);
    },

    draw_outer_muon_chambers: function () {

        var central_x = (CMSVis2D.options.width / 2);
        var central_y = CMSVis2D.options.height / 2;

        var chambers = [{"size":CMSVis2D.options.width * .85, "stroke": CMSVis2D.options.width * .035}, {"size":CMSVis2D.options.width * .7, "stroke": CMSVis2D.options.width * .035}, {"size":CMSVis2D.options.width * .57, "stroke": CMSVis2D.options.width * .02,"fill": "white"}];
        for (var chamber in chambers) {
            CMSVis2D.rendering.draw_chamber_layer(chambers[chamber], central_x, central_y)
        }
    },


    draw_solenoids: function (number_of_solenoids) {

        CMSVis2D.variables.svg.append("circle")
            .attr("cx", CMSVis2D.options.width / 2)
            .attr("cy", CMSVis2D.options.height / 2).attr("r", (CMSVis2D.options.width * 0.21))
            .style("stroke", "#2C3E50")
            .style("stroke-width", CMSVis2D.options.width * 0.01)
            .style("fill", "none");

        for (var count = 0; count < number_of_solenoids; count++) {
            CMSVis2D.variables.svg.append("circle")
                .attr("cx", CMSVis2D.options.width / 2)
                .attr("cy", CMSVis2D.options.height / 2).attr("r", (CMSVis2D.options.width * 0.19) - (count * 4))
                .style("stroke", "#7F8C8D")
                .style("stroke-width", CMSVis2D.options.width * 0.002)
                .style("fill", function () {
                    return (count == number_of_solenoids - 1) ? "#fff" : "#ECF0F1"
                        ;
                })
        }
    },

    draw_beam_pipe: function () {
        CMSVis2D.variables.svg.append("circle")
            .attr("cx", CMSVis2D.options.width / 2)
            .attr("cy", CMSVis2D.options.height / 2).attr("r", CMSVis2D.options.width * 0.01)
            .style("stroke", "#95A5A5")
            .style("stroke-width", 3)
            .style("fill", "#fff")
    },

    draw_events: function (events) {

        var scaleX = d3.scale.linear()
            .domain([-50, 50])
            .range([0, CMSVis2D.options.width]);

        var scaleY = d3.scale.linear()
            .domain([0, 100])
            .range([CMSVis2D.options.height, 0]);

        var events = [
            {"end-x": -45, "end-y": 40, "type": "neutrino"},
            {"end-x": -45, "end-y": 40, "type": "neutrino"},
            {"end-x": -45, "end-y": 40, "type": "neutrino"},
            {"end-x": -45, "end-y": 40, "type": "neutrino"},
            {"end-x": -45, "end-y": 40, "type": "neutrino"},
            {"end-x": -45, "end-y": 40, "type": "neutrino"}
        ];

        var start_position = [CMSVis2D.options.width / 2, CMSVis2D.options.height / 2];
        for (var event_idx in events) {

            // draw animated bezier paths to represent each signal.
            // colour dependent on type or probably would be the energy level.
        }
    }

};
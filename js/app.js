let data = [];

const yesCount = document.getElementById("yes-count");
const noCount = document.getElementById("no-count");
const maybeCount = document.getElementById("maybe-count");

const yesNo = document.getElementById("yes-no");
const yesNoMaybe = document.getElementById("yes-no-maybe");

// const one = document.querySelector("#one");
// const two = document.querySelector("#two");
// const three = document.querySelector("#three");
// const four = document.querySelector("#four");
// const five = document.querySelector("#five");

const maybeContainer = document.getElementById("maybe-container");

const resetButton = document.getElementById("reset-btn");

let numberOfSets = 3;

// const countElements = [one, two, three, four, five];

let currentMode = "yes-no";
const modes = [yesNo, yesNoMaybe];

function selectActive(id, elements) {
  const generic = "col input-sets text-center";
  const active = "col input-sets text-center active-set";
  elements.forEach((el) => {
    if (el.id === id) {
      el.className = active;
    } else {
      el.className = generic;
    }
  });
}

function setNumberOfSets(e) {
  numberOfSets = Number(e.target.textContent);
  selectActive(e.target.id, countElements);
}

// one.addEventListener("click", setNumberOfSets);
// two.addEventListener("click", setNumberOfSets);
// three.addEventListener("click", setNumberOfSets);
// four.addEventListener("click", setNumberOfSets);
// five.addEventListener("click", setNumberOfSets);

resetButton.addEventListener("click", function () {
  yesCount.textContent = "0";
  noCount.textContent = "0";
  maybeCount.textContent = "0";
});

// 320 510

function getWidth() {
  if(window.outerWidth >= 385 && window.outerWidth <= 510) {
    return 315;
  } else if(window.outerWidth <= 385) {
    return 250;
  } else {
    return 500;
  }
}

var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = getWidth(),
  h = getWidth(),
  // w = 500 - padding.left - padding.right,
  // h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20(); //category20c()
//randomNumbers = getRandomNumbers();

//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results

for (let i = 0; i <= 3; i++) {
  data.push({ label: "YES", value: 1 });
  data.push({ label: "NO", value: 1 });
}

makeChart();

yesNo.addEventListener("click", function (e) {
  maybeContainer.style.display = "none";
  currentMode = "yes-no";
  selectActive(e.target.id, modes);
  data = [];
  for (let i = 0; i <= 3; i++) {
    data.push({ label: "YES", value: 1 });
    data.push({ label: "NO", value: 1 });
  }
  document.getElementById("chart").innerHTML = "";
  makeChart();
});
yesNoMaybe.addEventListener("click", function (e) {
  maybeContainer.style.display = "block";
  currentMode = "yes-no-maybe";
  selectActive(e.target.id, modes);
  data = [];
  for (let i = 0; i <= 3; i++) {
    data.push({ label: "YES", value: 1 });
    data.push({ label: "NO", value: 1 });
    data.push({ label: "MAYBE", value: 1 });
  }
  document.getElementById("chart").innerHTML = "";
  makeChart();
});

function makeChart() {
  var svg = d3
    .select("#chart")
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom)
    .style("transform", "rotate(-90deg)");

  var container = svg
    .append("g")
    .attr("class", "chartholder")
    .attr(
      "transform",
      "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
    );

  var vis = container.append("g");

  var pie = d3.layout
    .pie()
    .sort(null)
    .value(function (d) {
      return 1;
    });

  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  var arcs = vis
    .selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

  arcs
    .append("path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", function (d) {
      return arc(d);
    });

  // add the text
  arcs
    .append("text")
    .attr("transform", function (d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      d.angle = (d.startAngle + d.endAngle) / 2;
      return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90) +
        ")translate(" +
        (d.outerRadius - 10) +
        ")"
      );
    })
    .attr("text-anchor", "end")
    .text(function (d, i) {
      return data[i].label;
    })
    .style({ "font-size": window.outerWidth <= 375 ? "1rem" : "1.5rem" });

  container.on("click", spin);

  function spin(d) {
    container.on("click", null);

    //all slices have been seen, all done
    console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    if (oldpick.length == data.length) {
      console.log("done");
      container.on("click", null);
      return;
    }

    var ps = 360 / data.length,
      pieslice = Math.round(1440 / data.length),
      rng = Math.floor(Math.random() * 1440 + 360);

    rotation = Math.round(rng / ps) * ps;

    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;

    rotation += 90 - Math.round(ps / 2);

    vis
      .transition()
      .duration(5000)
      .attrTween("transform", rotTween)
      .each("end", function () {
        if (data[picked].label === "YES")
          yesCount.textContent = Number(yesCount.textContent) + 1;
        if (data[picked].label === "NO")
          noCount.textContent = Number(noCount.textContent) + 1;
        if (data[picked].label === "MAYBE")
          maybeCount.textContent = Number(maybeCount.textContent) + 1;

        oldrotation = rotation;

        container.on("click", spin);
      });
  }

  //make arrow
  svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (w + padding.left + padding.right) +
        "," +
        (h / 2 + padding.top) +
        ")"
    )
    .append("path")
    .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
    .style({ fill: "black" });

  //draw spin circle
  container
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ fill: "white", cursor: "pointer" });

  //spin text
  container
    .append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({
      "font-weight": "bold",
      "font-size": "30px",
      transform: "rotate(90deg)",
      cursor: "pointer",
    });

  function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return "rotate(" + i(t) + ")";
    };
  }

  function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

    if (
      window.hasOwnProperty("crypto") &&
      typeof window.crypto.getRandomValues === "function"
    ) {
      window.crypto.getRandomValues(array);
      console.log("works");
    } else {
      //no support for crypto, get crappy random numbers
      for (var i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
      }
    }

    return array;
  }
}

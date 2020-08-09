let theWheel = new Winwheel({
  numSegments: 4,
  segments: [
    { fillStyle: "#eae56f", text: "Prize One" },
    { fillStyle: "#89f26e", text: "Prize Two" },
    { fillStyle: "#7de6ef", text: "Prize Three" },
    { fillStyle: "#e7706f", text: "Prize Four" },
  ],
  animation: {
    type: "spinToStop",
    duration: 5,
    spins: 8,
  },
});

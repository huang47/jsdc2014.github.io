var Rx = require('rx');

module.exports = {
  "throttle": {
    "label": "throttle",
    "inputs": [
      [{t:0, d:'h'}, {t:26, d:'e'}, {t:34, d:'l'}, {t:40, d:'l'}, {t:45, d:'o'}]
    ],
    "apply": function(inputs, scheduler) {
        return inputs[0].
            scan(function(x, y) {
                return {content: x.content + y.content, time: y.time, id: x.id+y.id};
            }).
            throttle(10, scheduler);
    }
  },
  "mouse drag": {
    "label": "mouse drag",
    "inputs": [
      [
          { t: 0, d: 'D' }
      ],
      [
          { t: 14, d: 'M' },
          { t: 20, d: 'M' },
          { t: 30, d: 'M' },
          { t: 48, d: 'M' },
          { t: 66, d: 'M' },
          { t: 82, d: 'M' }
      ],
      [
          { t: 90, d: 'U' }
      ]
    ],
    "apply": function(inputs) {
        var mouseDowns = inputs[0];
        var mouseMoves = inputs[1];
        var mouseUps = inputs[2];

        return mouseDowns.
            flatMap(function (mouseDown) {
                return Rx.Observable.return(mouseDown).
                    concat(mouseMoves.takeUntil(mouseUps));
            });
    }
  },
  "search": {
    "label": "search",
    "inputs": [
      [
          { t: 4, d: 'h' },
          { t: 20, d: 'he' },
          { t: 30, d: 'hel' },
          { t: 48, d: 'hell' },
          { t: 66, d: 'hello' }
      ]
    ],
    "apply": function(inputs, scheduler) {
        var delays = [10, 5, 8, 35, 1];
        var i = 0;

        return inputs[0].
            map(function (x) {
                return Rx.Observable.return(x.content + '\'').
                    delay(delays[i++], scheduler);
            }).
            switchLatest();
    }
  }
};

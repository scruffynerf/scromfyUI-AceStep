/**
 * Lyricer ES Module - ported from reference code
 */
class Lyricer {
    constructor(options) {
        this.divID = "lyricer"; // the default html container id
        this.currentcss = "lyricer-current-line"; // this css for the line current playing
        this.lineidPrefix = "lyricer-line"; // the id prefix for each line
        this.showLines = 8; //lines showing before and after;
        this.clickable = true;
        this.clickEventName = "lyricerclick";
        if (options) {
            for (var prop in options) {
                if (typeof this[prop] != "undefined" && options.hasOwnProperty(prop)) {
                    this[prop] = options[prop];
                }
            }
        }
    }

    setLrc(rawLrc) {
        this.tags = {};
        this.lrc = [];
        this.rangeLrc = [];

        var tagRegex = /\[([a-z]+):(.*)\].*/;
        var lrcAllRegex = /(\[[0-9.:\[\]]*\])+(.*)/;
        var timeRegex = /\[([0-9]+):([0-9.]+)\]/;
        var rawLrcArray = rawLrc.split(/[\r\n]/);
        for (var i = 0; i < rawLrcArray.length; i++) {
            // handle tags first
            var tag = tagRegex.exec(rawLrcArray[i]);
            if (tag && tag[0]) {
                this.tags[tag[1]] = tag[2];
                continue;
            }
            // handle lrc
            var lrc = lrcAllRegex.exec(rawLrcArray[i]);
            if (lrc && lrc[0]) {
                var times = lrc[1].replace(/\]\[/g, "],[").split(",");
                for (var j = 0; j < times.length; j++) {
                    var time = timeRegex.exec(times[j]);
                    if (time && time[0]) {
                        this.lrc.push({ "starttime": parseInt(time[1], 10) * 60 + parseFloat(time[2]), "line": lrc[2] });
                    }
                }
            }
        }

        //sort lrc array
        this.lrc.sort(function (a, b) {
            return a.starttime - b.starttime;
        });

        // crate the range lrc array
        // dummy lines
        for (var i = 0; i < this.showLines; i++) {
            this.rangeLrc.push({ "starttime": -1, "endtime": 0, "line": "&nbsp;" });
        }
        // real data
        var starttime = 0;
        var line = "";
        for (var i = 0; i < this.lrc.length; i++) {
            let endtime = parseFloat(this.lrc[i].starttime);
            this.rangeLrc.push({ "starttime": starttime, "endtime": endtime, "line": line });
            starttime = endtime;
            line = this.lrc[i].line;
        }
        this.rangeLrc.push({ "starttime": starttime, "endtime": 9999.99, "line": line });
        // dummy lines
        for (var i = 0; i < this.showLines; i++) {
            this.rangeLrc.push({ "starttime": -1, "endtime": 0, "line": "&nbsp;" });
        }
        this.totalLines = this.rangeLrc.length;

        // set html and move to start
        this._setHtml();
        this.move(0);
    }

    _setHtml() {
        this.currentLine = 0;

        var container = document.getElementById(this.divID);
        if (!container) return;

        container.innerHTML = "";
        var ul = document.createElement("ul");
        container.appendChild(ul);
        for (var i = 0; i < this.totalLines; i++) {
            var li = document.createElement("li");
            li.innerHTML = this.rangeLrc[i].line;
            if (!li.innerHTML) { li.innerHTML = "&nbsp;" };
            li.setAttribute("id", this.lineidPrefix + i);
            if (this.clickable) {
                li.onclick = this._lineClicked(i);
                li.style.cursor = 'pointer';
            }
            ul.appendChild(li);
        }

        // hide the later ones
        for (var i = this.showLines; i < this.totalLines; i++) {
            const el = document.getElementById(this.lineidPrefix + i);
            if (el) el.style.display = "none";
        }
    }

    _lineClicked(id) {
        var self = this;
        return function () {
            var detail = { "time": self.rangeLrc[id].starttime };
            var e = new CustomEvent(self.clickEventName, {
                'detail': detail,
                "bubbles": true
            });
            var elem = document.getElementById(self.lineidPrefix + id);
            if (elem) elem.dispatchEvent(e);
        };
    }

    move(time) {
        for (var i = 0; i < this.totalLines; i++) {
            if (time >= this.rangeLrc[i].starttime && time < this.rangeLrc[i].endtime) {
                this.currentLine = i;
                this._moveToLine(this.currentLine);
                return;
            }
        }
    }

    _moveToLine(line) {
        var startShow = line - this.showLines;
        var endShow = line + this.showLines;
        for (var i = 0; i < this.totalLines; i++) {
            var li = document.getElementById(this.lineidPrefix + i);
            if (!li) continue;

            if (i >= startShow && i <= endShow) {
                li.style.display = "block";
            } else {
                li.style.display = "none";
            }
            if (i == line) {
                li.className = this.currentcss;
            } else {
                li.className = "";
            }
        }
    }
}

export default Lyricer;

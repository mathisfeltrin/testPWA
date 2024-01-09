// noinspection SpellCheckingInspection

function parseICSURL (URLdata, ical)
{
    const fs = require("fs");
    console.log(__dirname);
    let config = fs.readFileSync(__dirname + "/eventColorsConfig.json", 'utf8');
    config = JSON.parse(config);
    let colors = config.colors;
    /**
     * @function ical.parseICS
     */

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let obj = [];
    let data = ical.parseICS(URLdata);
    for(let k in data)
    {
        if (data.hasOwnProperty(k)) {
            let ev = data[k];
            if (ev.type === 'VEVENT') {
                let title;
                ev.summary.val === undefined ? title = ev.summary : title = ev.summary.val.split("-")[0];
                let event = {
                    "title": title,
                    "location": ev.location,
                    "date": ev.start.getDate() + "/" + months[ev.start.getMonth()] + "/" + ev.start.getFullYear(),
                    "start" : new Date(ev.start.getFullYear(), ev.start.getMonth(), ev.start.getDate(), ev.start.getHours(), ev.start.getMinutes()),
                    "end" : new Date(ev.end.getFullYear(), ev.end.getMonth(), ev.end.getDate(), ev.end.getHours(), ev.end.getMinutes())
                }
                if(event.title.toLowerCase().includes("cours annul"))
                {
                    event.backgroundColor = "rgb(200,50,50)";
                    event.event_type = "CANCELED";
                }
                else
                {
                    for(let color of colors)
                    {
                        if(event.title.toLowerCase().includes(color.name))
                        {
                            event.backgroundColor = color.color;
                        }
                    }
                }
                obj.push(event);
            }
        }
    }
    return obj;
}

module.exports = { parseICSURL };
/* simple alias C.npc.Robin => V.NPCName[V.NPCNameList.indexOf("Robin")]
 * `C.npc.Black Hawk` won't work however, use `C.npc["Great Wolf"]` instead
 * run this after V.NPCName exists */
function initCNPC() {
	C.npc = {};
	for (const name of setup.NPCNameList) {
		Object.defineProperty(C.npc, name, {
			get() {
				return V.NPCName[setup.NPCNameList.indexOf(name)];
			},
			set(val) {
				V.NPCName[setup.NPCNameList.indexOf(name)] = val;
			},
		});
	}
}
window.initCNPC = initCNPC;

function initCCrime() {
	C.crime = {};

	C.crime.max = 10000;
	C.crime.min = 0;
	C.crime.spree = 1000;

	for (const crime of Object.keys(setup.crimeNames)) {
		Object.defineProperty(C.crime, crime, {
			get() {
				return V.crime[crime].current;
			},
			set(val) {
				V.crime[crime].current = Math.clamp(val, C.crime.min, C.crime.max);
			},
		});
		Object.defineProperty(C.crime, crime + "History", {
			get() {
				return V.crime[crime].history;
			},
			set(val) {
				V.crime[crime].history = val;
			},
		});
		Object.defineProperty(C.crime, crime + "Daily", {
			get() {
				return V.crime[crime].daily;
			},
			set(val) {
				V.crime[crime].daily = val;
			},
		});
		Object.defineProperty(C.crime, crime + "Count", {
			get() {
				return V.crime[crime].count;
			},
			set(val) {
				V.crime[crime].count = val;
				if (V.crime[crime].count === 0 && V.crime[crime].current > 0) {
					V.crime[crime].count = 1;
				} else if (V.crime[crime].current === 0 && V.crime[crime].count > 0) {
					V.crime[crime].count = 0;
				}
			},
		});
		Object.defineProperty(C.crime, crime + "CountHistory", {
			get() {
				return V.crime[crime].countHistory;
			},
			set(val) {
				V.crime[crime].countHistory = val;
			},
		});
	}

	C.crime.getEvents = (type, desc = "default") => {
		return V.crime.events[desc] && V.crime.events[desc].filter(e => e.type === type); // (ES2020)
	};
	C.crime.clearEvents = (type = null, desc = null) => {
		if (type !== null) {
			Object.keys(V.crime.events).forEach(d => {
				V.crime.events[d] = V.crime.events[d].filter(e => e.type !== type);
				if (V.crime.events[d].length === 0) delete V.crime.events[d];
			});
		} else if (desc !== null) {
			delete V.crime.events[desc];
		} else {
			V.crime.events = {};
		}
	};
	C.crime.logEvent = (severity, type = "thievery", desc = "default", date = Time.date.timeStamp) => {
		if (!V.crime.events[desc]) V.crime.events[desc] = [];
		V.crime.events[desc].push({ date, severity, type });
	};
}
window.initCCrime = initCCrime; // Init function

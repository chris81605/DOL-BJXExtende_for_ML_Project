/*Add new hairstyles here to indicate how styles will be ruffled*/
setup.hair = {
	hairtype: [
		{
			name: "default",
			list: [
				"default",
				"loose",
				"straight",
				"swept left",
				"curl",
				"defined curl",
				"neat",
				"curly side up",
				"heart braid",
				"ruffled",
				"sidecut",
				"space buns",
				"messy bun",
				"all down",
				"half-up"
			],
			devolve: ["ruffled"],
		},
		{
			name: "single tail",
			list: ["flat ponytail", "ponytail", "side tail left", "side tail right", "fluffy ponytail", "side thicktail", "thick ponytail"],
			devolve: ["ponytail"],
		},
		{
			name: "double tail",
			list: ["pigtails", "twintails", "curly pigtails", "sailor buns", "loop braid", "thick twintails", "drill ringlets", "low tails", "thick pigtails", "scorpion tails"],
			devolve: ["twintails"],
		},
		{
			name: "single braid",
			list: ["braid left", "braid right", "left fishtail", "right fishtail"],
			devolve: ["braid left"],
		},
		{
			name: "double braid",
			list: ["twin braids"],
			devolve: ["twin braids"],
		},
		{
			name: "short",
			list: ["messy", "short", "short spiky", "layered bob", "french bob"],
			devolve: ["messy", "short spiky"],
		},
		{
			name: "fro",
			list: ["fro", "afro puffs", "afro pouf"],
			devolve: ["fro"],
		},
		{
			/* immune to being ruined (because devolve list is empty) */
			name: "special",
			list: ["dreads", "bubble tails"],
			devolve: [],
		},
	],
	fringetype: [
		{
			name: "default",
			list: [
				"default",
				"thin flaps",
				"wide flaps",
				"hime",
				"loose",
				"messy",
				"overgrown",
				"ringlets",
				"split",
				"straight",
				"side braid",
				"swept left",
				"back",
				"parted",
				"flat",
				"quiff",
				"straight curl",
				"ringlet curl",
				"curtain",
				"trident",
				"framed",
				"sidecut",
				"drill ringlets",
				"front braids",
				"blunt sidelocks",
				"short air vents",
				"side-pinned",
				"ruffled",
				"sectioned",
				"bowl",
				"emo",
				"emo left",
				"emo right",
			],
			devolve: ["messy", "trident", "thin flaps", "ruffled"],
		},
		{
			/* immune to being ruined (because devolve list is empty) */
			name: "special",
			list: ["fro", "dreads", "dread bun"],
			devolve: [],
		},
	],
};

function hairLengthStringToNumber(hairLength) {
	return {
		short: 0,
		shoulder: 200,
		chest: 400,
		navel: 600,
		thighs: 700,
		feet: 900,
	}[hairLength];
}
window.hairLengthStringToNumber = hairLengthStringToNumber;

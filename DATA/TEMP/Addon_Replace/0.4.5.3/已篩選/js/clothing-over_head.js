
/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initOverHead() {
	setup.clothes.over_head = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",cn_name_cap: "赤裸",
			variable: "naked",
			integrity: 0,
			integrity_max: 0,
			fabric_strength: 0,
			reveal: 1,
			word: "n",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "一丝不挂",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "froggy hood",
			name_cap: "Froggy hood",cn_name_cap: "青蛙服兜帽",
			variable: "froggy",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 500,
			word: "a",
			plural: 0,
			hood: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["rainproof"],
			set: "froggy",
			gender: "n",
			warmth: 65,
			cost: 0,
			description: "保护你免受雨淋。",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			outfitSecondary: ["over_upper", "froggy coat"],
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.over_head = [];
	/* 北极星模组 */
	setup.moddedClothes.over_head = setup.moddedClothes.over_head.concat([
	{
			name: "mushroom cap",
			name_cap: "Mushroom cap",cn_name_cap: "蘑菇帽",
			variable: "mushroom",
			integrity: 500,
			integrity_max: 500,
			fabric_strength: 30,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_sidebar: 1,
			type: ["rainproof", "shade"],
			set: "mushroom",
			gender: "n",
			femininity: 0,
			warmth: 0,
			cost: 0,
			description: "自有用处。",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			accessory_colour_sidebar: 0,
			back_img: 0,
			cursed: 1,
			location: 0,
			iconFile: "",
			accIcon: 0
	},
	{
        name: "raincoat cap",
        name_cap: "raincoat cap",
        cn_name_cap: "雨衣帽",
        variable: "raincoat cap",
        integrity: 300,
        integrity_max: 300,
        fabric_strength: 20,
		reveal: 1,
		word: "a",
		plural: 0,
		hood: 1,
		colour: 0,
		colour_options: [],
		colour_combat: 0,
		type: ["rainproof"],
		set: "raincoat",
		gender: "n",
		warmth: 0,
		cost: 0,
		description: "保护你免受雨水侵袭。",
		shop: ["clothing"],
		accessory: 0,
		accessory_colour: 0,
		accessory_colour_options: [],
		back_img: 0,
		cursed: 0,
		location: 0,
		outfitSecondary: ["over_upper","raincoat"]
    },
	]);
	/* 北极星 */

	setup.moddedClothes.over_head.forEach((x, i) => (x.index = setup.clothes.over_head.length + i));
	setup.clothes.over_head.push(...setup.moddedClothes.over_head);
}
window.initOverHead = initOverHead;






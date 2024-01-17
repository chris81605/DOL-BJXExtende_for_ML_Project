
/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initOverLower() {
	setup.clothes.over_lower = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",cn_name_cap: "赤裸",
			variable: "naked",
			integrity: 0,
			integrity_max: 0,
			fabric_strength: 0,
			reveal: 1000,
			rearresize: 0,
			word: "n",
			skirt: 0,
			skirt_down: 0,
			state: 0,
			state_base: 0,
			plural: 0,
			colour: 0,
			colour_options: [],
			exposed: 2,
			exposed_base: 2,
			vagina_exposed: 1,
			vagina_exposed_base: 1,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "一丝不挂",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			high_img: 0,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "froggy skirt",
			name_cap: "Froggy skirt",cn_name_cap: "青蛙裙",
			variable: "froggy",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 30,
			reveal: 100,
			rearresize: -4,
			word: "a",
			one_piece: 1,
			skirt: 1,
			skirt_down: 1,
			zip: 1,
			state: "waist",
			state_base: "waist",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "green",
			exposed: 0,
			exposed_base: 0,
			vagina_exposed: 0,
			vagina_exposed_base: 0,
			anus_exposed: 0,
			anus_exposed_base: 0,
			type: ["rainproof"],
			set: "froggy",
			gender: "n",
			femininity: 0,
			warmth: 65,
			cost: 0,
			description: "保护你免受雨淋。",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			high_img: 0,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			outfitSecondary: ["over_upper", "froggy coat"],
		},

		{
			index: 2,
			name: "cream",
			name_cap: "Cream",cn_name_cap: "奶油",
			variable: "cream",
			integrity: 100,
			integrity_max: 100,
			fabric_strength: 30,
			reveal: 1000,
			rearresize: 0,
			word: "n",
			one_piece: 0,
			skirt: 0,
			skirt_down: 0,
			zip: 0,
			state: "waist",
			state_base: "waist",
			plural: 0,
			colour: 0,
			colour_options: [],
			colour_combat: "white",
			exposed: 0,
			exposed_base: 0,
			vagina_exposed: 1,
			vagina_exposed_base: 1,
			anus_exposed: 1,
			anus_exposed_base: 1,
			type: ["naked"],
			set: "over_lower",
			gender: "n",
			femininity: 0,
			cost: 10000,
			description: "不会保持太久。",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			high_img: 0,
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.over_lower = [];
	/* 北极星模组 */
	setup.moddedClothes.over_lower = setup.moddedClothes.over_lower.concat([
	{
	        name: "raincoat skirt",
            name_cap: "raincoat skirt",
            cn_name_cap: "雨衣下摆",
            variable: "raincoat skirt",
            integrity: 300,
            integrity_max: 300,
            fabric_strength: 30,
            reveal: 1,
            rearresize: 0,
            word: "a",
            one_piece: 1,
            skirt: 1,
            skirt_down: 1,
            zip: 1,
            state: "waist",
            state_base: "waist",
            plural: 0,
            colour: 0,
            colour_options: [],
            colour_combat:"green",
            type: ["rainproof"],
            set: "raincoat",
            gender: "n",
            femininity: 0,
            warmth: 0,
            cost: 0,
            description: "保护你免受雨水侵袭。",
            shop: ["clothing"],
            accessory: 0,
            accessory_colour: 0,
            accessory_colour_options: [],
            high_img: 0,
            back_img: 0,
            cursed: 0,
            location: 0,
            iconFile: 0,
            accIcon: 0,
            outfitSecondary: ["over_upper","raincoat"]
    },
	]);
	/* 北极星 */

	setup.moddedClothes.over_lower.forEach((x, i) => (x.index = setup.clothes.over_lower.length + i));
	setup.clothes.over_lower.push(...setup.moddedClothes.over_lower);
}
window.initOverLower = initOverLower;






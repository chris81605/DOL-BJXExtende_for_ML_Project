
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function masturbationeffects() {
	const fragment = document.createDocumentFragment();
	const br = () => document.createElement("br");
	const span = (text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const otherElement = (tag, text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement(tag);
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump")
	);
	const selectedToy = (location, update) => {
		if (update === true) V["currentToy" + location.toLocaleUpperFirst()] = V["selectedToy" + location.toLocaleUpperFirst()];
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		if (update === false) V["currentToy" + location.toLocaleUpperFirst()] = "none";
		return toy;
	};
	const toyDisplay = (toy1, toy2) => {
		if (toy1 && toy2) return (toy1.colour ? setup.colourName(toy1.colour.replace("-"," ")) : "") + toy1.namecap + "和" + (toy2.colour ? setup.colourName(toy2.colour.replace("-"," ")) : "") + toy2.namecap;
		if (toy1) return (toy1.colour ? setup.colourName(toy1.colour.replace("-"," ")) : "") + toy1.namecap;
		return "";
	};

	const earSlimeDefy = () => V.earSlime.growth >= 100 && V.earSlime.defyCooldown && V.pain < V.earSlime.defyCooldown * 5;

	const otherVariables = {
		br,
		span,
		otherElement,
		genitalsExposed,
		breastsExposed,
		selectedToy,
		toyDisplay,
		earSlimeDefy,
		additionalEffect: { earSlimeDefy: [] },
	};

	if (V.player.vaginaExist) {
		otherVariables.hymenIntact = V.player.virginity.vaginal === true && V.sexStats.vagina.pregnancy.totalBirthEvents === 0;
		wikifier("vaginaWetnessCalculate");
	}
	if (V.corruptionMasturbation) {
		if (V.leftarm === "bound" && V.rightarm === "bound") {
			sWikifier(
				'你耳朵里的史莱姆使你与手臂周围的束缚作斗争。你没有取得成果，<span class="blue">它放弃了。</span><<arousal 600 "masturbation">><<stress 6>><<gstress>><<garousal>>'
			);
			fragment.append("");
			V.rightaction = "mrest";
			V.leftaction = "mrest";
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else if (
			playerHeatMinArousal() + playerRutMinArousal() >= 3000 ||
			(playerHeatMinArousal() + playerRutMinArousal() >= 1000 && V.earSlime.growth >= 100 && V.earSlime.defyCooldown)
		) {
			sWikifier(
				'你耳朵里的史莱姆感觉到，在你现在的状态下强迫你自慰是不值得的，<span class="blue">于是放弃了。</span>'
			);
			fragment.append("");
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else {
			if (V.orgasmdown >= 2) {
				if (V.corruptionMasturbationCount === undefined || V.corruptionMasturbationCount === null) V.corruptionMasturbationCount = random(2, 6);
				V.corruptionMasturbationCount--;
				if (V.corruptionMasturbationCount === 0) {
					V.corruptionMasturbation = false;
					delete V.corruptionMasturbationCount;
					if (V.awareness < 200) {
						// Prevents the PC from continuing actions that they normally are unable to do yet
						if (V.mouth === "mpenis") {
							sWikifier(
								'<span class="green">随着耳朵里的史莱姆失去对你的控制，你将嘴从自己的<<penis>>移开了。</span>'
							);
							fragment.append("");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mpenisentrance") {
							sWikifier('<span class="green">随着耳朵里的史莱姆失去对你的控制，你远离了你的<<penis>>。</span>');
							fragment.append("");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mchastityparasiteentrance") {
							sWikifier(
								'<span class="green">随着耳朵里的史莱姆失去对你的控制，你远离了你的贞操锁寄生虫。</span>'
							);
							fragment.append("");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mvaginaentrance") {
							sWikifier('<span class="green">随着耳朵里的史莱姆失去对你的控制，你远离了你的<<pussy>>。</span>');
							fragment.append("");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
						}
					}
				}
			}
			if (V.corruptionMasturbation) fragment.append(masturbationSlimeControl());
		}
	}

	if (V.possessed) {
		sWikifier("<<dynamicblock id=control-caption>><<controlcaption>><</dynamicblock>>");
		fragment.append(possessedMasturbation(span, br, sWikifier));
	}

	fragment.append(masturbationeffectsVaginaAnus(otherVariables));

	fragment.append(masturbationeffectsArms("left", V.leftaction === V.rightaction, otherVariables));
	fragment.append(masturbationeffectsArms("right", false, otherVariables));

	fragment.append(masturbationeffectsMouth(otherVariables));

	if (otherVariables.additionalEffect.hands === "ballplayeffects" && V.worn.genitals.name !== "chastity parasite") {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('你那<<penis>>急切地跳动着，<span class="pink">顶端漏出一滴滴的前液。</span>');
			} else {
				sWikifier('你那<<penis>>急切地跳动着，<span class="pink">前液渗入你的<<exposedlower>>。</span>');
			}
		} else if (V.arousal >= V.arousalmax * (3 / 5)) {
			if (genitalsExposed()) {
				sWikifier('你那<<penis>>急切地跳动着，<span class="pink">顶端漏出一滴滴的前液。</span>');
			} else {
				sWikifier('你那<<penis>>急切地跳动着，<span class="pink">前液在你的<<exposedlower>>上浸出一片深色的痕迹。</span>');
			}
		} else if (V.arousal >= V.arousalmax * (2 / 5)) {
			sWikifier("压力让你的<<penis>>怦怦直跳。");
		} else {
			sWikifier("压力让你的<<penis>>颤抖。");
		}
		fragment.append("");
	}

	if (
		V.player.penisExist &&
		otherVariables.additionalEffect.hands !== "ballplayeffects" &&
		V.arousal >= V.arousalmax * (3 / 5) &&
		V.mouth !== "mpenis" &&
		V.worn.genitals.name !== "chastity parasite"
	) {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('你的<<penis "strap-on">>急切地跳动着，<span class="pink">顶端漏出一滴滴的前液。</span>');
			} else {
				sWikifier('你的<<penis "strap-on">>急切地跳动着，<span class="pink">前液渗入你的<<exposedlower>>。</span>');
			}
		} else {
			if (genitalsExposed()) {
				sWikifier('你的<<penis "strap-on">>急切地跳动着，<span class="pink">顶端漏出一滴滴的前液。</span>');
			} else {
				sWikifier('你的<<penis "strap-on">>急切地跳动着，<span class="pink">前液在你的<<exposedlower>>上浸出一片深色的痕迹。</span>');
			}
		}
		fragment.append("");
	}

	if (otherVariables.additionalEffect.earSlimeDefy.length) {
		sWikifier(
			`一切对快感的尝试结果都变成了<span class="lewd">快乐</span>和<span class="red">痛苦</span>结合，感觉直冲你的${formatList(
				otherVariables.additionalEffect.earSlimeDefy,
				"和",
				true
			).replace(",", "、")}。<<gpain>>`
		);
		fragment.append("");
	}

	if (V.worn.genitals.name === "chastity parasite" && V.earSlime.vibration > 0) {
		if (V.earSlime.vibration > 1) wikifier("arousal", Math.clamp(25 * V.earSlime.vibration, 0, 1000), "masturbationGenital");
		if (V.earSlime.corruption < 100 && V.earSlime.vibration > 20) {
			V.earSlime.vibration = 20;
		} else if (V.earSlime.vibration > 60) {
			V.earSlime.vibration = 60;
		}

		if (V.earSlime.vibration === 1) {
			// Prevents a double message
			V.earSlime.vibration++;
		} else if (V.earSlime.vibration <= 10) {
			sWikifier('<span class="lewd">你的贞操锁寄生虫轻柔地在你<<penis>>周围跳动着。</span>');
		} else if (V.earSlime.vibration <= 20) {
			sWikifier('<span class="lewd">你的贞操锁寄生虫在你<<penis>>周围跳动着。</span>');
		} else if (V.earSlime.vibration <= 30) {
			sWikifier(
				`<span class="lewd">你的贞操锁寄生虫在你<<penis>>${V.mouth === "mchastityparasiteentrance" ? "和舌头" : ""}上跳动着。</span>`
			);
		} else {
			sWikifier(
				`<span class="lewd">你的贞操锁寄生虫在你的<<penis>>上剧烈震动着${
					V.mouth === "mchastityparasiteentrance" ? "和舌头" : ""
				}。</span>`
			);
		}
		if (V.earSlime.vibration > 1) fragment.append("");
	}

	if (V.player.vaginaExist && V.vaginaArousalWetness >= 60) {
		if (V.worn.under_lower.vagina_exposed && V.worn.lower.vagina_exposed) {
			wikifier("vaginaFluidPassive");
			if (T.lube_released) {
				sWikifier('<span class="pink">爱液从你的<<pussy>>渗出。</span>');
			}
		} else if (V.worn.under_lower.vagina_exposed === 0 && V.underlowerwetstage < 3) {
			sWikifier(`<span class="pink">爱液从你的<<pussy>>漏出来，弄湿了你的${V.worn.under_lower.cn_name_cap}。</span>`);
			wikifier("underlowerwet", 1);
		} else if (V.worn.lower.vagina_exposed === 0) {
			sWikifier(
				`<span class="pink">爱液从你的<<pussy>>漏出<<if V.underlowerwet gte 60>>，浸透你的${V.worn.under_lower.cn_name_cap}，<</if>>浸湿你的${V.worn.lower.cn_name_cap}。</span>`
			);
		} else {
			sWikifier('<span class="pink">爱液从你的<<pussy>>漏出来，弄湿了你的衣服。</span>');
		}
		fragment.append("");
	}

	if (
		random(0, 100) >= Math.clamp(135 - V.earSlime.corruption / 2, 80, 98) &&
		V.earSlime.corruption > currentSkillValue("willpower") / 10 &&
		V.corruptionMasturbation === undefined
	) {
		V.corruptionMasturbation = true;
		V.corruptionMasturbationCount = random(1, 4);
		fragment.append(span("你耳朵里的史莱姆决定要让你获得更多快乐。", "red"));
		fragment.append("");
	}

	fragment.append(br());
	fragment.append(br());

	return fragment;
}

function masturbationeffectsArms(
	arm,
	doubleAction,
	{ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact, earSlimeDefy }
) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const armAction = arm + "action";
	const armActionDefault = armAction + "default";
	const otherArm = arm === "left" ? "right" : "left";
	const otherArmAction = otherArm + "action";

	const clearAction = defaultAction => {
		V[armActionDefault] = defaultAction !== undefined ? defaultAction : V[armAction];
		V[armAction] = 0;
		if (doubleAction) {
			V[otherArmAction + "default"] = defaultAction !== undefined ? defaultAction : V[otherArmAction];
			V[otherArmAction] = 0;
		}
	};

	if (V[armAction] === 0) return fragment;

	if (V[armAction] === "mrest") {
		if (random(0, 100) >= 91 && V.earSlime.corruption > currentSkillValue("willpower") / 10 && V.corruptionMasturbation === undefined) {
			V.corruptionMasturbation = true;
			V.corruptionMasturbationCount = random(2, 6);
			fragment.append(span("你耳朵里的史莱姆决定继续控制你。", "red"));
			fragment.append("");
			clearAction(0);
		} else {
			clearAction();
		}
		return fragment;
	}

	// Dealing with the players clothes, needs work; what if layer above is not exposed?
	switch (V[armAction]) {
		case "moverupper":
			clearAction("mrest");
			V.worn.over_upper.exposed = 2;
			if (V.worn.over_upper.open) {
				V.worn.over_upper.state_top = "midriff";
				sWikifier(`你拉下你的${V.worn.over_upper.cn_name_cap}，<span class="lewd">露出你的<<breastsaside>>。</span>`);
			} else {
				V.worn.over_upper.state = "chest";
				sWikifier(`你拉起你的${V.worn.over_upper.cn_name_cap}，<span class="lewd">露出你的<<breastsaside>>。</span>`);
			}
			fragment.append("");
			break;
		case "mupper":
			clearAction("mrest");
			V.worn.upper.exposed = 2;
			if (V.worn.upper.open) {
				V.worn.upper.state_top = "midriff";
				sWikifier(`你拉起你的${V.worn.upper.cn_name_cap}，<span class="lewd">露出你的<<breastsaside>>。</span>`);
			} else {
				V.worn.upper.state = "chest";
				sWikifier(`你拉起你的${V.worn.upper.cn_name_cap}，<span class="lewd">露出你的<<breastsaside>>。</span>`);
			}
			fragment.append("");
			break;
		case "munder_upper":
			clearAction("mrest");
			V.worn.under_upper.exposed = 2;
			if (V.worn.under_upper.open) {
				V.worn.under_upper.state_top = "midriff";
				if (V.player.breastsize >= 3) {
					sWikifier(`你拉下你的${V.worn.under_upper.cn_name_cap}，<span class="lewd">你的<<breasts>>弹了出来。</span>`);
				} else {
					sWikifier(`你拉下你的${V.worn.under_upper.cn_name_cap}，<span class="lewd">露出你的<<breasts>>。</span>`);
				}
			} else {
				V.worn.under_upper.state = "chest";
				if (V.player.breastsize >= 3) {
					sWikifier(`你拉起你的${V.worn.under_upper.cn_name_cap}，<span class="lewd">你的<<breasts>>弹了出来。</span>`);
				} else {
					sWikifier(`你拉起你的${V.worn.under_upper.cn_name_cap}，<span class="lewd">露出<<breasts>>。</span>`);
				}
			}
			fragment.append("");
			break;
		case "moverlower":
			clearAction("mrest");
			V.worn.over_lower.anus_exposed = 1;
			V.worn.over_lower.vagina_exposed = 1;
			V.worn.over_lower.exposed = 2;
			if (setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt) {
				V.worn.over_lower.skirt_down = 0;
				sWikifier(`你拉起你的${V.worn.over_lower.cn_name_cap}，<span class="lewd">露出<<exposedlower>>。</span>`);
			} else {
				V.worn.over_lower.state = "thighs";
				sWikifier(`你拉下你的${V.worn.over_lower.cn_name_cap}，<span class="lewd">露出<<exposedlower>>。</span>`);
			}
			fragment.append("");
			break;
		case "mlower":
			clearAction("mrest");
			V.worn.lower.anus_exposed = 1;
			V.worn.lower.vagina_exposed = 1;
			V.worn.lower.exposed = 2;
			if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt) {
				V.worn.lower.skirt_down = 0;
				sWikifier(`你拉起你的${V.worn.lower.cn_name_cap}，<span class="lewd">露出<<undies>>。</span>`);
			} else {
				V.worn.lower.state = "thighs";
				sWikifier(`你拉下你的${V.worn.lower.cn_name_cap}，<span class="lewd">露出<<undies>>。</span>`);
			}
			fragment.append("");
			break;
		case "munder":
			clearAction("mrest");
			V.worn.under_lower.anus_exposed = 1;
			V.worn.under_lower.vagina_exposed = 1;
			V.worn.under_lower.state = "thighs";
			V.worn.under_lower.exposed = 2;
			sWikifier(`你拉下你的${V.worn.under_lower.cn_name_cap}，<span class="lewd">露出<<genitals>>。</span>`);
			fragment.append("");
			break;
	}
	if (V[armAction] === 0) return fragment;

	// Action Corrections
	if (V.mouth === "mpenis" || V.mouthaction === "mpenistakein" || V.mouthaction === "mpenissuck") {
		// If your mouth is on your penis, your hands should not have access to your glans
		if (V[armAction] === "mpenisglans") {
			V[armAction] = "mpenisshaft";
			if (doubleAction) V[otherArmAction] = "mpenisshaft";
		}
	}
	if (V.vaginaaction === "mpenisflowerpenetrate" || V.vaginause === "mpenisflowerpenetrate") {
		// If the player vaginally penetrates the phallus flower
		if (V[armAction] === "mvagina") {
			if (V.player.penisExist || V.parasite.clit.name) {
				V[armAction] = "mvaginarub";
				if (doubleAction) V[otherArmAction] = "mvaginarub";
			} else {
				V[armAction] = "mvaginaclit";
				if (doubleAction) V[otherArmAction] = "mvaginaclit";
			}
		}
		if (V.mouthaction === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
		}
		if (V.mouth === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
			V.mouth = 0;
			fragment.append(span("你把嘴从你的小穴上移开。"));
		}
		if (V[armAction] === "mvaginatease") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("你把手指从你的小穴里抽出。"));
			} else {
				fragment.append(span("你把那根手指从你的小穴里抽出。"));
			}
			fragment.append("");
		}
	}
	if (V.anusaction === "mpenisflowerpenetrate" || V.anususe === "mpenisflowerpenetrate") {
		// If the player anally penetrates the phallus flower
		if (V[armAction] === "manus") {
			V[armAction] = "manusrub";
			if (doubleAction) V[otherArmAction] = "manusrub";
		}
		if (V[armAction] === "manustease" || V[armAction] === "manusprostate") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("你把手指从你的菊穴里抽出。"));
			} else {
				fragment.append(span("你把那根手指从你的菊穴里抽出。"));
			}
			fragment.append("");
		}
	}
	if (V.ballssize <= 0 && ((V[arm + "arm"] === "mballs" && V[otherArm + "arm"] === "mballs") || (doubleAction && V[armAction] === "mballsentrance"))) {
		// Tiny balls are too small for both hands
		V.rightactiondefault = "mrest";
		V.rightaction = 0;
		V.rightarm = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mpickupdildo") {
		const currentlySelectedToy = V["selectedToy" + (arm === "left" ? "Left" : "Right")];
		if (
			currentlySelectedToy === V["currentToy" + (arm === "left" ? "Right" : "Left")] ||
			currentlySelectedToy === V.currentToyVagina ||
			currentlySelectedToy === V.currentToyAnus
		) {
			// The player can only a toy in one type of action
			V[armAction] = 0;
			doubleAction = false;
		}
	}
	if (V[armAction] === "mpickupdildo" && V[otherArmAction] === "mpickupdildo" && V.selectedToyLeft === V.selectedToyRight) {
		// The player can only pick up a toy with one hand
		V.rightaction = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mvagina" && doubleAction) {
		// The player can only finger themself with one hand
		V.rightaction = "mvaginarub";
		doubleAction = false;
	}

	// The player can decided to put in more than 1 finger at once
	if (["mvaginafingerstarttwo", "mvaginafingeraddtwo"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 2;
		V[armAction] = V[armAction] === "mvaginafingeraddtwo" ? "mvaginafingeradd" : "mvagina";
	} else if (["mvaginafingeradd", "mvagina"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 1;
	}

	// The player is unable to ride multiple dildo's in their vagina or anus at once
	if (doubleAction && V[armAction] === "mvaginaentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}
	if (doubleAction && V[armAction] === "manusentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}

	// The player is unable to use a dildo on their vagina/anus when using a dildo on the floor
	if (
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.leftaction) ||
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.rightaction)
	) {
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.leftaction)) {
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.rightaction)) {
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}
	if (V.vaginause === "mdildopenetrate" || V.anususe === "mdildopenetrate") {
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.leftarm)) {
			if (V.leftarm.includes("vagina")) {
				fragment.append(span(`发现很难够到后，你就将你的${toyDisplay(selectedToy("left"))}从小穴里抽出。`, "red"));
			} else {
				fragment.append(span(`发现很难够到后，你就将你的${toyDisplay(selectedToy("left"))}从菊穴里抽出。`, "red"));
			}
			fragment.append("");
			V.leftarm = "mpickupdildo";
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.rightarm)) {
			if (V.rightarm.includes("vagina")) {
				fragment.append(span(`发现很难够到后，你就将你的${toyDisplay(selectedToy("right"))}从小穴里抽出。`, "red"));
			} else {
				fragment.append(span(`发现很难够到后，你就将你的${toyDisplay(selectedToy("right"))}从菊穴里抽出。`, "red"));
			}
			fragment.append("");
			V.rightarm = "mpickupdildo";
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}

	if (V[armAction] === "mrest") return fragment;
	// End of Action Corrections

	// Action setup
	const handsOn = doubleAction ? 2 : 1;
	const altText = {};

	wikifier("ballsize");
	let balls = T.text_output + "";
	wikifier("testicles");
	balls += T.text_output;

	// Dealing with the players actions
	switch (V[armAction]) {
		case "msemencover":
			clearAction("mrest");
			fragment.append(span("你聚起一些自己的精液，在指尖摩擦。"));
			V[arm + "FingersSemen"] = 1;
			if (doubleAction) V[otherArm + "FingersSemen"] = 1;
			wikifier("arousal", 100, "masturbation");
			break;
		case "mchest":
			wikifier("playWithBreasts", handsOn);
			wikifier("milkvolume", handsOn);
			wikifier("arousal", 100 * handsOn, "masturbationBreasts");

			// The text output currently does not care which hand is used or if both hands are used
			if (V.worn.over_upper.exposed >= 2 && V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"你在能忍受的范围内尽可能地挑逗你那对敏感的乳头，手指的每一次擦过都带起一波快感冲刷着你。"
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"你抚摸着你的<<breasts>>，同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。"
						);
					} else {
						sWikifier("你抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断壮大。");
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"你捧起你的<<breasts>>然后尽可能地挑逗你的乳头，手指的每一次触碰都会让你兴奋不已。"
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"你抚摸着你的<<breasts>>，同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。"
						);
					} else {
						sWikifier("你抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断壮大。");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"你把<<breasts>>捧起来，尽可能挑逗你敏感的乳头，手指的每一次触碰都会让你兴奋不已。"
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"你抚摸着你的<<breasts>>，同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。"
						);
					} else {
						sWikifier("你抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断壮大。");
					}
				}
			} else {
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"你<<nipples>>挺立在<<top>>的布料下，努力吸引着别人的注意力。"
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("你抚弄你的<<breasts>>，同时隔着<<top>>揉捏你的乳头。");
					} else {
						sWikifier(
							"你抚摸你的<<breasts>>，用手指摩擦乳头。即使是隔着<<topaside>>，这依然感觉很棒。"
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"你的乳头挺立在<<top>>的布料下，努力吸引着别人的注意力。你捧起你的<<breasts>>，尽可能多地玩弄你敏感的乳头。"
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("你抚弄你的<<breasts>>，同时隔着<<top>>揉捏你的乳头。");
					} else {
						sWikifier(
							"你抚摸你的<<breasts>>，用手指摩擦乳头。即使是隔着<<topaside>>，这依然感觉很棒。"
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"你的乳头挺立在<<top>>的布料下，努力吸引着别人的注意力。你捧起你的<<breasts>>，尽可能多地玩弄你敏感的乳头。"
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("你抚弄你的<<breasts>>，同时隔着<<top>>揉捏你的乳头。");
					} else {
						sWikifier(
							"你抚摸你的<<breasts>>，用手指摩擦乳头。即使是隔着<<topaside>>，这依然感觉很棒。"
						);
					}
				}
			}
			fragment.append("");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("奶水从你的乳头中漏出，流到你的上衣里。", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 如果你想要继续获得快感，你应该脱掉上衣。"));
					} else {
						fragment.append(span("奶水从你的乳头中漏出。", "lewd"));
					}
					fragment.append("");
					fragment.append(wikifier("breastfeed", handsOn));
				} else {
					fragment.append(span("没有奶水从你的乳头中流出。你一定是被榨干了。"));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mchastity":
			clearAction();
			sWikifier(
				`你想要将手指插到${V.worn.genitals.cn_name_cap}之下，但是无济于事。你的<<genitals 1>>因触摸而疼痛，但你无能为力。<<gstress>>`
			);
			wikifier("stress", handsOn);
			break;
		case "mpenisentrance":
			clearAction("mpenisglans");
			V[arm + "arm"] = "mpenisentrance";
			if (doubleAction) V[otherArm + "arm"] = "mpenisentrance";

			if (earSlimeDefy()) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(`你用手指划过<<penis>>${calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起" : ""}。`);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(`你用手指划过<<penis>>${calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起" : ""}。`);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(`你用手指划过<<penis>>${calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起" : ""}。`);
				} else {
					sWikifier(`你用手指抚摸你的<<penis>>，然后僵住了。<span class="red">你没有感觉。</span>`);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的<<penis>>${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的<<penis>>${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的<<penis>>${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else {
					sWikifier('<span class="blue">你用手指抚摸你的<<penis>>，期待地颤抖着。</span>');
				}
			}
			break;
		case "mchastityparasiteentrance":
			clearAction("mchastityparasiterub");
			V[arm + "arm"] = "mchastityparasiteentrance";
			if (doubleAction) V[otherArm + "arm"] = "mchastityparasiteentrance";
			if (V.earSlime.defyCooldown) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else {
					sWikifier(`你用手指抚摸着你的贞操锁寄生虫，随即僵住了。<span class="red">你什么感觉都没有。</span>`);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">你用手指抚摸你的贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				} else {
					sWikifier('<span class="blue">你用手指抚摸你的贞操锁寄生虫，期待地颤抖着。</span>');
				}
				if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">它开始轻柔地在你<<penis>>周围跳动。</span>');
				}
			}
			break;
		case "mpenisglans":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				sWikifier(`你被迫粗暴地摩擦自己的包皮，想要找到些感觉。`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"你用越来越快地摩擦你前液覆盖的童贞包皮，奇怪的感觉从龟头散发到整个身体中。"
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span(
								"你用拇指摩擦着你前液覆盖的童贞包皮，急切地玩弄着龟头。即使你不能把它翻开，它也很敏感。"
							)
						);
					} else {
						fragment.append(
							span("你把童贞阴茎的龟头放在手掌中，急切地用拇指摩擦着前液覆盖的包皮。")
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"你前后撸动着你覆满前液的包皮，一次次将其与龟头摩擦着。快感从阴茎前端扩散到了全身。"
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("你急切地撸动着覆满先走汁的包皮，将其与龟头摩擦着，一边抚弄着你的包皮系带。"));
					} else {
						sWikifier("你把自己沾满先走汁的<<penis>>握在手心，用自己的包皮摩擦着自己的龟头。");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("你用越来越快的速度摩擦你的童贞包皮，奇怪的感觉从指尖和身体中散发出来。")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("你用拇指和指尖玩弄你的童贞包皮。即使你不能将它翻开，它也很敏感。")
							);
						} else {
							fragment.append(span("你将童贞肉棒的尖端放在手掌中，用拇指轻轻摩擦包皮。"));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("你缩回并放松包皮，一次次地在龟头上摩擦。"));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你缩回并放松包皮，一次次地在龟头上摩擦。"));
						} else {
							sWikifier("你把<<penis>>放在手掌里，用包皮摩擦龟头。");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("你用越来越快的速度摩擦你的童贞包皮，奇怪的感觉从指尖和身体中散发出来。")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("你用拇指和指尖玩弄你的童贞包皮。即使你不能将它翻开，它也很敏感。")
							);
						} else {
							fragment.append(span("你将童贞肉棒的尖端放在手掌中，用拇指轻轻摩擦包皮。"));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("你缩回并放松包皮，一次次地在龟头上摩擦。"));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你缩回并放松包皮，一次次地在龟头上摩擦。"));
						} else {
							sWikifier("你把<<penis>>放在手掌里，用包皮摩擦龟头。");
						}
					}
				}
			}
			break;
		case "mpenisshaft":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				sWikifier(`你被迫粗暴地上下运动自己的手指，想要找到些感觉。`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("你粗暴地用手指上下抚摸着你覆满前液的童贞阴茎，淫靡的温暖扩散到你全身。")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("你急切地用手指上下抚摸着你覆满前液的童贞阴茎。"));
					} else {
						sWikifier("你用手指抵住你<<penis>>的下面，享受这种淫靡的温暖。");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier("你粗暴地上下撸动你的<<penis>>，满溢的先走汁从龟头漏出。");
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("你急切地用手指上下抚摸着你覆满前液的柱身，淫靡的温暖扩散到你全身。")
						);
					} else {
						sWikifier("你爱抚着自己的<<penis>>，身体涌起一股淫靡的温暖。");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("你用手指粗暴地上下撸动着你的童贞肉棒，力道大到你的包皮几乎承受不住。"));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你用手指沿着在你的童贞肉棒上下移动。"));
						} else {
							sWikifier("你用手指抵住你<<penis>>的下面，享受这种感觉。");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("你用手上下抽动你的<<penis>>。");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你用手指沿着在你的肉棒上下移动，微微搔动，产生一股淫秽的温暖。"));
						} else {
							sWikifier("你轻轻抚摸你的<<penis>>。");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("你用手指粗暴地上下撸动着你的童贞肉棒，力道大到你的包皮几乎承受不住。"));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你用手指沿着在你的童贞肉棒上下移动。"));
						} else {
							sWikifier("你用手指抵住你<<penis>>的下面，享受这种感觉。");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("你用手上下抽动你的<<penis>>。");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("你用手指沿着在你的肉棒上下移动，微微搔动，产生一股淫秽的温暖。"));
						} else {
							sWikifier("你轻轻抚摸你的<<penis>>。");
						}
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">你将手从<<penis>>上移开。</span>');
			} else {
				sWikifier(`<span class="lblue">你将${arm.replace("right","右").replace("left","左")}手从<<penis>>上拿开。</span>`);
			}
			break;
		case "mchastityparasiterub":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				sWikifier(`你轻轻抚摸你的寄生虫。`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 10 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "急切地" : "慢慢地";
				wikifier("arousal", 500, "masturbationPenis");
				V.earSlime.vibration += handsOn * 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`你艰难地爱抚着寄生虫，每一下爱抚<span class="lewd">都会让寄生虫产生一阵扩散至你全身的快感</span>，让你几乎承受不住。`
					);
				} else {
					sWikifier(
						`你${altText.eagerly}抚摸着寄生虫，每一下都<span class="lewd">会让寄生虫产生一阵扩散至你全身的快感。</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`你用能承受得住的最粗暴的手法挑逗着寄生虫，让快感直冲你的${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`你换着方法摩擦着寄生虫，让不同的快感直冲你的${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				} else {
					fragment.append(
						span(
							`你轻轻抚摸着寄生虫，让它把快感直接传达至${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				}
			}
			break;
		case "mchastityparasitesqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				sWikifier(`你轻轻揉捏着寄生虫。`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 0.1 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "急切地" : "慢慢地";
				wikifier("arousal", 500 * handsOn, "masturbationGenital");
				V.earSlime.vibration += 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`你艰难地揉捏着寄生虫，每一下<span class="lewd">会让寄生虫产生一阵扩散至你全身的快感</span>，让你几乎承受不住。`
					);
				} else {
					sWikifier(
						`你${altText.eagerly}揉捏着寄生虫，每一下都<span class="lewd">会让寄生虫产生一阵扩散至你全身的快感。</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`你不停地揉捏着寄生虫和你的${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}，享受着你能给予它的有限的关注。`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(`你揉捏着寄生虫，也揉捏着你的${V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"}。`)
					);
				} else {
					fragment.append(
						span(
							`你轻轻揉捏着寄生虫，通过它内壁的包裹，感受着你的${V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"}。`
						)
					);
				}
			}
			// Help shrink the penis only when both pregnant and with a penis size of mini, had trouble reaching micro without additional help
			if (
				playerIsPregnant() &&
				playerPregnancyProgress() >= 0.1 &&
				V.player.penissize === -1 &&
				random(0, 100) >= 75 &&
				(!V.daily.chastityParasizeSizeReduction || V.daily.chastityParasizeSizeReduction < 400)
			) {
				V.penisgrowthtimer++;
				V.daily.chastityParasizeSizeReduction = (V.daily.chastityParasizeSizeReduction || 0) + 1;
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">你把手从贞操锁寄生虫上移开。</span>');
			} else {
				sWikifier(`<span class="lblue">你移开贞操锁寄生虫上的${arm.replace("right","右").replace("left","左")}手。</span>`);
			}
			break;
		case "mballsstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("你将手从你的阴囊上移开。", "lblue"));
			} else {
				fragment.append(span(`你将${arm === "right" ? "右" : "左"}手从你的阴囊上移开。`, "lblue"));
			}
			break;
		case "mballsfondle":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 50 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`你被迫粗暴地抚摸你的${balls}，想要找到些感觉。`);
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				additionalEffect.hands = "ballplayeffects";
				if (handsOn === 2) {
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						fragment.append(
							span(
								`你用双手抚摸着你的${balls}，享受它们紧紧挂在阴茎根部的感觉。`
							)
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`你用双手爱抚着你的${balls}，享受着痒痒的感觉。`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`你用双手晃动着你的${balls}，享受着它们沉甸甸的手感。`));
					} else {
						fragment.append(span(`你在你的手中揉搓着${balls}。`));
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `两个${balls}` : additionalEffect.hands ? "另一个" : `其中一个${balls}`;
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier(
							`你用${arm === "right" ? "右" : "左"}抚摸着你的${altText.oneOfYour}，享受它们紧紧挂在<<penis>>根部的感觉。`
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`你用${arm === "right" ? "右" : "左"}爱抚着你的${altText.oneOfYour}，享受着痒痒的感觉。`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`你用${arm === "right" ? "右" : "左"}手晃动着你的${altText.oneOfYour}，享受着它们沉甸甸的手感。`));
					} else {
						fragment.append(span(`你用${arm === "right" ? "右" : "左"}手抚摸着${altText.oneOfYour}。`));
					}
				}
			}
			break;
		case "mballssqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`你被迫粗暴地揉捏着你的${balls}，想要找到些感觉。`);
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				additionalEffect.hands = "ballplayeffects";
				altText.gently = V.arousal >= V.arousalmax * (4 / 5) ? "急促地" : V.arousal >= V.arousalmax * (3 / 5) ? "" : "轻柔地";
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你用双手捧起你的${balls}，${altText.gently}挤压它们。`));
							break;
						case 3:
							fragment.append(span(`你用双手捧起你的${balls}，${altText.gently}挤压它们。`));
							break;
						case 4:
							fragment.append(span(`你用双手${altText.gently}挤压你的${balls}。`));
							break;
						default:
							fragment.append(span("玩家不应看到这段文字。", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `两个${balls}` : additionalEffect.hands ? "另一个" : `其中一个${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你用${arm === "right" ? "右" : "左"}手捧起你的${altText.oneOfYour}，${altText.gently}挤压它们。`));
							break;
						case 3:
							fragment.append(span(`你用${arm === "right" ? "右" : "左"}手捧起你的${altText.oneOfYour}，${altText.gently}挤压它们。`));
							break;
						case 4:
							fragment.append(span(`你用${arm === "right" ? "右" : "左"}手捧起你的${altText.oneOfYour}，${altText.gently}挤压它们。`));
							break;
						default:
							fragment.append(span(`你用${arm === "right" ? "右" : "左"}手捧起你的${balls}，${altText.gently}挤压它们。`));
							break;
					}
				}
			}
			break;
		case "mballsentrance":
			clearAction("mballsfondle");
			V[arm + "arm"] = "mballs";
			if (doubleAction) V[otherArm + "arm"] = "mballs";
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你一手拿着一个${balls}`));
							break;
						case 3:
							fragment.append(span(`你一手拿着一个${balls}，它们恰好盛满了你的手掌`));
							break;
						case 4:
							fragment.append(span(`你一手拿着一个${balls}，手掌几乎包不住它`));
							break;
						default:
							fragment.append(span("玩家不应看到这段文字。", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `两个${balls}` : additionalEffect.hands ? "另一个" : `其中一个${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你用${arm.replace("right","右").replace("left","左")}手拿着${altText.oneOfYour}`));
							break;
						case 3:
							fragment.append(span(`你用${arm.replace("right","右").replace("left","左")}手拿着${altText.oneOfYour}。它很好地填满你的手掌`));
							break;
						case 4:
							fragment.append(span(`你用${arm.replace("right","右").replace("left","左")}手拿着${altText.oneOfYour}。你的手几乎包不住它`));
							break;
						default:
							fragment.append(span(`你轻易地用你的${arm.replace("right","右").replace("left","左")}抓着两只${balls}`));
							break;
					}
				}
				fragment.append(span(`。你僵住了。`));
				fragment.append(span(`你没有感觉。`, "red"));
			} else {
				additionalEffect.hands = "ballplayeffects";
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你一只手握着一个${balls}。`, "blue"));
							break;
						case 3:
							fragment.append(span(`你一只手握着一个${balls}。它们恰好填满了你的手掌。`, "blue"));
							break;
						case 4:
							fragment.append(span(`你一只手握着一个${balls}。你几乎无法把它们完全握在手里。`, "blue"));
							break;
						default:
							fragment.append(span("玩家不应看到这段文字。", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `两个${balls}` : additionalEffect.hands ? "另一个" : `其中一个${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`你将${altText.oneOfYour}握在你的${arm === "right" ? "右" : "左"}手中。`, "blue"));
							break;
						case 3:
							fragment.append(span(`你将${altText.oneOfYour}握在你的${arm === "right" ? "右" : "左"}手中。它恰好填满了你的手掌。`, "blue"));
							break;
						case 4:
							fragment.append(span(`你将${altText.oneOfYour}握在你的${arm === "right" ? "右" : "左"}手中。你几乎无法把它完全握在手里。`, "blue"));
							break;
						default:
							fragment.append(span(`你轻松地用${arm === "right" ? "右" : "左"}手将你的${balls}一并握住。`, "blue"));
							break;
					}
				}
			}
			break;
		case "mpenisW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (doubleAction) {
				altText.hands = "手";
			} else {
				altText.hands = arm + "手";
			}
			if (V.worn.genitals.name === "chastity parasite") {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`你用能承受得住的最粗暴的手法挑逗着寄生虫，让快感直冲你的${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`你换着方法摩擦着寄生虫，让不同的快感直冲你的${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				} else {
					fragment.append(
						span(
							`你轻轻抚摸着寄生虫，让它把快感直接传达至${
								V.player.virginity.penile === true ? "童贞阴茎" : "阴茎"
							}.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}疯狂地上下撸动你的<<penis>>。`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}的手指在你的肉棒上来回移动，微微搔动，产生一股淫秽的温暖。`));
				} else {
					sWikifier(`你用你不断颤动的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}急促地抚摸着你的<<penis>>。`);
				}
			}
			break;
		case "mbreastW":
			wikifier("arousal", 200 * handsOn, "masturbationBreasts");
			if (doubleAction) {
				altText.hands = "手";
			} else {
				altText.hands = arm + "手";
			}
			if (V.player.breastsize < 2) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}以无法忍受的频率撩拨着你敏感的乳头，手指的每一次擦过都带起一波快感冲刷着你。`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸着你的<<breasts>>的同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。`
					);
				} else {
					sWikifier(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断扩大。`);
				}
			} else if (V.player.breastsize < 5) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}托住你的<<breasts>>，同时以无法忍受的频率撩拨着你敏感的乳头，手指的每一次擦过都带起一波快感冲刷着你。`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸着你的<<breasts>>的同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。`
					);
				} else {
					sWikifier(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断扩大。`);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}捧着你的<<breasts>>，撩拨着你敏感的乳头，手指的每一次擦过都带起一波快感冲刷着你。`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸着你的<<breasts>>的同时用手指在乳晕上画圈，偶尔轻轻捏一下乳头。`
					);
				} else {
					sWikifier(`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}抚摸你的<<breasts>>，将乳头夹在手指间摩擦着，你感到一种淫荡的暖流不断扩大。`);
				}
			}
			if (V.milk_amount >= 1) {
				fragment.append("");
				fragment.append(span("奶水从你的乳头中漏出。", "lewd"));
				fragment.append(wikifier("breastfeed", handsOn));
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mvaginaW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			if (doubleAction) {
				altText.hands = "手";
			} else {
				altText.hands = arm + "手";
			}
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`你的手指在你的<<pussy>>中不断抽动，以一种莽撞的、激烈的节奏侵犯着你的体内。`);
						break;
					case 2:
						sWikifier(`你的阴蒂在你的手指间焦急地摩擦着，不留一秒缓和的时间。`);
						break;
					case 3:
						sWikifier(`你的手指在你的<<pussy>>内颤抖，淫荡的震颤席卷了你的整个身体。`);
						break;
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}探入你的<<pussy>>，内壁随着你的推入缠绕着你的手指。`);
						break;
					case 2:
						sWikifier(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}粗暴地罩住你的<<pussy>>，另一只手扣在上面揉动着。`);
						break;
					case 3:
						sWikifier(`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}不时戳弄着阴蒂。`);
						break;
				}
			} else {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`你用手指玩弄着你的<<pussy>>，手指一根根划过你的蜜裂。`);
						break;
					case 2:
						sWikifier(`你的${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}揉着阴唇，手指在入口处不断扭动。`);
						break;
					case 3:
						sWikifier(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}爱抚着你的大腿，慢慢地将它们分开。`);
						break;
				}
			}
			break;
		case "mpenisstopW":
			clearAction();
			if (V.worn.genitals.name === "chastity parasite") {
				altText.penis = "贞操锁寄生虫";
			} else {
				altText.penis = "<<penis>>";
			}
			if (doubleAction) {
				sWikifier(`你将双手从${altText.penis}上移开，留下它在空气中颤动。`);
			} else {
				sWikifier(`你将${arm}手从${altText.penis}上移开，留下它在空气中颤动。`);
			}
			break;
		case "mbreaststopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`你将双手从你的<<breasts>>上移开，留下它在空气中颤动。`);
			} else {
				sWikifier(`你将${arm}手从你的<<breasts>>上移开，留下它在空气中颤动。`);
			}
			break;
		case "mvaginastopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`你将双手从你的<<pussy>>上移开，留下它在空气中颤动。`);
			} else {
				sWikifier(`你将${arm}手从你的<<pussy>>上移开，留下它在空气中颤动。`);
			}
			break;
		case "mpickupdildo":
			// Should not use clearAction()
			V[armAction] = 0;
			V[arm + "arm"] = "mpickupdildo";
			wikifier("arousal", 100, "masturbation");

			// Set the current toy
			altText.selectedToy = selectedToy(arm, true);
			altText.toyType = altText.selectedToy.type;
			altText.toy = `${altText.selectedToy.colour ? setup.colourName(altText.selectedToy.colour.replace("-"," ")) : ""}${altText.selectedToy.namecap}`;
			// Set the default action
			if (altText.toyType.includes("stroker")) {
				V[armActionDefault] = "mpenisentrancestroker";
			} else if (altText.toyType.includes("breastpump")) {
				V[armActionDefault] = "mbreastpump";
			} else {
				V[armActionDefault] = V.player.vaginaExist ? "mvaginaentrancedildo" : "manusentrancedildo";
			}

			fragment.append(span(`你用${arm === "right" ? "右" : "左"}手拿起你的${altText.toy}。`));
			break;
		case "mdildostop":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(span(`你松开${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}。`, "lblue"));
			} else {
				fragment.append(span(`你松开${arm === "right" ? "右" : "左"}手中的${toyDisplay(altText.selectedToy)}。`, "lblue"));
			}
			break;
		case "mpenisentrancestroker":
			if (V.penisuse === 0 || V.penisuse === "stroker") {
				clearAction("mpenisstrokertease");
				V.penisuse = "stroker";
				V[arm + "arm"] = "mpenisentrancestroker";
				altText.selectedToy = selectedToy(arm);
				if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`你将${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}划过你裸露的<<penis>>，但僵住了。<span class="red">你没有感觉。</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">你将${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}在你的<<penis>>上划过，感受它在你<<exposedlower>>下的形状。</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`你拿起${toyDisplay(
									altText.selectedToy
								)}把它划过你的<<penis>>，但你呆住了。<span class="red">你没有任何感觉。</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">你捡起你的${toyDisplay(
									altText.selectedToy
								)}将它划过你的<<penis>>，感受它在你<<exposedlower>>下的形状。</span>`
							);
						}
					}
				} else {
					wikifier("arousal", 50 * handsOn, "masturbationPenis");
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">你将${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}在你裸露的<<penis>>上划过，你在期待中颤抖。</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">你将${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)}在你的<<penis>>上划过，感受它在你<<exposedlower>>下的形状。</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">你捡起你的${toyDisplay(
									altText.selectedToy
								)}将它划过你的<<penis>>，你在期待中颤抖。</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">你捡起你的${toyDisplay(
									altText.selectedToy
								)}将它划过你的<<penis>>，感受它在你<<exposedlower>>下的形状。</span>`
							);
						}
					}
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenisstrokertease":
			clearAction("mpenisentrancestroker");
			V[arm + "arm"] = "mpenisentrancestroker";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (genitalsExposed()) {
					sWikifier(
						`你将${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}划过你的<<penis>>，但皱起眉头。<span class="red">你没有感觉。</span>`
					);
				} else {
					sWikifier(
						`你将${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}在你的<<penis>>上划过，感受它在你<<exposedlower>>下的形状。`
					);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (genitalsExposed()) {
					sWikifier(`你将${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}在你的<<penis>>上划过，你在期待中颤抖。`);
				} else {
					sWikifier(
						`你将${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}在你的<<penis>>上划过，感受它在你<<exposedlower>>下的形状。`
					);
				}
			}
			break;
		case "mpenisstroker":
			clearAction();
			V[arm + "arm"] = "mpenisstroker";
			V.penisuse = "stroker";
			altText.selectedToy = selectedToy(arm);
			if (earSlimeDefy()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 25, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`你被迫开始粗暴地用${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}套弄你的<<penis>>，想要找到些感觉。`
					);
				} else {
					sWikifier(`你被迫用${toyDisplay(altText.selectedToy)}套弄着你的<<penis>>，想要找到些感觉。`);
				}
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 600, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 100, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`<span class="purple">你粗暴地用${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)}操着你前液覆盖的<<penis>>，</span><span class="lewd">过剩的前液从龟头飞溅出来。</span>`
					);
				} else {
					sWikifier(
						`<span class="purple">你粗暴地用${toyDisplay(
							altText.selectedToy
						)}操着你前液覆盖的<<penis>>，</span><span class="lewd">淫靡的温暖扩散到你全身。</span>`
					);
				}
			} else {
				wikifier("arousal", 400, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 50, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(`<span class="purple">你用${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}操着你的<<penis>>。</span>`);
				} else {
					sWikifier(`<span class="purple">你用${toyDisplay(altText.selectedToy)}<<penis>>操着你的<<penis>>。</span>`);
				}
			}
			break;
		case "mpenisstopstroker":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (!doubleAction && !["mpenisstroker", "mpenisentrancestroker"].includes(V[otherArm + "arm"])) V.penisuse = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				V.penisuse = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">你把${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}从你的<<penis>>移开。</span>`);
			} else {
				sWikifier(`<span class="purple">你将${arm.replace("left","左").replace("right","右")}手中${toyDisplay(altText.selectedToy)}从你的<<penis>>上移开。</span>`);
			}
			break;
		case "mbreastpump":
			clearAction("mbreastpumppump");
			V[arm + "arm"] = "mbreastpump";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mbreastpump";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="blue">你将${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy
					)}吸在你的<<breasts>>上，准备榨乳。</span>`
				);
			} else {
				sWikifier(`<span class="blue">你把你的${toyDisplay(altText.selectedToy)}贴在你的<<breasts>>上，开始准备榨乳。</span>`);
			}
			break;
		case "mbreastpumppump":
			wikifier("arousal", 75 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 3 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toys = `你尝试在你的<<breasts>>上使用${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}，`;
			} else {
				altText.toys = `你尝试在你的<<breasts>>上使用${toyDisplay(altText.selectedToy)}，`;
			}
			if (V.lactating === 1 && V.breastfeedingdisable === "f") {
				if (V.milk_amount >= 1 && V.earSlime.focus === "pregnancy" && V.earSlime.growth >= 100 && !V.earSlime.defyCooldown) {
					wikifier("arousal", 100 * handsOn, "masturbationNipples");
					sWikifier(`${altText.toys} <span class="lewd">奶水从你的乳头喷出，很快就填满了瓶子。</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 4.5), "pump"));
				} else if (V.milk_amount >= 1) {
					sWikifier(`${altText.toys} <span class="lewd">乳汁从你的乳头溢出，流入瓶子。</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 3.5), "pump"));
				} else {
					sWikifier(`${altText.toys}但是没有奶水从你的乳头流出。你一定是被榨干了。`);
				}
			} else {
				sWikifier(`${altText.toys}但是没有奶水从你的乳头流出。你一定还没产奶。`);
				if ((!V.daily.lactatingPressure || V.daily.lactatingPressure <= 5) && random(0, 100) >= 90) {
					if (!V.daily.lactatingPressure) V.daily.lactatingPressure = 0;
					V.daily.lactatingPressure++;
					wikifier("milkvolume", handsOn);
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mstopbreastpump":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				sWikifier(`<span class="purple">你将${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}从你的<<breasts>>移开。</span>`);
			} else {
				sWikifier(`<span class="purple">你将${arm.replace("left","左").replace("right","右")}手的${toyDisplay(altText.selectedToy)}从你的<<breasts>>移开。</span>`);
			}
			break;
		case "mchestvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 2 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				altText.hands = "双手";
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				altText.hands = `你的${arm.replace("right","右").replace("left","左")}手`;
			}
			if (breastsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationNipples");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`尽管${altText.toyDisplay}以超出你忍耐限度的频率摩擦着它们，你的乳头仍然勃起着，持续不断的快感随着振动冲刷着你。`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}的${altText.toyDisplay}摩擦着你正不断变硬的乳头。`));
				} else {
					fragment.append(
						span(
							`你将${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}的${altText.toyDisplay}压在你的乳头上，感受着随着继续振动不断壮大的淫荡暖流。`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`尽管${altText.toyDisplay}只是隔着衣物摩擦你的乳头，它们仍然挺立起来顶起你的<<topaside>>。`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(`你用${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}的${altText.toyDisplay}隔着你的<<topaside>>摩擦着逐渐变硬的乳头。`);
				} else {
					sWikifier(
						`你将${altText.hands.replace("both","").replace("your","你的").replace("left","左").replace("right","右").replace("hands","双手").replace("hand","手").replace(" ","")}的${altText.toyDisplay}压在你的乳头上，即使隔着<<topaside>>，这依然很有感觉。`
					);
				}
			}
			fragment.append("");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("奶水从你的乳头中漏出，流到你的上衣里。", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 如果你想要继续获得快感，你应该脱掉上衣。"));
					} else {
						fragment.append(span("乳汁从你的乳头中流出，覆盖了玩具。", "lewd"));
					}
					fragment.append("");
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 1.5)));
				} else {
					fragment.append(span("没有奶水从你的乳头中流出。你一定是被榨干了。"));
				}
			}
			break;
		case "mpenisvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(`你用不断振动的${altText.toyDisplay}以包皮可以承受的极限粗暴地上下摩擦着你的童贞肉棒。`)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span(`你用${altText.toyDisplay}上下摩擦着你的童贞肉棒，它迅速的振动让你性奋起来。`));
					} else {
						sWikifier(`你将${altText.toyDisplay}轻柔地抵在你的<<penis>>的下方，享受这种感觉。`);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(`你用振动的${altText.toyDisplay}上下摩擦着你的<<penis>>。`);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(`你用${altText.toyDisplay}上下摩擦着你的<<penis>>，它的振动产生一股迅速变强的淫荡暖流。`);
					} else {
						sWikifier(`你将振动的${altText.toyDisplay}抵在你的<<penis>>的下方，享受这种感觉。`);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`你用振动的${altText.toyDisplay}隔着<<bottomaside>>上下摩擦着你的<<penis>>。`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`你用${altText.toyDisplay}上下摩擦着你的<<penis>>，即使隔着<<bottomaside>>它的振动仍然让你迅速地性奋起来。`
					);
				} else {
					sWikifier(
						`你将振动的${altText.toyDisplay}轻柔地抵在你的<<penis>>的下方，即使隔着<<bottomaside>>你仍然享受这种感觉。`
					);
				}
			}
			break;
		case "mvaginaclitvibrate":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">你将${altText.toyDisplay}轻柔地抵在你的<<clit>>，振动伴随昆虫爬遍全身的感觉让你的脚趾蜷曲起来。</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `你尝试在你的<<clit>>上使用${altText.toyDisplay}，`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						altText.gag = V.worn.face.cn_name_cap;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = selectedToy("left").namecap;
					} else {
						altText.gag = selectedToy("right").namecap;
					}
					sWikifier(`${altText.start}快感引起的轻微呻吟由于你嘴里的${altText.gag}变得含糊不清。`);
				} else {
					sWikifier(`${altText.start}由于快感而发出轻微呻吟。`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">你将${altText.toyDisplay}隔着<<exposedlower>>压在你的<<clit>>上，即使隔着布料着仍然感觉很棒。</span>`
				);
			}
			break;
		case "mvaginaclitvibrateparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">你将${altText.toyDisplay}轻柔地抵在你的<<clit>>上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，振动伴随昆虫爬遍全身和吸吮的感觉让你的脚趾蜷曲起来。</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `你轻轻地把${altText.toyDisplay}按压在你<<clit>>上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						altText.gag = V.worn.face.cn_name_cap;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = selectedToy("left").namecap;
					} else {
						altText.gag = selectedToy("right").namecap;
					}
					sWikifier(`${altText.start}快感引起的轻微呻吟由于你嘴里的${altText.gag}变得含糊不清。`);
				} else {
					sWikifier(`${altText.start}由于吮吸的快感而发出轻微呻吟。`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">你将${altText.toyDisplay}隔着<<exposedlower>>轻轻压在你的<<clit>>上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，享受着它被刺激引发的吸吮反应。</span>`
				);
			}
			break;
		case "mdildomouthentrance":
			if (V.mouth === 0 && (otherArmAction !== "mdildomouthentrance" || random(0, 100) > 50)) {
				clearAction("mdildomouth");
				V[arm + "arm"] = "mdildomouthentrance";
				V.mouth = "mdildomouthentrance";
				V.mouthactiondefault = "mdildolick";
				wikifier("arousal", 100, "masturbationMouth");
				altText.selectedToy = selectedToy(arm);
				altText.toys = `你把${toyDisplay(altText.selectedToy)}放到你嘴边，`;
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`${altText.toys}渴望一些练习。`));
				} else {
					fragment.append(span(`${altText.toys}享受着它抵住你双唇的感觉。`));
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mdildopiston":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			altText.selectedToy = selectedToy(arm);
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				altText.beginner = altText.selectedToy.name.includes("small")
					? "它的大小适中，适合像你这样的初学者。"
					: "小心别推得太深。";
				fragment.append(span(`你小心地将${altText.toyDisplay}在你嘴里前后移动着，${altText.beginner}`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(
					span(`你含着${altText.toyDisplay}快速地前后晃动着头，享受着它摩擦你双唇和舌头的触感。`)
				);
			} else {
				wikifier("arousal", 200, "masturbationOral");
				fragment.append(
					span(
						`你熟练地舔舐和挑逗着${altText.toyDisplay}的同时，含着它快速地前后晃动着头，陶醉在它提供的淫猥感觉中。`
					)
				);
			}
			break;
		case "mdildomouth":
			clearAction("mdildopiston");
			wikifier("arousal", 200, "masturbationOral");
			V[arm + "arm"] = "mdildomouth";
			V.mouth = "mdildomouth";
			if (V.mouthactiondefault === "mdildokiss") V.mouthactiondefault = "mdildosuck";
			if (V.mouthaction === "mdildokiss") V.mouthaction = "mdildosuck";
			altText.selectedToy = selectedToy(arm);
			fragment.append(
				span(
					`你把${toyDisplay(altText.selectedToy)}含进嘴里，在将它放在双唇间抽插时，你短促地用舌头顺着它舔动着。`
				)
			);
			break;
		case "mvaginaentrance":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarub" : "mvaginaclit");
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			V[arm + "arm"] = "mvaginaentrance";
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrance";
			}
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`<span class="blue">你用${altText.fingers}抚摸你裸露的<<pussy>>，感觉有虫子在周围爬来爬去。</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`<span class="blue">你用${altText.fingers}抚摸着你露出的<<pussy>>，期待地颤抖着。</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`<span class="blue">你用${altText.fingers}抚摸你的<<pussy>>，透过<<exposedlower>>感受它的形状。</span>`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvagina":
			if (V.vaginause === 0) {
				V.fingersInVagina += V.mVaginaFingerAdd;
				clearAction(
					V.mVaginaFingerAdd === 2 && V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4
						? "mvaginafingeraddtwo"
						: "mvaginafingeradd"
				);
				V[arm + "arm"] = "mvagina";
				V.vaginause = "mfingers";
				wikifier("arousal", V.mVaginaFingerAdd === 2 ? 250 : 200, "masturbationVagina");
				wikifier("addVaginalWetness", 1);
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "精液润滑的" : "";
				altText.finger = V.mVaginaFingerAdd === 2 ? `两根${altText.lubricated}手指` : `一根${altText.lubricated}手指`;
				if (altText.lubricated.includes("精液")) V.semenInVagina = true;
				if (hymenIntact) {
					sWikifier(`<span class="purple">你将${altText.finger}插进你的<<pussy>>直至戳到你完整无缺的处女膜。</span>`);
				} else if (V.bugsinside) {
					sWikifier(`<span class="purple">你把${altText.finger}推入你的<<pussy>>。你感觉到有虫子在内部爬动。</span>`);
				} else {
					sWikifier(`<span class="purple">你把${altText.finger}推入你的<<pussy>>，你能感觉到自己的密道微微张开接纳了它。</span>`);
				}
				fragment.append(fingersEffect(span, hymenIntact));
			} else {
				clearAction("mvaginaclit");
			}
			break;
		case "mvaginafingeradd":
			V.fingersInVagina += V.mVaginaFingerAdd;
			if (V.fingersInVagina === 4 && V.vaginaFingerLimit === 5) {
				clearAction("mvaginafistadd");
			} else if (V.fingersInVagina === V.vaginaFingerLimit) {
				clearAction("mvaginatease");
			} else {
				clearAction(V.mVaginaFingerAdd === 2 && V.fingersInVagina + 2 <= Math.min(4, V.vaginaFingerLimit) ? "mvaginafistadd2" : "mvaginafistadd");
			}
			wikifier("addVaginalWetness", V.fingersInVagina);
			wikifier("arousal", 200 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "精液润滑的" : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `另两根${altText.lubricated}手指` : `另一根${altText.lubricated}手指`;

			if (V.bugsinside === 1) {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(
						`<span class="lblue">你把最后一根${altText.lubricated}手指塞进自己体内时，你止不住喘息。你感觉体内有虫子在爬。</span>`
					);
				} else {
					sWikifier(
						`<span class="lblue">你把${altText.finger}探入自己的<<pussy>>时，你进一步绷紧了身体。你感觉体内有虫子在爬。</span>`
					);
				}
			} else {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(`<span class="lblue">在放进最后一根${altText.lubricated}手指后，你发出一声呻吟。</span>`);
				} else {
					sWikifier(`<span class="lblue">你一边把${altText.finger}继续推入自己的<<pussy>>，一边进一步伸展自己。</span>`);
				}
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafistadd":
			clearAction("mvaginafist");
			V.fingersInVagina = 5;
			V[arm + "arm"] = "mvaginafist";
			V.vaginause = "mvaginafist";
			wikifier("arousal", 650, "masturbationVagina");
			sWikifier(
				`<span class="lblue">最后一下插入，你成功将五根手指全部塞进你的小穴。</span>你感觉到被侵犯的肌肉组织在你的手掌周围脉动着。`
			);
			break;
		case "mvaginatease":
			clearAction();
			wikifier("arousal", 300 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.fingers = V.fingersInVagina === 1 ? "手指" : "手指";
			wikifier("addVaginalWetness", V.fingersInVagina);
			if (V.bugsinside) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(
							`你将<<number $fingersInVagina>>根${altText.fingers}在你的<<pussy>>里抽插着，排出附带着各种虫子的下流液体。`
						);
					} else {
						sWikifier(`你将<<number $fingersInVagina>>根${altText.fingers}在你的<<pussy>>里抽插着，排出各种虫子。`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`你将<<number $fingersInVagina>>根${altText.fingers}在你的<<pussy>>里插入抽出，感受着你身体里的各种虫子。`
					);
				} else {
					sWikifier(
						`你轻柔地用<<number $fingersInVagina>>根${altText.fingers}抽插着<<pussy>>的入口，推动着附近的虫子们。`
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(`你将<<number $fingersInVagina>>根${altText.fingers}在你的<<pussy>>里抽插着，下流的液体跟着流出。`);
					} else {
						sWikifier(`你用<<number $fingersInVagina>>根${altText.fingers}抽插着<<pussy>>，尽你所能地往深处推入。` );
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`你用<<number $fingersInVagina>>根${altText.fingers}抽插着<<pussy>>，尽管不深，你还是感到非常兴奋。`
					);
				} else {
					sWikifier(`你轻柔地用<<number $fingersInVagina>>根${altText.fingers}抽插着<<pussy>>的入口。`);
				}
			}
			break;
		case "mvaginafist":
			clearAction();
			wikifier("arousal", 500, "masturbationVagina");
			wikifier("addVaginalWetness", 5);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					wikifier("vaginaFluidActive");
					sWikifier(`你被迫用力地将整只手探进痒到发痛的<<pussy>>，你体内的液体沿你的手腕滴下。`);
				} else {
					sWikifier(`你被迫用力地将整只手探进痒到发痛的<<pussy>>。`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`你把整只手都塞进了你的<<pussy>>，你的内壁在它周围抽搐。`);
			} else {
				sWikifier(`你开始在你的<<pussy>>里慢慢移动你的拳头，你能感觉到内壁不断被撑开。`);
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span(`你用拇指按在阴蒂上，划着圈摩擦着它，你感受到的快感变得越来越强。`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`你用你的${altText.fingers}玩弄着阴蒂顶端。`));
			} else {
				fragment.append(span(`你用你的${altText.fingers}摩擦着阴蒂，感觉变得越来越淫荡。`));
			}
			break;
		case "mvaginarub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`你用${altText.fingers}抚弄你暴露的<<pussy>>，你能感觉到里面虫子的蠕动。`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`你用${altText.fingers}抚弄你暴露的<<pussy>>，你因为期待而颤抖着。`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`你用${altText.fingers}划过你的<<pussy>>，感受着它在<<exposedlower>>下的形状。`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(`你捏着阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，它越来越激烈地取悦你，而你感觉到自己的性奋慢慢燃起。`)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`你用你的${altText.fingers}玩弄着阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}。`));
			} else {
				fragment.append(span(`你用你的${altText.fingers}摩擦着阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，它用温和的吸吮回应你，而你的感觉变得越来越淫荡。`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.fingersInVagina = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">你将手从<<pussy>>上移开。</span>');
			} else {
				sWikifier(`<span class="lblue">你将${arm.replace("right","右").replace("left","左")}手从<<pussy>>上拿开。</span>`);
			}
			break;
		case "mvaginafingerremove":
			V.fingersInVagina -= 1;
			if (V.fingersInVagina >= 1) {
				clearAction();
				V[arm + "arm"] = "mvagina";
				if (V.vaginause === "mvaginafist") V.vaginause = "mfingers";
				sWikifier('<span class="lblue">你把一根手指从你的<<pussy>>抽出。</span>');
			} else {
				clearAction("mvaginarub");
				V[arm + "arm"] = "mvaginaentrance";
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">你把手指从你的<<pussy>>抽出。</span>');
			}
			break;
		case "mvaginafistremove":
			clearAction("mvaginarub");
			V[arm + "arm"] = "mvaginaentrance";
			V.fingersInVagina = 0;
			V.vaginause = 0;
			wikifier("arousal", 1000, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(
					'<span class="lblue">你将整只手从你的<<pussy>>滑出。你感觉你的肌肉伴随着滴落的体液在抗议地抽搐。</span>'
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier('<span class="lblue">你将整只手从你的<<pussy>>滑出，感到一阵空虚。</span>');
			} else {
				sWikifier('<span class="lblue">你将整只手抽出你的<<pussy>>，感到肌肉放松下来。</span>');
			}
			break;
		case "mvaginaentrancedildo":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarubdildo" : "mvaginaclitdildo");
			V[arm + "arm"] = "mvaginaentrancedildo";
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (genitalsExposed()) {
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(`<span class="blue">你用${altText.toyDisplay}摩擦着你暴露的<<pussy>>，期待地颤抖着。</span>`);
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(`<span class="blue">你用${altText.toyDisplay}摩擦着你的<<pussy>>，透过<<exposedlower>>感受着它的形状。</span>`);
			}
			break;
		case "mvaginadildo":
			clearAction("mvaginateasedildo");
			V[arm + "arm"] = "mvaginadildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginadildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "精液润滑的" : "";
			} else {
				altText.lubricated = V[arm + "FingersSemen"] >= 1 ? "精液润滑的" : "";
			}
			if (altText.lubricated.includes("精液")) V.semenInVagina = true;
			wikifier("arousal", 150 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);

			if (hymenIntact) {
				sWikifier(
					`<span class="purple">你将${altText.lubricated}${altText.toyDisplay}插进你的<<pussy>>直至你戳到完整无缺的处女膜。</span>`
				);
			} else if (V.bugsinside) {
				sWikifier(
					`<span class="purple">你将${altText.lubricated}${altText.toyDisplay}插进你的<<pussy>>。你感觉到虫子在里面爬。</span>`
				);
			} else {
				sWikifier(
					`<span class="purple">你将${altText.lubricated}${altText.toyDisplay}插进你的<<pussy>>，那个允许外物侵犯的地方。</span>`
				);
			}
			break;
		case "mvaginateasedildo":
			clearAction();
			altText.selectedToy = selectedToy(arm);
			altText.toyPleasure = 2 + (altText.selectedToy.type.includes("vibrator") ? 5 : 3);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyPleasure += altText.selectedOtherToy.type.includes("vibrator") ? 5 : 3;
			}
			wikifier("arousal", 300 + 50 * altText.toyPleasure, "masturbationVagina");
			wikifier("addVaginalWetness", altText.toyPleasure);

			altText.wet = "";
			if (V.vaginaArousalWetness >= 40) {
				altText.wet = "湿透的";
			} else if (V.vaginaArousalWetness >= 20) {
				altText.wet = "润滑的";
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					sWikifier(`你将${altText.toyDisplay}在你的${altText.wet}<<pussy>>里抽插着，下流的液体跟着流出。`);
				} else {
					sWikifier(`你将${altText.toyDisplay}在你的${altText.wet}<<pussy>>里抽插着，尽你所能地往深处插入。`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`你将${altText.toyDisplay}在你的${altText.wet}<<pussy>>里抽插着，即使不插得太深也会让你感到性奋。`);
			} else {
				sWikifier(`你轻柔地用${altText.toyDisplay}抽插着${altText.wet}<<pussy>>的入口。`);
			}
			break;
		case "mvaginaclitdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(`你轻柔地用${altText.toyDisplay}摩擦着你的阴蒂顶端，随着它变得更敏感，你的动作越发艰难。`)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`你用${altText.toyDisplay}玩弄着阴蒂顶端。`));
				} else {
					fragment.append(span(`你用你的${altText.toyDisplay}摩擦着阴蒂，感觉变得越来越淫荡。`));
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`你用${toyDisplay(
								altText.selectedToy
							)}按在阴蒂上，划着圈摩擦着它，你感受到的快感变得越来越强。`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`你用${toyDisplay(altText.selectedToy)}玩弄着阴蒂顶端。`));
				} else {
					fragment.append(span(`你用你的${toyDisplay(altText.selectedToy)}摩擦着阴蒂，感觉变得越来越淫荡。`));
				}
			}
			break;
		case "mvaginarubdildo":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				sWikifier(`你用${altText.toyDisplay}摩擦着你暴露的<<pussy>>，感觉变得越来越淫荡。`);
			} else {
				sWikifier(`你将${toyDisplay(altText.selectedToy)}划过你暴露的<<pussy>>，你体内升起一股淫荡的感觉。`);
			}
			break;
		case "mvaginastopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="lblue">你将${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}从你的<<pussy>>移开。</span>`);
			} else {
				sWikifier(`<span class="lblue">你将${arm.replace("left","左").replace("right","右")}手中的${toyDisplay(altText.selectedToy)}从你的<<pussy>>移开。</span>`);
			}
			break;
		case "mvaginaentrancedildofloor":
			clearAction("mrest");
			if (V.vaginause === 0) {
				V[arm + "arm"] = 0;
				V.vaginause = "mdildopenetrate";
				V.vaginaactiondefault = "mdildopenetratebounce";
				V.currentToyVagina = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				sWikifier(`<span class="purple">你将${arm.replace("left","左").replace("right","右")}手中的${toyDisplay(altText.selectedToy)}放在<<pussy>>旁边的地上。</span>`);
			}
			break;
		case "manusentrance":
			clearAction("manusrub");
			wikifier("arousal", 100 * handsOn, "masturbationAss");
			V[arm + "arm"] = "manusentrance";
			if (doubleAction) V[otherArm + "arm"] = "manusentrance";
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			if (genitalsExposed()) {
				sWikifier(`<span class="blue">你伸手向你裸露的<<bottom>>，把一根${altText.fingers}轻轻抵在菊穴上。</span>`);
			} else {
				sWikifier(
					`<span class="blue">你把手向下伸向裸露的<<bottom>>，轻柔地隔着<<exposedlower>>将一根${altText.fingers}抵着你的菊穴。</span>`
				);
			}
			break;
		case "manus":
			if ([0, "manus"].includes(V.anususe)) {
				clearAction("manustease");
				wikifier("arousal", 100 * handsOn, "masturbationAnal");
				V[arm + "arm"] = "manus";
				V.anususe = "manus";
				if (doubleAction) {
					altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "精液润滑的" : "";
					V[otherArm + "arm"] = "manus";
					sWikifier(`<span class="purple">你将两根${altText.lubricated}手指插入你的<<bottom>>。</span>`);
				} else {
					altText.lubricated =
						(arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "精液润滑的" : "";
					sWikifier(`<span class="purple">你将一根${altText.lubricated}手指插入你的<<bottom>>。</span>`);
				}
				if (altText.lubricated.includes("精液")) V.semenInAnus = true;
			} else {
				clearAction("manusrub");
			}
			break;
		case "manusrub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`你将${altText.fingers}抵在你的<<bottom>>地臀瓣间，轻柔地戳着菊穴。`);
					break;
				case 1:
					fragment.append(span(`你在菊穴附近划着圈摩擦着。`));
					break;
				case 2:
					fragment.append(span(`你将${altText.fingers}压在你的菊穴上。你感觉菊穴微微地张着。`));
					break;
			}
			break;
		case "manustease":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "手指" : "手指";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`你用${altText.fingers}温柔地探索着你的<<bottom>>。`);
					break;
				case 1:
					fragment.append(span(`你用${altText.fingers}缓慢地抽插着你的菊穴。`));
					break;
				case 2:
					sWikifier(`你用${altText.fingers}抽插你的<<bottom>>。玩弄这种地方让你感觉很有趣。`);
					break;
			}
			break;
		case "manusprostate":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationAnal");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("你按压你的前列腺使其挤出精液，让你浑身颤抖。"));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("你按压着你的前列腺，造成一种几乎难以忍受的敏感的愉悦。"));
			} else {
				fragment.append(span("你轻柔地戳着你的前列腺，每戳一次都向你的全身喷涌出一股快感。"));
			}
			break;
		case "manusstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (V[otherArm + "arm"] !== "manus") V.anususe = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				V.anususe = 0;
				sWikifier(`<span class="purple">你将手从你的<<bottom>>上移开。</span>`);
			} else {
				sWikifier(`<span class="purple">你将${arm.replace("right","右").replace("left","左")}手<<bottom>>上拿开。</span>`);
			}
			break;
		case "manusentrancedildo":
			clearAction("manusrubdildo");
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusentrancedildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "manusentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">你把手向下伸向裸露的<<bottom>>，轻柔地将${altText.toyDisplay}抵在你的菊穴上。</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">你把手向下伸向裸<<bottom>>，轻柔地隔着<<exposedlower>>将${altText.toyDisplay}抵在你的菊穴上。</span>`
					);
				}
			} else {
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">你把手向下伸向裸露的<<bottom>>，轻柔地将${toyDisplay(
							altText.selectedToy
						)}抵在你的菊穴上。</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">你把手向下伸向<<bottom>>，隔着<<exposedlower>>轻柔地将${toyDisplay(
							altText.selectedToy
						)}抵在你的菊穴上。</span>`
					);
				}
			}
			break;
		case "manusdildo":
			clearAction("manusteasedildo");
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusdildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "精液润滑的" : "";
				V[otherArm + "arm"] = "manusdildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="purple">你将你的${altText.lubricated}${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy
					)}推进你的<<bottom>>。</span>`
				);
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "精液润滑的" : "";
				sWikifier(`<span class="purple">你将${altText.lubricated}${toyDisplay(altText.selectedToy)}插入了你的<<bottom>>。</span>`);
			}
			if (altText.lubricated.includes("精液")) V.semenInAnus = true;
			break;
		case "manusrubdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`你把${altText.toyDisplay}按在你的<<bottom>>屁股之间，温柔地戳弄你的菊穴。`);
						break;
					case 1:
						sWikifier(`你用${altText.toyDisplay}绕着你的菊穴转圈。`);
						break;
					case 2:
						sWikifier(`你把${altText.toyDisplay}按在你的菊穴上，你能感觉到它微微张开。`);
						break;
				}
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`你把${toyDisplay(altText.selectedToy)}按在你的<<bottom>>屁股之间，温柔地戳弄你的菊穴。`);
						break;
					case 1:
						sWikifier(`你用${toyDisplay(altText.selectedToy)}在菊穴附近划着圈摩擦着。`);
						break;
					case 2:
						sWikifier(`你将${toyDisplay(altText.selectedToy)}压在你的菊穴上，感觉到菊穴微微地张着。`);
						break;
				}
			}
			break;
		case "manusteasedildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`你轻柔地用你的${altText.toyDisplay}在<<bottom>>内探索着。`);
						break;
					case 1:
						sWikifier(`你用${altText.toyDisplay}缓慢地抽插着你的菊穴。`);
						break;
					case 2:
						sWikifier(`你用${altText.toyDisplay}抽插你的<<bottom>>。玩弄这种地方让你感觉很有趣。`);
						break;
				}
			} else {
				switch (random(0, 2)) {
					case 0:
						sWikifier(`你轻柔地用你的${toyDisplay(altText.selectedToy)}在<<bottom>>内探索着。`);
						break;
					case 1:
						sWikifier(`你用${toyDisplay(altText.selectedToy)}缓慢地抽插着你的<<bottom>>。`);
						break;
					case 2:
						sWikifier(`你用${toyDisplay(altText.selectedToy)}缓慢地抽插着你的<<bottom>>。玩弄这种地方让你感觉很有趣。`);
						break;
				}
			}
			break;
		case "manusprostatedildo":
			clearAction();
			wikifier("arousal", 350 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`你用${altText.toyDisplay}按压你的前列腺使其挤出精液，让你浑身颤抖。`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`你用${altText.toyDisplay}压迫你的前列腺，造成一种几乎难以忍受的敏感的愉悦。`
						)
					);
				} else {
					fragment.append(
						span(`你轻柔地用${altText.toyDisplay}戳着你的前列腺，每戳一次都向你的全身喷涌出一股快感。`)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`你用${toyDisplay(altText.selectedToy)}按压你的前列腺使其挤出精液，让你浑身颤抖。`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`你用${toyDisplay(
								altText.selectedToy
							)}压迫你的前列腺，造成一种几乎难以忍受的敏感的愉悦。`
						)
					);
				} else {
					fragment.append(
						span(
							`你轻柔地用${toyDisplay(
								altText.selectedToy
							)}戳着你的前列腺，每戳一次都向你的全身喷涌出一股快感。`
						)
					);
				}
			}
			break;
		case "manusstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">你将${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}从你的<<bottom>>移开。</span>`);
			} else {
				sWikifier(`<span class="purple">你将${arm.replace("left","左").replace("right","右")}手里的${toyDisplay(altText.selectedToy)}从你的<<bottom>>里拔出。</span>`);
			}
			break;
		case "manusentrancedildofloor":
			clearAction("mrest");
			if (V.anususe === 0) {
				V[arm + "arm"] = 0;
				V.anususe = "mdildopenetrate";
				V.anusactiondefault = "mdildopenetratebounce";
				V.currentToyAnus = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				fragment.append(span(`你将${arm === "right" ? "右" : "左"}手中的${toyDisplay(altText.selectedToy)}放在菊穴旁边的地上。`, "purple"));
			}
			break;
		case "mmouthstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.mouth = 0;
			altText.selectedToy = selectedToy(arm, false);
			fragment.append(span(`你将你${arm === "right" ? "右" : "左"}手的${toyDisplay(altText.selectedToy)}从嘴里拔出。`, "purple"));
			break;
		default:
			clearAction("mrest");
			break;
	}
	fragment.append("");
	return fragment;
}

function fingersEffect(span, hymenIntact) {
	const fragment = document.createDocumentFragment();
	if (V.fingersInVagina === V.vaginaFingerLimit - 1) {
		fragment.append("");
		fragment.append(span("它非常合适，", "purple"));
	} else if (V.fingersInVagina === V.vaginaFingerLimit) {
		if (hymenIntact) {
			fragment.append("");
			fragment.append(span("如果不撕裂处女膜，你无法再塞入更多。", "pink"));
		} else {
			fragment.append("");
			fragment.append(span("你已经达到了你的极限。", "pink"));
		}
	}
	return fragment;
}

function possessedMasturbation(span, br) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	if (!V.combatBegun) {
		V.combatBegun = 1;
		return fragment;
	}

	let resist = 0;

	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.leftaction)) resist += 2;
	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.rightaction)) resist += 2;

	if (resist === 0) {
		fragment.append(span("你让它控制你。", "pink"));
		sWikifier("<<pain -2>><<stress -12>><<sub 2>><<lpain>><<llstress>><<set V.wraith.will += 30>>");
	} else {
		wikifier("willpowerdifficulty", 1, Math.floor(1 + V.wraith.will), true);
		if (V.willpowerSuccess) {
			T.resistSuccess = 1;
			fragment.append(span(`你努力夺取控制权。你无法操控你的${resist === 4 ? "双臂" : "手臂"}。`, "green"));
			wikifier("pain", resist);
			wikifier("stress", resist);
			wikifier("trauma", resist);
			wikifier("def", 2);
			wikifier("control", (Math.floor(currentSkillValue("willpower") / 24) * resist) / 10);
			V.wraith.will -= Math.floor(currentSkillValue("willpower") / 24) * resist;
			sWikifier(`<<gpain>><<gtrauma>><<gstress>><<${resist === 4 ? "gg" : "g"}control>>`);
		} else {
			fragment.append(span("你的身体不受控制。", "red"));
			["leftaction", "rightaction"].forEach(action => {
				switch (V[action]) {
					case "mbreastW":
					case "mbreaststopW":
						V[action] = "mbreastW";
						break;
					case "mvaginaW":
					case "mvaginastopW":
						V[action] = "mvaginaW";
						break;
					case "mpenisW":
					case "mpenisstopW":
						V[action] = "mpenisW";
						break;
				}
				wikifier("stress", 6);
				wikifier("trauma", 6);
				wikifier("willpower", 1);
				wikifier("def", 1);
				V.wraith.will -= Math.floor(currentSkillValue("willpower") / 40) * resist;
				sWikifier("<<gtrauma>><<gstress>><<gwillpower>>");
			});
		}
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationeffectsMouth({
	span,
	otherElement,
	additionalEffect,
	selectedToy,
	toyDisplay,
	genitalsExposed,
	breastsExposed,
	hymenIntact,
	earSlimeDefy,
}) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = defaultAction => {
		V.mouthactiondefault = defaultAction !== undefined ? defaultAction : V.mouthaction;
		V.mouthaction = 0;
	};

	if (V.mouthaction === 0 || V.mouthaction === "mrest") return fragment;

	const altText = {};

	// Dealing with the players actions
	switch (V.mouthaction) {
		case "mpenisentrance":
			if (V.penisuse === 0) {
				clearAction("mpenislick");
				V.penisuse = "mouth";
				V.mouth = "mpenisentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">耳朵里的史莱姆强迫你弯下腰。你不确定你是否会喜欢即将到来的事情。</span><<gawareness>>`
					);
					fragment.append("");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">你靠近你的<<penis>>，让你能够伸出舌头舔到龟头。</span>`);
				} else {
					sWikifier(
						`<span class="blue">你的舌头在你的<<penis>>${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mchastityparasiteentrance":
			if (V.penisuse === 0) {
				clearAction("mchastityparasitelick");
				V.penisuse = "mouth";
				V.mouth = "mchastityparasiteentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">耳朵里的史莱姆强迫你弯下腰。你不确定你是否会喜欢即将到来的事情。</span><<gawareness>>`
					);
					fragment.append("");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">你靠近你的贞操锁寄生虫，让你能够伸出舌头舔到它。</span>`);
				} else {
					sWikifier(
						`<span class="blue">你用舌头舔过贞操锁寄生虫${
							calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
						}。</span>`
					);
				}
				if (V.earSlime.defyCooldown) {
					// Do Nothing
				} else if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">它开始轻柔地在你<<penis>>周围跳动。</span>');
				} else {
					V.earSlime.vibration += 2;
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenislick":
			clearAction("mpenislick");
			if (genitalsExposed()) {
				if (earSlimeDefy()) {
					wikifier("arousal", 100, "masturbationGenital");
					wikifier("pain", 1);
					additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
					sWikifier(`你被迫粗暴地舔你的<<penis>>，想要找到些感觉。`);
				} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
					wikifier("arousal", 400, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("你每次舔舐时你的<<penis>>都会释放出过多的先走汁，你必须把它吞下去，但你不会停下来。");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("你用舌头舔弄着自己的<<penis>>顶部，同时吞下漏出的先走汁。");
					} else {
						sWikifier("你用舌头舔弄着你的<<penis>>尖端，把溢出的先走汁涂遍所有敏感部位，沾满整个口腔。");
					}
				} else {
					wikifier("arousal", 200, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("你的每次舔舐都会让<<penis>>颤抖，但你没有停下来。");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("你的舌头在你的<<penis>>顶部游走，唾液和前列腺液混合在一起。");
					} else {
						sWikifier("你的舌头在你的<<penis>>顶部游走，向敏感区进攻。");
					}
				}
			} else {
				sWikifier(
					`<span class="blue">你的舌头在你的<<penis>>${
						calculatePenisBulge() ? "，感受着<<exposedlower>>下的隆起。" : ""
					}。</span>`
				);
			}
			break;
		case "mpenistakein":
			clearAction(V.penisHeight === 0 ? "mpenissuck" : "mpenisdeepthroat");
			V.mouth = "mpenis";
			V.mouthstate = "penetrated";
			V.selfsuckDepth = 0;
			wikifier("arousal", 200, "masturbationGenital");
			if (V.penisHeight === 0) {
				sWikifier(`<span class="blue">你把<<penis>>含进嘴里，一种淫荡的快感从脊柱散发扩散至全身。</span>`);
			} else {
				sWikifier(`<span class="blue">你把<<penis>>的顶端塞进嘴里，一种淫荡的快感从脊柱散发扩散至全身。</span>`);
			}
			break;
		case "mpenisdeepthroat":
			clearAction(V.selfsuckDepth < V.selfsuckLimit ? "mpenisdeepthroat" : "mpenissuck");
			V.selfsuckDepth++;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			sWikifier(`你把<<penis>>推进口腔更深处。`);
			if (V.selfsuckDepth === V.penisHeight) {
				if (V.leftarm === "mpenisentrance" && V.rightarm === "mpenisentrance") {
					altText.hands = "手";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				} else if (V.leftarm === "mpenisentrance") {
					altText.hands = "左手";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
				} else if (V.rightarm === "mpenisentrance") {
					altText.hands = "右手";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				}
				if (altText.hands) sWikifier(`<span class="lblue">你把${altText.hands}从<<penis>>移开，留出足够的空间。</span> `);
				fragment.append(deepthroateffects(span));
			}
			break;
		case "mpenispullback":
			V.selfsuckDepth -= 1;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			if (V.selfsuckDepth >= 2) {
				clearAction();
				sWikifier('<span class="lblue">你含着<<penis>>用力将头拔出，榨了一点出来到你的喉咙里。</span>');
				fragment.append("");
				fragment.append(deepthroateffects(span));
			} else if (V.selfsuckDepth === 1) {
				clearAction();
				sWikifier('<span class="lblue">你含着<<penis>>将头向后移动，将它从你的喉咙里拔出来。</span>');
				fragment.append("");
				fragment.append(deepthroateffects(span));
			} else {
				clearAction("mpenisstop");
				sWikifier('<span class="lblue">你向后移动胯部，直到嘴里只剩下<<penis>>的顶部。</span>');
			}
			break;
		case "mpenismouthoff":
			clearAction("mrest");
			V.mouth = "mpenisentrance";
			V.mouthstate = 0;
			sWikifier('<span class="lblue">你将<<penis>>移出你的嘴巴。</span>');
			break;
		case "mpenissuck":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "童贞阴茎" : "阴茎");
				sWikifier(`你被迫粗暴地吸吮自己的<<penis>>，想要找到些感觉。`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "急切地" : "慢慢地";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier(
							"你不断吞下漏出的先走汁，前后移动自己的脑袋吞吐自己的<<penis>>。一阵安定的温暖填充了你的肚子。"
						);
					} else {
						sWikifier(
							"你不断来回移动脑袋吞吐自己的<<penis>>，前列腺液也不断漏出你的喉咙。一阵安定的温暖填充了你的肚子。"
						);
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`你舔舐<<penis>>的根部，同时喉咙按摩着阴茎。`);
						} else {
							sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，同时舔舐阴茎底部。`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，舌头在阴茎上来回舔舐。`);
					} else {
						sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，舌头在龟头上来回舔舐。`);
					}
				}
			} else {
				wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "急切地" : "慢慢地";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier("你在<<penis>>上来回移动头部，一些前列腺液流进你的嘴里，你喝下它们。");
					} else {
						sWikifier("你在<<penis>>上来回移动头部，溢出来的前列腺液顺着你的喉咙下去。");
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`你舔舐<<penis>>的根部，同时喉咙按摩着阴茎。`);
						} else {
							sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，同时舔舐阴茎底部。`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，舌头在阴茎上来回舔舐。`);
					} else {
						sWikifier(`你${altText.eagerly}吮吸你的<<penis>>，舌头在龟头上来回舔舐。`);
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">你把嘴从<<penis>>上移开。</span>`);
			break;
		case "mchastityparasitelick":
			clearAction();
			if (V.earSlime.defyCooldown) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 4);
				sWikifier(
					`你舔舐着寄生虫，每舔一下，它都带给你一股<span class="lewd">快乐</span>和<span class="red">痛苦</span>交织的浪潮。<<gpain>>`
				);
			} else if (V.earSlime.corruption < 100) {
				wikifier("arousal", 200, "masturbationGenital");
				V.earSlime.vibration += 2;
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "急切地" : "慢慢地";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`你${altText.eagerly}地舔舐着寄生虫，每一下都<span class="lewd">会让寄生虫带给你一股扩散整个<<penis>>的快感。</span>`
					);
				} else {
					sWikifier(
						`你${altText.eagerly}舔舐着寄生虫，每一下都<span class="lewd">会让寄生虫带给你一阵轻微的快感，扩散你整个<<penis>>。</span>`
					);
				}
			} else {
				wikifier("arousal", 500, "masturbationGenital");
				V.earSlime.vibration += 4;
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "急切地" : "慢慢地";
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationGenital");
					sWikifier(
						`你艰难地舔舐着寄生虫，每舔一下<span class="lewd">都会让寄生虫产生一阵扩散至你全身的快感</span>，让你几乎承受不住。`
					);
				} else {
					sWikifier(
						`你${altText.eagerly}舔舐着寄生虫，每一下都<span class="lewd">会让寄生虫产生一阵扩散至你全身的快感。</span>`
					);
				}
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">你把嘴从贞操锁寄生虫上移开。</span>`);
			break;
		case "mvaginaentrance":
			if (V.vaginause === 0) {
				clearAction("mvaginalick");
				V.mouth = "mvaginaentrance";
				V.vaginause = "mouth";
				wikifier("arousal", 100, "masturbationGenital");
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">耳朵里的史莱姆强迫你弯下腰。你不确定你是否会喜欢即将到来的事情。</span><<gawareness>>`
					);
					fragment.append("");
				}
				if (genitalsExposed()) {
					fragment.append(span(`你用舌头按摩着裸露的阴蒂，因期待插入而颤抖着。`, "blue"));
				} else {
					sWikifier(`<span class="blue">你用舌头在你<<pussy>>上游走，透过<<exposedlower>>感受着它的形状。</span>`);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mvaginalick":
			clearAction();
			wikifier("arousal", 100, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier("你舔舐着从你的<<pussy>>流出的液体，在期待中浑身颤抖。");
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier("你舔舐着你的<<pussy>>，试图到达更深的区域。");
			} else {
				sWikifier("你舔舐你的<<pussy>>。");
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("你吮吸并用牙齿轻柔地磨蹭着你的阴蒂，因期待而颤抖着。"));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("你舔舐并吮吸着你的阴蒂。"));
			} else {
				fragment.append(span("你舔舐着你的阴蒂。"));
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(
						`你吮吸并轻轻地用牙齿摩擦阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，你享受着它所回应的温和吸吮而浑身颤抖。`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`你舔舐并吮吸着阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}，享受着它所回应的温和吸吮。`));
			} else {
				fragment.append(span(`你舔舐着阴蒂上的${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}。`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V.mouth = 0;
			V.vaginause = 0;
			sWikifier('<span class="lblue">你把嘴从<<pussy>>上移开。</span>');
			break;
		case "maphropill":
			clearAction("mrest");
			if (V.mouth === 0) {
				wikifier("drugs", 300);
				const pills = V.player.inventory.sextoys["aphrodisiac pills"][0];
				pills.uses -= 1;
				if (pills.uses <= 0) V.player.inventory.sextoys["aphrodisiac pills"].splice(0, 1);
				if (V.drugged > 0) {
					fragment.append(span("你将催情剂扔进嘴里并吞下。体内淫靡的暖流变得更猛烈了。"));
				} else {
					fragment.append(span("你将催情剂扔进嘴里并吞下。淫靡的暖流从你的小腹不断蔓延。"));
				}
			}
			break;
		case "mdildolick":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);

			if (V.mouth === "mdildomouthentrance") {
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`你仔细地舔着${altText.toyDisplay}的顶端，尽你所能地用舌头玩弄它。`));
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(span(`你渴望地舔着${altText.toyDisplay}的顶端，尽你所能地用舌头玩弄它。`));
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(`你熟练地亲吻和舔着${altText.toyDisplay}的顶端，专注于用双唇与舌头侍奉它。`)
					);
				}
			} else {
				if (currentSkillValue("oralskill") < 100) {
					if (altText.selectedToy.name.includes("small")) {
						fragment.append(span(`你笨拙地在嘴里的${altText.toyDisplay}下面摆动着你的舌头。`));
					} else {
						fragment.append(
							span(`你挣扎着舔着整根${altText.toyDisplay}，粗壮的${altText.toyDisplay}将你的舌头牢牢压在口腔下侧。`)
						);
					}
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(
						span(`你沿着嘴里的${altText.toyDisplay}扭动着舌头，尽可能地舔弄玩具更多的部位。`)
					);
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(
							`你熟练地沿着嘴里的${altText.toyDisplay}扭动着你的舌头，偶尔调整舌头角度来将它的更多部位包裹住。`
						)
					);
				}
			}
			break;
		case "mdildokiss":
			clearAction();
			wikifier("arousal", 100, "masturbationMouth");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`你沿着整根${altText.toyDisplay}笨拙地亲吻着。`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationMouth");
				fragment.append(span(`你沿着整根${altText.toyDisplay}亲吻着，一股淫靡的暖流在你体内逐渐变强。`));
			} else {
				altText.virginity =
					V.player.virginity.oral === true
						? "希望你很快就能体验到真正的东西。"
						: "当你把它当成真实的东西时，一种淫荡的温暖在你内心滋长。";
				wikifier("arousal", 200, "masturbationMouth");
				fragment.append(span(`你深情地在整根${altText.toyDisplay}上留下一连串的吻，${altText.virginity}`));
			}
			break;
		case "mdildosuck":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`你尽你所能地吮吸着${altText.toyDisplay}。`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(span(`你渴望地吮吸着${altText.toyDisplay}。`));
			} else {
				wikifier("arousal", 200, "masturbationOral");
				if (V.player.virginity.oral === true) {
					altText.virginity = "想知道真阴茎的感觉会有什么不同。";
				} else if (V.ejactrait) {
					altText.virginity = "有点失望，干完活你就拿不到奖励了。";
				} else {
					altText.virginity = "假装这是真的。";
				}
				fragment.append(span(`你熟练地吮吸并玩弄着${altText.toyDisplay}。`));
			}
			break;
		default:
			clearAction("mrest");
			break;
	}

	fragment.append("");
	return fragment;
}

function deepthroateffects(span) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	switch (V.penisHeight) {
		case 0:
			fragment.append(span("Error: 不可能的情况。", "red"));
			break;
		case 1:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("你的嘴唇碰到你的<<penis>>根部，龟头顶到了你的喉咙。");
					break;
				default:
					fragment.append(span("Error: 不可能的情况。", "red"));
					break;
			}
			break;
		case 2:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("你的龟头几乎要顶到你的喉咙。");
					break;
				case 2:
					sWikifier("你的嘴唇碰到你的<<penis>>根部，龟头进入了你的喉咙。");
					break;
				default:
					fragment.append(span("Error: 不可能的情况。", "red"));
					break;
			}
			break;
		case 3:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("你的龟头几乎要顶到你的喉咙。");
					break;
				case 2:
					sWikifier("你的<<penis>>正在扩张你的喉咙壁。");
					break;
				case 3:
					sWikifier("你的双唇碰到<<penis>>的根部，肉棒填满了你的喉咙。");
					break;
				default:
					fragment.append(span("Error: 不可能的情况。", "red"));
					break;
			}
			break;
		default:
			fragment.append(span("Error: 不可能的情况。", "red"));
			break;
	}
	if (V.selfsuckDepth === V.penisHeight) {
		fragment.append("");
		fragment.append(span("你已经触及了底部。"));
	} else if (V.selfsuckDepth === V.selfsuckLimit) {
		fragment.append("");
		fragment.append(span("你不够灵活，没法再继续低下身了。"));
	}

	fragment.append("");
	return fragment;
}

function masturbationeffectsVaginaAnus({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = (actionType, defaultAction) => {
		V[actionType + "actiondefault"] = defaultAction !== undefined ? defaultAction : V[actionType + "action"];
		V[actionType + "action"] = 0;
	};

	const altText = {};

	switch (V.mouthaction) {
		case "mpenisflowerlick":
			clearAction("mouth");
			wikifier("arousal", 200, "mouth");
			wikifier("drugs", 10);
			V.mouth = "mpenisflowerlick";
			V.moorPhallusPlant = 2;
			switch (random(1, 3)) {
				case 1:
					fragment.append(span("你几乎就要把阴茎塞进嘴里了，但突然又感到忐忑不安。"));
					break;
				case 2:
					fragment.append(span("你舔舐触手植物的尖端，吞下甜甜的液体。"));
					break;
				case 3:
					fragment.append(span("你舔舐触手植物的顶端。"));
					break;
			}
			if (V.vaginaaction === "mpenisflowerrub") {
				V.vaginaaction = 0;
				V.vaginaactiondefault = "mrest";
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowertakein":
			clearAction("mouth", "mpenisflowersuck");
			V.mouth = "mpenisflowersuck";
			V.mouthstate = "penetrated";
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(wikifier("takeVirginity", "'阳具植物'", "oral"));
				fragment.append("");
				sWikifier('你吮吸着这棵植物，<span class="red">它的味道非常奇怪</span>，你感觉自己体内升起一股热量。');
			} else {
				fragment.append(span("你吸吮着植物。它的味道非常甜，你感觉自己的身体热了起来。"));
			}
			break;
		case "mpenisflowerstop":
			clearAction("mouth");
			V.mouth = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("你不再舔着植物。", "lblue"));
			break;
		case "mpenisflowersuck":
			clearAction("mouth");
			wikifier("arousal", 500, "oral");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("你吮吸并前后晃动着你的头部，颤抖着饮下液体。"));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("你在吮吸着植物的同时啜饮它的液体。"));
			} else {
				fragment.append(span("你在吮吸着触手植物。"));
			}
			break;
		case "mpenisflowersuckstop":
			clearAction("mouth", "mpenisflowersuck");
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			fragment.append(
				span("你不断地前后摆动着头，吮吸着触手植物。尽你所能却仍不能让自己的动作停下。", "red")
			);
			break;
	}

	switch (V.vaginaaction) {
		case "mpenisflowerrub":
			clearAction("vagina");
			V.vaginause = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("尽管有衣服挡着，你仍然在用下体磨蹭着植物。"));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"在突然爆发的情欲影响下，你差点把整个植物插进自己体内。你在最后关头停下，轻柔地将植物在入口处划着圈。"
							)
						);
						break;
					case 2:
						sWikifier("你用植物摩擦你的<<if $player.penisExist>><<penis>><<else>>阴蒂<</if>>。");
						break;
					case 3:
						fragment.append(span("你用触手植物摩擦着你的小穴。"));
						break;
				}
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("vagina", "mpenisflowerbounce");
			V.vaginause = "mpenisflowerpenetrate";
			V.vaginastate = "penetrated";
			wikifier("arousal", 1000, "vaginal");
			wikifier("vaginalstat");
			wikifier("drugs", 10);
			wikifier("vaginaraped");
			if (V.player.virginity.vaginal === true) {
				fragment.append(span("你略微蹲下，让植物插进你体内。"));
				fragment.append("");
				fragment.append(wikifier("takeVirginity", "'阳具植物'", "vaginal"));
				fragment.append("");
				sWikifier(
					'<span class="red">你不再是处女的</span>小穴挣扎着适应植物时差点让你叫出声，但疼痛在瞬间消失。'
				);
			} else {
				fragment.append(span("你略微蹲下，让植物插进你体内。你从未有过这样的感觉。"));
			}
			break;
		case "mpenisflowerstop":
			clearAction("vagina");
			V.vaginause = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("你停止用小穴摩擦着触手植物。", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("vagina");
			wikifier("arousal", 500, "vaginal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("你饥渴地骑着植物，用你最快的速度摩擦着它。快感几近让你发疯。"));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("你插着植物上下跃动。快感几近让你发疯。"));
			} else {
				fragment.append(span("你插着植物轻柔地跃动，每插入一次都在你的身体里释放出一波快感。"));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("vagina", "mpenisflowerbounce");
			wikifier("arousal", 300, "vaginal");
			wikifier("drugs", 10);
			fragment.append(span("你的双腿没能将身子从植物上抬起，就好似你的身体不听使唤。", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("vagina");
			wikifier("arousal", 300, "masturbationVagina");
			altText.selectedToy = selectedToy("vagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`饥渴地骑着${toyDisplay(altText.selectedToy)}，用你最快的速度摩擦着它。`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`你在${toyDisplay(altText.selectedToy)}上不断跃动。`);
			} else {
				sWikifier(`你插着${toyDisplay(altText.selectedToy)}轻柔地跃动。`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("vagina", "mrest");
			V.vaginause = 0;
			altText.selectedToy = selectedToy("vagina", false);
			fragment.append(span(`你停止用小穴摩擦着${toyDisplay(altText.selectedToy)}，任由它落下。`, "lblue"));
			break;
	}
	fragment.append("");

	switch (V.anusaction) {
		case "mpenisflowerrub":
			clearAction("anus");
			V.anususe = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("尽管有衣服挡着，你仍然在用屁股磨蹭着植物。"));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"你差点把整根植物插进自己的菊穴，但在最后关头停下。你轻柔地将植物在入口处划着圈。"
							)
						);
						break;
					case 2:
						sWikifier("你摩擦<<bottom>>之间的阴茎植物。");
						break;
					case 3:
						fragment.append(span("你用菊穴摩擦着触手植物。"));
						break;
				}
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("anus", "mpenisflowerbounce");
			V.anususe = "mpenisflowerpenetrate";
			wikifier("arousal", 1000, "anal");
			wikifier("analstat");
			wikifier("drugs", 10);
			if (V.player.virginity.anal === true) {
				fragment.append(span("你略微蹲下，让植物插进你体内。"));
				fragment.append("");
				fragment.append(wikifier("takeVirginity", "'阳具植物'", "anal"));
				fragment.append("");
				sWikifier(
					'<span class="red">你已经开苞的</span>菊穴挣扎着适应植物时差点让你叫出声，但疼痛在瞬间消失。'
				);
			} else {
				fragment.append(span("你略微蹲下，让植物插进你体内。你从未有过这样的感觉。"));
			}
			break;
		case "mpenisflowerstop":
			clearAction("anus");
			V.anususe = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("你停止用菊穴摩擦着触手植物。", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("anus");
			wikifier("arousal", 500, "anal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("你粗暴地骑着植物，尽可能快地摩擦着它。这是你从未感受过的……"));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					span(`你骑着这株植物${V.player.penisExist ? "，试图让它撞击你的前列腺" : ""}。这是你以前从未有过的感觉。`)
				);
			} else {
				fragment.append(span("你温柔地骑着阳具植物上，每次戳刺都会让你的身体涌过一阵快感。"));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("anus", "mpenisflowerbounce");
			wikifier("arousal", 300, "anal");
			wikifier("drugs", 10);
			fragment.append(span("你的双腿没能将身子从植物上抬起，就好似你的身体不听使唤。", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("anus");
			wikifier("arousal", 300, "masturbationAnal");
			altText.selectedToy = selectedToy("anus");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`饥渴地骑着${toyDisplay(altText.selectedToy)}，用你最快的速度摩擦着它。`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`你在${toyDisplay(altText.selectedToy)}上不断跃动。`);
			} else {
				sWikifier(`你插着${toyDisplay(altText.selectedToy)}轻柔地跃动。`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("anus", "mrest");
			V.anususe = 0;
			altText.selectedToy = selectedToy("anus", false);
			fragment.append(span(`你停止用菊穴摩擦着${toyDisplay(altText.selectedToy)}，任由它落下。`, "lblue"));
			break;
	}

	fragment.append("");
	return fragment;
}

Macro.add("masturbationeffects", {
	handler() {
		const fragment = masturbationeffects();
		this.output.append(fragment);
	},
});







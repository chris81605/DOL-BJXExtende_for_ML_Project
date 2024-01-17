
/* eslint-disable no-undef */
function masturbationActions() {
	const fragment = document.createDocumentFragment();

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump")
	);

	const selectedToy = location => {
		if (V["currentToy" + location.toLocaleUpperFirst()] === "none") return 0;
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		return toy;
	};
	const toyDisplay = (toy1, toy2) => {
		if (toy1 && toy2) return (toy1.colour ? setup.colourName(toy1.colour.replace("-"," ")) : "") + toy1.namecap + "和" + (toy2.colour ? setup.colourName(toy2.colour.replace("-"," ")) : "") + toy2.namecap;
		if (toy1) return (toy1.colour ? setup.colourName(toy1.colour.replace("-"," ")) : "") + toy1.namecap;
		return "";
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;
	const ballsExposed = () => genitalsExposed() && !playerChastity("hidden") && V.worn.genitals.name !== "chastity parasite";

	const otherVariables = { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed };

	const generateOption = (actionVariable, option) => {
		let result = "";

		if (option.action) {
			result += "<label>";
			result += `<<radiobutton "$${actionVariable}" "${option.action}" autocheck>> `;
		}
		if (option.text) {
			if (option.colour) {
				result += `<span class="${option.colour}">${option.text}</span>`;
			} else {
				result += option.text;
			}
		}
		if (option.otherElements) {
			result += " " + option.otherElements;
		}
		if (option.action) {
			result += "</label>";
		}

		return result;
	};

	const generateListOption = (actionVariable, options) => {
		let result = "";

		result += `<label><<listbox "$${actionVariable}" autoselect>></label>`;

		options.forEach(option => {
			result += `<<option "${option.text}" ${option.action}>>`;
		});

		result += "<</listbox>></label>";

		return result;
	};

	// Display the options
	[
		masturbationActionsHands("left", otherVariables),
		masturbationActionsHands("right", otherVariables),
		masturbationActionsMouth(otherVariables),
		masturbationActionsVagina(otherVariables),
		masturbationActionsAnus(otherVariables),
	].forEach(action => {
		if (action.options && action.options.length) {
			if (!T.noMasturbationOutput) {
				fragment.append(Wikifier.wikifyEval(action.text));
				fragment.append(document.createElement("br"));
			}

			// Attempt to ensure an action is selected, set to "mrest" or the first available action if it doesnt exist
			if (action.options.find(option => option.action === V[action.actionVariable + "default"])) {
				V[action.actionVariable] = V[action.actionVariable + "default"];
			} else if (!V.corruptionMasturbation && action.options.find(option => option.action === "mrest")) {
				V[action.actionVariable] = "mrest";
			} else if (action.options[0]) {
				V[action.actionVariable] = action.options[0].action;
			} else {
				V[action.actionVariable] = 0;
			}
			if (!T.noMasturbationOutput) {
				switch (V.options.masturbationControls) {
					case "lists":
						// Demo of alternate control styles
						fragment.append(Wikifier.wikifyEval(generateListOption(action.actionVariable, action.options)));
						break;
					default:
						action.options.forEach(option => {
							fragment.append("| ");
							fragment.append(Wikifier.wikifyEval(generateOption(action.actionVariable, option)));
							fragment.append(" ");
						});
						break;
				}

				fragment.append(document.createElement("br"));
				fragment.append(document.createElement("br"));
			}
		}
	});

	if (V.arousal >= V.arousalmax && !V.possessed && !T.noMasturbationOutput) {
		fragment.append(wikifier("orgasm"));
		fragment.append(wikifier("promiscuity1"));
		V.masturbationorgasmstat++;
		V.masturbationorgasm++;
		if (V.femaleclimax !== 1 && !T.deniedOrgasm && V.worn.genitals.name !== "chastity parasite" && V.mouth !== "mpenis") {
			V.masturbationorgasmsemen++;
		}
		fragment.append(wikifier("purity", -1));
	}
	fragment.append(wikifier("pass", 10, "seconds"));
	V.secondsSpentMasturbating += 10;

	// Updates the control caption at the top of the screen to include any control gained through the rest of the passage
	if (V.possessed && !T.noMasturbationOutput) {
		$(() => {
			Dynamic.render("control-caption");
		});
	}

	return fragment;
}

function masturbationActionsHands(arm, { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: arm + "action",
	};
	const toyDropDown = limit => {
		const toys = listUniqueCarriedSextoys().filter(toy => {
			if (limit === "breastpump") return toy.type.includes("breastpump");
			return (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump");
		});
		let count = 0;

		let result = `<label><<listbox "$selectedToy${arm.toLocaleUpperFirst()}" autoselect>>`;
		toys.forEach((toy, index) => {
			if (index !== V.currentToyLeft && index !== V.currentToyRight && index !== V.currentToyVagina && index !== V.currentToyAnus) {
				result += `<<option "${toyDisplay(toy)}" ${index}>>`;
				count++;
			}
		});
		if (!count) return;

		result += "<</listbox>></label>";
		return result;
	};
	const stop = action => {
		return {
			action,
			text: "把手移开",
		};
	};

	const actiondefault = arm + "actiondefault";
	const otherArm = arm === "left" ? "right" : "left";
	const altText = {};

	switch (V[arm + "arm"]) {
		case 0:
			result.text = `你的${arm === "right" ? "右" : "左"}手是空闲着的。`;
			if (V.player.penisExist) {
				if (
					(V.awareness >= 400 || V.earSlime.event.includes("get your own sperm into your")) &&
					V.masturbationorgasmsemen >= 1 &&
					V[arm + "FingersSemen"] !== 1
				) {
					result.options.push({
						action: "msemencover",
						text: "用精液涂抹手指",
						colour: "sub",
						otherElements: V.earSlime.event.includes("get your own sperm into your") ? undefined : "<<combataware 5>>",
					});
				}
				if (!playerChastity("penis")) {
					result.options.push({
						action: "mpenisentrance",
						text: V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "爱抚你被寄生的肉棒" : "爱抚你的肉棒",
						colour: "sub",
					});
				} else if (V.worn.genitals.name === "chastity parasite") {
					result.options.push({
						action: "mchastityparasiteentrance",
						text: "爱抚你的贞操锁寄生虫",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mchastity",
						text:
							V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "尝试爱抚你被寄生的肉棒" : "尝试爱抚你的肉棒",
						colour: "sub",
					});
				}
				if (V.player.ballsExist && ballsExposed() && V.ballssize >= -1 && (V.ballssize >= 1 || V[otherArm + "arm"] !== "mballs")) {
					result.options.push({
						action: "mballsentrance",
						text: "爱抚你的蛋蛋",
						colour: "sub",
					});
				}
			}
			if (V.player.vaginaExist) {
				if (!playerChastity("vagina")) {
					result.options.push({
						action: "mvaginaentrance",
						text: "爱抚你的小穴",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mchastity",
						text: "尝试爱抚你的小穴",
						colour: "sub",
					});
				}
			}
			if (V.awareness >= 100) {
				result.options.push({
					action: "mchest",
					text: "爱抚你的胸部",
					colour: "sub",
					otherElements: "<<combataware 2>>",
				});
			}
			if (V.awareness >= 200) {
				if (!playerChastity("anus")) {
					result.options.push({
						action: "manusentrance",
						text: "抚摸你的菊穴",
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (["home", "brothel", "cafe"].includes(V.location) || T.enableSexToys) {
					altText.toyDropDown = toyDropDown();
					if (altText.toyDropDown) {
						result.options.push({
							action: "mpickupdildo",
							text: "使用玩具:",
							colour: "green",
							otherElements: `${altText.toyDropDown} <<combataware 3>>`,
						});
					}
				}
			} else if (playerToys.find(toy => toy.type.includes("breastpump")) && playerNormalPregnancyTotal() && ["home", "alex_farm"].includes(V.location)) {
				// To specifically enable filling bottles for babies, location should be expanded on when required
				altText.toyDropDown = toyDropDown("breastpump");
				if (altText.toyDropDown) {
					result.options.push({
						action: "mpickupdildo",
						text: "使用挤奶器:",
						colour: "green",
						otherElements: `${altText.toyDropDown}`,
					});
				}
			}
			break;
		case "mpenisentrance":
			result.text = `你${V.player.penissize >= 0 ? `用你的${arm === "right" ? "右" : "左"}手` : `用你的${arm === "right" ? "右" : "左"}拇指和食指`}握着你的<<penis>>。`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mpenisglans",
					text: "爱抚龟头",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis" && V.selfsuckDepth === V.penisHeight)) {
				result.options.push({
					action: "mpenisshaft",
					text: "撸动肉棒",
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstop"));
			break;
		case "mchastityparasiteentrance":
			result.text = `你${V.player.penissize >= 2 ? `用你的${arm.replace("right","右").replace("left","左")}手` : `用你的${arm.replace("right","右").replace("left","左")}拇指和食指`}握着你的贞操锁寄生虫。`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mchastityparasiterub",
					text: "摩擦寄生虫",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis")) {
				result.options.push({
					action: "mchastityparasitesqueeze",
					text: "挤压寄生虫",
					colour: "sub",
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			break;
		case "mvaginaentrance":
			result.text = `你用你的${arm === "right" ? "右" : "左"}手摩擦着你的<<pussy>>。`;
			if (genitalsExposed()) {
				/* Can't recall the intention for this commented out piece, leaving it in for now in case I recall later */
				if (V.vaginause === 0 /* && ([0, "mvaginaentrance"].includes(V[otherArm + "arm"]) || V[otherArm + "arm"].startsWith("mvagina")) */) {
					if (V.vaginaFingerLimit >= 3 && currentSkillValue("vaginalskill") >= 300) {
						result.options.push({
							action: "mvaginafingerstarttwo",
							text: "放入两根手指",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvagina",
						text: "放入一根手指",
						colour: "sub",
					});
				}
				if (!V.parasite.clit.name) {
					result.options.push({
						action: "mvaginaclit",
						text: "玩弄你的阴蒂",
						colour: "sub",
					});
				} else if (V.parasite.clit.name !== "parasite") {
					result.options.push({
						action: "mvaginaclitparasite",
						text: `玩弄你的阴蒂${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}`,
						colour: "sub",
					});
				}
			}
			result.options.push({
				action: "mvaginarub",
				text: "摩擦你的阴户",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvagina":
			result.text = `你的<<number $fingersInVagina>>${V.fingersInVagina === 1 ? "根手指" : "根手指"}正插在你那<<pussy>>里。${
				V.fingersInVagina === V.vaginaFingerLimit ? "你再也塞不下了。" : ""
			}`;
			if (V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4 && currentSkillValue("vaginalskill") >= 300) {
				result.options.push({
					action: "mvaginafingeraddtwo",
					text: "再放入两根手指",
					colour: "sub",
				});
			}
			if (V.fingersInVagina < V.vaginaFingerLimit) {
				if (V.fingersInVagina === 4) {
					result.options.push({
						action: "mvaginafistadd",
						text: "放入整只手",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginafingeradd",
						text: "再放入一根手指",
						colour: "sub",
					});
				}
			}
			if (V.fingersInVagina >= 1) {
				result.options.push({
					action: "mvaginafingerremove",
					text: "抽出一根手指",
					colour: "sub",
				});
			}
			result.options.push({
				action: "mvaginatease",
				text: "触摸你的小穴",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvaginafist":
			result.text = "你将整只手塞进你的<<pussy>>，你可以感觉到你的拳头正在被紧紧地吸附着。";
			result.options.push({
				action: "mvaginafist",
				text: "对小穴使用拳交",
				colour: "sub",
			});
			result.options.push({
				action: "mvaginafingerremove",
				text: "抽出一根手指",
				colour: "sub",
			});
			if (currentSkillValue("vaginalskill") >= 700) {
				result.options.push({
					action: "mvaginafistremove",
					text: "把手拿出来",
					colour: "sub",
				});
			}
			break;
		case "mvaginaentrancedildo":
			if (!selectedToy(arm)) {
				result.text = `你的${arm === "right" ? "右" : "左"}手是空闲的，因为你没有选择任何玩具。`;
				result.options.push(stop("mvaginastopdildo"));
			} else if (playerChastity("vagina")) {
				result.text = `你的${V.worn.genitals.cn_name_cap}已经被占用了。`;
				result.options.push(stop("mvaginastopdildo"));
			} else {
				result.text = `你用${arm === "right" ? "右" : "左"}手拿着的那个${toyDisplay(selectedToy(arm))}摩擦起你那<<pussy>>。${
					["anal beads", "butt plug"].includes(selectedToy(arm).name) ? "这感觉很不寻常，但你还是很享受它。" : ""
				}`;
				if (genitalsExposed() && !["mvagina", "mvaginadildo"].includes(V[otherArm + "arm"])) {
					result.options.push({
						action: "mvaginadildo",
						text: `把你的${toyDisplay(selectedToy(arm))}推进去`,
						colour: "sub",
					});
				}
				if (V.player.vaginaExist && !playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclitdildo",
							text: "玩弄你的阴蒂",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvaginarubdildo",
						text: "摩擦你的阴户",
						colour: "sub",
					});
				}
				result.options.push(stop("mvaginastopdildo"));
			}
			break;
		case "mvaginadildo":
			result.text = `你用你${arm === "right" ? "右" : "左"}手中的${toyDisplay(selectedToy(arm))}操弄你的小穴。`;
			result.options.push({
				action: "mvaginateasedildo",
				text: "挑逗",
				colour: "sub",
			});
			result.options.push(stop("mvaginastopdildo"));
			break;
		case "manusentrance":
			result.text = `你用你的${arm === "right" ? "右" : "左"}手挑逗你的菊穴。`;
			if (genitalsExposed() && [0, "manus"].includes(V.anususe)) {
				result.options.push({
					action: "manus",
					text: "放入一根手指",
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrub",
				text: "挑逗你的菊穴",
				colour: "sub",
			});
			result.options.push(stop("manusstop"));
			break;
		case "manus":
			result.text = `你用你的${arm === "right" ? "右" : "左"}手挑逗你的菊穴。`;
			result.options.push({
				action: "manustease",
				text: "挑逗",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostate",
					text: "挑逗你的前列腺",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstop"));
			break;
		case "manusentrancedildo":
			result.text = `你用你${arm === "right" ? "右" : "左"}手中的${toyDisplay(selectedToy(arm))}挑逗你的菊穴。`;
			if (genitalsExposed() && !playerChastity("anus")) {
				result.options.push({
					action: "manusdildo",
					text: `把你的${toyDisplay(selectedToy(arm))}推进去`,
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrubdildo",
				text: `用你的${toyDisplay(selectedToy(arm))}挑逗你的菊穴`,
				colour: "sub",
			});
			result.options.push(stop("manusstopdildo"));
			break;
		case "manusdildo":
			result.text = `你用你${arm === "right" ? "右" : "左"}手中的${toyDisplay(selectedToy(arm))}挑逗你的菊穴。`;
			result.options.push({
				action: "manusteasedildo",
				text: "挑逗",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostatedildo",
					text: "挑逗你的前列腺",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstopdildo"));
			break;
		case "mpenisentrancestroker":
			result.text = `你用你${arm === "right" ? "右" : "左"}手中的${toyDisplay(selectedToy(arm))}挑逗你的龟头。`;
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisstroker",
					text: `用你的${toyDisplay(selectedToy(arm))}插入`,
					colour: "sub",
				});
				result.options.push({
					action: "mpenisstrokertease",
					text: `用你的${toyDisplay(selectedToy(arm))}挑弄你的龟头`,
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mpenisstroker":
			result.text = `你的<<penis>>插入了你${arm === "right" ? "右" : "左"}手中的${toyDisplay(selectedToy(arm))}。`;
			result.options.push({
				action: "mpenisstroker",
				text: "自慰",
				colour: "sub",
			});
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mbreastpump":
			result.text = `你握住你的${toyDisplay(selectedToy(arm))}，然后将它抵在了你的<<breasts>>上。`;
			result.options.push({
				action: "mbreastpumppump",
				text: "给你那<<breasts>>挤奶",
				colour: "sub",
			});
			result.options.push(stop("mstopbreastpump"));
			break;
		case "mdildomouthentrance":
			result.text = `你拿着你${arm === "right" ? "右" : "左"}手里的${toyDisplay(selectedToy(arm))}靠近你的嘴巴。`;
			result.options.push({
				action: "mdildomouth",
				text: "插进你的嘴里",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mdildomouth":
			result.text = `你${arm === "right" ? "右" : "左"}手拿着你的${toyDisplay(selectedToy(arm))}插入你的嘴巴。`;
			result.options.push({
				action: "mdildopiston",
				text: "前后移动",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mpickupdildo":
			result.text = `你用你的${arm === "right" ? "右" : "左"}手拿着你的${toyDisplay(selectedToy(arm))}。`;
			if (selectedToy(arm).type.includes("stroker")) {
				if (V.player.penisExist && (V.penisuse === 0 || V.penisuse === "stroker")) {
					result.options.push({
						action: "mpenisentrancestroker",
						text: "移向你的肉棒",
						colour: "sub",
					});
				}
				result.options.push(stop("mpenisstopstroker"));
			} else if (selectedToy(arm).type.includes("breastpump")) {
				if (breastsExposed() && V.player.breastsize >= 1) {
					result.options.push({
						action: "mbreastpump",
						text: "移向你的<<breasts>>",
						colour: "sub",
					});
				}
				result.options.push(stop("mstopbreastpump"));
			} else {
				if (V.player.vaginaExist && V.vaginause === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "mvaginaentrancedildo",
							text: "移向你的小穴",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("vaginalskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "mvaginaentrancedildofloor",
							text: "放在你小穴旁的地面上",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				if (V.anususe === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "manusentrancedildo",
							text: "移向你的菊穴",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("analskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "manusentrancedildofloor",
							text: "放在你菊穴旁的地面上",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				switch (selectedToy(arm).name) {
					case "bullet vibe":
						if (V.player.penisExist && V.penisuse === 0 && !playerChastity("penis")) {
							result.options.push({
								action: "mpenisvibrate",
								text: "按向你的肉棒",
								colour: "sub",
							});
						}
						if (V.player.vaginaExist && !playerChastity("vagina")) {
							if (!V.parasite.clit.name) {
								result.options.push({
									action: "mvaginaclitvibrate",
									text: "按向你的阴蒂",
									colour: "sub",
								});
							} else if (V.parasite.clit.name !== "parasite") {
								result.options.push({
									action: "mvaginaclitvibrateparasite",
									text: `按向你的阴蒂${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}`,
									colour: "sub",
								});
							}
						}
						result.options.push({
							action: "mchestvibrate",
							text: "压向你的乳头",
							colour: "sub",
						});
						break;
					case "small dildo":
					case "dildo":
						if (V.mouth === 0) {
							result.options.push({
								action: "mdildomouthentrance",
								text: "按向你的嘴巴",
								colour: "sub",
							});
							break;
						}
				}
				result.options.push(stop("mdildostop"));
			}
			break;
		case "mballs":
			result.text = `你用你的${arm === "right" ? "右" : "左"}手握住你的${V.ballssize >= 1 ? "一个" : ""}${V.ballsText}。`;
			result.options.push({
				action: "mballsfondle",
				text: "爱抚",
				colour: "sub",
			});
			result.options.push({
				action: "mballssqueeze",
				text: "挤压",
				colour: "sub",
			});
			result.options.push(stop("mballsstop"));
			break;
		case "bound":
			result.text = `你的${arm === "right" ? "右" : "左"}手臂被绑住了。`;
			break;
		case "possessed":
			if (V.lactating && V.breastfeedingdisable === "f" && arm === "right") {
				result.text =
					actiondefault === "mbreastW"
						? `你不自觉地用${arm === "right" ? "右" : "左"}手揉捏和挤压你的<<breasts>>。`
						: `你的${arm === "right" ? "右" : "左"}手悬在你的<<breasts>>上。`;
				result.options.push({
					action: "mbreastW",
					text: "爱抚你的胸部",
					colour: "wraith",
				});
				result.options.push({
					action: "mbreaststopW",
					text: "保持手臂不动",
					colour: "brat",
				});
			} else if (V.player.penisExist && (arm === "left" || !V.player.vaginaExist)) {
				if (V.worn.genitals.name === "chastity parasite") {
					result.text =
						actiondefault === "mpenisW"
							? `你忍不住用${arm === "right" ? "右" : "左"}手挑弄你的贞操锁。`
							: `你的${arm === "right" ? "右" : "左"}手悬在你的贞操锁寄生虫上。`;
					result.options.push({
						action: "mpenisW",
						text: "摩擦寄生虫",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "保持手臂不动",
						colour: "brat",
					});
				} else {
					result.text =
						actiondefault === "mpenisW"
							? `你忍不住用${arm === "right" ? "右" : "左"}手抚摸你的<<penis>>。`
							: `你的${arm === "right" ? "右" : "左"}手悬在你的<<penis>>上。`;
					result.options.push({
						action: "mpenisW",
						text: "撸动肉棒",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "保持手臂不动",
						colour: "brat",
					});
				}
			} else {
				result.text =
					actiondefault === "mvaginaW"
						? `你忍不住用${arm === "right" ? "右" : "左"}手抚摸你的<<pussy>>。`
						: `你的${arm === "right" ? "右" : "左"}手悬在你的<<pussy>>上。`;
				result.options.push({
					action: "mvaginaW",
					text: "爱抚你的小穴",
					colour: "wraith",
				});
				result.options.push({
					action: "mvaginastopW",
					text: "保持手臂不动",
					colour: "brat",
				});
			}
			break;
		default:
			break;
	}

	if (V[arm + "arm"] !== "bound") {
		if (V.worn.over_upper.exposed <= 1) result.options.push({ action: "moverupper", text: `拉开你的${V.worn.over_upper.cn_name_cap}` });
		if (V.worn.upper.exposed <= 1) result.options.push({ action: "mupper", text: `拉开你的${V.worn.upper.cn_name_cap}` });
		if (V.worn.under_upper.exposed <= 0) result.options.push({ action: "munder_upper", text: `拉开你的${V.worn.under_upper.cn_name_cap}` });

		if (V.worn.over_lower.exposed <= 1) result.options.push({ action: "moverlower", text: `拉开你的${V.worn.over_lower.cn_name_cap}` });
		if (V.worn.lower.exposed <= 1) result.options.push({ action: "mlower", text: `拉开你的${V.worn.lower.cn_name_cap}` });

		if (
			V.worn.under_lower.exposed <= 0 &&
			(V.worn.lower.state !== setup.clothes.lower[clothesIndex("lower", V.worn.lower)].state_base ||
				setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1 ||
				V.worn.lower.type.includes("naked"))
		) {
			result.options.push({ action: "munder", text: `拉下${V.worn.under_lower.cn_name_cap}` });
		}
	}

	if (!V.possessed) result.options.push({ action: "mrest", text: "休息" });

	return result;
}

function masturbationActionsMouth({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "mouthaction",
	};

	if (!(V.moorPhallusPlant || V.awareness >= 200 || V.mouth !== 0)) return result;

	const stop = action => {
		return {
			action,
			text: "移开你的嘴巴",
		};
	};
	const rest = () => {
		return {
			action: "mrest",
			text: "休息",
		};
	};

	const corruptionCheck = V.corruptionMasturbation && V.awareness < 200;
	const awarenessCheck = V.corruptionMasturbation || V.awareness >= 200;

	const hasAphrodisiac = !!listUniqueCarriedSextoys().find(item => item.type.includes("aphrodisiacpill"));

	switch (V.mouth) {
		case 0:
			result.text = "你的嘴巴是空闲着的。";
			if (V.awareness >= 200) {
				if (hasAphrodisiac) {
					result.options.push({
						action: "maphropill",
						text: "吞服一片催情剂",
						otherElements: "<<combataware 3>>",
					});
				}
				if (genitalsExposed()) {
					if (V.canSelfSuckPenis && V.penisuse === 0) {
						if (V.worn.genitals.name === "chastity parasite") {
							result.options.push({
								action: "mchastityparasiteentrance",
								text: "舔舐你的贞操锁寄生虫",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						} else {
							result.options.push({
								action: "mpenisentrance",
								text: "舔舐你的肉棒",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						}
					}
					if (V.canSelfSuckVagina && V.vaginause === 0 && V.fingersInVagina === 0) {
						result.options.push({
							action: "mvaginaentrance",
							text: "舔舐你的小穴",
							colour: "sub",
							otherElements: "<<combataware 3>>",
						});
					}
				}
			}
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerlick",
					text: "舔舐那阳具植物",
					colour: "sub",
				});
			}
			if (result.options.length) result.options.push(rest());
			break;
		case "mpenisentrance":
			result.text = corruptionCheck
				? '<span class="red">耳中史莱姆强迫你把嘴放在自己的阴茎前面。</span>'
				: "你的嘴在你的阴茎前。";
			if (awarenessCheck) {
				result.options.push({
					action: "mpenislick",
					text: "舔舐你的肉棒",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				result.options.push({
					action: "mpenistakein",
					text: "把它插入你的嘴里",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mpenisstop"));
			result.options.push(rest());
			break;
		case "mchastityparasiteentrance":
			result.text = corruptionCheck
				? '<span class="red">耳中史莱姆强迫你把嘴靠近贞操锁寄生虫。</span>'
				: "你的嘴在贞操锁寄生虫前方。";
			if (awarenessCheck) {
				result.options.push({
					action: "mchastityparasitelick",
					text: "舔舐你的贞操锁寄生虫",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			result.options.push(rest());
			break;
		case "mvaginaentrance":
			result.text = corruptionCheck
				? '<span class="red">耳中史莱姆强迫你舔自己的阴部。</span>'
				: "你的嘴在你的小穴前。";
			if (awarenessCheck) {
				result.options.push({
					action: "mvaginalick",
					text: "舔舐你的小穴",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (!playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclit",
							text: "专注于你的阴蒂",
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					} else if (V.parasite.clit.name !== "parasite") {
						result.options.push({
							action: "mvaginaclitparasite",
							text: `专注于你的阴蒂${V.parasite.clit.name.replace("urchin", "海胆").replace("slime", "史莱姆").replace("maggot", "蛆虫").replace("none", "无")}`,
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					}
				}
			}
			result.options.push(stop("mvaginastop"));
			break;
		case "mpenis":
			result.text = corruptionCheck
				? '<span class="red">耳中史莱姆强迫你吮吸自己的阴茎。</span>'
				: "你在吮吸你的阴茎。";
			if (V.selfsuckDepth === V.selfsuckLimit) {
				result.text += `你把它整个放入了你的嘴巴${V.selfsuckDepth >= 2 ? "和喉咙" : ""}里。`;
			} else {
				switch (V.selfsuckDepth) {
					case 0:
						result.text += "你用嘴巴含住它的头部。";
						break;
					case 1:
						result.text += "它的头部抵到你的嘴巴深处。";
						break;
					case 2:
						result.text += "你把它的头部深入你的喉咙。";
						break;
					default:
						/* Max selfsuckDepth is 3 and is captured by the above condition */
						result.text += '<span class="red">Error: 不可能的情况。</span>';
						break;
				}
			}
			if (awarenessCheck) {
				result.options.push({
					action: "mpenissuck",
					text: "吸吮你的肉棒",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (V.selfsuckDepth < V.selfsuckLimit) {
					result.options.push({
						action: "mpenisdeepthroat",
						text: "更加深入",
						colour: "sub",
						otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
					});
				}
			}
			if (V.selfsuckDepth >= 1) {
				result.options.push({
					action: "mpenispullback",
					text: "拉出来",
				});
			} else {
				result.options.push({
					action: "mpenismouthoff",
					text: "把你的嘴从它上面拿开",
				});
			}
			if (V.selfsuckDepth <= 1) result.options.push(stop("mpenisstop"));
			break;
		case "mdildomouthentrance":
			result.text = `你的${
				V.leftarm === "mdildomouthentrance" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))
			}在你嘴边。`;
			result.options.push({
				action: "mdildolick",
				text: "舔舐",
				colour: "sub",
			});
			result.options.push({
				action: "mdildokiss",
				text: "亲吻",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mdildomouth":
			result.text = `你的${V.leftarm === "mdildomouth" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))}已经塞进了嘴里。`;
			result.options.push({
				action: "mdildolick",
				text: "舔舐",
				colour: "sub",
			});
			result.options.push({
				action: "mdildosuck",
				text: "吮吸",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mpenisflowerlick":
			result.text = "你舔舐着那阳具植物。";
			result.options.push({
				action: "mpenisflowerlick",
				text: "舔舐",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowertakein",
				text: "把它插入你的嘴里",
				colour: "sub",
				otherElements: "<<oralvirginitywarning>>",
			});
			result.options.push(stop("mpenisflowerstop"));
			break;
		case "mpenisflowersuck":
			result.text = "你吮吸着那阳具植物。";
			result.options.push({
				action: "mpenisflowersuck",
				text: "吮吸",
				colour: "sub",
			});
			result.options.push(stop("mpenisflowersuckstop"));
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsVagina({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "vaginaaction",
	};

	if (!V.player.vaginaExist || playerChastity("vagina")) return result;

	switch (V.vaginause) {
		case 0:
			result.text = `你的小穴目前${genitalsExposed() ? "可用" : "可用，但被衣服盖住了"}。`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "摩擦那阳具植物",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "休息",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `你用你的${genitalsExposed() ? "小穴" : "裆部"}摩擦那阳具植物。`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "摩擦那阳具植物",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "俯身趴在阳具植物上",
					colour: "sub",
					otherElements: "<<vaginalvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `移开你的${genitalsExposed() ? "小穴" : "裆部"}`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "你用你的小穴上下操弄着那阳具植物。";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "骑上那阳具植物",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "移开你的小穴",
			});
			break;
		case "mdildopenetrate":
			result.text = `你用你的小穴上下操弄着${toyDisplay(selectedToy("vagina"))}。`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `骑乘${toyDisplay(selectedToy("vagina"))}`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "移开你的小穴",
			});
			result.options.push({
				action: "mrest",
				text: "休息",
			});
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsAnus({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "anusaction",
	};

	if (playerChastity("anus")) return result;

	switch (V.anususe) {
		case 0:
			result.text = `你的${genitalsExposed() ? "肛门" : "屁股"}目前${genitalsExposed() ? "可用" : "可用，但被衣服盖住了"}。`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "摩擦那阳具植物",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "休息",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `你用你的${genitalsExposed() ? "菊穴" : "屁股"}摩擦着那阳具植物。`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "摩擦那阳具植物",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "俯身趴在阳具植物上",
					colour: "sub",
					otherElements: "<<analvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `移开你的${genitalsExposed() ? "菊穴" : "屁股"}`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "你用你的菊穴上下操弄着那阳具植物。";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "骑上那阳具植物",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "移开你的菊穴",
			});
			break;
		case "mdildopenetrate":
			result.text = `你用你的菊穴上下操弄着${toyDisplay(selectedToy("anus"))}。`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `骑乘${toyDisplay(selectedToy("anus"))}`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "移开你的菊穴",
			});
			result.options.push({
				action: "mrest",
				text: "休息",
			});
			break;
		default:
			break;
	}

	return result;
}

Macro.add("masturbationactions", {
	handler() {
		const fragment = masturbationActions();
		this.output.append(fragment);
	},
});







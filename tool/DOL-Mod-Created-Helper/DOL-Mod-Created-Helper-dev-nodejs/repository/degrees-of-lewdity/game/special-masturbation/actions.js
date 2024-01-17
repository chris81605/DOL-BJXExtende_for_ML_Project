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
		if (toy1 && toy2) return (toy1.colour ? toy1.colour + " " : "") + toy1.name + " and " + (toy2.colour ? toy2.colour + " " : "") + toy2.name;
		if (toy1) return (toy1.colour ? toy1.colour + " " : "") + toy1.name;
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
			text: "Move your hand away",
		};
	};

	const actiondefault = arm + "actiondefault";
	const otherArm = arm === "left" ? "right" : "left";
	const altText = {};

	switch (V[arm + "arm"]) {
		case 0:
			result.text = `Your ${arm} hand is free.`;
			if (V.player.penisExist) {
				if (
					(V.awareness >= 400 || V.earSlime.event.includes("get your own sperm into your")) &&
					V.masturbationorgasmsemen >= 1 &&
					V[arm + "FingersSemen"] !== 1
				) {
					result.options.push({
						action: "msemencover",
						text: "Cover your fingers in semen",
						colour: "sub",
						otherElements: V.earSlime.event.includes("get your own sperm into your") ? undefined : "<<combataware 5>>",
					});
				}
				if (!playerChastity("penis")) {
					result.options.push({
						action: "mpenisentrance",
						text: V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "Fondle your parasitic penis" : "Fondle your penis",
						colour: "sub",
					});
				} else if (V.worn.genitals.name === "chastity parasite") {
					result.options.push({
						action: "mchastityparasiteentrance",
						text: "Fondle your chastity parasite",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mchastity",
						text:
							V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "Try to fondle your parasitic penis" : "Try to fondle your penis",
						colour: "sub",
					});
				}
				if (V.player.ballsExist && ballsExposed() && V.ballssize >= -1 && (V.ballssize >= 1 || V[otherArm + "arm"] !== "mballs")) {
					result.options.push({
						action: "mballsentrance",
						text: "Fondle your balls",
						colour: "sub",
					});
				}
			}
			if (V.player.vaginaExist) {
				if (!playerChastity("vagina")) {
					result.options.push({
						action: "mvaginaentrance",
						text: "Fondle your pussy",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mchastity",
						text: "Try to fondle your pussy",
						colour: "sub",
					});
				}
			}
			if (V.awareness >= 100) {
				result.options.push({
					action: "mchest",
					text: "Fondle your chest",
					colour: "sub",
					otherElements: "<<combataware 2>>",
				});
			}
			if (V.awareness >= 200) {
				if (!playerChastity("anus")) {
					result.options.push({
						action: "manusentrance",
						text: "Stroke your anus",
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (["home", "brothel", "cafe"].includes(V.location) || T.enableSexToys) {
					altText.toyDropDown = toyDropDown();
					if (altText.toyDropDown) {
						result.options.push({
							action: "mpickupdildo",
							text: "Use Toy:",
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
						text: "Use Breast Pump:",
						colour: "green",
						otherElements: `${altText.toyDropDown}`,
					});
				}
			}
			break;
		case "mpenisentrance":
			result.text = `You hold your <<penis>> ${V.player.penissize >= 0 ? `in your ${arm} hand.` : `with your ${arm} thumb and fingers.`}`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mpenisglans",
					text: "Fondle the glans",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis" && V.selfsuckDepth === V.penisHeight)) {
				result.options.push({
					action: "mpenisshaft",
					text: "Rub the shaft",
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstop"));
			break;
		case "mchastityparasiteentrance":
			result.text = `You hold your chastity parasite ${V.player.penissize >= 2 ? `in your ${arm} hand.` : `with your ${arm} thumb and fingers.`}`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mchastityparasiterub",
					text: "Rub the parasite",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis")) {
				result.options.push({
					action: "mchastityparasitesqueeze",
					text: "Squeeze the parasite",
					colour: "sub",
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			break;
		case "mvaginaentrance":
			result.text = `You rub your <<pussy>> with your ${arm} hand.`;
			if (genitalsExposed()) {
				/* Can't recall the intention for this commented out piece, leaving it in for now in case I recall later */
				if (V.vaginause === 0 /* && ([0, "mvaginaentrance"].includes(V[otherArm + "arm"]) || V[otherArm + "arm"].startsWith("mvagina")) */) {
					if (V.vaginaFingerLimit >= 3 && currentSkillValue("vaginalskill") >= 300) {
						result.options.push({
							action: "mvaginafingerstarttwo",
							text: "Push two fingers in",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvagina",
						text: "Push a finger in",
						colour: "sub",
					});
				}
				if (!V.parasite.clit.name) {
					result.options.push({
						action: "mvaginaclit",
						text: "Play with your clit",
						colour: "sub",
					});
				} else if (V.parasite.clit.name !== "parasite") {
					result.options.push({
						action: "mvaginaclitparasite",
						text: `Play with the clitoral ${V.parasite.clit.name}`,
						colour: "sub",
					});
				}
			}
			result.options.push({
				action: "mvaginarub",
				text: "Rub your vulva",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvagina":
			result.text = `You have <<number $fingersInVagina>> ${V.fingersInVagina === 1 ? "finger" : "fingers"} in your <<pussy>>.${
				V.fingersInVagina === V.vaginaFingerLimit ? " You cannot fit any more." : ""
			}`;
			if (V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4 && currentSkillValue("vaginalskill") >= 300) {
				result.options.push({
					action: "mvaginafingeraddtwo",
					text: "Push another two fingers in",
					colour: "sub",
				});
			}
			if (V.fingersInVagina < V.vaginaFingerLimit) {
				if (V.fingersInVagina === 4) {
					result.options.push({
						action: "mvaginafistadd",
						text: "Push your hand in",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginafingeradd",
						text: "Push another finger in",
						colour: "sub",
					});
				}
			}
			if (V.fingersInVagina >= 1) {
				result.options.push({
					action: "mvaginafingerremove",
					text: "Take one finger out",
					colour: "sub",
				});
			}
			result.options.push({
				action: "mvaginatease",
				text: "Finger your vagina",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvaginafist":
			result.text = "Your entire hand is inside your <<pussy>>. You can feel the tightness around your fist.";
			result.options.push({
				action: "mvaginafist",
				text: "Fist your vagina",
				colour: "sub",
			});
			result.options.push({
				action: "mvaginafingerremove",
				text: "Take one finger out",
				colour: "sub",
			});
			if (currentSkillValue("vaginalskill") >= 700) {
				result.options.push({
					action: "mvaginafistremove",
					text: "Pull your hand out",
					colour: "sub",
				});
			}
			break;
		case "mvaginaentrancedildo":
			if (!selectedToy(arm)) {
				result.text = `Your ${arm} hand is free as you do not have a toy selected.`;
				result.options.push(stop("mvaginastopdildo"));
			} else if (playerChastity("vagina")) {
				result.text = `Your ${V.worn.genitals.name} is in the way.`;
				result.options.push(stop("mvaginastopdildo"));
			} else {
				result.text = `You rub your <<pussy>> with the ${toyDisplay(selectedToy(arm))} in your ${arm} hand.${
					["anal beads", "butt plug"].includes(selectedToy(arm).name) ? " It feels unusual, but you enjoy it anyway." : ""
				}`;
				if (genitalsExposed() && !["mvagina", "mvaginadildo"].includes(V[otherArm + "arm"])) {
					result.options.push({
						action: "mvaginadildo",
						text: `Push your ${toyDisplay(selectedToy(arm))} in`,
						colour: "sub",
					});
				}
				if (V.player.vaginaExist && !playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclitdildo",
							text: "Play with your clit",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvaginarubdildo",
						text: "Rub your vulva",
						colour: "sub",
					});
				}
				result.options.push(stop("mvaginastopdildo"));
			}
			break;
		case "mvaginadildo":
			result.text = `You fuck your pussy with the ${toyDisplay(selectedToy(arm))} in your ${arm} hand.`;
			result.options.push({
				action: "mvaginateasedildo",
				text: "Tease",
				colour: "sub",
			});
			result.options.push(stop("mvaginastopdildo"));
			break;
		case "manusentrance":
			result.text = `You tease your anus with your ${arm} hand.`;
			if (genitalsExposed() && [0, "manus"].includes(V.anususe)) {
				result.options.push({
					action: "manus",
					text: "Push a finger in",
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrub",
				text: "Tease your anus",
				colour: "sub",
			});
			result.options.push(stop("manusstop"));
			break;
		case "manus":
			result.text = `You tease your anus with your ${arm} hand.`;
			result.options.push({
				action: "manustease",
				text: "Tease",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostate",
					text: "Tease your prostate",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstop"));
			break;
		case "manusentrancedildo":
			result.text = `You tease your anus with the ${toyDisplay(selectedToy(arm))} your ${arm} hand.`;
			if (genitalsExposed() && !playerChastity("anus")) {
				result.options.push({
					action: "manusdildo",
					text: `Push your ${toyDisplay(selectedToy(arm))} in`,
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrubdildo",
				text: `Tease your anus with your ${toyDisplay(selectedToy(arm))}`,
				colour: "sub",
			});
			result.options.push(stop("manusstopdildo"));
			break;
		case "manusdildo":
			result.text = `You tease your anus with the ${toyDisplay(selectedToy(arm))} in your ${arm} hand.`;
			result.options.push({
				action: "manusteasedildo",
				text: "Tease",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostatedildo",
					text: "Tease your prostate",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstopdildo"));
			break;
		case "mpenisentrancestroker":
			result.text = `You tease your glans with the ${toyDisplay(selectedToy(arm))} your ${arm} hand.`;
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisstroker",
					text: `Penetrate your ${toyDisplay(selectedToy(arm))}`,
					colour: "sub",
				});
				result.options.push({
					action: "mpenisstrokertease",
					text: `Tease your glans with your ${toyDisplay(selectedToy(arm))}`,
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mpenisstroker":
			result.text = `Your <<penis>> penetrates the ${toyDisplay(selectedToy(arm))} in your ${arm} hand.`;
			result.options.push({
				action: "mpenisstroker",
				text: "Masturbate",
				colour: "sub",
			});
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mbreastpump":
			result.text = `You hold your ${toyDisplay(selectedToy(arm))} against your <<breasts>>.`;
			result.options.push({
				action: "mbreastpumppump",
				text: "Milk your <<breasts>>",
				colour: "sub",
			});
			result.options.push(stop("mstopbreastpump"));
			break;
		case "mdildomouthentrance":
			result.text = `Your ${toyDisplay(selectedToy(arm))} is in your ${arm} hand by your mouth.`;
			result.options.push({
				action: "mdildomouth",
				text: "Push into your mouth",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mdildomouth":
			result.text = `Your ${arm} hand is holding your ${toyDisplay(selectedToy(arm))} in your mouth.`;
			result.options.push({
				action: "mdildopiston",
				text: "Move it back and forward",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mpickupdildo":
			result.text = `You hold your ${toyDisplay(selectedToy(arm))} in your ${arm} hand.`;
			if (selectedToy(arm).type.includes("stroker")) {
				if (V.player.penisExist && (V.penisuse === 0 || V.penisuse === "stroker")) {
					result.options.push({
						action: "mpenisentrancestroker",
						text: "Move to your penis",
						colour: "sub",
					});
				}
				result.options.push(stop("mpenisstopstroker"));
			} else if (selectedToy(arm).type.includes("breastpump")) {
				if (breastsExposed() && V.player.breastsize >= 1) {
					result.options.push({
						action: "mbreastpump",
						text: "Move to your <<breasts>>",
						colour: "sub",
					});
				}
				result.options.push(stop("mstopbreastpump"));
			} else {
				if (V.player.vaginaExist && V.vaginause === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "mvaginaentrancedildo",
							text: "Move to your vagina",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("vaginalskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "mvaginaentrancedildofloor",
							text: "Place on the floor by your vagina",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				if (V.anususe === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "manusentrancedildo",
							text: "Move to your anus",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("analskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "manusentrancedildofloor",
							text: "Place on the floor by your anus",
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
								text: "Hold against your penis",
								colour: "sub",
							});
						}
						if (V.player.vaginaExist && !playerChastity("vagina")) {
							if (!V.parasite.clit.name) {
								result.options.push({
									action: "mvaginaclitvibrate",
									text: "Hold against your clit",
									colour: "sub",
								});
							} else if (V.parasite.clit.name !== "parasite") {
								result.options.push({
									action: "mvaginaclitvibrateparasite",
									text: `Hold against the clitoral ${V.parasite.clit.name}`,
									colour: "sub",
								});
							}
						}
						result.options.push({
							action: "mchestvibrate",
							text: "Press against a nipple",
							colour: "sub",
						});
						break;
					case "small dildo":
					case "dildo":
						if (V.mouth === 0) {
							result.options.push({
								action: "mdildomouthentrance",
								text: "Hold against your mouth",
								colour: "sub",
							});
							break;
						}
				}
				result.options.push(stop("mdildostop"));
			}
			break;
		case "mballs":
			result.text = `You hold ${V.ballssize >= 1 ? "one of " : ""} your ${V.ballsText} with your ${arm} hand.`;
			result.options.push({
				action: "mballsfondle",
				text: "Fondle",
				colour: "sub",
			});
			result.options.push({
				action: "mballssqueeze",
				text: "Squeeze",
				colour: "sub",
			});
			result.options.push(stop("mballsstop"));
			break;
		case "bound":
			result.text = `Your ${arm} arm is bound.`;
			break;
		case "possessed":
			if (V.lactating && V.breastfeedingdisable === "f" && arm === "right") {
				result.text =
					actiondefault === "mbreastW"
						? `You pinch and squeeze your <<breasts>> with your ${arm} hand, unbidden.`
						: `Your ${arm} hand hovers over your <<breasts>>.`;
				result.options.push({
					action: "mbreastW",
					text: "Fondle your chest",
					colour: "wraith",
				});
				result.options.push({
					action: "mbreaststopW",
					text: "Hold your arm still",
					colour: "brat",
				});
			} else if (V.player.penisExist && (arm === "left" || !V.player.vaginaExist)) {
				if (V.worn.genitals.name === "chastity parasite") {
					result.text =
						actiondefault === "mpenisW"
							? `You tease your chastity with your ${arm} hand, unbidden.`
							: `Your ${arm} hand hovers over your chastity parasite.`;
					result.options.push({
						action: "mpenisW",
						text: "Rub the parasite",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "Hold your arm still",
						colour: "brat",
					});
				} else {
					result.text =
						actiondefault === "mpenisW"
							? `You stroke your <<penis>> with your ${arm} hand, unbidden.`
							: `Your ${arm} hand hovers over your <<penis>>.`;
					result.options.push({
						action: "mpenisW",
						text: "Rub the shaft",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "Hold your arm still",
						colour: "brat",
					});
				}
			} else {
				result.text =
					actiondefault === "mvaginaW"
						? `You stroke your <<pussy>> with your ${arm} hand, unbidden.`
						: `Your ${arm} hand hovers over your <<pussy>>.`;
				result.options.push({
					action: "mvaginaW",
					text: "Fondle your vagina",
					colour: "wraith",
				});
				result.options.push({
					action: "mvaginastopW",
					text: "Hold your arm still",
					colour: "brat",
				});
			}
			break;
		default:
			break;
	}

	if (V[arm + "arm"] !== "bound") {
		if (V.worn.over_upper.exposed <= 1) result.options.push({ action: "moverupper", text: `Displace your ${V.worn.over_upper.name}` });
		if (V.worn.upper.exposed <= 1) result.options.push({ action: "mupper", text: `Displace your ${V.worn.upper.name}` });
		if (V.worn.under_upper.exposed <= 0) result.options.push({ action: "munder_upper", text: `Displace your ${V.worn.under_upper.name}` });

		if (V.worn.over_lower.exposed <= 1) result.options.push({ action: "moverlower", text: `Displace your ${V.worn.over_lower.name}` });
		if (V.worn.lower.exposed <= 1) result.options.push({ action: "mlower", text: `Displace your ${V.worn.lower.name}` });

		if (
			V.worn.under_lower.exposed <= 0 &&
			(V.worn.lower.state !== setup.clothes.lower[clothesIndex("lower", V.worn.lower)].state_base ||
				setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1 ||
				V.worn.lower.type.includes("naked"))
		) {
			result.options.push({ action: "munder", text: `Pull down your ${V.worn.under_lower.name}` });
		}
	}

	if (!V.possessed) result.options.push({ action: "mrest", text: "Rest" });

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
			text: "Move your mouth away",
		};
	};
	const rest = () => {
		return {
			action: "mrest",
			text: "Rest",
		};
	};

	const corruptionCheck = V.corruptionMasturbation && V.awareness < 200;
	const awarenessCheck = V.corruptionMasturbation || V.awareness >= 200;

	const hasAphrodisiac = !!listUniqueCarriedSextoys().find(item => item.type.includes("aphrodisiacpill"));

	switch (V.mouth) {
		case 0:
			result.text = "Your mouth is free.";
			if (V.awareness >= 200) {
				if (hasAphrodisiac) {
					result.options.push({
						action: "maphropill",
						text: "Swallow an aphrodisiac pill",
						otherElements: "<<combataware 3>>",
					});
				}
				if (genitalsExposed()) {
					if (V.canSelfSuckPenis && V.penisuse === 0) {
						if (V.worn.genitals.name === "chastity parasite") {
							result.options.push({
								action: "mchastityparasiteentrance",
								text: "Lick your chastity parasite",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						} else {
							result.options.push({
								action: "mpenisentrance",
								text: "Lick your penis",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						}
					}
					if (V.canSelfSuckVagina && V.vaginause === 0 && V.fingersInVagina === 0) {
						result.options.push({
							action: "mvaginaentrance",
							text: "Lick your pussy",
							colour: "sub",
							otherElements: "<<combataware 3>>",
						});
					}
				}
			}
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerlick",
					text: "Lick the phallus plant",
					colour: "sub",
				});
			}
			if (result.options.length) result.options.push(rest());
			break;
		case "mpenisentrance":
			result.text = corruptionCheck
				? '<span class="red">The slime in your ear is forcing your mouth to be in front of your penis.</span>'
				: "Your mouth is in front of your penis.";
			if (awarenessCheck) {
				result.options.push({
					action: "mpenislick",
					text: "Lick your penis",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				result.options.push({
					action: "mpenistakein",
					text: "Take it into your mouth",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mpenisstop"));
			result.options.push(rest());
			break;
		case "mchastityparasiteentrance":
			result.text = corruptionCheck
				? '<span class="red">The slime in your ear is forcing your mouth to be in front of your chastity parasite.</span>'
				: "Your mouth is in front of your chastity parasite.";
			if (awarenessCheck) {
				result.options.push({
					action: "mchastityparasitelick",
					text: "Lick your chastity parasite",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			result.options.push(rest());
			break;
		case "mvaginaentrance":
			result.text = corruptionCheck
				? '<span class="red">The slime in your ear is forcing you to lick your pussy.</span>'
				: "Your mouth is in front of your pussy.";
			if (awarenessCheck) {
				result.options.push({
					action: "mvaginalick",
					text: "Lick your pussy",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (!playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclit",
							text: "Focus on your clit",
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					} else if (V.parasite.clit.name !== "parasite") {
						result.options.push({
							action: "mvaginaclitparasite",
							text: `Focus on the clitoral ${V.parasite.clit.name}`,
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
				? '<span class="red">The slime in your ear is forcing you to suck on your penis.</span>'
				: "You're sucking on your penis.";
			if (V.selfsuckDepth === V.selfsuckLimit) {
				result.text += `You have the whole thing in your mouth${V.selfsuckDepth >= 2 ? " and throat" : ""}.`;
			} else {
				switch (V.selfsuckDepth) {
					case 0:
						result.text += "You have the head in your mouth.";
						break;
					case 1:
						result.text += "The head reaches the back of your mouth.";
						break;
					case 2:
						result.text += "You have the head in your throat.";
						break;
					default:
						/* Max selfsuckDepth is 3 and is captured by the above condition */
						result.text += '<span class="red">Error: Impossible condition.</span>';
						break;
				}
			}
			if (awarenessCheck) {
				result.options.push({
					action: "mpenissuck",
					text: "Suck on your penis",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (V.selfsuckDepth < V.selfsuckLimit) {
					result.options.push({
						action: "mpenisdeepthroat",
						text: "Take it deeper",
						colour: "sub",
						otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
					});
				}
			}
			if (V.selfsuckDepth >= 1) {
				result.options.push({
					action: "mpenispullback",
					text: "Pull back",
				});
			} else {
				result.options.push({
					action: "mpenismouthoff",
					text: "Take your mouth off it",
				});
			}
			if (V.selfsuckDepth <= 1) result.options.push(stop("mpenisstop"));
			break;
		case "mdildomouthentrance":
			result.text = `Your ${
				V.leftarm === "mdildomouthentrance" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))
			} is in front of your mouth.`;
			result.options.push({
				action: "mdildolick",
				text: "Lick",
				colour: "sub",
			});
			result.options.push({
				action: "mdildokiss",
				text: "Kiss",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mdildomouth":
			result.text = `Your ${V.leftarm === "mdildomouth" ? toyDisplay(selectedToy("left")) : toyDisplay(selectedToy("right"))} is inside of your mouth.`;
			result.options.push({
				action: "mdildolick",
				text: "Lick",
				colour: "sub",
			});
			result.options.push({
				action: "mdildosuck",
				text: "Suck",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mpenisflowerlick":
			result.text = "You're licking the phallus plant.";
			result.options.push({
				action: "mpenisflowerlick",
				text: "Lick",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowertakein",
				text: "Take it into your mouth",
				colour: "sub",
				otherElements: "<<oralvirginitywarning>>",
			});
			result.options.push(stop("mpenisflowerstop"));
			break;
		case "mpenisflowersuck":
			result.text = "You're sucking on the phallus plant.";
			result.options.push({
				action: "mpenisflowersuck",
				text: "Suck",
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
			result.text = `Your pussy is ${genitalsExposed() ? "free" : "free, but clothed"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "Rub against the phallus plant",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "Rest",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `You're rubbing your ${genitalsExposed() ? "pussy" : "crotch"} against the phallus plant.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "Rub against the phallus plant",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "Lower yourself onto the phallus plant",
					colour: "sub",
					otherElements: "<<vaginalvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `Move your ${genitalsExposed() ? "pussy" : "crotch"} away`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "You're bouncing on the phallus plant with your vagina.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "Ride the phallus plant",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "Move your pussy away",
			});
			break;
		case "mdildopenetrate":
			result.text = `You're bouncing on the ${toyDisplay(selectedToy("vagina"))} with your vagina.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `Ride the ${toyDisplay(selectedToy("vagina"))}`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "Move your pussy away",
			});
			result.options.push({
				action: "mrest",
				text: "Rest",
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
			result.text = `Your ${genitalsExposed() ? "anus" : "ass"} is ${genitalsExposed() ? "free" : "free, but clothed"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "Rub against the phallus plant",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "Rest",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `You're rubbing your ${genitalsExposed() ? "anus" : "ass"} against the phallus plant.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "Rub against the phallus plant",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "Lower yourself onto the phallus plant",
					colour: "sub",
					otherElements: "<<analvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `Move your ${genitalsExposed() ? "anus" : "ass"} away`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "You're bouncing on the phallus plant with your anus.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "Ride the phallus plant",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "Move your anus away",
			});
			break;
		case "mdildopenetrate":
			result.text = `You're bouncing on the ${toyDisplay(selectedToy("anus"))} with your anus.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `Ride the ${toyDisplay(selectedToy("anus"))}`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "Move your anus away",
			});
			result.options.push({
				action: "mrest",
				text: "Rest",
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


/* eslint-disable eqeqeq */
/* eslint-disable jsdoc/require-description-complete-sentence */
function overlayShowHide(elementId) {
	const div = document.getElementById(elementId);
	if (div != null) {
		div.classList.toggle("hidden");
		if (elementId === "debugOverlay") {
			V.debugMenu[0] = !V.debugMenu[0];
		}
	}
	window.cacheDebugDiv();
}
window.overlayShowHide = overlayShowHide;

function overlayMenu(elementId, type) {
	if (type === "debug") {
		window.toggleClassDebug(elementId + "Button", "bg-color");
		V.debugMenu[1] = elementId;
		if (document.getElementById(elementId) != null) {
			if (V.debugMenu[2].length > 0) window.toggleClassDebug(elementId, "hideWhileSearching");
			else window.toggleClassDebug(elementId, "classicHide");
		}
		if ((elementId === "debugFavourites" || elementId === "debugAdd") && V.debugMenu[2] != null && V.debugMenu[2].length > 0) {
			V.debugMenu[2] = "";
			document.getElementById("searchEvents").value = "";
			window.researchEvents("");
		}
		if (elementId === "debugFavourites") {
			window.patchDebugMenu();
		}
	}
	window.cacheDebugDiv();
}
window.overlayMenu = overlayMenu;

/* Sidebar swipe */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
	return (
		evt.touches || // browser API
		evt.originalEvent.touches // jQuery
	);
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	/**
	 * Activate the swipe only when finger near the UI Bar.
	 * 50px - +/- width of unstowed UI Bar
	 * 280px - +/- width of unstowed UI bar
	 */
	if (UIBar.isStowed()) {
		if (xDown > 50) {
			return;
		}
	} else {
		if (xDown > 280) {
			return;
		}
	}

	const xUp = evt.touches[0].clientX;
	const yUp = evt.touches[0].clientY;

	const xDiff = xDown - xUp;
	const yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		// most significant
		if (xDiff > 0) {
			UIBar.stow(); // left swipe
		} else {
			UIBar.unstow(); // right swipe
		}
	} else {
		if (yDiff > 0) {
			// up swipe
		} else {
			// down swipe
		}
	}
	// reset values
	xDown = null;
	yDown = null;
}

//Links.disableNumberifyInVisibleElements.push("#passage-testing-room");

$(document).on(":passagerender", function (ev) {

	if (passage() === "GiveBirth") {
		$(ev.content)
			.find("[type=checkbox]")
			.on("propertychange change", function () {
				Wikifier.wikifyEval("<<resetPregButtons>>");
				Links.generateLinkNumbers(ev.content);
			});
	}
});

function ensureIsArray(x, check = false) {
	if (check) x = x != null ? x : [];
	if (Array.isArray(x)) return x;
	return [x];
}
window.ensureIsArray = ensureIsArray;

// feats related widgets
// This needs updating, it's poorly designed.
function closeFeats(id) {
	const div1 = document.getElementById("feat-" + id);
	const div2 = document.getElementById("closeFeat-" + id);
	div1.style.display = "none";
	div2.style.display = "none";
	let otherFeatDisplay;
	let elementId = id + 1;
	let newId = parseInt(div1.classList.value.replace("feat feat", ""));
	do {
		otherFeatDisplay = document.getElementById("feat-" + elementId);
		if (otherFeatDisplay) {
			if (otherFeatDisplay.style.display !== "none" && !isNaN(newId)) {
				otherFeatDisplay.removeAttribute("class");
				otherFeatDisplay.classList.add("feat");
				otherFeatDisplay.classList.add("feat" + newId);
				otherFeatDisplay.classList.add("feat-overlay");
				if (newId >= 3) {
					otherFeatDisplay.classList.add("hiddenFeat");
				}
				newId++;
			}
			elementId++;
		}
	} while (otherFeatDisplay);
}
window.closeFeats = closeFeats;

function getTimeNumber(t) {
	const time = new Date(t);
	const result = time.getTime();
	if (isNaN(result)) {
		return 999999999999999;
	}
	return result;
}
window.getTimeNumber = getTimeNumber;

function extendStats() {
	V.extendedStats = !V.extendedStats;
	const captionDiv = document.getElementById("storyCaptionDiv");
	if (captionDiv === null) return;
	if (V.extendedStats === true) {
		captionDiv.classList.add("statsExtended");
	} else {
		captionDiv.classList.remove("statsExtended");
	}
	Wikifier.wikifyEval("<<replace #stats>><<statsCaption>><</replace>>");
}
window.extendStats = extendStats;

function customColour(color, saturation, brightness, contrast, sepia) {
	return (
		// eslint-disable-next-line prettier/prettier
		"filter: hue-rotate(" + color + "deg) saturate(" + saturation + ") brightness(" + brightness + ") contrast(" + contrast + ") sepia(" + sepia + ")"
	);
}
window.customColour = customColour;

function zoom(value) {
	const slider = $("[name$='" + Util.slugify("options.zoom") + "']");
	value = Math.clamp(value || slider[0].value || 0, 50, 200);
	$("body")
		.css("zoom", value + "%")
		.css("-ms-zoom", value + "%");
	if (slider[0] !== undefined && slider[0].value != value) {
		slider[0].value = value;
		slider.trigger("change");
	}
}
window.zoom = zoom;

function beastTogglesCheck() {
	T.beastVars = [
		"bestialitydisable",
		"swarmdisable",
		"parasitedisable",
		"parasitepregdisable",
		"tentacledisable",
		"slimedisable",
		"voredisable",
		"spiderdisable",
		"slugdisable",
		"waspdisable",
		"beedisable",
		"lurkerdisable",
		"horsedisable",
		"plantdisable",
	];
	T.anyBeastOn = T.beastVars.some(x => V[x] === "f");
}
window.beastTogglesCheck = beastTogglesCheck;

function settingsAsphyxiation() {
	const updateText = () => {
		let val = V.asphyxiaLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "别碰我的脖子！";
				break;
			case 1:
				text = "NPC可能会<span class='blue inline-colour'>掐住</span>你的脖子，但不会造成窒息。";
				break;
			case 2:
				text = "NPC可能会尝试<span class='purple inline-colour'>掐住</span>你的脖子，但不会造成窒息。";
				break;
			case 3:
				text = "在非自愿的性交中，NPC可能会尝试让你<span class='red inline-colour'>窒息</span>。";
				break;
			case 4:
				text =
					"在非自愿的性交中，NPC将<span class='red inline-colour'>更为频繁的</span>尝试让你<span class='red inline-colour'>窒息</span>。";
				break;
			default:
				text = "错误： 值错误：" + val;
				val = 0;
		}
		jQuery("#numberslider-value-asphyxialvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-asphyxialvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsAsphyxiation = settingsAsphyxiation;

function settingsCondoms() {
	const updateText = () => {
		let val = V.condomLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "<span class='red inline-colour'>所有人都不喜欢安全性行为 (包括避孕套)。</span>";
				break;
			case 1:
				text = "只有<span class='green inline-colour'>你</span>可以使用避孕套，但你也可以为NPC提供避孕套。";
				break;
			case 2:
				text = "只有在可能导致<span class='blue inline-colour'>怀孕</span>时，NPC才会使用避孕套。";
				break;
			case 3:
				text = "NPC可能会携带并使用避孕套，<span class='pink inline-colour'>一切随其心意</span>。";
				break;
			default:
				text = "错误： 值错误：" + val;
				val = 0;
		}
		jQuery("#numberslider-value-condomlvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-condomlvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsCondoms = settingsCondoms;

function settingsNudeGenderAppearance() {
	const updateText = () => {
		let val = V.NudeGenderDC;
		let text = null;
		switch (val) {
			case -1:
				text =
					"NPC在判断性别时会<span class='blue inline-colour'>无视</span>生殖器。<span class='purple inline-colour'>将会覆盖部分角色描述与外在性别修饰词。</span> <span class='red inline-colour'>禁用异性变装警告。</span>";
				break;
			case 0:
				text = "NPC<span class='blue inline-colour'>不会</span>根据生殖器来判断你的性别。";
				break;
			case 1:
				text = "NPC<span class='purple inline-colour'>可能会</span>根据生殖器来判断你的性别。";
				break;
			case 2:
				text = "NPC<span class='red inline-colour'>会</span>基于生殖器来判定你的性别。";
				break;
			default:
				text = "错误： 值错误：" + val;
				val = 0;
		}
		$("#numberslider-value-nudegenderdc").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		jQuery("#numberslider-input-nudegenderdc")
			.on("input change", function (e) {
				updateText();
			})
			.css("width", "100%");
	});
}
window.settingsNudeGenderAppearance = settingsNudeGenderAppearance;

function settingsBodywriting() {
	const updateText = () => {
		let val = V.bodywritingLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "NPC<span class='green inline-colour'>不会</span>在你的身上涂画。";
				break;
			case 1:
				text = "NPC在你身上涂画前会<span class='blue inline-colour'>询问</span>你。";
				break;
			case 2:
				text = "NPC会<span class='purple inline-colour'>强行</span>在你的身上涂画。";
				break;
			case 3:
				text = "NPC会<span class='red inline-colour'>强行</span>在你身上涂画和<span class='red inline-colour'>纹身</span>。";
				break;
			default:
				text = "错误： 值错误：" + val;
				val = 0;
		}
		// delete the below code when $bodywritingdisable is fully replaced by $bodywritingLvl
		V.bodywritingdisable = "f";
		if (val === 0) V.bodywritingdisable = "t";

		$("#numberslider-value-bodywritinglvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-bodywritinglvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsBodywriting = settingsBodywriting;

function settingsNamedNpcBreastSize(id, persist) {
	const breastSizes = ["乳头","微隆的","小巧的","偏小的","坚挺的","适中的","饱满的","硕大的","丰腴的","高耸的","巨大的","庞大的","宏伟的"];

	const updateText = () => {
		const npc = persist ? V.per_npc[T.pNPCId] : V.NPCName[T.npcId];
		const val = npc.breastsize;

		const text = breastSizes[val];

		if (val > 0) {
			npc.breastdesc = text + "乳房";
			npc.breastsdesc = text + "乳房";
		} else {
			npc.breastdesc = text;
			npc.breastsdesc = text + "";
		}

		$("#numberslider-value-" + id).text(npc.breastsdesc);
	};

	$(() => {
		updateText();
		$("#numberslider-input-" + id).on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsNamedNpcBreastSize = settingsNamedNpcBreastSize;

function settingsGenericGenders(id) {
	let slider = null;
	const updateText = () => {
		let val = null;
		let attraction = null;
		let men = null;
		let women = null;

		if (id === "beasts") {
			val = V.beastmalechance;
			slider = "beastmalechance";
		} else if (id === "NPCs") {
			val = V.malechance;
			slider = "malechance";
		} else if (id === "mlm") {
			val = V.maleChanceMale;
			slider = "malechancemale";
			attraction = "<span class='blue inline-colour'>被" + `${id[0] === "b" ? "雄性" : "男性"}` + "吸引</span>";
			men = "男性";
			women = "女性";
		} else if (id === "wlw") {
			val = V.maleChanceFemale;
			slider = "malechancefemale";
			attraction = "<span class='pink inline-colour'>被" + `${id[0] === "b" ? "雌性" : "女性"}` + "吸引</span>";
			men = "男性";
			women = "女性";
		} else if (id === "blm") {
			val = V.beastMaleChanceMale;
			slider = "beastmalechancemale";
			attraction = "<span class='blue inline-colour'>被" + `${id[0] === "b" ? "雄性" : "男性"}` + "吸引</span>";
			men = "雄性野兽";
			women = "雌性野兽";
		} else if (id === "blw") {
			val = V.beastMaleChanceFemale;
			slider = "beastmalechancefemale";
			attraction = "<span class='pink inline-colour'>被" + `${id[0] === "b" ? "雌性" : "女性"}` + "吸引</span>";
			men = "雄性野兽";
			women = "雌性野兽";
		} else {
			val = V.malevictimchance;
			slider = "malevictimchance";
		}

		let text = null;

		if (id === "mlm" || id === "wlw" || id === "blw" || id === "blm") {
			switch (val) {
				case 100: text = `<span class='gold inline-colour'>只有</span><span class='blue inline-colour'>${men}</span>${attraction}。`; break;
				case 0: text = `<span class='gold inline-colour'>只有</span><span class='pink inline-colour'>${women}</span>${attraction}。`; break;
				default: text = `<span class='gold inline-colour'>${(100 - val)}%</span>的<span class='pink inline-colour'>${women}</span>和<span class='gold inline-colour'>${val}%</span>的<span class='blue inline-colour'>${men}</span>${attraction}。`; break;
			}
		} else {
			if (val === 100) {
				text = `<span class='gold inline-colour'>所有</span>${id.replace("beast","野兽").replace("other victims you encounter","你遇见的其他受害者").replace("s","们")}都会是<span class='blue inline-colour'>${id[0] === "b" ? "雄性" : "男性"}</span>。`;
			} else if (val === 0) {
				text = `<span class='gold inline-colour'>所有</span>${id.replace("beast","野兽").replace("other victims you encounter","你遇见的其他受害者").replace("s","们")}都会是<span class='pink inline-colour'>${id[0] === "b" ? "雌性" : "女性"}</span>。`;
			} else if (val === 50) {
				text = id.replace("beast","野兽").replace("other victims you encounter","你遇见的其他受害者").replace("s","们") + "会被<span class='gold inline-colour'>平均</span>地分成<span class='blue inline-colour'>" + `${id[0] === "b" ? "雄性" : "男性"}` + "</span>和<span class='pink inline-colour'>" + `${id[0] === "b" ? "雌性" : "女性"}` + "</span>两种性别。";
			} else if (val > 50) {
				text = `<span class='gold inline-colour'>${val}%</span>的${id.replace("beast","野兽").replace("other victims you encounter","你遇见的其他受害者").replace("s","们")}会是<span class='blue inline-colour'>${id[0] === "b" ? "雄性" : "男性"}</span>。`;
			} else {
				text = `<span class='gold inline-colour'>${(100 - val)}%</span>的${id.replace("beast","野兽").replace("other victims you encounter","你遇见的其他受害者").replace("s","们")}会是<span class='pink inline-colour'>${id[0] === "b" ? "雌性" : "女性"}</span>。`;
			}
		}

		jQuery("#numberslider-value-" + slider).text("").append(text).addClass("small-description");
		};

		$(() => {
		updateText();
		$("#numberslider-input-" + slider).on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsGenericGenders = settingsGenericGenders;

function settingsMonsterChance() {
	const updateText = () => {
		const val = V.monsterchance;
		let text = null;

		switch (val) {
			case 100: text = "<span class='gold inline-colour'>所有</span>野兽都是怪物男孩/怪物女孩"; break;
			case 0: text = "除非出现幻觉，否则<span class='gold inline-colour'>不会</span>出现怪物男孩/怪物女孩。"; break;
			case 50: text = "<span class='gold inline-colour'>一半</span>野兽会是怪物男孩/怪物女孩"; break;
			default: text = `<span class='gold inline-colour'>${val}%</span>的野兽会是怪物男孩/怪物女孩。`; break;
		}

		jQuery("#numberslider-value-monsterchance").text("").append(text).addClass("small-description");
		};

		$(() => {
		updateText();
		$("#numberslider-input-monsterchance").on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsMonsterChance = settingsMonsterChance;

function settingsBeastGenders(singleUpdate) {
	const updateText = () => {
		const val = T.beastmalechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>所有</span>野兽都更偏爱<span class='gold inline-colour'>异性</span>。";
				} else {
					text = "<span class='gold inline-colour'>所有</span>野兽都会是<span class='blue inline-colour'>雄性</span>。";
				}
				break;
			case 75:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>的野兽将更偏爱<span class='gold inline-colour'>异性</span>。";
				} else {
					text = "<span class='gold inline-colour'>75%</span>的野兽将会是<span class='blue inline-colour'>雄性</span>。";
				}
				break;
			case 50:
				if (T.beastMaleChanceSplit === "t") {
					text = "野兽的性别倾向是<span class='gold inline-colour'>随机</span>分配的。";
				} else {
					text =
						"<span class='blue inline-colour'>雄性</span>和<span class='pink inline-colour'>雌性</span>野兽的数量将<span class='gold inline-colour'>均衡</span>。";
				}
				break;
			case 25:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>的野兽将更偏爱<span class='gold inline-colour'>同性</span>。";
				} else {
					text = "<span class='gold inline-colour'>75%</span>的野兽将会是<span class='pink inline-colour'>雌性</span>。";
				}
				break;
			case 0:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>所有</span>野兽都更偏爱<span class='gold inline-colour'>同性</span>。";
				} else {
					text = "<span class='gold inline-colour'>所有</span>野兽都会是<span class='pink inline-colour'>雌性</span>。";
				}
				break;
			default:
				if (T.beastMaleChanceSplit === "t") {
					text = "野兽的性别倾向是<span class='gold inline-colour'>随机</span>分配的。";
				} else {
					text = "<span class='gold inline-colour'>" + V.beastmalechance + "%</span>的野兽将会是<span class='blue inline-colour'>雄性</span>。";
				}
				break;
		}
		jQuery("#numberslider-value--beastmalechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--beastmalechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsBeastGenders = settingsBeastGenders;

function settingsNpcGenders(singleUpdate) {
	const updateText = () => {
		const val = T.malechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>所有</span>NPC都更偏爱<span class='gold inline-colour'>异性</span>。";
				} else {
					text = "<span class='gold inline-colour'>所有</span>NPC都会是<span class='blue inline-colour'>男性</span>。";
				}
				break;
			case 75:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>的NPC将更偏爱<span class='gold inline-colour'>异性</span>。";
				} else {
					text = "<span class='gold inline-colour'>75%</span>的NPC将会是<span class='blue inline-colour'>男性</span>。";
				}
				break;
			case 50:
				if (T.maleChanceSplit === "t") {
					text = "NPC的性别倾向是<span class='gold inline-colour'>随机</span>分配的。";
				} else {
					text =
						"<span class='blue inline-colour'>男性</span>和<span class='pink inline-colour'>女性</span>NPC的数量将会<span class='gold inline-colour'>均衡</span>。";
				}
				break;
			case 25:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>的NPC将更偏爱<span class='gold inline-colour'>同性</span>。";
				} else {
					text = "<span class='gold inline-colour'>75%</span>的NPC将会是<span class='pink inline-colour'>女性</span>。";
				}
				break;
			case 0:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>所有</span>NPC都更偏爱<span class='gold inline-colour'>同性</span>。";
				} else {
					text = "<span class='gold inline-colour'>所有</span>NPC都会是<span class='pink inline-colour'>女性</span>。";
				}
				break;
			default:
				if (T.maleChanceSplit === "t") {
					text = "NPC的性别倾向是<span class='gold inline-colour'>随机</span>分配的。";
				} else {
					text = "<span class='gold inline-colour'>" + V.malechance + "%</span>的NPC将会是<span class='blue inline-colour'>男性</span>。";
				}
				break;
		}
		jQuery("#numberslider-value--malechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--malechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsNpcGenders = settingsNpcGenders;

// Checks current settings page for data attributes
// Run only when settings tab is changed (probably in "displaySettings" widget)
// data-target is the target element that needs to be clicked for the value to be updated
// data-disabledif is the conditional statement (e.g. data-disabledif="V.per_npc[T.pNPCId].gender==='f'")

function settingsDisableElement() {
	$(() => {
		$("[data-disabledif]").each(function () {
			const updateButtonsActive = () => {
				$(() => {
					try {
						const evalStr = "'use strict'; return " + disabledif;
						// eslint-disable-next-line no-new-func
						const cond = Function(evalStr)();
						const style = cond ? "var(--500)" : "";
						orig.css("color", style).children().css("color", style);
						orig.find("input").prop("disabled", cond);
					} catch (e) {
						console.log(e);
					}
				});
			};
			const orig = $(this);
			const disabledif = orig.data("disabledif");
			[orig.data("target")].flat().forEach(e => $("[name$='" + Util.slugify(e) + "']").on("click", updateButtonsActive));
			if (disabledif) {
				updateButtonsActive();
			}
		});
	});
}
window.settingsDisableElement = settingsDisableElement;

// Adds event listeners to input on current page
// mainly used for options overlay
function onInputChanged(func) {
	if (!func || typeof func !== "function") return;
	$(() => {
		$("input, select").on("change", function () {
			func();
		});
	});
}
window.onInputChanged = onInputChanged;

function closeOverlay() {
	wikifier("journalNotesTextareaSave");
	updateOptions();
	delete T.currentOverlay;
	delete V.tempDisable;
	T.buttons.reset();
	$("#customOverlay").addClass("hidden").parent().addClass("hidden");
}
window.closeOverlay = closeOverlay;

function journalNotesReplacer(name) {
	return name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5' _-]+/g, "");
}
window.journalNotesReplacer = journalNotesReplacer;

function updatehistorycontrols() {
	// if undefined, initiate new variable based on engine config
	if (V.options.maxStates === undefined) V.options.maxStates = Config.history.maxStates;
	else Config.history.maxStates = V.options.maxStates; // update engine config

	// option to only save active state into sessionStorage, for better performance
	if (V.options.sessionHistory) Config.history.maxSessionStates = V.options.maxStates;
	else Config.history.maxSessionStates = 1;

	if (V.options.maxStates === 1) jQuery("#ui-bar-history").hide(); // hide nav panel when it's useless
	else {
		// or unhide it otherwise
		Config.history.controls = true;
		jQuery("#ui-bar-history").show();
	}
}
window.updatehistorycontrols = updatehistorycontrols;
DefineMacro("updatehistorycontrols", updatehistorycontrols);

/*
	Refreshes the game when exiting options menu - applying the options object after State has been restored.
	It is done this way to prevent exploits by re-rendering the same passage
*/
function updateOptions() {
	if (T.currentOverlay === "options" && T.optionsRefresh && V.passage !== "Start") {
		updatehistorycontrols();
		const optionsData = clone(V.options);
		const tmpButtons = T.buttons;
		const tmpKey = T.key;

		if (!State.restore()) return; // don't do anything if state couldn't be restored
		V.options = optionsData;
		tanned(0, "ignoreCoverage");
		State.show();

		T.key = tmpKey;
		T.buttons = tmpButtons;
		T.buttons.setupTabs();
		if (T.key !== "options") {
			T.buttons.setActive(T.buttons.activeTab);
		}
	}
}
window.updateOptions = updateOptions;

$(document).on("click", "#cbtToggleMenu .cbtToggle", function (e) {
	$("#cbtToggleMenu").toggleClass("visible");
});

function elementExists(selector) {
	return document.querySelector(selector) !== null;
}
window.elementExists = elementExists;

window.getCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	textArea.value = JSON.stringify(V.characterViewer);
};

window.loadCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	let data;
	try {
		data = JSON.parse(textArea.value);
	} catch (e) {
		textArea.value = "Invalid JSON";
	}
	const original = clone(V.characterViewer);

	if (typeof data === "object" && !Array.isArray(data) && data !== null) {
		V.characterViewer = {
			...original,
			...data.clothesEquipped,
			...data.clothesIntegrity,
			...data.bodyState,
			...data.colours,
			...data.skinColour,
			...data.controls,
		};
		State.display(V.passage);
	} else {
		textArea.value = "Invalid Import";
	}
};

function returnTimeFormat() {
	if (!V || !V.options) return "en-GB";
	return V.options.dateFormat;
}
window.returnTimeFormat = returnTimeFormat;







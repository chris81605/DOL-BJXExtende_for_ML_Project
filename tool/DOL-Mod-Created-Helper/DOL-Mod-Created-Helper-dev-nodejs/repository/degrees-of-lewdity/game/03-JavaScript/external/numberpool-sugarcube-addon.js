if ("undefined" == typeof version || "undefined" == typeof version.title || "SugarCube" !== version.title || "undefined" == typeof version.major || version.major < 2 || "undefined" == typeof version.minor || version.minor < 5)
  throw new Error("<<numberpool>> macro set requires SugarCube 2.5.0 or greater, aborting load");
if (version.major <= 2 && version.minor < 33) {
  // numberbox was added into the main branch in version 2.33
  Macro.add("numberbox", {
	handler: function () {
	  function validateAndApply(el, addend) {
		var curValue = Math.trunc(Wikifier.getValue(varName)),
		  newValue = Math.trunc(el.value),
		  newPoolValue = null;
		if (Number.isNaN(newValue) || !Number.isFinite(newValue)) return (el.value = curValue), !1;
		if ((null != addend && (newValue += addend), newValue < minValue ? (newValue = minValue) : newValue > maxValue && (newValue = maxValue), null !== pool)) {
		  var poolValue = pool.get(),
			delta = (newValue - curValue) * poolCost;
		  delta < 0
			? (newPoolValue = poolValue - delta)
			: delta > 0 && poolValue >= poolCost
			  ? (poolValue < delta && ((newValue = curValue + Math.trunc(poolValue / poolCost)), (delta = poolValue - (poolValue % poolCost))), (newPoolValue = poolValue - delta))
			  : (newValue = curValue);
		}
		return Wikifier.setValue(varName, newValue), (el.value = newValue), null !== newPoolValue && pool.set(newPoolValue), !0;
	  }
	  var _this = this;
	  if (this.args.length < 4) {
		var errors = [];
		return (
		  this.args.length < 1 && errors.push("variable name"),
		  this.args.length < 2 && errors.push("default value"),
		  this.args.length < 3 && errors.push("min value"),
		  this.args.length < 4 && errors.push("max value"),
		  this.error("no " + errors.join(" or ") + " specified")
		);
	  }
	  if ("string" != typeof this.args[0]) return this.error("variable name argument is not a string");
	  var varName = this.args[0].trim();
	  if ("$" !== varName[0] && "_" !== varName[0]) return this.error('variable name "' + this.args[0] + '" is missing its sigil ($ or _)');
	  var varId = Util.slugify(varName),
		defValue = Number(this.args[1]),
		minValue = Number(this.args[2]),
		maxValue = Number(this.args[3]),
		poolCost = 1,
		autofocus = !1;
	  if (
		(this.args.length > 5 ? ((poolCost = Number(this.args[4])), (autofocus = "autofocus" === this.args[5])) : this.args.length > 4 && ("autofocus" === this.args[4] ? (autofocus = !0) : (poolCost = Number(this.args[4]))),
		  Number.isNaN(defValue) || !Number.isFinite(defValue) || Math.trunc(defValue) !== defValue)
	  )
		return this.error("default value (" + this.args[1] + ") is not a whole number");
	  if (Number.isNaN(minValue) || !Number.isFinite(minValue) || Math.trunc(minValue) !== minValue) return this.error("min value (" + this.args[2] + ") is not a whole number");
	  if (Number.isNaN(maxValue) || !Number.isFinite(maxValue) || Math.trunc(maxValue) !== maxValue) return this.error("max value (" + this.args[3] + ") is not a whole number");
	  if (Number.isNaN(poolCost) || !Number.isFinite(poolCost) || Math.trunc(poolCost) !== poolCost || poolCost <= 0) return this.error("pool cost (" + this.args[4] + ") is not a whole number greater than zero");
	  if (defValue < minValue) return this.error("default value (" + this.args[1] + ") is less than min value (" + this.args[2] + ")");
	  if (defValue > maxValue) return this.error("default value (" + this.args[1] + ") is greater than max value (" + this.args[3] + ")");
	  var pool = (function () {
		var parent = _this.contextSelect(function (ctx) {
		  return "numberpool" === ctx.name;
		});
		return null !== parent && parent.hasOwnProperty("pool") ? parent.pool : null;
	  })();
	  Config.debug && this.debugView.modes({ block: !0 });
	  var $elControl = jQuery(document.createElement("div")),
		$elInput = jQuery(document.createElement("input"));
	  $elControl
		.attr("id", this.name + "-body-" + varId)
		.addClass("macro-" + this.name)
		.appendTo(this.output),
		jQuery(document.createElement("button"))
		  .attr({ id: this.name + "-minus-" + varId, tabindex: 0 })
		  .text("")
		  .on("click", function () {
			return validateAndApply($elInput[0], -1);
		  })
		  .appendTo($elControl),
		$elInput
		  .attr({ id: this.name + "-input-" + varId, name: this.name + "-input-" + varId, type: "text", pattern: "\\d+", tabindex: 0 })
		  .on("change", function () {
			validateAndApply(this);
		  })
		  .on("keypress", function (ev) {
			13 === ev.which && (ev.preventDefault(), $elInput.trigger("change"));
		  })
		  .appendTo($elControl),
		jQuery(document.createElement("button"))
		  .attr({ id: this.name + "-plus-" + varId, tabindex: 0 })
		  .text("")
		  .on("click", function () {
			return validateAndApply($elInput[0], 1);
		  })
		  .appendTo($elControl),
		$elInput.val(defValue),
		validateAndApply($elInput[0]),
		autofocus &&
		($elInput.attr("autofocus", "autofocus"),
		  (postdisplay["#autofocus:" + $elInput.attr("id")] = function (task) {
			delete postdisplay[task],
			  setTimeout(function () {
				return $elInput.focus();
			  }, Engine.minDomActionDelay);
		  }));
	},
  });
}
Macro.add("numberpool", {
  tags: ["onchange"],
  handler: function () {
	if (0 === this.args.length) return this.error("no variable name specified");
	if (this.payload.length > 2) return this.error("multiple <<onchange>> sections specified");
	if ("string" != typeof this.args[0]) return this.error("variable name argument is not a string");
	var varName = this.args[0].trim();
	if ("$" !== varName[0] && "_" !== varName[0]) return this.error('variable name "' + this.args[0] + '" is missing its sigil ($ or _)');
	var curValue = Wikifier.getValue(varName);
	if ("number" != typeof curValue || Number.isNaN(curValue) || !Number.isFinite(curValue)) return this.error("pool value is not a number");
	var varId = Util.slugify(varName);
	TempState.hasOwnProperty(this.name) || (TempState[this.name] = {}),
	  TempState[this.name].hasOwnProperty(varId) || (TempState[this.name][varId] = 0),
	  Object.defineProperty(this, "pool", {
		value: Object.defineProperties(
		  {},
		  {
			get: {
			  value: function () {
				return Wikifier.getValue(varName);
			  },
			},
			set: {
			  value: (function (content) {
				return function (value) {
				  var curValue = Wikifier.getValue(varName);
				  value !== curValue && (Wikifier.setValue(varName, value), content && new Wikifier(null, content));
				};
			  })(this.payload.length > 1 ? this.payload[1].contents.trim() : ""),
			},
		  }
		),
	  }),
	  jQuery(document.createElement("div"))
		.attr("id", this.name + "-" + varId + "-" + TempState[this.name][varId]++)
		.addClass("macro-" + this.name)
		.wiki(this.payload[0].contents.replace(/^\n/, ""))
		.appendTo(this.output);
  },
});
Macro.add("numberslider", {
  handler: function () {
	function stepValidate(value) {
	  if (fracDigits > 0) {
		var ma = Number(minValue + "e" + fracDigits),
		  sa = Number(stepValue + "e" + fracDigits),
		  _va = Number(value + "e" + fracDigits) - ma;
		return Number(_va - (_va % sa) + ma + "e-" + fracDigits);
	  }
	  var va = value - minValue;
	  return va - (va % stepValue) + minValue;
	}
	function validateAndApply(el) {
	  var curValue = Wikifier.getValue(varName),
		newValue = Number(el.value),
		newPoolValue = null;
	  if (Number.isNaN(newValue) || !Number.isFinite(newValue)) return (el.value = curValue), !1;
	  if (((newValue = stepValidate(newValue)), newValue < minValue ? (newValue = minValue) : newValue > maxValue && (newValue = maxValue), null !== pool))
		if (fracDigits > 0) {
		  var pa = Number(pool.get() + "e" + fracDigits),
			ca = Number(curValue + "e" + fracDigits),
			na = Number(newValue + "e" + fracDigits),
			delta = na - ca;
		  pa < delta && ((na -= delta - pa), (delta = na - ca), (newValue = Number(na + "e-" + fracDigits))), (newPoolValue = Number(pa - delta + "e-" + fracDigits));
		} else {
		  var poolValue = pool.get(),
			_delta = newValue - curValue;
		  poolValue < _delta && ((newValue -= _delta - poolValue), (_delta = newValue - curValue)), (newPoolValue = poolValue - _delta);
		}
	  return Wikifier.setValue(varName, newValue), (el.value = newValue), null !== newPoolValue && pool.set(newPoolValue), !0;
	}
	var _this2 = this;
	if (this.args.length < 5) {
	  var errors = [];
	  return (
		this.args.length < 1 && errors.push("variable name"),
		this.args.length < 2 && errors.push("default value"),
		this.args.length < 3 && errors.push("min value"),
		this.args.length < 4 && errors.push("max value"),
		this.args.length < 5 && errors.push("step value"),
		this.error("no " + errors.join(" or ") + " specified")
	  );
	}
	if ("string" != typeof this.args[0]) return this.error("variable name argument is not a string");
	var varName = this.args[0].trim();
	if ("$" !== varName[0] && "_" !== varName[0]) return this.error('variable name "' + this.args[0] + '" is missing its sigil ($ or _)');
	var varId = Util.slugify(varName),
	  defValue = Number(this.args[1]),
	  minValue = Number(this.args[2]),
	  maxValue = Number(this.args[3]),
	  stepValue = Number(this.args[4]),
	  autofocus = this.args.length > 5 && "autofocus" === this.args[5];
	if (Number.isNaN(defValue) || !Number.isFinite(defValue)) return this.error("default value (" + this.args[1] + ") is not a number");
	if (Number.isNaN(minValue) || !Number.isFinite(minValue)) return this.error("min value (" + this.args[2] + ") is not a number");
	if (Number.isNaN(maxValue) || !Number.isFinite(maxValue)) return this.error("max value (" + this.args[3] + ") is not a number");
	if (Number.isNaN(stepValue) || !Number.isFinite(stepValue) || stepValue <= 0) return this.error("step value (" + this.args[4] + ") is not a number greater than zero");
	if (defValue < minValue) return this.error("default value (" + this.args[1] + ") is less than min value (" + this.args[2] + ")");
	if (defValue > maxValue) return this.error("default value (" + this.args[1] + ") is greater than max value (" + this.args[3] + ")");
	var fracDigits = (function () {
	  var str = String(stepValue),
		pos = str.lastIndexOf(".");
	  return pos === -1 ? 0 : str.length - pos - 1;
	})();
	if (stepValidate(maxValue) !== maxValue) return this.error("max value (" + this.args[3] + ") is not a multiple of the step value (" + this.args[4] + ") plus the min value (" + this.args[2] + ")");
	var pool = (function () {
	  var parent = _this2.contextSelect(function (ctx) {
		return "numberpool" === ctx.name;
	  });
	  return null !== parent && parent.hasOwnProperty("pool") ? parent.pool : null;
	})();
	Config.debug && this.debugView.modes({ block: !0 });
	var $elControl = jQuery(document.createElement("div")),
	  $elInput = jQuery(document.createElement("input")),
	  $elValue = void 0,
	  showValue = void 0;
	$elControl
	  .attr("id", this.name + "-body-" + varId)
	  .addClass("macro-" + this.name)
	  .appendTo(this.output),
	  $elInput
		.attr({ id: this.name + "-input-" + varId, name: this.name + "-input-" + varId, type: "range", min: minValue, max: maxValue, step: stepValue, tabindex: 0, disabled: (typeof this.args[5] != "undefined" ? this.args[5] : false)})
		.on("change input." + Util.slugify(this.name), function () {
		  validateAndApply(this), "function" == typeof showValue && showValue();
		})
		.on("keypress", function (ev) {
		  13 === ev.which && (ev.preventDefault(), $elInput.trigger("change"));
		})
		.appendTo($elControl),
	  !Browser.isIE || Browser.ieVersion > 9
		? (($elValue = jQuery(document.createElement("span"))
		  .attr("id", this.name + "-value-" + varId)
		  .appendTo($elControl)),
		  (showValue = function () {
			$elValue.text(Number($elInput.val()).toFixed(fracDigits));
		  }))
		: $elInput.off("input." + Util.slugify(this.name)),
	  $elInput.val(defValue),
	  validateAndApply($elInput[0]),
	  "function" == typeof showValue && showValue(),
	  autofocus &&
	  ($elInput.attr("autofocus", "autofocus"),
		(postdisplay["#autofocus:" + $elInput.attr("id")] = function (task) {
		  delete postdisplay[task],
			setTimeout(function () {
			  return $elInput.focus();
			}, Engine.minDomActionDelay);
		}));
  },
});
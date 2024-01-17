/**
 * ?stroke - Selects from various adjectives and verbs to return
 *            a phrase such as: "passionately caress".
 */
Template.add("stroke", function () {
	const adjective = V.consensual === 1 ? either("passionately", "gently") : either("timidly");
	const verb = V.consensual === 1 ? either("stroke", "caress", "touch", "fondle", "embrace") : either("stroke", "touch");
	return `${adjective} ${verb}`;
});

/* ?alongside */
Template.add("alongside", () =>
	either("alongside", "alongside", "in time with", "heedless of", "in rhythm with", "pounding away against", "thrusting against")
);

/* ?orgasmMoans */
Template.add("orgasmMoans", () => either("moans", "groans", "gasps", "sighs", "screams", "sobs", "laughs"));

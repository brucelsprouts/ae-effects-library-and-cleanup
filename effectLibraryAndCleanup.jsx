// After Effects Script: Effect Library and Project Cleanup

// Function to apply a specific effect
function applyEffect(effectName) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var layer = comp.selectedLayers[0];
        if (layer) {
            layer.Effects.addProperty(effectName);
        } else {
            alert("Please select a layer.");
        }
    } else {
        alert("Please select a composition.");
    }
}

// Function to purge cache
function purgeCache() {
    app.purge(PurgeTarget.ALL_CACHES);
    alert("Cache purged.");
}

// Create UI panel
var win = new Window("palette", "Effect Library and Cleanup", undefined);
win.orientation = "column";

// Add dropdown for effect selection
var effectDropdown = win.add("dropdownlist", undefined, ["ADBE Gaussian Blur", "ADBE Fill", "ADBE Glow", "ADBE Drop Shadow"]);
effectDropdown.selection = 0; // Default selection

// Add buttons for common effects
var effect1Btn = win.add("button", undefined, "Apply Selected Effect");
effect1Btn.onClick = function() {
    var selectedEffect = effectDropdown.selection.text;
    applyEffect(selectedEffect);
};

// Add button to purge cache
var purgeBtn = win.add("button", undefined, "Purge Cache");
purgeBtn.onClick = purgeCache;

// Show the panel
win.center();
win.show();
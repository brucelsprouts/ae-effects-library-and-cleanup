// After Effects Script: Effect Library and Project Cleanup

// Function to search and apply effects
function applyEffect(effectName, buttonIndex) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length > 0) {
            for (var i = 0; i < selectedLayers.length; i++) {
                selectedLayers[i].Effects.addProperty(effectName);
            }
        } else {
            alert("Please select at least one layer.");
        }
    } else {
        alert("Please select a composition.");
    }
}

// Function to clean up unused files
function cleanUpProject() {
    var unusedItems = [];
    for (var i = 1; i <= app.project.numItems; i++) {
        var item = app.project.item(i);
        if (item.usedIn.length === 0 && !(item instanceof FolderItem)) {
            unusedItems.push(item);
        }
    }

    if (unusedItems.length > 0) {
        var confirmMessage = "The following items will be deleted:\n";
        for (var j = 0; j < unusedItems.length; j++) {
            confirmMessage += unusedItems[j].name + "\n";
        }
        confirmMessage += "\nDo you want to proceed?";
        if (confirm(confirmMessage)) {
            for (var k = 0; k < unusedItems.length; k++) {
                unusedItems[k].remove();
            }
            alert("Unused items have been deleted.");
        }
    } else {
        alert("No unused items found.");
    }
}

// Create UI panel
var win = new Window("palette", "Effect Library and Project Cleanup", undefined);
win.orientation = "column";

// Search bar
var searchGroup = win.add("group");
searchGroup.add("statictext", undefined, "Search Effect:");
var searchInput = searchGroup.add("edittext", undefined, "");
searchInput.characters = 20;

// Effect buttons
var effectButtons = [];
for (var i = 0; i < 4; i++) {
    effectButtons[i] = win.add("button", undefined, "Apply Effect " + (i + 1));
    effectButtons[i].onClick = (function(index) {
        return function() {
            var effectName = searchInput.text;
            applyEffect(effectName, index);
        };
    })(i);
}

// Cleanup button
var cleanUpButton = win.add("button", undefined, "Clean Up Unused Files");
cleanUpButton.onClick = cleanUpProject;

// Show the panel
win.center();
win.show();
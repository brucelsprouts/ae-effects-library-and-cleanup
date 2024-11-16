(function () {
    // Create a new floating panel for the effect preset UI
    var win = new Window("palette", "Effect Presets", undefined, {resizeable: true});
    
    // Add a search field
    var searchGroup = win.add("group", undefined, "Search Effects");
    searchGroup.add("statictext", undefined, "Search Effects:");
    var searchField = searchGroup.add("edittext", undefined, "");
    searchField.characters = 20;
    
    // Create a list box to display available effects
    var effectList = searchGroup.add("listbox", undefined, [], {multiselect: false, size: [200, 100]});
    
    // Create a group for buttons
    var buttonGroup = win.add("group", undefined, "Effect Buttons");
    buttonGroup.orientation = "column";
    
    var buttons = [];
    var names = [];
    for (var i = 0; i < 8; i++) {
        var button = buttonGroup.add("button", undefined, "Effect " + (i + 1));
        buttons.push(button);
        names.push("Effect " + (i + 1)); // Default names
    }
    
    // Create a field to name buttons
    var nameGroup = win.add("group", undefined, "Button Names");
    nameGroup.add("statictext", undefined, "Name the button:");
    var nameField = nameGroup.add("edittext", undefined, "");
    nameField.characters = 15;
    
    // Search function to filter effects
    searchField.onChanging = function () {
        var searchText = searchField.text.toLowerCase();
        var availableEffects = [];
        var allEffects = app.effects;
        
        // Filter effects based on search text
        for (var i = 0; i < allEffects.length; i++) {
            if (allEffects[i].name.toLowerCase().indexOf(searchText) !== -1) {
                availableEffects.push(allEffects[i].name);
            }
        }
        
        // Update the effect list
        effectList.removeAll();
        for (var i = 0; i < availableEffects.length; i++) {
            effectList.add("item", availableEffects[i]);
        }
    };

    // When a button is clicked, apply the selected effect to the active layer
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onClick = function () {
            var selectedEffect = effectList.selection;
            if (selectedEffect && app.project.activeItem && app.project.activeItem.selectedLayers.length > 0) {
                var layer = app.project.activeItem.selectedLayers[0];
                var effectName = selectedEffect.text;
                
                // Add the selected effect to the layer
                layer.Effects.addProperty(effectName);
                
                // Optionally, change the button's name based on input from the name field
                names[i] = nameField.text;
                buttons[i].text = names[i];
            }
        };
    }
    
    // Open the panel
    win.center();
    win.show();
})();

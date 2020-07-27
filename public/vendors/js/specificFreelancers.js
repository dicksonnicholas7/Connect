
var autocomplete = new SelectPure(".autocomplete-freelancers", {
    options: [
      {
        label: "Charles",
        value: "charles",
      },
      {
        label: "Jebo",
        value: "Jebo",
      },
      {
        label: "Alhaji",
        value: "al",
      },
      {
        label: "Swift",
        value: "sw",
      },
      {
        label: "Clement",
        value: "cl",
      },
      {
        label: "Nick",
        value: "dickson",
      },
      {
        label: "Chester",
        value: "ma",
      },
      {
        label: "Prince",
        value: "sp",
      },
    ],
    multiple: true,
    autocomplete: true,
    icon: "fa fa-times",
    placeholder:"Select at least two freelancers",
    onChange: value => {
      console.log(value); 
         },
    classNames: {
      select: "form-control",
      dropdownShown: "select-pure__select--opened",
      multiselect: "select-pure__select--multiple",
      label: "select-pure__label",
      placeholder: "select-pure__placeholder",
      dropdown: "select-pure__options",
      option: "select-pure__option",
      autocompleteInput: "select-pure__autocomplete",
      selectedLabel: "select-pure__selected-label",
      selectedOption: "select-pure__option--selected",
      placeholderHidden: "select-pure__placeholder--hidden",
      optionHidden: "select-pure__option--hidden",
    }
  });
  var resetAutocomplete = function() {
    autocomplete.reset();
  };

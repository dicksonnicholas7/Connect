$(document).ready(function(){

  $.ajax({
    url:'/user/all-freelancers',
    type:'get',
    async: false,
    success:function(response){

      console.log(response)

      var autocomplete = new SelectPure(".autocomplete-freelancers", {
        options: [
          {
            label: "Charles",
            value: "charles",
          }
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

    }
});





});
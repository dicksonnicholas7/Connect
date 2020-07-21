[].forEach.call(document.getElementsByClassName('tags-input'),function(el){
    let hiddenInput = document.createElement('input'),
    mainInput=document.createElement('input');
    tags =[];

    hiddenInput.setAttribute('type','hidden');
    hiddenInput.setAttribute('name',el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');

    mainInput.addEventListener('input', function(){
        let enteredTag = mainInput.value.split(',');

        if (enteredTag.length > 1){
            enteredTag.forEach(function (t){
                let filteredTag = filterTag(t);
                if (filteredTag.length){
                    addTag(filteredTag);
                }
            });
            mainInput.value='';
        }
    });


    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    function addTag(text){
        let tag = {
            text:text,
            element:document.createElement('span')
        };
        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;
        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click',function(){
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        if (tags.length ===5){
            document.getElementById('message').textContent='Skills cannot be more than five (5)'; 
        }
        else {
        tags.push(tag);
        el.insertBefore(tag.element,mainInput);
            }
            refreshTag();
        }
    function removeTag(index){
        let tag = tags[index];
        tags.splice(index,1);
        el.removeChild(tag.element);
        refreshTag();

    }
    function refreshTag(){
        let tagsList = [];
        tags.forEach(function (t){
            tagsList.push(t.text)
        });
        hiddenInput.value = tagsList.join(',');
        console.log(hiddenInput.value);
        console.log(tagsList);
    }
    function filterTag(tag){
        return tag.trim();
    }
    
});
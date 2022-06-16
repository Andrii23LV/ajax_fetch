const xhttp = new XMLHttpRequest();
const loadJs = document.querySelector('.button-js');
const loadFetch = document.querySelector('.button-fetch');
const pageLoad = document.querySelector('.wrap');
const loading = document.querySelector('.loading');
let url = 'https://jsonplaceholder.typicode.com/users';
let list_1 = document.querySelector('.list-1');
let list_2 = document.querySelector('.list-2');

//AJAX//
function byAjax(obj) {
    xhttp.open(obj.method, obj.url);
    xhttp.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
			obj.success(JSON.parse(this.response));
			} else {
				obj.error(this.status);
			}
    };
    xhttp.send();
}

loadJs.addEventListener('click', () => {
    setTimeout(() => {
        byAjax({
            method: 'GET',
            url: url,
            dataType: 'json',
            error: function (e) {
                console.error(e);
            },
            success: function (res) {
                res.forEach((item) => {
                    list_1.innerHTML +=
                        `<div class="username"><p class="name">${item.name}</p></div>`;
                })
            }
        })
        pageLoad.classList.remove('hidden');
        loading.classList.add('hidden');
    }, 500)
    pageLoad.classList.add('hidden');
    loading.classList.remove('hidden');
}, { once: true })

//FETCH//

//Fetch DELETE////////////////////////////
const deleteData = async (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
    method:'DELETE'
    }).then(response => {
        return response.json()
    }).then(() => 
    alert(`User with id – ${id} was deleted`)
);
}
//Fetch PUT///////////////////////////////
const putData = async (id, edit) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': edit
        })
    });
    const data = await response.json();
    console.log(data);
};

//Fetch GET/////////////////////////////////
const getData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        }
    });
    //CREATE USERS/////////////////////
    const data = await response.json();
    data.forEach(item => {
        list_2.innerHTML +=
        `<div class="user-${item.id} username" id="${item.id}"><p class="name">${item.name}</p>
        <div class="buttons-list2">
            <button id="edit" type="submit">Edit</button>
            <button id="delete" type="submit">Delete</button>
        </div>
        <div class="hidden form"><input id="input"><button id="save" type="submit">Save</div>
        </div>`;
    })
    let form = document.querySelectorAll('.form')
    //DELETE USER//////////////////////
    list_2.onclick = function(event) {
        let deletebtn = event.target.closest('#delete'); 
        let editbtn = event.target.closest('#edit'); 
        if(deletebtn) {
            let nameItem = event.target.parentNode.parentNode;
            let idshka = event.target.parentNode.parentNode.id;
            setTimeout(() => {
                deleteData(idshka);
                pageLoad.classList.remove('hidden');
                loading.classList.add('hidden');
            }, 500)
            nameItem.classList.add('hidden');
            pageLoad.classList.add('hidden');
            loading.classList.remove('hidden');
        } else if(editbtn) {
            let editItem = event.target.parentNode.parentNode;
            editItem.children[2].className = '';
            let idshka = event.target.parentNode.parentNode.id;
            form.forEach(formItem => {
                formItem.onclick = function(event) {
                    let savebtn = event.target.closest('#save'); 
                    if(savebtn) {
                        let editedName = event.target.parentNode.parentNode.children[0];
                        let inputValue = event.target.parentNode.children[0].value;
                        editedName.innerHTML = inputValue;
                        idshka = event.target.parentNode.parentNode.id;
                        setTimeout(() => {
                            putData(idshka, inputValue);
                            pageLoad.classList.remove('hidden');
                            loading.classList.add('hidden');
                        }, 500)
                        pageLoad.classList.add('hidden');
                        loading.classList.remove('hidden');
                    } else {
                        return;
                    }
                }
            })
        } 
    };
};

loadFetch.addEventListener('click', () => {
    setTimeout(() => {
        getData();
        pageLoad.classList.remove('hidden');
        loading.classList.add('hidden');
    }, 500)
    pageLoad.classList.add('hidden');
    loading.classList.remove('hidden');
}, { once: true })












// menu.js
document.addEventListener('DOMContentLoaded', function () {
    const menuContainer = document.getElementById('menuContainer');
    const menuSelector = document.getElementById('menuSelector');

    function createMenu(menuArray, level) {
        const ul = document.createElement('ul');
        ul.className = 'level-' + level;

        menuArray.forEach(function (item) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = item.title;
            a.href = 'javascript:void(0)'; // Prevent default link behavior
            li.appendChild(a);

            if (item.submenus && item.submenus.length) {
                const span = document.createElement('span');
                span.className = 'toggle';
                a.appendChild(span);
                const subMenu = createMenu(item.submenus, level + 1);
                subMenu.style.display = 'none'; // Ensure submenus are hidden
                li.appendChild(subMenu);
                a.addEventListener('click', function () {
                    subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
                    span.classList.toggle('open');
                });
            }
            ul.appendChild(li);
        });
        return ul;
    }

    function loadMenu(jsonFile) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(menuData => {
                menuContainer.innerHTML = ''; // Clear existing menu
                const menuIdentifier = jsonFile.replace('.json', '').replace('menu-', '');
                menuContainer.setAttribute('data-menu', menuIdentifier); // Set data attribute

                const menu = createMenu(menuData, 1);
                menuContainer.appendChild(menu);
            })
            .catch(error => {
                console.error('Error loading menu data:', error);
            });
    }

    loadMenu(menuSelector.value);

    menuSelector.addEventListener('change', function () {
        loadMenu(this.value);
    });
});
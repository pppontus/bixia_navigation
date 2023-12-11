// menu.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('menu-data.json')
        .then(response => response.json())
        .then(menuData => {
            const menuContainer = document.getElementById('menuContainer');
            menuContainer.appendChild(createMenu(menuData, 1));
        })
        .catch(error => {
            console.error('Error loading menu data:', error);
        });

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

    const menuContainer = document.getElementById('menuContainer');
    menuContainer.appendChild(createMenu(menuData, 1));
});
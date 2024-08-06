const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8'
    }
  };


function loadDanhSachSanPham() {
    ownerReferenceId = localStorage.getItem('username');
    console.log(ownerReferenceId);
    fetch('https://api.gameshift.dev/nx/items?page=1&perPage=9&ownerReferenceId=' + encodeURIComponent(ownerReferenceId), options)
        .then(response => response.json())
        .then(response => {
            console.log(response); // In ra dữ liệu để kiểm tra cấu trúc

            const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';

            response.data.forEach(entry => {
                if (entry.type === "UniqueAsset") {
                    const item = entry.item;
                    const row = tableBody.insertRow();

                    const imageCell = row.insertCell(0);
                    const collectionNameCell = row.insertCell(1);
                    const itemNameCell = row.insertCell(2);
                    const itemDescriptionCell = row.insertCell(3);
                    const quantityCell = row.insertCell(4);
                    const priceCell = row.insertCell(5);

                    collectionNameCell.textContent = item.collection.name || 'Unknown Collection'; // Tên Collection
                    itemNameCell.textContent = item.name || 'Unknown Item'; // Tên Data
                    itemDescriptionCell.textContent = item.description || 'Unknown Description';

                    const soLuongAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
                    quantityCell.textContent = soLuongAttribute ? soLuongAttribute.value : 'N/A'; // số lượng

                    const giaTienAttribute = item.attributes.find(attr => attr.traitType === 'GiaTien');
                    priceCell.textContent = giaTienAttribute ? giaTienAttribute.value : 'N/A'; // Giá bán

                    const img = document.createElement('img');
                    img.src = item.imageUrl || ''; // URL hình ảnh
                    img.alt = item.name || 'Image';
                    img.style.width = '150px';
                    img.style.height = '150px';
                    imageCell.appendChild(img);

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Sửa';
                    editButton.classList.add('btn', 'btn-warning', 'btn-sm');

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Xóa';
                    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                }

            });
        })
        .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => {
    const authLinksContainer = document.getElementById('authLinks');
    
    const walletAddress = localStorage.getItem('walletAddress');
    const userMenu = document.createElement('div');
    
    if (walletAddress) {
        userMenu.innerHTML = `
            <a href="#" id="userIcon" class="my-auto">
                <i class="fas fa-user fa-2x"></i>
            </a>
            <div id="dropdownMenu" class="dropdown-menu">
                <a href="/account.html">Thông tin tài khoản</a>
                <a href="#" id="logout">Đăng xuất</a>
            </div>
        `;

        authLinksContainer.appendChild(userMenu);

        const userIcon = document.getElementById('userIcon');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const logoutButton = document.getElementById('logout');

        userIcon.addEventListener('click', (event) => {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });

        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    } else {
        authLinksContainer.innerHTML = `
            <span>
              <a href="../auth/login.html" class="auth-link">Đăng nhập</a>
            </span>
            /
            <span>
              <a href="../auth/register.html" class="auth-link">Đăng ký</a>
            </span>
        `;
    }
});


function logout() {
    // Xóa thông tin người dùng từ localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('walletAddress');
    // Chuyển hướng về trang đăng nhập hoặc trang chủ
    window.location.href = '../index.html';
}

loadDanhSachSanPham();
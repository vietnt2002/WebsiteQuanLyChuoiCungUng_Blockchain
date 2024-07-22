
var apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'x-api-key': apiKey
    }
};


//Tạo Category

function addAssetCollection() {
  const name = document.getElementById('tenDanhMuc').value;
  const description = document.getElementById('moTaDanhMuc').value;
  const imageUrl = document.getElementById('anhDanhMuc').value;
  
  const options1 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({ name, description, imageUrl })
  };
  
  fetch('https://api.gameshift.dev/nx/asset-collections', options1)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add asset collection.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Asset collection added successfully:', data);
      document.getElementById('message').textContent = 'Asset collection added successfully!';
      loadDanhMucSanPham();
      // You can add additional logic here, like refreshing the table
    })
    .catch(error => {
      console.error('Error adding asset collection:', error);
      document.getElementById('message').textContent = 'Failed to add asset collection.';
    });
}



//Tạo NFT
function mintNft() {
    const collectionId = document.getElementById('assetCollectionCombobox').value;
    const tenSanPham = document.getElementById('tenSanPham').value;
    const giaBan = document.getElementById('giaBan').value;
    const soLuong = document.getElementById('soLuong').value;
    const moTa = document.getElementById('moTa').value;
    const fileInput = document.getElementById('fileInput').value;

    if (!collectionId || !tenSanPham || !giaBan || !soLuong || !moTa || !fileInput) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const addNFT = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'x-api-key': apiKey,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            details: {
                attributes: [{ traitType: 'GiaTien', value: giaBan }, {traitType: 'SoLuong', value: soLuong}],
                collectionId: collectionId,
                description: moTa,
                imageUrl: fileInput,
                name: tenSanPham
            },
            destinationUserReferenceId: 'admin'
        })
    };

    fetch('https://api.gameshift.dev/nx/unique-assets', addNFT)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            console.log('Success:', response);
            alert('Mint NFT thành công!');
            loadDanhSachSanPham();
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Đã xảy ra lỗi khi mint NFT!');
        });
}


//Hiển thị table danh sách sản phẩm
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.gameshift.dev/nx/items?page=1&perPage=9&ownerReferenceId=1';
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': API_KEY
        }
    };

    fetch(API_URL, options)
        .then(response => response.json())
        .then(response => {
            console.log(response); // In ra dữ liệu để kiểm tra cấu trúc

            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = ''; // Xóa nội dung cũ

            response.data.forEach(entry => {
                if (entry.type === "UniqueAsset") {
                    const item = entry.item;

                    const soLuongAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
                    const quantity = soLuongAttribute ? soLuongAttribute.value : 'N/A';

                    const giaTienAttribute = item.attributes.find(attr => attr.traitType === 'GiaTien');
                    const price = giaTienAttribute ? giaTienAttribute.value : 'N/A';

                    const row = document.createElement('tr');

                    const imgTd = document.createElement('td');
                    imgTd.className = 'img-center'; // Đặt class để căn giữa
                    const img = document.createElement('img');
                    img.src = item.imageUrl || 'img/fruite-item-5.jpg';
                    img.alt = item.name || 'Image';
                    imgTd.appendChild(img);

                    const nameTd = document.createElement('td');
                    nameTd.className = 'text-center';
                    nameTd.textContent = item.name || 'Unknown Item';

                    const descriptionTd = document.createElement('td');
                    descriptionTd.className = 'text-center';
                    descriptionTd.textContent = item.description || 'Không có mô tả';

                    const quantityTd = document.createElement('td');
                    quantityTd.className = 'text-center';
                    quantityTd.textContent = quantity;

                    const priceTd = document.createElement('td');
                    priceTd.className = 'text-center';
                    priceTd.textContent = price;

                    const actionTd = document.createElement('td');
                    actionTd.className = 'text-center';
                    const actionDiv = document.createElement('div');
                    actionDiv.className = 'action-btns';

                    const editBtn = document.createElement('button');
                    editBtn.className = 'btn btn-warning';
                    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
                    editBtn.addEventListener('click', () => {
                        // Thêm hành động sửa sản phẩm ở đây
                        alert(`Chỉnh sửa ${item.name}`);
                    });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn btn-danger';
                    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
                    deleteBtn.addEventListener('click', () => {
                        // Thêm hành động xóa sản phẩm ở đây
                        alert(`Xóa ${item.name}`);
                    });

                    actionDiv.appendChild(editBtn);
                    actionDiv.appendChild(deleteBtn);
                    actionTd.appendChild(actionDiv);

                    row.appendChild(imgTd);
                    row.appendChild(nameTd);
                    row.appendChild(descriptionTd);
                    row.appendChild(quantityTd);
                    row.appendChild(priceTd);
                    row.appendChild(actionTd);

                    productTableBody.appendChild(row);
                }
            });
        })
        .catch(err => console.error(err));
});

//Hiển thị danh mục sản phẩm
function loadDanhMucSanPham() {
    fetch('https://api.gameshift.dev/nx/asset-collections', options)
        .then(response => response.json())
        .then(response => {
            const combobox = document.getElementById('assetCollectionCombobox');
            combobox.innerHTML = '';
            const op = document.createElement('option');
            op.text = "Chọn danh mục sản phẩm"
            combobox.add(op);
            response.data.forEach(assetCollection => {
                const option = document.createElement('option');
                option.value = assetCollection.id;
                option.text = assetCollection.name;
                combobox.add(option);
            });
        })
        .catch(err => console.error(err));

    document.getElementById('assetCollectionCombobox').addEventListener('change', function () {
        const selectedId = this.value;
        console.log('ID được chọn:', selectedId);
    });
}

function logout() {
    // Xóa thông tin người dùng từ localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('walletAddress');
    
    // Chuyển hướng về trang đăng nhập hoặc trang chủ
    window.location.href = '../index.html'; // Thay đổi đường dẫn nếu cần
}

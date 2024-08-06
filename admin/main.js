
var apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'x-api-key': apiKey
    }
};

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
    const collectionId = document.getElementById('assetCollectionComboboxAdd').value;
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
                attributes: [{ traitType: 'GiaTien', value: giaBan }, { traitType: 'SoLuong', value: soLuong }],
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
function loadDanhSachSanPham() {
    fetch('https://api.gameshift.dev/nx/items?page=1&perPage=9&ownerReferenceId=admin', options)
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
                        const actionEditCell = row.insertCell(6);
                        const actionDeleteCell = row.insertCell(7);
    
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
                        editButton.onclick = () => editRow(item);
                        actionEditCell.appendChild(editButton);
    
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Xóa';
                        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                        deleteButton.onclick = () => deleteRow(item);
                        actionDeleteCell.appendChild(deleteButton);
                    }
            });
        })
        .catch(err => console.error(err));
}

function updateNft() {
    const collectionId = document.getElementById('assetCollectionComboboxEdit').value;
    console.log(collectionId);
    const name = document.getElementById('tenSanPhamEdit').value;
    const price = document.getElementById('giaBanEdit').value;
    const quantity = document.getElementById('soLuongEdit').value;
    const description = document.getElementById('moTaEdit').value;
    const imageUrl = document.getElementById('fileInputEdit').value;

    const itemId = selectedItem.id; // Giả sử bạn đã lưu ID của mục được chọn vào biến selectedItem trước đó
    const updateN = {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'x-api-key': apiKey,
            'content-type': 'application/json'
        }
    };

    const body = {
        collectionId,
        name,
        attributes: [
            { traitType: 'GiaTien', value: price },
            { traitType: 'SoLuong', value: quantity }
        ],
        description,
        imageUrl
    };

    fetch(`https://api.gameshift.dev/nx/unique-assets/${itemId}`, {
        ...updateN,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // Cập nhật giao diện người dùng sau khi API trả về phản hồi thành công
            alert("Update thành công")
            loadDanhSachSanPham();
        })
        .catch(err => console.error(err));
}

let selectedItem = null; // Biến để lưu mục được chọn

function editRow(item) {
    selectedItem = item; // Lưu mục được chọn vào biến
    document.getElementById('assetCollectionComboboxEdit').value = item.collection.id;
    document.getElementById('tenSanPhamEdit').value = item.name || '';
    document.getElementById('giaBanEdit').value = item.attributes.find(attr => attr.traitType === 'GiaTien')?.value || '';
    document.getElementById('soLuongEdit').value = item.attributes.find(attr => attr.traitType === 'SoLuong')?.value || '';
    document.getElementById('moTaEdit').value = item.description || '';
    document.getElementById('fileInputEdit').value = item.imageUrl || '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadDanhSachSanPham();
    loadDanhMucSanPham();
});

//Hiển thị danh mục sản phẩm
function loadDanhMucSanPham() {
    fetch('https://api.gameshift.dev/nx/asset-collections', options)
        .then(response => response.json())
        .then(response => {
            const comboboxAdd = document.getElementById('assetCollectionComboboxAdd');
            const comboboxEdit = document.getElementById('assetCollectionComboboxEdit');
            comboboxAdd.innerHTML = '';
            comboboxEdit.innerHTML = '';
            const opAdd = document.createElement('option');
            const opEdit = document.createElement('option');
            opAdd.text = "Chọn danh mục sản phẩm";
            opEdit.text = "Chọn danh mục sản phẩm";
            comboboxAdd.add(opAdd);
            comboboxEdit.add(opEdit);
            response.data.forEach(assetCollection => {
                const optionAdd = document.createElement('option');
                const optionEdit = document.createElement('option');
                optionAdd.value = assetCollection.id;
                optionEdit.value = assetCollection.id;
                optionAdd.text = assetCollection.name;
                optionEdit.text = assetCollection.name;
                comboboxAdd.add(optionAdd);
                comboboxEdit.add(optionEdit);
            });
        })
        .catch(err => console.error(err));

    document.getElementById('assetCollectionComboboxAdd').addEventListener('change', function () {
        const selectedId = this.value;
        console.log('ID được chọn (Add):', selectedId);
    });

    document.getElementById('assetCollectionComboboxEdit').addEventListener('change', function () {
        const selectedId = this.value;
        console.log('ID được chọn (Edit):', selectedId);
    });
}


loadDanhMucSanPham();
loadDanhSachSanPham();
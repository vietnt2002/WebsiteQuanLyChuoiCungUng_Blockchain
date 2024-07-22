
var apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJiMWIwNWFjNC1jNTUxLTQ2NjctYjk2OS0zZDZjZjkzZGQ0NjEiLCJzdWIiOiJiNTdhMjg1Ni1hMDU2LTQ3YjItYjc2Mi02YzFmZDVlOGJlNDQiLCJpYXQiOjE3MjEzMTkxNjJ9.lex6kIBaEIrQbiRzGNDvvQDZw1trjOy817GZ0se5inI";
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
            destinationUserReferenceId: '1'
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
        fetch('https://api.gameshift.dev/nx/items?page=1&perPage=9&ownerReferenceId=1', options)
            .then(response => response.json())
            .then(response => {
                console.log(response); // In ra dữ liệu để kiểm tra cấu trúc

                const productContainer = document.getElementById('productContainer').querySelector('.row');
                productContainer.innerHTML = ''; // Xóa nội dung cũ

                response.data.forEach(entry => {
                    if (entry.type === "UniqueAsset") {
                        const item = entry.item;

                        // Tạo thẻ card
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-md-6 col-lg-4 col-xl-3';

                        const cardDiv = document.createElement('div');
                        cardDiv.className = 'rounded position-relative fruite-item';

                        const imgDiv = document.createElement('div');
                        imgDiv.className = 'fruite-img';

                        const img = document.createElement('img');
                        img.src = item.imageUrl || 'img/fruite-item-5.jpg';
                        img.className = 'img-fluid w-100 rounded-top';
                        img.alt = item.name || 'Image';
                        imgDiv.appendChild(img);

                        const categoryDiv = document.createElement('div');
                        categoryDiv.className = 'text-white bg-secondary px-3 py-1 rounded position-absolute';
                        categoryDiv.style.top = '10px';
                        categoryDiv.style.left = '10px';
                        categoryDiv.textContent = item.collection.name || 'Fruits';
                        cardDiv.appendChild(categoryDiv);

                        const contentDiv = document.createElement('div');
                        contentDiv.className = 'p-4 border border-secondary border-top-0 rounded-bottom';

                        const itemName = document.createElement('h4');
                        itemName.textContent = item.name || 'Unknown Item';
                        contentDiv.appendChild(itemName);

                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt';
                        contentDiv.appendChild(itemDescription);

                        const dFlexDiv = document.createElement('div');
                        dFlexDiv.className = 'd-flex justify-content-between flex-lg-wrap';

                        const soLuongAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
                        const quantity = soLuongAttribute ? soLuongAttribute.value : 'N/A';

                        const giaTienAttribute = item.attributes.find(attr => attr.traitType === 'GiaTien');
                        const price = giaTienAttribute ? giaTienAttribute.value : '$4.99 / kg';

                        const priceP = document.createElement('p');
                        priceP.className = 'text-dark fs-5 fw-bold mb-0';
                        priceP.textContent = `${price} / ${quantity}`;
                        dFlexDiv.appendChild(priceP);

                        const addToCartA = document.createElement('a');
                        addToCartA.href = '#';
                        addToCartA.className = 'btn border border-secondary rounded-pill px-3 text-primary';
                        addToCartA.innerHTML = '<i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart';
                        dFlexDiv.appendChild(addToCartA);

                        contentDiv.appendChild(dFlexDiv);
                        cardDiv.appendChild(imgDiv);
                        cardDiv.appendChild(contentDiv);
                        colDiv.appendChild(cardDiv);
                        productContainer.appendChild(colDiv);
                    }
                });
            })
            .catch(err => console.error(err));
    }


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


loadDanhMucSanPham();
loadDanhSachSanPham();


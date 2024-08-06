(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

//new
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

var API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'x-api-key': API_KEY
    }
};

document.addEventListener('DOMContentLoaded', () => {
    function loadDanhSachSanPham() {
        fetch('https://api.gameshift.dev/nx/items?page=1&perPage=9&ownerReferenceId=admin', options)
            .then(response => response.json())
            .then(response => {
                const productContainer = document.getElementById('productContainer').querySelector('.row');
                productContainer.innerHTML = '';

                response.data.forEach(entry => {
                    if (entry.type === "UniqueAsset") {
                        const item = entry.item;
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col-md-6 col-lg-4 col-xl-3 mt-3';
                        
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
                        contentDiv.className = 'p-4 border border-secondary border-top-0 rounded-bottom product-details';
                        
                        const itemName = document.createElement('h4');
                        itemName.textContent = item.name || 'Unknown Item';
                        contentDiv.appendChild(itemName);
                        
                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt';
                        contentDiv.appendChild(itemDescription);

                        const soLuongAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
                        const quantity = soLuongAttribute ? soLuongAttribute.value : ' ';

                        const giaTienAttribute = item.attributes.find(attr => attr.traitType === 'GiaTien');
                        const price = giaTienAttribute ? giaTienAttribute.value : ' ';

                        const priceP = document.createElement('p');
                        priceP.className = 'price';
                        priceP.textContent = `Price: ${price} Sol`;
                        contentDiv.appendChild(priceP);

                        const quantityP = document.createElement('p');
                        quantityP.className = 'quantity';
                        quantityP.textContent = `Quantity: ${quantity}`;
                        contentDiv.appendChild(quantityP);

                        const dFlexDiv = document.createElement('div');
                        dFlexDiv.className = 'd-flex justify-content-between flex-lg-wrap';

                        const addToCartA = document.createElement('a');
                        addToCartA.href = '#';
                        addToCartA.className = 'btn border border-secondary rounded-pill px-3 text-primary';
                        addToCartA.innerHTML = '<i class="fa fa-shopping-bag me-2 text-primary"></i> Pay';
                        addToCartA.setAttribute('data-bs-toggle', 'modal');
                        addToCartA.setAttribute('data-bs-target', '#purchaseModal');
                        addToCartA.setAttribute('data-quantity', quantity);
                        addToCartA.setAttribute('data-price', price);
                        addToCartA.setAttribute('data-colection-id', item.collection.id);
                        addToCartA.setAttribute('data-item-id', item.id);
                        addToCartA.setAttribute('data-image-url', item.imageUrl);
                        addToCartA.setAttribute('data-name', item.name);
                        addToCartA.setAttribute('data-description', item.description);
                        dFlexDiv.appendChild(addToCartA);

                        contentDiv.appendChild(dFlexDiv);
                        cardDiv.appendChild(imgDiv);
                        cardDiv.appendChild(contentDiv);
                        colDiv.appendChild(cardDiv);
                        productContainer.appendChild(colDiv);
                    }
                });

                document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
                    btn.addEventListener('click', (event) => {
                        const maxQuantity = event.currentTarget.getAttribute('data-quantity');
                        const price = event.currentTarget.getAttribute('data-price');
                        const colectionId = event.currentTarget.getAttribute('data-colection-id');
                        const itemId = event.currentTarget.getAttribute('data-item-id');
                        const imageUrl = event.currentTarget.getAttribute('data-image-url');
                        const name = event.currentTarget.getAttribute('data-name');
                        const description = event.currentTarget.getAttribute('data-description');
                        document.getElementById('quantity').max = maxQuantity;
                        document.getElementById('quantity').dataset.price = price;
                        document.getElementById('quantity').dataset.maxQuantity = maxQuantity;
                        document.getElementById('quantity').dataset.colectionId = colectionId;
                        document.getElementById('quantity').dataset.itemId = itemId;
                        document.getElementById('quantity').dataset.imageUrl = imageUrl;
                        document.getElementById('quantity').dataset.name = name;
                        document.getElementById('quantity').dataset.description = description;
                    });
                });
            })
            .catch(err => console.error(err));
    }

    document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const maxQuantity = parseInt(document.getElementById('quantity').dataset.maxQuantity);
        const price = parseFloat(document.getElementById('quantity').dataset.price);
        const image = document.getElementById('quantity').dataset.imageUrl;
        const productName = document.getElementById('quantity').dataset.name;
        const description = document.getElementById('quantity').dataset.description;
        const totalPrice = quantity * price;
        const colectionId = document.getElementById('quantity').dataset.colectionId;
        const itemId = document.getElementById('quantity').dataset.itemId;
    
        const walletAddress = localStorage.getItem('walletAddress');
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
    
        const provider = window.solana;
        if (!provider || !provider.isPhantom) {
            alert('Phantom Wallet is not installed.');
            return;
        }
    
        try {
            // Connect to Phantom
            const { publicKey } = await provider.connect();
            const fromPubkey = new solanaWeb3.PublicKey(walletAddress);
            const toPubkey = new solanaWeb3.PublicKey("DvQDRqTzDjVqAA8CNTjDNRQDH97LvcEQWJiJtTpFYhk3");
    
            // Get recent blockhash
            const { blockhash } = await connection.getRecentBlockhash();
    
            // Convert price to lamports
            const lamports = totalPrice * solanaWeb3.LAMPORTS_PER_SOL;
    
            // Create transaction
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPubkey,
                    lamports: lamports,
                })
            );
    
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;
    
            console.log('Transaction:', transaction);
    
            // Sign and send transaction
            const signedTransaction = await provider.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    
            await connection.confirmTransaction(signature);
    
            console.log('Transaction successful!', signature);
    
            // Update quantity on successful transaction
            var newQuantity = maxQuantity - quantity;
            await updateProductQuantity(itemId, newQuantity, price);
            await addItemToWallet(colectionId, quantity, price, image, productName, description);
            alert(`Transaction successful! Total SOL deducted: ${totalPrice}`);
            location.reload(); // Reload the page after successful payment
        } catch (error) {
            console.error('Transaction failed', error);
            if (error.message.includes('User rejected the request')) {
                alert('Transaction rejected by the user.');
            } else {
                alert(`Transaction failed. Please try again. Error: ${error.message}`);
            }
        }
    });

    async function fetchCollectionData(collectionId) {
        console.log(collectionId);
        try {
            const response = await fetch(`https://api.gameshift.dev/nx/asset-collections/${collectionId}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const collectionData = await response.json();
            return {
                name: collectionData.name,
                imageUrl: collectionData.imageUrl,
                description: collectionData.description
            };
        } catch (error) {
            console.error('Error fetching collection:', error);
            throw error;
        }
    }

    async function createNewCollection(collectionInfo) {
        try {
            const response = await fetch(`https://api.gameshift.dev/nx/asset-collections`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'x-api-key': API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: collectionInfo.name,
                    imageUrl: collectionInfo.imageUrl,
                    description: collectionInfo.description
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new collection');
            }
    
            const newCollectionData = await response.json();
            return newCollectionData.id; // Return the new collection ID
        } catch (error) {
            console.error('Error creating new collection:', error);
            throw error;
        }
    }

    async function addItemToWallet(originalCollectionId, quantity, price, image, productName, description) {
        const username = localStorage.getItem('username');
        console.log('Username:', username);
        console.log('colectionId:', originalCollectionId);
        console.log('quantity:', quantity);
        console.log('price:', price);
        console.log('image:', image);
        console.log('productName:', productName);
        console.log('description:', description);
    
        try {
            const originalCollectionInfo = await fetchCollectionData(originalCollectionId);
            const newCollectionId = await createNewCollection(originalCollectionInfo);
            console.log('New Collection ID:', newCollectionId);
    
            const addNFT = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'x-api-key': API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    details: {
                        attributes: [{ traitType: 'GiaTien', value: price.toString() }, { traitType: 'SoLuong', value: quantity.toString() }],
                        collectionId: newCollectionId,
                        description: description,
                        imageUrl: image,
                        name: productName
                    },
                    destinationUserReferenceId: username
                })
            };
    
            const response = await fetch('https://api.gameshift.dev/nx/unique-assets', addNFT);
            console.log('Response Status:', response.status);
    
            const responseData = await response.json();
            console.log('Response Data:', responseData);
    
            if (!response.ok) {
                throw new Error(responseData.message || 'Network response was not ok');
            }
    
            console.log('Success:', responseData);
            alert('Mint NFT thành công!');
            loadDanhSachSanPham();
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi mint NFT!');
        }
    }
    

    async function updateProductQuantity(itemId, newQuantity, price) {
        const updateProductRequest = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'x-api-key': API_KEY, // Thay thế bằng API key thực tế của bạn
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attributes: [
                    { traitType: 'SoLuong', value: newQuantity.toString() },
                    { traitType: 'GiaTien', value: price.toString() }
                ]
            })
        };
    
        fetch(`https://api.gameshift.dev/nx/unique-assets/${itemId}`, updateProductRequest)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Product quantity updated successfully:', data);
                // Cập nhật giao diện người dùng sau khi API trả về phản hồi thành công
                alert('Số lượng sản phẩm đã được cập nhật thành công!');
                // Gọi hàm để tải lại danh sách sản phẩm hoặc thực hiện các thao tác khác nếu cần
                loadDanhSachSanPham(); // Thay thế bằng hàm thực tế để tải lại danh sách sản phẩm
            })
            .catch(error => {
                console.error('Error updating product quantity:', error);
                alert(`Lỗi khi cập nhật số lượng sản phẩm: ${error.message}`);
            });
    }

    loadDanhSachSanPham();
});


// function updateNftQuantity(itemId, purchasedQuantity) {
//     fetch(`https://api.gameshift.dev/nx/items/${itemId}`, {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             'x-api-key': API_KEY
//         }
//     })
//     .then(response => response.json())
//     .then(item => {
//         const currentQuantityAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
//         const currentQuantity = currentQuantityAttribute ? parseInt(currentQuantityAttribute.value) : 0;

//         const newQuantity = currentQuantity - parseInt(purchasedQuantity);

//         const updateBody = {
//             collectionId: item.collectionId,
//             name: item.name,
//             attributes: [
//                 { traitType: 'GiaTien', value: item.attributes.find(attr => attr.traitType === 'GiaTien')?.value || 'N/A' },
//                 { traitType: 'SoLuong', value: newQuantity.toString() }
//             ],
//             description: item.description,
//             imageUrl: item.imageUrl
//         };

//         return fetch(`https://api.gameshift.dev/nx/unique-assets/${itemId}`, {
//             method: 'PUT',
//             headers: {
//                 accept: 'application/json',
//                 'x-api-key': API_KEY,
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(updateBody)
//         });
//     })
//     .then(response => response.json())
//     .then(response => {
//         console.log('Updated item:', response);
//     })
//     .catch(err => console.error('Error updating item:', err));
// }

// function mintNft(itemId, quantity) {
//     fetch(`https://api.gameshift.dev/nx/items/${itemId}`, {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             'x-api-key': API_KEY
//         }
//     })
//     .then(response => response.json())
//     .then(item => {
//         const collectionId = item.collectionId;
//         const tenSanPham = item.name;
//         const giaBanAttribute = item.attributes.find(attr => attr.traitType === 'GiaTien');
//         const giaBan = giaBanAttribute ? giaBanAttribute.value : 'N/A';
//         const soLuongAttribute = item.attributes.find(attr => attr.traitType === 'SoLuong');
//         const soLuong = soLuongAttribute ? soLuongAttribute.value : 'N/A';
//         const moTa = item.description;
//         const fileInput = item.imageUrl;

//         if (!collectionId || !tenSanPham || !giaBan || !soLuong || !moTa || !fileInput) {
//             alert("Không thể lấy thông tin NFT!");
//             return;
//         }

//         const addNFT = {
//             method: 'POST',
//             headers: {
//                 accept: 'application/json',
//                 'x-api-key': API_KEY,
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 details: {
//                     attributes: [
//                         { traitType: 'GiaTien', value: giaBan },
//                         { traitType: 'SoLuong', value: quantity }
//                     ],
//                     collectionId: collectionId,
//                     description: moTa,
//                     imageUrl: fileInput,
//                     name: tenSanPham
//                 },
//                 destinationUserReferenceId: 'admin'
//             })
//         };

//         return fetch('https://api.gameshift.dev/nx/unique-assets', addNFT);
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(response => {
//         console.log('Success:', response);
//         alert('Mint NFT thành công!');
//         loadDanhSachSanPham();
//     })
//     .catch(err => {
//         console.error('Error:', err);
//         alert('Đã xảy ra lỗi khi mint NFT!');
//     });
    
//     console.log(`Minting ${quantity} of item ${itemId} to buyer's wallet`);
// }
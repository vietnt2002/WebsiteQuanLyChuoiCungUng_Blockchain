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
        console.log($videoSrc);

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

//load san pham 

var apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': apiKey
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
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

        document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const quantity = document.getElementById('quantity').value;
            const price = document.getElementById('quantity').dataset.price;
            const totalPrice = quantity * price;
    
            const walletAddress = localStorage.getItem('walletAddress');
            console.log(walletAddress);
            if (!walletAddress) {
                alert('Wallet address not found. Please log in again.');
                return;
            }
    
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
    
            const provider = window.solana;
            if (!provider || !provider.isPhantom) {
                alert('Phantom Wallet is not installed.');
                return;
            }
    
            try {
                // Connect to Phantom
                await provider.connect();
                const fromPubkey = new solanaWeb3.PublicKey(walletAddress);
    
                // Lấy recent blockhash
                const { blockhash } = await connection.getRecentBlockhash();
    
                // Tạo giao dịch
                const transaction = new solanaWeb3.Transaction().add(
                    solanaWeb3.SystemProgram.transfer({
                        fromPubkey: fromPubkey,
                        toPubkey: "FR3q2GB1hQBbikju99HNwkxZbJm2nDwyhfatKxTTRpNU",
                        lamports: totalPrice * solanaWeb3.LAMPORTS_PER_SOL,
                    })
                );
    
                // Đặt blockhash và feePayer
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = fromPubkey;
    
                // Ký giao dịch
                const signedTransaction = await provider.signTransaction(transaction);
    
                // Gửi giao dịch
                const signature = await connection.sendRawTransaction(signedTransaction.serialize());
                await connection.confirmTransaction(signature);
    
                console.log('Transaction successful!', signature);
                alert('Transaction successful!');
                location.reload();
            } catch (error) {
                if (error.message === 'User rejected the request.') {
                    alert('Transaction rejected by the user.');
                } else {
                    console.error('Transaction failed', error);
                    alert('Transaction failed. Please try again.');
                }
            }
        });
        loadDanhSachSanPham();
    });
    
    document.getElementById('purchaseForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const quantity = document.getElementById('quantity').value;
        console.log(`Quantity to purchase: ${quantity}`);
        // Add logic to handle purchase
        // Hide modal after purchase
        const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
        purchaseModal.hide();
    });
    

loadDanhSachSanPham();
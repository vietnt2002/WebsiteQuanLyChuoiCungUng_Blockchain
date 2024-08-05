document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.gameshift.dev/nx/users';
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxMDM1ZGExYi1hMGQ4LTRkODMtOTkzOC0zNTk4ZmEzZmMwOTEiLCJzdWIiOiIzNTVmZGNiMS0yOTRhLTQ0NjUtOTEwNS0wMDQ3OGQxYzFhMmMiLCJpYXQiOjE3MjI4MjI0MjB9.7UiLh24sJXQGJDwh3PVcC1nsI8cYBXOzbF24UFHSEiU';
    let publicKey = '';

    const connectWallet = async () => {
        try {
            await window.phantom.solana.connect();
            publicKey = window.phantom.solana.publicKey.toBase58();
            console.log(publicKey);
            document.getElementById('externalWalletAddress').value = publicKey; // Cập nhật giá trị của trường đầu vào ẩn
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    }

    const connectButton = document.getElementById('connect-btn');
    if (connectButton) {
        connectButton.addEventListener('click', connectWallet);
    } else {
        console.error('Connect button not found!');
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form

            // Lấy giá trị từ các trường đầu vào
            const email = document.getElementById('email').value;
            const externalWalletAddress = document.getElementById('externalWalletAddress').value;
            const referenceId = document.getElementById('referenceId').value;

            // Gọi hàm đăng ký với dữ liệu từ form
            registerUser(email, externalWalletAddress, referenceId);
        });
    } else {
        console.error('Register form not found!');
    }

    function registerUser(email, externalWalletAddress, referenceId) {
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-api-key': API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                externalWalletAddress: externalWalletAddress,
                referenceId: referenceId
            })
        };

        fetch(API_URL, options)
            .then(response => response.json())
            .then(data => {
                alert('Đăng ký thành công');
                window.location.href = 'login.html';
                // Thực hiện các hành động khác sau khi đăng ký thành công
            })
            .catch(err => {
                alert('Đăng ký thất bại');
                // Xử lý lỗi
            });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': API_KEY
                }
            };

            try {
                const response = await fetch(API_URL + '/' + username + '/wallet-address', options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Login successful:', data);

                // Lưu địa chỉ ví vào localStorage
                localStorage.setItem('walletAddress', data.address);
                localStorage.setItem('username', username);

                // Chuyển hướng đến trang chủ hoặc trang admin
                if (username === 'admin') {
                    window.location.href = '../admin/index.html'; // Thay đổi đường dẫn đến trang admin
                } else {
                    window.location.href = '../index.html'; // Thay đổi đường dẫn đến trang chủ
                }
            } catch (err) {
                console.error('Error during login:', err);
                // Hiển thị thông báo lỗi cho người dùng
                alert('Login failed. Please check your username and try again.');
            }
        });
    } else {
        console.error('Login form not found!');
    }
});

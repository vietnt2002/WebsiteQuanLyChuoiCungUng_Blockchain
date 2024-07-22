
const API_URL = 'https://api.gameshift.dev/nx/users';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwYzQ0MTJhMS04YjEwLTQyNGEtOTE3Ni02ZjZmOThiMjkzNDUiLCJzdWIiOiI0ZTQ2OTE3My1kODUzLTRkNjItYjhjZi0xYWNiMmUzMzQ4ODEiLCJpYXQiOjE3MjE2MjA4OTN9.Ib8MYJ2mi3azi0u2DXMOKw1QYmQyIi0wlRZMI5MGVc8';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        
        // Lấy giá trị từ các trường đầu vào
        const email = document.getElementById('email').value;
        const externalWalletAddress = document.getElementById('externalWalletAddress').value;
        const referenceId = document.getElementById('referenceId').value;

        // Gọi hàm đăng ký với dữ liệu từ form
        registerUser(email, externalWalletAddress, referenceId);
    });
});
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
            alert('Đăng ký thành công')
            window.location.href = 'login.html';
            // Thực hiện các hành động khác sau khi đăng ký thành công
        })
        .catch(err => {
            alert('Đăng ký thất bại')
            // Xử lý lỗi
        });
}


document.addEventListener('DOMContentLoaded', () => {
const API_URL = 'https://api.gameshift.dev/nx/users/';

    const WALLET_ADDRESS_URL_SUFFIX = '/wallet-address';

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': API_KEY
            }
        };
        
        fetch(API_URL + username + WALLET_ADDRESS_URL_SUFFIX, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Login successful:', data);
                
                // Lưu địa chỉ ví vào localStorage
                localStorage.setItem('walletAddress', data.address);
                localStorage.setItem('username', username)

                // Chuyển hướng đến trang chủ
                window.location.href = '../index.html'; // Thay đổi đường dẫn nếu cần
            })
            .catch(err => {
                console.error('Error during login:', err);
            });
    });
});
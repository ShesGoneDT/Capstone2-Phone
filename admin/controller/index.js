console.log("check nhúng");
const BASE_URL = "https://66e6f84917055714e58b1756.mockapi.io/";
var editedId = null;

// Lấy sản phẩm và hiển thị chúng
axios({
    url: `${BASE_URL}/products`,
    method: "GET",
})
    .then(function (res) {
        renderSanPham(res.data);
    })
    .catch(function (err) {
        console.log("🚀  file: index.js:13  err:", err);
    });


function fetchProducts() {
    turnOnLoading();
    axios({
        url: `${BASE_URL}/products`,
        method: "GET",
    })
        .then(function (res) {
            turnOffLoading();
            console.log("🚀  file: index.js:17  res:", res);
            renderSanPham(res.data);
        })
        .catch(function (err) {
            turnOffLoading();
            console.log("🚀  file: index.js:20  err:", err);
        })
}
fetchProducts();


function prepareForCreate() {
    // Đặt editedId về null để đảm bảo chế độ thêm mới
    editedId = null;
    // Xóa dữ liệu cũ trong các trường nhập liệu
    clearInput();
    
}

function createProduct() {
    var product = layThongTinTuForm();
    clearInput();
    axios({
        url: `${BASE_URL}/products`,
        method: "POST",
        data: product,
    })
        .then(function (res) {
            // tắt module sau khi thành công
            $("#myModal").modal("hide");
            // clear data input sau khi thêm
            clearInput();
            console.log(res);
            // lấy data sau khi thêm
            fetchProducts();
        })
        .catch(function (err) {
            console.log("🚀  file: index.js:42  res:", err);
        });
}

// Xóa sản phẩm
function deleteProduct(id) {
    axios({
        url: `${BASE_URL}/products/${id}`,
        method: "DELETE",
    })
        .then(function (res) {
            // console.log("🚀  file: res:", res);
            fetchProducts();
        })
        .catch(function (err) {
            console.log("🚀  file: err:", err);
        });
}


// Hàm để lọc sản phẩm
function filterProducts() {
    var selectedType = document.getElementById("productFilter").value;
    var filteredProducts = allProducts.filter(function (product) {
        if (selectedType === "all") {
            return true; // Hiển thị tất cả sản phẩm
        }
        return product.type.toLowerCase() === selectedType.toLowerCase();
    });
    renderSanPham(filteredProducts);
}

// lấy thông tin của sản phẩm dựa trên id để chuẩn bị cho việc chỉnh sửa
function editProduct(id) {
    editedId = id;
    axios({
        url: `${BASE_URL}/products/${id}`,
        method: "GET",
    })
        .then(function (res) {
            // hiển thị thông tin mở bảng model sau khi lấy đc thông tin từ id
            $("#myModal").modal("show");
            hienThiThongTin(res.data);
            // console.log("🚀  file: res:", res);
        })
        .catch(function (err) {
            console.log("🚀  file: err:", err);
        });

}



function updateProduct() {
    var product = layThongTinTuForm();
    // gọi api update sp theo id
    axios({
        url: `${BASE_URL}/products/${editedId}`,
        method: "PUT",
        data: product,
    })
        .then(function (res) {
            console.log("🚀  file: res:", res);
            // tắt modal sau khi cập nhật
            $("#myModal").modal("hide");
            fetchProducts();

        })
        .catch(function (err) {
            console.log("🚀  file: err:", err);

        });
}
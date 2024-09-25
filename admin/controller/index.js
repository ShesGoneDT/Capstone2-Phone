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
            allProducts = res.data; // Gán dữ liệu sản phẩm vào allProducts
            renderSanPham(allProducts); // Hiển thị sản phẩm
        })
        .catch(function (err) {
            turnOffLoading();
            console.log("🚀  file: index.js:20  err:", err);
        });
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
    var isValid = kiemTraRong(product.name, "spanten") & (kiemTraRong(product.price, "spangia") && kiemTraSo(product.price, "spangia")) & kiemTraRong(product.screen, "spanmanhinh") & kiemTraRong(product.backCamera, "spancamsau") & kiemTraRong(product.frontCamera, "spancamtruoc");
    if (isValid) {
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
var allProducts = []; // Khởi tạo mảng chứa tất cả sản phẩm
function filterProducts() {
    var selectedType = document.getElementById("productFilter").value;
    var filteredProducts = allProducts.filter(function (product) {
        if (selectedType === "All") {
            return true; // Hiển thị tất cả sản phẩm
        }
        return product.type.toLowerCase() === selectedType.toLowerCase(); // Lọc theo loại sản phẩm
    });
    renderSanPham(filteredProducts); // Hiển thị sản phẩm đã được lọc
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
    var isValid = kiemTraRong(product.name, "spanten") & (kiemTraRong(product.price, "spangia") && kiemTraSo(product.price, "spangia")) & kiemTraRong(product.screen, "spanmanhinh") & kiemTraRong(product.backCamera, "spancamsau") & kiemTraRong(product.frontCamera, "spancamtruoc");
    // gọi api update sp theo id
    if (isValid) {
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
}

function searchProductByName() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var filteredProducts = allProducts.filter(function (product) {
        return product.name.toLowerCase().includes(searchInput);
    });
    renderSanPham(filteredProducts); // Hiển thị sản phẩm sau khi tìm kiếm
}


function sortProductsByPrice() {
    var sortValue = document.getElementById("sortPrice").value;
    
    // Dùng danh sách sản phẩm đã lọc hoặc tìm kiếm để sắp xếp
    var filteredProducts = allProducts.filter(function (product) {
        var searchInput = document.getElementById("searchInput").value.toLowerCase();
        var selectedType = document.getElementById("productFilter").value;
        var isTypeMatch = selectedType === "All" || product.type.toLowerCase() === selectedType.toLowerCase();
        var isNameMatch = product.name.toLowerCase().includes(searchInput);

        return isTypeMatch && isNameMatch;
    });

    // Sắp xếp theo giá
    if (sortValue === "asc") {
        filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sortValue === "desc") {
        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    renderSanPham(filteredProducts); // Hiển thị sản phẩm đã được sắp xếp
}

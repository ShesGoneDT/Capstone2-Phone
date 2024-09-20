function renderSanPham(dataProduct) {
    var contentHTML = "";
    for (i = 0; i < dataProduct.length; i++) {
        var product = dataProduct[i];
        var content = `
   <tr>
   <td>${product.id}</td>
   <td>${product.name}</td>
   <td>${product.price}</td>
   <td>${product.screen}</td>
   <td>${product.backCamera}</td>
   <td>${product.frontCamera}</td>
   <td>${product.img}</td>
   <td>${product.desc}</td>
   <td>${product.type}</td>
   <td>
   <button onclick='editProduct(${product.id})' class="btn btn-primary">Sửa</button>
   <button onclick='deleteProduct(${product.id})' class="btn btn-success">Xóa</button>
   </td><tr>
   `;
        contentHTML += content;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}


function layThongTinTuForm() {
    var ten = document.getElementById("Name").value;
    var gia = document.getElementById("Price").value;
    var manhinh = document.getElementById("Screen").value;
    var camsau = document.getElementById("BackCamera").value;
    var camtruoc = document.getElementById("FrontCamera").value;
    var hinhanh = document.getElementById("Img").value;
    var mota = document.getElementById("Desc").value;
    var loai = document.getElementById("Type").value;
    return {
        name: ten,
        price: gia,
        screen: manhinh,
        backCamera: camsau,
        frontCamera: camtruoc,
        img: hinhanh,
        desc: mota,
        type: loai
    };
}


function hienThiThongTin(product) {
    document.getElementById("Name").value= product.name ;
    document.getElementById("Price").value=product.price ;
    document.getElementById("Screen").value=product.screen ;
    document.getElementById("BackCamera").value=product.backCamera ;
    document.getElementById("FrontCamera").value=product.frontCamera ;
    document.getElementById("Img").value=product.img ;
    document.getElementById("Desc").value=product.desc ;
    document.getElementById("Type").value=product.type ;
}



function clearInput() {
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("Screen").value = "";
    document.getElementById("BackCamera").value = "";
    document.getElementById("FrontCamera").value = "";
    document.getElementById("Img").value = "";
    document.getElementById("Desc").value = "";
    document.getElementById("Type").value = "All";
}


function turnOnLoading() {
    document.getElementById("loading").style.display = "block";
}
function turnOffLoading() {
    document.getElementById("loading").style.display = "none";
}
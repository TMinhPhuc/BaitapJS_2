// Hàm dùng chung
let dom = (selector) => {
    if (typeof selector == "string")
        return document.querySelector(selector);
    else
        return null;
}

let showResult = (selector, result) => {
    if (typeof selector == "string" && typeof result == "string") {
        let alert = dom(selector);
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.innerText = result;
        alert.classList.remove("d-none");
    }
    else
        alert("Function parameter type error");
}

let showError = (selector, error) => {
    if (typeof selector == "string" && typeof error == "string") {
        let alert = dom(selector);
        alert.classList.remove("alert-success");
        alert.classList.add("alert-danger");
        alert.innerText = error;
        alert.classList.remove("d-none");
    }
    else
        alert("Function parameter type error");
}

// Bài tập quản lý tuyển sinh
// Input: điểm chuẩn, khu vực, đối tượng, điểm 3 môn.
// Process:
//  + Kiểm tra dữ liệu đầu vào: điểm chuẩn nằm trong khoảng từ 0 đến 30, điểm từng môn nằm 
// trong khoản từ 0 đến 10.
//  + Tính điểm tổng 3 môn.
//  + Cộng điểm tổng 3 môn và điểm ưu tiên.
// Output: Điểm thí sinh đạt được, kết quả đậu hoặc rớt.

let kiemTraInputDiem = (diemChuan, diem1, diem2, diem3) => {
    if (isNaN(diemChuan) || isNaN(diem1) || isNaN(diem2) || isNaN(diem3)) {
        showError("#kqTuyenSinh", "Điểm nhập vào phải là số và không được để trống");
        return false;
    }
    if (diemChuan < 0 || diemChuan > 30) {
        showError("#kqTuyenSinh", "Điểm chuẩn phải là số trong khoảng 0 đến 30");
        return false;
    }
    if (diem1 < 0 || diem1 > 10) {
        showError("#kqTuyenSinh", "Điểm môn thứ nhất phải là số trong khoảng 0 đến 10");
        return false;
    }
    if (diem2 < 0 || diem2 > 10) {
        showError("#kqTuyenSinh", "Điểm môn thứ hai phải là số trong khoảng 0 đến 10");
        return false;
    }
    if (diem3 < 0 || diem3 > 10) {
        showError("#kqTuyenSinh", "Điểm môn thứ ba phải là số trong khoảng 0 đến 10");
        return false;
    }
    return true;
}

let tinhDiemUuTien = (khuVuc, doiTuong) => {
    let diemKhuVuc;
    let diemDoiTuong;
    switch (khuVuc) {
        case "X": {
            diemKhuVuc = 0;
            break;
        }
        case "A": {
            diemKhuVuc = 2;
            break;
        }
        case "B": {
            diemKhuVuc = 1;
            break;
        }
        case "C": {
            diemKhuVuc = 0.5;
            break;
        }
    }

    switch (doiTuong) {
        case "0": {
            diemDoiTuong = 0;
            break;
        }
        case "1": {
            diemDoiTuong = 2.5;
            break;
        }
        case "2": {
            diemDoiTuong = 1.5;
            break;
        }
        case "3": {
            diemDoiTuong = 1;
            break;
        }
    }

    return diemDoiTuong + diemKhuVuc;
}

let btnTuyenSinhClickEvent = () => {
    let diemChuan = parseFloat(dom("#diemChuan").value);
    let khuVuc = dom("#khuVuc").value;
    let doiTuong = dom("#doiTuong").value;
    let diem1 = parseFloat(dom("#diemMon1").value);
    let diem2 = parseFloat(dom("#diemMon2").value);
    let diem3 = parseFloat(dom("#diemMon3").value);
    if (kiemTraInputDiem(diemChuan, diem1, diem2, diem3)) {
        let diemCaNhan = diem1 + diem2 + diem3 + tinhDiemUuTien(khuVuc, doiTuong);
        if (diemCaNhan >= diemChuan)
            showResult("#kqTuyenSinh", `Kết quả đạt, điểm cá nhân: ${diemCaNhan}`);
        else
            showResult("#kqTuyenSinh", `Không đủ điểm tổng kết, điểm cá nhân: ${diemCaNhan}`);
    }
}

// Bài tập tính tiền điện
// Input: Họ tên người dùng, số điện tiêu thụ.
// Process:
//  + Kiểm tra dữ liệu nhập vào: tên phải là chuỗi khác rỗng, số điện tiêu thụ là số thực lớn hơn 0.
//  + Tính tiền điện tiêu thụ.
// Output: Tên người dùng kèm số tiền điện cần thanh toán.

let kiemTraInputTienDien = (hoten, soKw) => {
    if (hoten == "") {
        showError("#kqTienDien", "Họ tên người dùng không được để trống");
        return false;
    }
    if (isNaN(soKw)) {
        showError("#kqTienDien", "Số điện nhập vào phải là dạng số");
        return false;
    }
    if (soKw < 0) {
        showError("#kqTienDien", "Số điện nhập vào phải lớn hơn 0");
        return false;
    }
    return true;
}

let tinhTienDien = (soKw) => {
    let tienDien = 0;
    if (soKw > 50) {
        tienDien += 500 * 50;
    }
    else {
        tienDien += soKw * 500;
        return tienDien;
    }
    if (soKw > 100) {
        tienDien += 650 * 50;
    }
    else {
        tienDien += (soKw - 50) * 650;
        return tienDien;
    }
    if (soKw > 200) {
        tienDien += 850 * 100;
    }
    else {
        tienDien += (soKw - 100) * 850;
        return tienDien;
    }
    if (soKw > 350) {
        tienDien += 1100 * 150;
        tienDien += (soKw - 350) * 1300;
        return tienDien;
    }
    else {
        tienDien += (soKw - 200) * 1100;
        return tienDien;
    }
}

let btnTinhDienClickEvent = () => {
    let hoten = dom("#tenDien").value;
    let soKw = parseFloat(dom("#soKw").value);
    if (kiemTraInputTienDien(hoten, soKw)) {
        showResult("#kqTienDien", `Khach hàng: ${hoten}. Tien dien: ${tinhTienDien(soKw).toLocaleString()}đ`);
    }
}

//  Bài tập tính thuế
//  Input: Họ tên, tổng thu nhập năm, số người phụ thuộc.
//  Process:
//      + Kiểm tra input đầu vào: họ tên là chuỗi khác "", tổng thu nhập là số thực
//      lớn hơn 0 và số người phụ thuộc phải là số nguyên lớn hơn 0.
//      + Tinh thu nhập chịu thuế.
//      + Tính thuế thu nhập cá nhân.
//  Output: Họ tên kèm thuế thu nhập cá nhân.

let kiemTraInputThue = (hoTen, thuNhap, soNguoiPhuThuoc) => {
    let soNguoiPhuThuocNumber = Number(soNguoiPhuThuoc);
    if (hoTen == "") {
        showError("#kqTienThue", "Họ tên không được để trống");
        return false;
    }
    if (isNaN(thuNhap)) {
        showError("#kqTienThue", "Thu nhập phải là số thực");
        return false;
    }
    if (thuNhap < 0) {
        showError("#kqTienThue", "Thu nhập phải lớn hơn 0");
        return false;
    }
    if (soNguoiPhuThuoc == "" || Number.isInteger(soNguoiPhuThuocNumber) == false) {
        showError("#kqTienThue", "Số người phụ thuộc phải là số nguyên");
        return false;
    }
    if (soNguoiPhuThuoc < 0) {
        showError("#kqTienThue", "Số người phụ thuộc phải lớn hơn 0");
        return false;
    }
    return true;
}

let tinhThue = (thuNhap, soNguoiPhuThuoc) => {
    let thuNhapTinhThue = thuNhap - 4000000 - (soNguoiPhuThuoc * 1600000);
    if (thuNhapTinhThue > 0 && thuNhapTinhThue <= 60000000) {
        return thuNhapTinhThue * 0.05;
    }
    if (thuNhapTinhThue > 60000000 && thuNhapTinhThue <= 120000000) {
        return thuNhapTinhThue * 0.1;
    }
    if (thuNhapTinhThue > 120000000 && thuNhapTinhThue <= 210000000) {
        return thuNhapTinhThue * 0.15;
    }
    if (thuNhapTinhThue > 210000000 && thuNhapTinhThue <= 384000000) {
        return thuNhapTinhThue * 0.2;
    }
    if (thuNhapTinhThue > 384000000 && thuNhapTinhThue <= 624000000) {
        return thuNhapTinhThue * 0.25;
    }
    if (thuNhapTinhThue > 624000000 && thuNhapTinhThue <= 960000000) {
        return thuNhapTinhThue * 0.3;
    }
    if (thuNhapTinhThue > 960000000) {
        return thuNhapTinhThue * 0.35;
    }
    return 0;
}

let btnTinhThueClickEvent = () => {
    let hoTen = dom("#tenThue").value;
    let thuNhap = parseFloat(dom("#tongThuNhap").value);
    let soNguoiPhuThuoc = dom("#nguoiPhuThuoc").value;
    if (kiemTraInputThue(hoTen, thuNhap, soNguoiPhuThuoc)) {
        let soNguoiPhuThuocInt = parseInt(soNguoiPhuThuoc);
        showResult("#kqTienThue", `Tổng tiền thuế của ${hoTen}: ${tinhThue(thuNhap, soNguoiPhuThuocInt).toLocaleString()} VND`);
    }
}

//  Bài toán tính tiền cáp
//  Input: loại khách hàng, mã khách hàng, số kênh cao cấp, số kết nối 
// (nếu khách hàng) là doanh nghiệp.
//  Process:
//      + Thiết lập sự kiện khi thay đổi loại khách hàng, nếu khách là
//      doanh nghiệp thì enable input nhập số kết nối, nếu không thì disable.
//      + Kiểm tra giá trị input đầu vào: mã khách hàng khác rỗng, số kênh cao cấp,
//      số đầu kết nối nếu khách hàng là doanh nghiệp.
//      + Tính tiền cáp cần đóng.
//  Output: Mã khách hàng kèm tiền cáp cần đóng.

let loaiKhachHangChangeEvent = () => {
    let loaiKhachHang = dom("#loaiKhachHang").value;
    let soKetNoiDom = dom("#khungSoKetNoi");
    if (loaiKhachHang == "doanhNghiep") {
        soKetNoiDom.classList.remove("d-none");
    }
    else {
        soKetNoiDom.classList.add("d-none");
    }
}

let kiemTraInputCap = (maKH, loaiKhachHang, soKenhCaoCap, soKetNoi = null) => {
    let soKenhCaoCapNumber = Number(soKenhCaoCap);
    let soKetNoiNumber = soKetNoi ? Number(soKetNoi) : null;
    if (maKH == "") {
        showError("#kqTienCap", "Mã khách hàng không được để trống");
        return false;
    }
    if (soKenhCaoCap == "" || !Number.isInteger(soKenhCaoCapNumber)) {
        showError("#kqTienCap", "Số kênh cao cấp phải là số nguyên");
        return false;
    }
    if (soKenhCaoCapNumber < 0) {
        showError("#kqTienCap", "Số kênh cao cấp phải lớn hơn hoặc bằng 0");
        return false;
    }
    if (loaiKhachHang == "doanhNghiep") {
        if (soKetNoi == "" || !Number.isInteger(soKetNoiNumber)) {
            showError("#kqTienCap", "Số kết nối phải là số nguyên");
            return false;
        }
        if ( soKetNoiNumber < 0 ) {
            showError("#kqTienCap", "Số kết nối phải lớn hơn hoặc bằng 0");
            return false;
        }
    }
    return true;
}

let tinhTienCap = (loaiKhachHang, soKenhCaoCap, soKetNoi) => {
    let phiHoaDon;
    let phiDichVuCoBan;
    let phiKenhCaoCap;
    if (loaiKhachHang == "nhaDan") {
        phiHoaDon = 4.5;
        phiDichVuCoBan = 20.5;
        phiKenhCaoCap = 7.5 * soKenhCaoCap;
    }
    else {
        phiHoaDon = 15;
        if (soKetNoi <= 10) {
            phiDichVuCoBan = 75;
        }
        else {
            phiDichVuCoBan = 75 + ((soKetNoi - 10) * 5);
        }
        phiKenhCaoCap = 50 * soKenhCaoCap;
    }
    return phiHoaDon + phiDichVuCoBan + phiKenhCaoCap;
}

let btnTinhCapClickEvent = () => {
    let maKH = dom("#maKhachHang").value;
    let loaiKhachHang = dom("#loaiKhachHang").value;
    let soKetNoi = dom("#soKetNoi").value;
    let soKenhCaoCap = dom("#soKenhCaoCap").value;
    if (kiemTraInputCap(maKH, loaiKhachHang, soKenhCaoCap, soKetNoi)) {
        let soKenhCaoCapInt = parseInt(soKenhCaoCap);
        let soKetNoiInt = parseInt(soKetNoi);
        showResult("#kqTienCap", `Tiền cáp cần thanh toán của khách hàng mã ${maKH}: ${tinhTienCap(loaiKhachHang, soKenhCaoCapInt, soKetNoiInt)}$`);
    }
}
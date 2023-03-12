var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", { templateUrl: "./home.html", controller: getLaptopController })
        .when("/gioithieu", { templateUrl: "./gioithieu.html", })
        .when("/giohang", { templateUrl: "./giohang.html", })
        .when("/khuyenmai", { templateUrl: "./khuyenmai.html", })
        .when("/chitietlaptop/:id", { templateUrl: "./chitietlaptop.html", controller: chiTietLaptopController })
        .when("/quanlylaptop", { templateUrl: "./quanlylaptop.html", controller: quanLyLaptopController })
        .when("/dangnhap", { templateUrl: "./dangnhap.html", controller: taiKhoanController })
        .when("/doimatkhau", { templateUrl: "./doimatkhau.html", controller: taiKhoanController })
        .when("/dangky", { templateUrl: "./dangky.html", controller: taiKhoanController })
        .when("/quanlyNsxMausac", { templateUrl: "./quanlyNsxMausac.html", controller: mauSacNsxController })
        .otherwise({ redirectTo: "/index.html", controller: getLaptopController });
});

// Get List Laptop
window.getLaptopController = function ($scope, $http) {
    $scope.listLaptop = [];
    $http.get("http://localhost:3000/laptop").then(function (response) {
        $scope.listLaptop = response.data
        console.log(response.data)
    })
    $scope.getById = function (id) {
        $http.get("http://localhost:3000/laptop/" + id).then(function (response) {
            console.log(response.data);

        });
    }

};
window.chiTietLaptopController = function ($scope, $http, $routeParams) {
    var id = $routeParams.id;
    console.log(id);
    $http.get("http://localhost:3000/laptop/" + id).then(function (response) {
        $scope.id = response.data.id;
        $scope.name = response.data.name;
        $scope.image = response.data.image;
        $scope.cpu = response.data.cpu;
        $scope.ram = response.data.ram;
        $scope.disk = response.data.disk;
        $scope.manHinh = response.data.manHinh;
        $scope.cardVga = response.data.cardVga;
        $scope.price = response.data.price;
        $scope.oldPrice = response.data.oldPrice;
        $scope.trongLuong = response.data.trongLuong;
        $scope.pin = response.data.pin;
        console.log($scope.name)
        console.log(response.data)
    })
};

window.quanLyLaptopController = function ($scope, $http, $location) {
    // get
    $scope.listLaptops = [];
    $http.get("http://localhost:3000/laptop").then(function (response) {
        $scope.listLaptops = response.data;
    }
    );
    // Add
    $scope.addLaptop = function () {
        var image = document.getElementById("image").value.split("\\").pop();
        $http.post("http://localhost:3000/laptop", {
            id: $scope.id,
            name: $scope.name,
            image: image,
            cpu: $scope.cpu,
            ram: $scope.ram,
            disk: $scope.disk,
            manHinh: $scope.manHinh,
            cardVga: $scope.cardVga,
            price: $scope.price,
            oldPrice: $scope.oldPrice,
            importPrice: $scope.importPrice,
            trongLuong: $scope.trongLuong,
            pin: $scope.pin,

        }).then(function (response) {
            if (response.status === 201) {
                alert("Success");
                $location.path("/quanlylaptop");
            }
        })
    };
    $scope.updateLaptop = function () {
        $http.put("http://localhost:3000/laptop/" + $scope.id, {
            id: $scope.id,
            name: $scope.name,
            image: image,
            cpu: $scope.cpu,
            ram: $scope.ram,
            disk: $scope.disk,
            manHinh: $scope.manHinh,
            cardVga: $scope.cardVga,
            price: $scope.price,
            oldPrice: $scope.oldPrice,
            importPrice: $scope.importPrice,
            trongLuong: $scope.trongLuong,
            pin: $scope.pin,

        }).then(function (response) {
            if (response.status === 200) {
                alert("Success");
                $location.path("/quanlylaptop");
            }
        })
    };
    $scope.chiTietLaptop = function (id) {
        $http.get("http://localhost:3000/laptop/" + id).then(function (response) {
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            image = response.data.image;
            $scope.cpu = response.data.cpu;
            $scope.ram = response.data.ram;
            $scope.disk = response.data.disk;
            $scope.manHinh = response.data.manHinh;
            $scope.cardVga = response.data.cardVga;
            $scope.price = response.data.price;
            $scope.oldPrice = response.data.oldPrice;
            $scope.importPrice = response.data.importPrice;
            $scope.trongLuong = response.data.trongLuong;
            $scope.pin = response.data.pin;
        })

    };
    $scope.deleteLaptop = function (id) {
        var result = confirm("Bạn có chắc chắn muốn xóa ?");
        if (result == true) {
            $http.delete("http://localhost:3000/laptop/" + id).then(function (response) {
                if (response.status === 200) {
                    alert("Xóa thành công");

                    $location.path("/quanlylaptop");
                }
            });
        }
        else alert("Bạn đã hủy thao tác");
    };

}
window.taiKhoanController = function ($scope, $http, $location) {
    $scope.listTaiKhoan = [];
    $http.get("http://localhost:3000/taikhoan").then(function (response) {
        $scope.listTaiKhoan = response.data;
        // console.log($scope.listTaiKhoan)

    });
    $scope.loginTaiKhoan = function (us, ps) {
        // $http.get("http://localhost:3000/taikhoan").then(function(response){
        //     // var username = document.getElementById("us").value;
        // if($scope.username === "thao"&&$scope.password === "thao"){
        //     alert("ok");
        // }
        // console.log($scope.listTaiKhoan.username)
        // console.log($scope.username)
        // })

        console.log($scope.listTaiKhoan)
        if (us === "" || us === undefined || ps === "" || ps === undefined) {
            alert("Tài khoản mật khẩu không được để trống");
        }
        else {
            for (var i = 0; i < $scope.listTaiKhoan.length; i++) {
                if ($scope.listTaiKhoan[i].id === us && $scope.listTaiKhoan[i].password === ps) { 
                    $location.path("/quanlylaptop")
                    return(alert("Uername :" + us + ":Đăng nhập thành công"));
                   
                }
                else {
                    return(alert("Tài khoản hoặc mật khẩu sai"));
                }
            }
        }

    };
    $scope.changePass = function (us, ops, np, rnp) {
        if (us === "" || us === undefined || ops === "" || ops === undefined || np === undefined || rnp === undefined || np === "" || rnp === "") {
            alert("Tất cả các ô không được để trống");
        }
        else {
            for (var i = 0; i < $scope.listTaiKhoan.length; i++) {
                if ($scope.listTaiKhoan[i].id === us && $scope.listTaiKhoan[i].password === ops && np === rnp) {
                    $http.put("http://localhost:3000/taikhoan/" + us, {
                        id: us,
                        password: np
                    }).then(function (response) {
                        if (response.status === 200) {
                            alert("Thay đổi mật khẩu thành công");
                            $location.path("/dangnhap");
                        }
                    })
                }
                else {
                    alert("Tài khoản hoặc mật khẩu sai hoặc nhập lại mật khẩu mới khác nhau");
                }
            }
        }

    };
    $scope.dangKyTaiKhoan = function (us, ps, rps) {
        if (us === "" || us === undefined || ps === "" || ps === undefined || rps === "" || rps === undefined) {
            alert("Tất cả các ô không được để trống");
        }
        else if(ps!==rps){
            alert("Mật khẩu nhập lại phải giống")
        }
        else{
            $http.post("http://localhost:3000/taikhoan",{
                id: us,
                password:ps
            }).then(function(response){
                if(response.status===201){
                    alert("Đăng ký tài khoản thành công");
                    $location.path("/dangnhap");
                }
            })
        }
    };
};
window.mauSacNsxController = function($scope,$http,$location){
    $scope.listNsx=[];
    $http.get("http://localhost:3000/NhaSanXuat").then(function(response){
        $scope.listNsx=response.data
    });
    $scope.addNsx= function(){
        $http.post("http://localhost:3000/NhaSanXuat",{
            id:$scope.idNsx,
            ten:$scope.tenNsx
        }).then(function(response){
            if(response.status===201){
                alert("Thêm thành công");
            }
        })
    };
    $scope.updateNsx= function(){
        $http.put("http://localhost:3000/NhaSanXuat/"+$scope.idNsx,{
            id:$scope.idNsx,
            ten:$scope.tenNsx
        }).then(function(response){
            if(response.status===200){
                alert("Cập nhật thành công");
            }
        })
    };
    $scope.deleteNsx=function(idNsx){
        $http.delete("http://localhost:3000/NhaSanXuat/"+idNsx).then(function(response){
            if(response.status===200){
                alert("Xóa thành công");
            }
        })
    };
    $scope.detailNsx =function(idNsx){
        $http.get("http://localhost:3000/NhaSanXuat/"+idNsx).then(function(response){
            $scope.idNsx=response.data.id,
            $scope.tenNsx=response.data.ten
        });
    };
    $scope.listMs=[];
    $http.get("http://localhost:3000/MauSac").then(function(response){
        $scope.listMs=response.data
    });
    $scope.addMs= function(){
        $http.post("http://localhost:3000/MauSac",{
            id:$scope.idMs,
            tenMauSac:$scope.tenMs
        }).then(function(response){
            if(response.status===201){
                alert("Thêm thành công");
            }
        })
    };
    $scope.updateMs= function(){
        $http.put("http://localhost:3000/MauSac/"+$scope.idMs,{
            id:$scope.idMs,
            tenMauSac:$scope.tenMs
        }).then(function(response){
            if(response.status===200){
                alert("Cập nhật thành công");
            }
        })
    };
    $scope.deleteMs=function(idMs){
        $http.delete("http://localhost:3000/MauSac/"+idMs).then(function(response){
            if(response.status===200){
                alert("Xóa thành công");
            }
        })
    };
    $scope.detailMs =function(idMs){
        $http.get("http://localhost:3000/MauSac/"+idMs).then(function(response){
            $scope.idMs=response.data.id,
            $scope.tenMs=response.data.tenMauSac
        });
    }
}


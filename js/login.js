var login = (function () {

    return {
        init: function (ele) {
            this.$msgerror = document.querySelector('.msg-error')
            this.$ele = document.querySelector(ele);
            this.$username = this.$ele.loginname;
            this.$password = this.$ele.loginpwd
            this.$loginBtn = this.$ele.querySelector('#loginsubmit');
            this.$clearBtn = this.$ele.querySelector('.clear-btn')
            this.event();
        },
        event: function () {
            var _this = this;
            this.$loginBtn.onclick = function () {
                var params = {
                    method: 'POST',
                    data: {
                        username: _this.$username.value,
                        password: _this.$password.value
                    },
                    success: function (data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax("http://localhost:7086/jdproject/php/login.php", params)
            }
            this.$ele.onclick = function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.className == 'clear-btn'){
                    _this.clearInput(target);
                }
            }
            this.$ele.oninput = function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.className == 'itxt'){
                    _this.hideClearBtn(target);
                }
            }
        },
        loginSuccess: function (data) {
            if (data.code == 200) {
                var userList=new OprationCookie();
                userList.setCookie("name",data.data.username);
                location.href = "manager.html";
            } else {
                this.$msgerror.className = 'msg-error';
            }
        },
        clearInput: function (val) {
            val.previousElementSibling.value = '';
            val.style = 'display:none';
        },
        hideClearBtn: function (val) {
            if(val.value == ''){
                val.nextElementSibling.style = 'display:none';
            }else {
                val.nextElementSibling.style = 'display:block';
            }
        }
    }

}())
var shopCar=(function(){
    return {
        init(ele){
            this.$ele = document.querySelector(ele);
            this.getShopList();
            this.event();
        },
        event(){
            var _this = this;
            this.$ele.onclick=function(ev){
                ev=ev||window.event;
                var target=ev.target||ev.srcElement;
                if(target.className=='delete-btn'){
                    var $item=target.parentNode.parentNode;
                    var _arr = JSON.parse(localStorage.getItem('shopList'));
                    var len = _arr.length;
                    for (var i = 0; i < len; i++) {
                        if (_arr[i].id== target.getAttribute('attr-id')) {
                        _arr.splice(i, 1);
                        break;
                        }
                    }
                    localStorage.setItem("shopList", JSON.stringify(_arr));
                    _this.$ele.removeChild($item);
                }
            }
        },
        getShopList(){
            var _this = this;
            var params = {
                url:'json/shoplist.json',
                success:function(data){
                    _this.shopList=data.data;
                    _this.getData();
                }
            }
            sendAjax(params);
        },
        getData(){
            this.carData=JSON.parse(localStorage.shopList || '[]');
            this.insertData(this.carData);
        },
        insertData(data){
            var arr = [];
            // [{id: 1, count: 2}]
            for(var i = 0;i < data.length; i++){
                var shop;
                for(var j=0;j<this.shopList.length;j++){
                    if(data[i].id==this.shopList[j].id){
                        shop = this.shopList[j];
                        break;
                    }
                }
                arr.push(`
                <div class="item-single">
                    <div class="p-checkbox cell">
                        <div class="car-checkbox">
                            <input type="checkbox">
                        </div>
                    </div>
                    <div class="p-goods cell">
                        <div class="goods-item">
                            <div class="p-img">
                                <a href="skgoods${data[i].id}.html">
                                    <img src="images/skgoods${data[i].id}.jpg" alt="" width="80" height="80">
                                </a>
                            </div>
                            <div class="item-msg">
                                <div class="p-name">
                                    <a href="skgoods${data[i].id}.html">
                                    ${shop.ps}
                                    </a>
                                </div>
                                <div class="p-extend">
                                    <span class="promise">
                                        <i class="jd-service-icon"></i>
                                        <a href="#none">选服务</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-props cell">
                        <div class="props-txt">颜色：${shop.ps}</div>
                    </div>
                    <div class="p-price cell">
                        <div class="plus-switch">
                            <strong  class="p-price-txt">${shop.pricenow}</strong>
                        </div>
                    </div>
                    <div class="p-quantity cell">
                        <div class="quantity-form">
                            <a href="#none" class="car-num-down">-</a>
                            <input type="text" value="${data[i].count}" autocomplete="off" class="car-input">
                            <a href="#none" class="car-num-up">+</a>
                        </div>
                    </div>
                    <div class="p-sum cell">
                        <strong  class="p-allprice-txt">¥${shop.pricenow*data[i].count}</strong>
                    </div>
                    <div class="p-ops cell">
                        <a href="#none" class="delete-btn" attr-id=${data[i].id}>删除</a>
                    </div>
                </div>`)
            }
            this.$ele.innerHTML = arr.join('');
        }
        
    }
}())
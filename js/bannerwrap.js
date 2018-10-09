var sliderWrap=(function(){
    return{
        init:function(ele){
            this.$ele=document.querySelector(ele);
            this.$slider_wrap=this.$ele.querySelector('.slider_wrap');
            this.$tip=this.$ele.querySelector('.slider_indicators');
            this.$tipLiAll=this.$tip.querySelectorAll('i');
            this.$prevBtn=this.$ele.querySelector('.slider_control_prev');
            this.$nextBtn=document.querySelector('.slider_control_next');
            this.index=0;
            for(i=0;i<this.$tipLiAll.length;i++){
                this.$tipLiAll[i].index=i
            }
            var first=this.$slider_wrap.firstElementChild;
            var last=this.$slider_wrap.lastElementChild.cloneNode(true);
            this.$slider_wrap.appendChild(first.cloneNode(true));
            this.$slider_wrap.insertBefore(last,first)
            this.$slider_wrap.style.left = '-590px';
            this.event()
            this.autoPlay()
        },
        event:function(){
            _this=this;
            this.$tip.onclick=function(ev){
                ev=ev||window.event;
                var target=ev.target||ev.srcElement;
                if(target.nodeName=='I'){
                    _this.showImage(target.index);
                    _this.autoPlay();
                }
            }
            this.$prevBtn.onclick=function(){
                _this.showImage(--_this.index);
                _this.autoPlay();
            }
            this.$nextBtn.onclick=function(){
                _this.showImage(++_this.index);
                _this.autoPlay();
            }
        },
        showImage(index){
            if(index>7){
                index=0;
                this.$slider_wrap.style.left = 0;
            }
            if(index<0){
                index=7;
                this.$slider_wrap.style.left = -590*9+'px';
            }
            this.index=index;
            for(var i=0;i<this.$tipLiAll.length;i++){
                this.$tipLiAll[i].removeAttribute('class');
            }
            this.$tipLiAll[index].className='active';
            move(this.$slider_wrap,'left',-(index+1)*590)
        },
        autoPlay(){
            clearInterval(this.timer1)
            _this=this;
            this.timer1=setInterval(function(){
                _this.index++
                _this.showImage(_this.index);
            },2000)
        }
    }
}())
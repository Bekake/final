<template>
<div class="forbac">
    <div class="container" >
        <div class="first"></div>
        <div  class="time">{{ min }} : {{ secund }}</div>
        <div :style="dyncss" :class="{'second' : anim}" @animationend="resetanimation"></div>
        <div class="fifth"></div>
        <div :style="dyncss" :class="{'third' : anim}" @animationend="resetanimation"></div>
        <div class="fourth"></div>
    </div>    
    <div class="speed">
        <div class="mycenter">
            <div>
                <label for="til">Til </label>
                <select v-model="selected" name="mytil" id="til" @change="gettil">
                    <option value="uzb">O'zbek</option>
                    <option value="rus">Rus</option>
                    <option value="ingliz">Ingliz</option>
                    <option value="code">Code yozish</option>
                </select>
            </div>
            <h3 class="togri" v-if="mayli">Togri: {{ togri }}</h3>
        </div>
        <div class="mycenter">
            <div>
                <label for="vaqt">Vaqt </label>
                <select v-model="vaqt" name="myvaqt" id="vaqt" @change="gettime">
                    <option value="bir">1 min</option>
                    <option value="uch">3 min</option>
                    <option value="besh">5 min</option>
                </select>
            </div>
            <h3 class="xato" v-if="mayli">Xato: {{ xato }}</h3>
        </div>
        <div class="mycenter">
            <button @click="change">O'yinni boshlash</button>
            <h3 v-if="mayli">Umumiy: {{ umumiy }}</h3>
        </div>
    </div> 
    <div class="game" tabindex="0" @keydown="star" ref="inputref">
        <div class="words"><span class="every" v-for="(letter, index) in mytext" :key="index" :class="getclass(index)">{{ letter }}</span></div>
    </div>
</div>
</template>
<script>
import {myuzbbir,myuzbbesh,myuzbuch,english, rus} from '../mytextes/textes.js';
export default{
    data(){
        return{
            umumiy: 100,
            togri: 0,
            xato: 0,
            mytext : myuzbuch[7],
            intext : "",
            vaqt: "uch",
            myall : [],
            upcoming: 0,
            mshow: true,
            anim: false,
            selected: "uzb",
            mytime : 180,
            foranimate: 180,
            min: '03',
            secund: '00',
            mystart: false,
            stoptimer: null,
            myrandom: 1,
            mayli: false,
        }
    },
    computed: {
        dyncss(){
            let antime = this.foranimate;
            return{
                '--animatime' : this.foranimate + 's'
            }
        }
    },
    methods:{
        hisobla(){
            let nim = 0;
            let xato = 0;
            for(let i=0; i< this.myall.length; i++){
                if(this.myall[i].class == 'correct'){
                    nim++;
                }
                else if(this.myall[i].class == 'incorrect'){
                    xato++;
                }
            }
            this.togri = nim;
            this.xato = xato;
        },
        getrandom(){
            this.myrandom = Math.floor(Math.random() * 10);
        },
        gettil(){
            this.myall= []
            this.getrandom()
            if(this.selected == 'uzb'){
                if(this.vaqt == 'bir'){
                    this.mytext = myuzbbir[this.myrandom];
                }
                else if(this.vaqt == 'uch'){
                    this.mytext = myuzbuch[this.myrandom];
                }
                else if(this.vaqt == 'besh'){
                    this.mytext = myuzbbesh[this.myrandom];
                }
            }
            else if(this.selected == 'rus'){
                this.mytext = rus[this.myrandom];
            }
            else if(this.selected == 'ingliz'){
                this.mytext = english[this.myrandom];
            }
        },
        gettime(){
            this.myall = []
            this.getrandom()
            if(this.vaqt == "bir"){
                this.mytime = 60;
                this.foranimate = 60;
            }
            else if(this.vaqt == "uch"){
                this.mytime = 180;
                this.foranimate = 180;
            }
            else if(this.vaqt == "besh"){
                this.mytime = 300;
                this.foranimate = 300;
            }
            else{
                this.mytime = 60;
                this.foranimate = 60;
            }
            this.gettil();
        },
        resetanimation(){
            this.anim = false;
        },
        change(){
            if(this.mshow){
                this.$refs.inputref.focus();
            }
        },
        getclass(index){
            let willclass = 'default';
            if(this.myall.length > 0){
                for(let i = 0; i < this.intext.length;i++){
                    if(index == this.upcoming){
                        willclass = 'upcoming'
                        break;
                    }
                    else if(index== this.myall[i].indexnum){
                        willclass = this.myall[i].class;
                            break;
                    }
                }
            }
            return willclass;
        },
        mytimer(){
            this.mayli = true;
            this.umumiy = this.mytext.length;
            this.anim = true;
            this.stoptimer = setInterval(() => {
                let mtim = this.mytime;
                if(mtim > 0){
                    mtim--;
                    this.min = String(Math.floor(mtim/60)).padStart(2, '0')
                    this.secund = String(Math.floor(mtim%60)).padStart(2, '0')
                }
                else{
                    clearInterval(this.stoptimer)
                }
                this.mytime = mtim;
            }, 1000);
        },
        star(event){
            let myword = this.intext
            let plus = 0;
            let  current = 1;
            if(event.key == "Backspace"){
                myword  = myword.slice(0, -1);
                current = 0;
            }
            else if( event.altKey || event.ctrlKey || event.metaKey || event.key == "Enter" || event.key == "CapsLock" || event.key == "AltGraph" || event.key == "Alt" || event.key == "ArrowUp" || event.key == "ArrowUp"|| event.key == "ArrowDown"|| event.key == "ArrowRight"|| event.key == "ArrowLeft" ){
                myword = myword;
            }
            else if(event.key == 'Shift'){
                console.log(event.key.toUpperCase)
            }
            else{
                myword += event.key
                plus = 1;
            }
            this.intext = myword;
            if(myword.length == 1){
                if(!this.mystart){
                    this.mystart = true;
                    this.mytimer();
                }
            }
            let mylength = myword.length-plus;
            this.upcoming = mylength +current;
            let inputinfo = {
                indexnum : mylength,
                class : 'correct',
                expectedchar: this.mytext.charAt(mylength),
                writtenchar: myword.charAt(mylength), 
            }
            this.myall = this.myall.filter(element => element.indexnum !== mylength)
            this.myall = this.myall.filter(elem => elem.indexnum <= mylength)
            if(this.mytext.charAt(mylength) !== myword.charAt(mylength)){
                inputinfo.class = 'incorrect'
            }
            this.myall.push(inputinfo)
            this.hisobla()
        }
    }
}
</script>
<style scoped>
.togri{
    color: rgb(84, 84, 250);
}
.xato{
    color: rgb(195, 37, 37);
}
label{
    margin-right: 7px;
    font-weight: 700;
}
select{
    background: linear-gradient(gray, white);
    border: none;
    border-radius: 5px;
    color: black;
    font-weight: 700;
}
button{
    border: none;
    background: linear-gradient(gray, white);
    padding: 8px;
    border-radius: 5px;
    font-weight: 700;
}
.mycenter{
    text-align: center;
}
.forbac{
    background-image: url(../assets/zar.avif);
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    background-repeat: no-repeat;
}
.first{
    z-index: 1;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: gray;
    position: absolute;
}
.time{
    position: absolute;
    z-index: 6;
    width: 145px;
    height: 145px;
    background: transparent;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    font-weight: bold;
}
.second{
    z-index: 4;
    position: absolute;
    width: 80px;
    height: 160px;
    border-top-left-radius: 160px;
    border-bottom-left-radius: 160px;
    background-color: rgb(84, 84, 250);
    animation: anim linear;
    animation-duration: var(--animatime);
    animation-iteration-count: 1;
    opacity: 0;
    transform-origin: 100% 50%;
}
.third{
    z-index: 2;
    position: absolute;
    width: 80px;
    height: 160px;
    border-top-right-radius: 160px;
    border-bottom-right-radius: 160px;
    transform: translate(50%, 0);
    background-color: rgb(84, 84, 250);
    animation: anima linear;
    animation-duration: var(--animatime);
    animation-iteration-count: 1;
    opacity: 0;
}
.fifth{
    width: 145px;
    height: 145px;
    border-radius: 50%;
    background-color: gray;
    z-index: 5;
    position: absolute;
}
@keyframes anima{
    0%{
        opacity: 1;
    }
    50%{
        opacity: 1;
    }
    50.1%{
        opacity: 0;
    }
    100%{
        opacity: 0;
    }

}
@keyframes anim{
    0%{
        transform:translate(-50%, 0) rotate(0deg);
        z-index: 4;
        opacity: 1;
    }
    50%{
        transform:translate(-50%, 0) rotate(-180deg);
        z-index: 4;
        opacity: 1;
    }
    50.1%{
        transform: translate(-50%, 0) rotate(-180deg);
        z-index: 2;
        opacity: 1;
    }
    100%{
        transform:translate(-50%, 0) rotate(-360deg);
        z-index: 2;
        opacity: 1;
    }
}
.fourth{
    z-index: 3;
    position: absolute;
    width: 80px;
    height: 160px;
    border-top-left-radius: 160px;
    border-bottom-left-radius: 160px;
    transform: translate(-50%, 0);
    background-color: gray;
}
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
    width: 160px;
    height: 160px;
    
}
.speed{
    display: flex;
    margin: 10px auto;
    width: 50%;
    justify-content: space-between;
}
*{
    font-size: 20px;
}
.upcoming{
    color: rgb(84, 84, 250);
    position: relative;
}
.upcoming::after{
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 80%; 
    height: 2px; 
    background-color: rgb(84, 84, 250); 
    animation: animate 1s linear infinite;
}
@keyframes animate{
    0%{
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.every{
    font-size: 30px;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    position: relative;
    text-align: center;
    width: 20px;
    margin-top: 3px;
    margin-right: 0.8px;
    border-radius: 13%;
    height: 40px;
}
.default{
    color: rgb(59, 59, 59);
}
.correct{
    background-color: rgb(89, 255, 89);
    color: green;
}
.incorrect{
    color: rgb(236, 74, 74);
    background-color: rgb(160, 69, 69);
}
.game{
    width: 80%;
    margin: auto;
    background-color: rgb(208, 203, 203);
    font-size: 30px;
    position: relative;
    box-shadow: 0 0 25px gray;
}
.words{
    filter: blur(4px);
}
.game:focus .game{
    border: none;
}
.game:focus .words{
    filter: blur(0px);
}
</style>
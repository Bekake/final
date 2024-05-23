<template>
<div class="mybac">
    <div class="container" >
        <div class="first"></div>
        <div  class="time">{{ min }} : {{ secund }}</div>
        <div :style="dyncss" :class="{'second' : anim}" @animationend="resetanimation"></div>
        <div class="fifth"></div>
        <div :style="dyncss" :class="{'third' : anim}" @animationend="resetanimation"></div>
        <div class="fourth"></div>
    </div>
    <div class="bitta">
        <select name="mytil" id="mytil" v-model="language" @change="gettil">
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
        </select>
        <button @click="getmymav">Mavzuni almashtirish</button>
        <button @click="snippet" class="mybut">
            <p v-if="snip">Snippetni ko'rish</p>
            <p v-if="!snip">Snippetni o'chirich</p>
        </button>
        <button @click="myfoc">O'yinni boshlash</button>
    </div>
    <div v-if="fortogri" class="bitta">
        <h3 class="togri">Togri: {{ togri }}</h3>
        <h3 class="xato">Xato: {{ xato }}</h3>
        <h3>Umumiy: {{ umumiy }}</h3>
    </div>
    <div :class="{min : snip}">
        <textarea v-model="intext" name="programming" id="program" @input="check"></textarea>   
    </div>
    <pre :class="{'bos' : forfocus}"><span class="every"   v-for="(letter, index) in mytext"  :class="cla(index)" :key="index">{{ letter }}</span></pre>
</div>
    
</template> 
<script>
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import {coding, python, css, sql} from '../mytextes/codetext.js';

export default {
    data() {
        return {
            forfocus: true,
            fortogri: false,
            togri: 0,
            xato : 0,
            umumiy: null,
            anim: false,
            language: "javascript",
            mytime : 180,
            min: '03',
            secund: '00',
            myshow: false,
            intext: "",
            mytext: coding[0],
            myall: [],
            mynow: 0,
            snip: true,
            mystart : false,
            stoptimer: null,
            foranimate: 180,
            mavzular: ['solarized','drakula','monokai', 'material' ,'ambiance'],
            connum:  0,
        };
    },
    computed: {
        dyncss(){
            let antime = this.foranimate;
            return{
                '--animatime' : this.foranimate + 's',
            }
        }
    },
    mounted() {
        this.setevery();
    },
    methods: {
        hisob(){
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
        getmymav(){
            this.connum = (this.connum +=1)%5;
            this.editor.setOption('theme', this.mavzular[this.connum]);
        },
        snippet(){
            this.snip =! this.snip
        },
        resetanimation(){
            this.anim = false;
        },
        gettil(){
            if(this.language == 'python'){
                this.mytext = python[0]
            }
            else if(this.language == 'css'){
                this.mytext = css[0]
            }
            else if(this.language == 'sql'){
                this.mytext = sql[0]
            }
            else{
                this.mytext = coding[0]
            }
            console.log(this.mytext)
            this.editor.setOption('mode', this.language);
        },
        setevery(){
            this.editor = CodeMirror.fromTextArea(document.getElementById("program"), {
                lineNumbers: true,
                theme: this.mavzular[this.connum],
                mode: this.language,
                autoCloseBrackets: true,
                matchBrackets: true,
                indentUnit: 4,
                tabSize: 4,
            });
            this.editor.setValue(this.intext);
            this.editor.on('change', () => {
                this.intext = this.editor.getValue();
                this.check(this.intext);
            });
            this.editor.on('cursorActivity', () => {
                const cursorIndex = this.getCursorIndex();
                this.findIndexInMyAll(cursorIndex);
            });
        },
        getCursorIndex() {
            const cursor = this.editor.getCursor();
            const cursorIndex = this.editor.indexFromPos(cursor);
            return cursorIndex;
        },
        myfocus() {
            const cursorIndex = this.getCursorIndex();
            this.findIndexInMyAll(cursorIndex);
        },
        findIndexInMyAll(cursorIndex) {
            const entry = this.myall.find(entry => entry.indexnum === cursorIndex-1);
            if (entry) {
                this.mynow = entry.indexnum+1;
                console.log(this.mynow)
            } 
        },
        myfoc(){
            this.forfocus = false;
            this.editor.focus();
        },
        cla(num){
            let reclass = 'default'
            for(let i =0; i < this.myall.length; i++){
                if(this.myall[i].indexnum === num){
                    reclass = this.myall[i].class
                }
            }
            if(num == this.mynow){
                reclass = 'upcoming'
            }
            return reclass
        },
        getsecond(num, birinchi, ikkinchi, yourclass) {
            let birinfo = {
                indexnum: num,
                expect: this.mytext[num],
                writtenchar: birinchi,
                class: yourclass,
            };
            let lastindex = this.mytext.indexOf(ikkinchi, num + 1);
            let ikkiinfo = {
                indexnum: lastindex,
                expect: this.mytext[num],
                writtenchar: ikkinchi,
                class: 'correct',
            };
            this.myall.push(birinfo, ikkiinfo);
        },
        mytimer(){
            this.fortogri = true;
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
        check(text) {
            if(text.length == 1){
                if(!this.mystart){
                    this.mystart = true;
                    this.mytimer()
                }
            }
            let mylength = text.length - 1;
            console.log(mylength)
            this.myall = [];
            let another = true;
            let yana = true;
            let boshqa = true;
            let delnum = -1;
            for (let i = 0; i <= mylength; i++) {
                let goon = true;
                let myinfo = {
                    indexnum: i,
                    expect: this.mytext[i],
                    writtenchar: text[i],
                    class: 'correct',
                };
                
                if (text[i] !== this.mytext[i]) {
                    myinfo.class = 'incorrect';
                }
                if (text[i] == '(') {
                    this.getsecond(i, '(', ')', myinfo.class);
                    goon = false;
                } else if (text[i] == ')') {
                    goon = false;
                } else if (text[i] == '}') {
                    goon = false;
                } else if (text[i] == '"') {
                    if (another) {
                        this.getsecond(i, '"', '"', myinfo.class);
                    }
                    another = false;
                    goon = false;
                } else if (text[i] == '`') {
                    if (yana) {
                        this.getsecond(i, '`', '`', myinfo.class);
                    }
                    yana = false;
                    goon = false;
                } else if (text[i] == '{') {
                    this.getsecond(i, '{', '}', myinfo.class);
                    goon = false;
                } else if (text[i] == "'") {
                    if (boshqa) {
                        this.getsecond(i, "'", "'", myinfo.class);
                    }
                    boshqa = false;
                    goon = false;
                }
                if(myinfo.writtenchar == '\n' && myinfo.class == 'incorrect'){
                    delnum = i
                }
                if(myinfo.writtenchar == ' ' && myinfo.indexnum > this.mynow){
                    delnum = i
                }
                if (goon) {
                    this.myall.push(myinfo);
                }
                this.myall = this.myall.filter(element => element.indexnum !== delnum)
            }
            this.umumiy = this.mytext.length;
            this.hisob()
        }
    }
};
</script>

<style scoped>
.bos{
    filter: blur(3px);
}
.togri{
    color: rgb(84, 84, 250);
}
.xato{
    color: rgb(195, 37, 37);
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
.mybac{
    background-image: url(../assets/cod.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
}
pre{
    width: 80%;
    margin: 10px auto;
    backdrop-filter: blur(10px);
    border: 4px solid white;
    padding: 0 0 25px 0 ;
}
.bitta{
    width: 40%;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
}
.mybut > p{
    margin: 0;
}
.min{
    left: -100%;
    position: absolute;
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
    margin: auto;
    width: 160px;
    height: 160px;
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
    line-height: 1;
    vertical-align: middle;
    position: relative;
    text-align: center;
    width: 20px;
    top: 10px;
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
</style>

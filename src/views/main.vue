<template>
  <div class="bac">
    <h1>Bu yerda loyiham haqida qisqacha malumot korishingiz mumkin</h1>
    <ol>
      <li>
        <h2>1. O'zim haqimda</h2>
        <ul>
          <li>Hozirda Inha universiteti talabasiman</li>
          <li>Frontend yonalishi bilan 8 oydan beri shugullanaman</li>
          <li>Git va APIlar bilan ishlaganman</li>
          <li><a href="https://github.com/Bekake" target="_blank">Github account (codeni ham shu yerda korishingiz mumkin)</a></li>
          <li><a href="https://www.linkedin.com/in/bekzod-izbosarov-3167772a4" target="_blank" >Linkedin account</a></li>
          <li>
            <p>Organgan dasturlash tillarim:</p>
            <ul>
              <li>HTML</li>
              <li>Javascript</li>
              <li>CSS</li>
              <li>Python(boshlang'ich)</li>
            </ul>
          </li>
          <li> 
            <p>Frameworklar:</p>
            <ul>
              <li>Vue3</li>
              <li>Nuxt</li>
              <li>Vue routing</li>
            </ul>
          </li>
          <li>
            <p>Loyihalar davomida organgan librarylarim:</p>
            <ul>
              <li>Codemirror(User  code yozishini taminlaydi)</li>
              <li>Pinia(State management)</li>
              <li>Nuxt state management</li>
              <li>Axios(Serverga request qilish)</li>
              <li>Luxon(Vaqtni olishga yordam beradi)</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <h2>2. Bu yerda nimalarni korishingiz mumkin</h2>
        <ul>
          <li>Yuqoridagi tugma orqali qilgan loyihalarimni korishingiz mumkin</li>
          <li>Birinchisi kunlik va soatlik Ob-havo malumotlarini dunyoning barcha shaharlari uchun korsatib beradi(API orqali), design moslashuvchan.</li>
          <li>Ikkinchisi o'zbek, rus, ingliz tillariida yozish tezligingizni tekshirib korishingiz mumkin</li>
          <li>Uchinchisi ko'plab dasturlash tillarida yozish tezligingizni sinab korishingiz mumkin</li>
        </ul>
      </li>
    </ol>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      animate: false
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.bac{
  background-image: url(../assets/urin.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat

}
h1{
  text-align: center;
}
ol{
  list-style-type: none;
}
li >a{
  text-decoration: none;
  color: black;
  cursor: pointer;
  }
</style>

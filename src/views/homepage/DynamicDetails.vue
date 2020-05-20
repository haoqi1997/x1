<template >
  <div style="margin-top:169px">
    <div
      class="dynamicdetailstop"
    >净慈寺己亥年“解行并举，福慧同修”华严法会圆满2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。 此次华严法会历时20天，两序大众将同诵经中之王《大方广佛华严经》，唱颂华严字母，同赴佛法讲座，游华藏之世界，入毗卢之性海，作真实之功德，种无上之良因。以此功德，回向给虚空法界一切有情之众生，同证菩提，祈福现在者消灾吉祥、福慧双增、遂心满愿、诸事吉祥，并祈愿国泰民安、风调雨顺。 【相关知识】 《华严经》全称《大方广佛华严经》，另称《杂华经》。我国华严宗即依据本经，立法界缘起、事事无碍等妙义为宗旨。兹就本经之经题而论，大方广佛华严经，系‘法喻因果’并举，‘理智人法’兼备之名称，一经之要旨，皆在此中。大，即包含之义；方，即轨范之义；广，即周遍之义。亦即总说一心法界之体用，广大而无边，称为大方广。佛，即证入大方广无尽法界者；华，即成就万德圆备之果体的因行譬喻；故开演因位之万行，以严饰佛果之深义，则称为佛华严。总之，大方广佛华严系所诠之义理，而‘经’则为能诠之言教。本经是如来成道后之第二七日，于菩提树下为文殊、普贤等上位菩萨所宣说之自内证法门，此一华严经教乃教法中之根本法，故称‘称性本教’。又因本教法属顿教法门，故亦称初顿华严。内容记述佛陀之因行果德，开显出重重无尽、事事无碍之妙旨。</div>
    <div class="dynamicdetailszhong">
      <div class="dynamicdetailstop">
        <ul>
          <li>
            <img src="../../assets/img/dynamicdetails/焰口002@2x(1).png" alt />
          </li>
          <li>
            <img src="../../assets/img/dynamicdetails/焰口002@2x.png" alt />
          </li>
          <li>
            <img src="../../assets/img/dynamicdetails/华严经003@2x.png" alt />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      id: this.$route.query.id
    }
  },
  created() {
    // this.getlist()
  },
  mounted() {},
  methods: {
    getlist() {
      this.$public.noAuthController.happening(this.id).then(res => {
        console.log('handleDelete4184854 -> res', res)
        if (res.code == '000000') {
        }
      })
    }
  },
  components: {}
}
</script>
<style>
.dynamicdetailstop {
  width: 62.5%;
  margin: 0 auto;
}
.dynamicdetailszhong {
  width: 100%;
  height: 348px;
  background: rgba(247, 247, 247, 1);
  margin-top: 35px;
  margin-bottom: 94px;
}
.dynamicdetailstop > ul {
  display: flex;
  height: 348px;
  justify-content: space-between;
  align-items: center;
}
.dynamicdetailstop > ul > li > img {
  width: 380px;
  height: 230px;
}
</style>
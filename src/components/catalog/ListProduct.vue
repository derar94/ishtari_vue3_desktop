<template>
  <div class="listProduct mb-3">
    <ishtari-image :src="data.thumb" :alt="data.name" />
    <p class="productName">
      {{ parse(data.name) }}
    </p>
    <div id="prices">
      <div>
        <div v-if="data.special">
          <p>{{ data.special }}</p>

          <p class="linedPrice">
            {{ data.price }}
          </p>
        </div>
        <div v-else>
          <p>{{ data.price }}</p>

        </div>
      </div>
    </div>

    <div class="extras">
      <img
        class="expressImage"
        v-if="data.seller_id == 0"
        src="../../assets/image/express.png"
      />

      <span class="discountWrapper">
        <span class="bg"></span>
        22% off
      </span>
    </div>
  </div>
</template>


<script>
import IshtariImage from "@/components/global/IshtariImage";
export default {
  components: {
    IshtariImage,
  },
  props: ["data"],
  methods: {
    parse(str) {
      if (str) {
        return str
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped>
.listProduct {
  width: 19%;
  max-width: 19%;
  background: white;
  padding: 12px 6px;
}
.productName {
  font-size: 13px;
  color: black;
}
#prices  div {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  padding: 6px 0;
}
#prices p:first-child {
  font-weight: bold;
  font-size: 17px;
  margin-right: 4px;
}
.expressImage {
  height: 17px;
  margin-right: 7px;
}
.linedPrice {
  text-decoration: line-through;
  color: rgb(178, 187, 210);
  font-size: 11px;
}
.extras {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>
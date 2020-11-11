<template>
  <div id="cart_over" v-if="showPanel">
    <div id="cart_panel">
      <div class="is-flex">
        <img :src="Productdata['product'].thumb" />
        <div style="padding-left: 10px; padding-right: 5px">
          <p style="font-size: 14px">
            {{ parse(Productdata["product"]["product_info"]["name"]) }}
          </p>
          <p style="font-size: 13px">
            Added to cart
            <i class="fa fa-check-circle has-text-ishtari-green"></i>
          </p>
        </div>
      </div>

      <div class="is-flex is-justify-content-space-between pt-4 pr-1">
        <button
          class="button has-background-ishtari-blue has-text-white has-text-weight-bold"
          style="border-radius: 0; font-size: 14px"
          @click="$router.push({ name: 'checkout' })"
        >
          CHECKOUT
        </button>
        <button
          @click="showPanel = false"
          class="button has-text-weight-bold"
          style="
            font-size: 13px;
            border: 1px solid #3866df;
            color: #3866df;
            border-radius: 0;
          "
        >
          CONTINUE SHOPPING
        </button>
      </div>
      <br />
      <h2 class="has-text-weight-bold">My Cart</h2>
      <hr />
      <div
        v-for="product in cartProducts.data.products"
        :key="product.product_id"
        style="margin: 10px 0"
      >
        <div class="is-flex">
          <img :src="product.thumb" class="image is-96x96" alt="" />
          <div class="pl-2 pr-1">
            <p style="font-size: 13px; padding-bottom: 5px">
              {{ product.name.slice(0, 50) + "..." }}
            </p>
            <p>
              <span class="has-text-weight-bold"
                >Total: {{ product.total }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="minh" v-if="ready && !notFound">
    <div class="has-background-white">
      <div class="container">
        <breadcrumb
          :breadcrumbs="Productdata['product']['breadcrumbs']"
        ></breadcrumb>
        <div class="columns is-paddingless is-marginless">
          <!-- First ROw -->
          <div class="column is-5 is-paddingless is-marginless">
            <product-images
              :images="Productdata['product']['images']"
            ></product-images>
          </div>
          <!-- Second ROw -->
          <div class="column is-4 is-paddingless is-marginless pl-4">
            <!-- Manufacturer -->
            <p id="manufacturer">
              {{
                parse(Productdata["product"]["product_info"]["manufacturer"])
              }}
            </p>
            <!-- Name -->
            <p id="name">
              {{ parse(Productdata["product"]["product_info"]["name"]) }}
            </p>
            <!-- Model Number -->
            <p id="model">
              Model Number:
              {{ parse(Productdata["product"]["product_info"]["sku"]) }}
            </p>
            <!-- Prices -->
            <div id="prices">
              <div>
                <span>Was:</span>
                <span id="was">
                  {{ parse(Productdata["product"]["product_info"]["price"]) }}
                </span>
              </div>
              <div>
                <span>Now:</span>
                <span id="now">
                  {{ parse(Productdata["product"]["product_info"]["special"]) }}
                </span>
              </div>
              <div>
                <span>Saving:</span>
                <span id="saving-amount">
                  {{ Productdata["product"]["saving_amount"] }}
                </span>
                <span class="discountWrapper">
                  <i class="bg"></i>
                  <span>
                    {{ Productdata["product"]["saving"] + "% off" }}
                  </span>
                </span>
              </div>
            </div>
            <!-- Options -->
            <div
              v-if="Productdata['product']['options'].length > 0"
              :style="
                showOptionBorder
                  ? 'border:2px solid rgb(56, 174, 4);padding:10px '
                  : 'border:2px solid transparent;padding:0'
              "
            >
              <div
                v-for="(option, index) in Productdata['product']['options']"
                :key="index"
              >
                <p>
                  <span
                    >{{ option.name }}
                    <span class="has-text-weight-bold">{{
                      selectedOption.name
                    }}</span></span
                  >
                </p>
                <div class="options-wrapper">
                  <div
                    class="single-option"
                    :class="subOption.quantity < 1 ? 'out' : ''"
                    v-for="(subOption, index) in option.option_value"
                    :key="index"
                    @click="
                      setOpt(subOption);
                      showOptionBorder = false;
                    "
                  >
                    <div
                      class="active-single-option"
                      :ref="subOption.option_value_id"
                      v-if="
                        selectedOption.option_value_id ==
                        subOption.option_value_id
                      "
                    ></div>
                    <img :src="subOption.image" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Add to cart -->
            <div id="add-to-cart">
              <input ref="quan" value="1" type="number" min="1" />
              <button
                :disabled="
                  Productdata['product']['stock'] == 'Out Of Stock'
                    ? true
                    : false
                "
                @click="check()"
                :class="
                  Productdata['product']['stock'] == 'Out Of Stock'
                    ? 'has-background-ishtari'
                    : 'has-background-ishtari-blue'
                "
                style="margin-right: 10px"
                class="button has-text-weight-bold has-text-white"
              >
                {{
                  Productdata["product"]["stock"] == "Out Of Stock"
                    ? "Out Of Stock"
                    : "ADD TO CART"
                }}
              </button>
              <i
                id="fav_wish"
                @click="add_to_whish()"
                class="icon-heart-empty has-text-black"
              ></i>
            </div>
          </div>

          <!-- Third ROw -->
          <div class="column is-4 is-paddingless is-marginless"></div>
        </div>
      </div>
    </div>
    <!-- In The Same Series -->
    <in-same-series
      v-if="Productdata.product['product_related'].length > 0"
      :data="Productdata.product['product_related']"
    ></in-same-series>
    <!-- Categories -->
    <div class="has-background-white">
      <categories-slider
        :container="true"
        v-if="Productdata.product['product_categories'].length > 0"
        :data="Productdata.product['product_categories']"
        :title="'More To Explore'"
      >
      </categories-slider>
    </div>
  </div>
  <div class="container" v-if="notFound">
    <h1 class="title pt-6">Soory there is no thing here!</h1>
  </div>
</template>

<script>
import productRequests from "@/http_requests/product";
import ProductImages from "@/components/catalog/ProductImages";
import Breadcrumb from "@/components/catalog/Breadcrumb";
import InSameSeries from "@/components/catalog/InSameSeries";
import CategoriesSlider from "@/components/catalog/CategoriesSlider";

import { mapActions, mapGetters } from "vuex";

export default {
  data: () => {
    return {
      Productdata: {},
      ready: false,
      notFound: "",
      selectedOption: "",
      showOptionBorder: false,
      quan: 0,
      showPanel: false,
    };
  },
  components: {
    ProductImages,
    Breadcrumb,
    InSameSeries,
    CategoriesSlider,
  },
  mounted() {
    productRequests.getData(this.productId).then((response) => {
      if (!response.data["product"]["error"]) {
        this.Productdata = response.data;
        this.ready = true;
      } else {
        console.log("here");
        this.notFound = true;
      }
    });
  },
  computed: {
    productId: function () {
      return this.$route.params.id;
    },
    ...mapGetters({
      cartProducts: "cart/cartProducts",
    }),
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addToCart",
    }),
    check() {
      if (this.Productdata["product"]["options"].length) {
        if (this.selectedOption != "") {
          let parent = this.Productdata.product.options[0]["product_option_id"];
          let option = this.selectedOption["product_option_value_id"];
          let data = {
            quantity: this.$refs.quan,
            product_id: this.$route.params.id,
            option: {},
          };
          data.option[parent.toString()] = option;
          this.addToCart(data).then(() => {
            this.showPanel = true;
          });
        } else {
          this.showOptionBorder = true;
        }
      } else {
        this.addToCart({
          quan: this.$refs.quan,
          id: this.$route.params.id,
        }).then(() => {
          this.showPanel = true;
        });
      }
    },
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
    setOpt(option) {
      if (option.quantity > 0) {
        this.selectedOption = option;
      } else {
        return;
      }
    },
  },
};
</script>
<style scoped>
#manufacturer {
  color: #7e859b;
  font-size: 14px;
}
#name {
  font-size: 20px;
  font-weight: bold;
}
#model {
  margin-top: 8px;
  font-size: 12px;
  color: #7e859b;
}
#prices {
  margin-top: 16px;
  margin-bottom: 26px;
}
#prices > div {
  display: flex;
  align-items: center;
}
#prices > div span:first-child:not(.discountWrapper) {
  font-size: 11px;
  color: #b2bbd2;
  width: 47px;
  display: inline-block;
  padding-right: 8px;
}
#was {
  color: #7e859b;
  font-size: 12px;
  text-decoration: line-through;
}
#now {
  font-size: 24px;
  font-weight: 700;
}
#saving-amount {
  font-size: 13px;
  color: #404553;
  margin-right: 8px;
}

.options-wrapper {
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
}

.single-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  position: relative;
  margin: 0 5px;
  cursor: pointer;
}
.single-option:first-child {
  margin-left: 0;
}
.active-single-option {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 2px solid #1733ff;
}

.single-option img {
  width: 30px;
}
.out {
  opacity: 0.3;
  cursor: not-allowed;
}
#add-to-cart {
  display: flex;
  justify-content: space-around;
  margin: 26px 0;
}

#add-to-cart input {
  width: 60px;
  text-align: center;
  font-size: 20px;
}

#add-to-cart button {
  flex-grow: 2;
  margin-left: 10px;
  border-radius: 0;
  outline: none;
}
#fav_wish {
  background: #eee;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
}
#cart_over {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 2;
}
#cart_panel {
  width: 330px;
  position: absolute;
  right: 0;
  top: 0;
  background: white;
  padding: 15px 10px;
}
</style>
<template>
  <div id="menu-overlay" v-if="showOverlay">
    <div class="container">
      <!-- All Categories  -->
      <div
        v-if="showAllCategories"
        id="all-categories-over-wrapper"
        @mouseleave="clearHandlers()"
      >
        <div id="all-categories-items" v-if="menuData.length != 0">
          <div id="left-categories-names">
            <router-link
              v-for="(category, index) in menuData.topCategories.data"
              :key="index"
              class="all-categories-name"
              @mouseenter="selectedTopCategory = category"
              :to="{ name: 'category', params: { id: category.category_id } }"
            >
              {{ parse(category.category_name) }}
            </router-link>
          </div>
        </div>
        <div id="all-categories-over-desc">
          <div id="all-categories-over-desc-top">
            <router-link
              :to="{
                name: 'category',
                params: { id: selectedTopCategory.category_id },
              }"
              class="has-text-weight-bold is-size-6"
            >
              {{ parse(selectedTopCategory.category_name) }}
            </router-link>
            <router-link
              :to="{
                name: 'category',
                params: { id: selectedTopCategory.category_id },
              }"
              class="is-size-6"
              id="view-all"
            >
              {{ "View all " + parse(selectedTopCategory.category_name) }}
              <i class="icon-right-open has-text-black is-size-7"></i>
            </router-link>
          </div>

          <div id="all-categories-over-desc-content">
            <router-link
              class="selected-top-category-child"
              v-for="(category, index) in selectedTopCategory.children"
              :key="index"
              :to="{ name: 'category', params: { id: category.category_id } }"
            >
              {{ parse(category.name) }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- Menu Categories -->
      <div @mouseleave="clearHandlers()">
        <div
          v-if="showMenuChilds"
          id="menu-desc"
          class="columns is-paddingless is-marginless"
        >
          <!-- Categories -->
          <div class="column is-2 menu-sec is-paddingless is-marginless">
            <h3 class="has-text-weight-bold">CATEGORIES</h3>
            <div id="selected-menu-children">
              <router-link
                class="menu-category-child"
                v-for="(category, index) in selectedMenuCategory.sub_categories"
                :key="index"
                :to="{ name: 'category', params: { id: category.category_id } }"
              >
                {{ parse(category.name) }}
              </router-link>
            </div>
          </div>
          <!-- Brands -->
          <div class="column is-4 menu-sec is-paddingless is-marginless">
            <h3 class="has-text-weight-bold">TOP BRANDS</h3>
            <div id="manufacturers-images">
              <div
                class="menu-manufacturer"
                v-for="(manufacturer,
                index) in selectedMenuCategory.manufacturers"
                :key="index"
              >
                <router-link
                  :to="{
                    name: 'manufacturer',
                    params: { id: manufacturer.manufacturer_id },
                  }"
                >
                  <ishtari-image
                    :src="manufacturer.image"
                    :alt="manufacturer.name"
                  />
                </router-link>
              </div>
            </div>
          </div>
          <!-- Images -->
          <div
            class="column is-6 menu-sec is-paddingless is-marginless"
            id="tow-images"
          >
            <div
              v-for="(img, index) in selectedMenuCategory.tow_images"
              :key="index"
            >
              <ishtari-image :src="img.image" :alt="img.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
  <div id="menu-wrapper">
    <div class="container">
      <!-- ALl Categories -->
      <div class="is-flex">
        <div
          @mouseenter="showALlCategoriesMethod()"
          :style="'background:' + activeColor"
        >
          <span
            id="all-categories-text"
            class="has-text-ishtari-blue has-font-weight-bold"
          >
            <span>All CATEGORIES</span>
            <i class="icon-sort-down has-text-ishtari-blue"></i>
          </span>
        </div>
        <!-- Menu Categories -->
        <div id="menu" v-if="menuData.length != 0">
          <router-link
            v-for="(category, index) in menuData.menu.data"
            :key="index"
            @mouseenter="
              selectedMenuCategory = category;
              showMenuChildsMethod();
            "
            class="menu-category"
            :to="{ name: 'category', params: { id: category.category_id } }"
          >
            {{ parse(category.category_name) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import IshtariImage from "@/components/global/IshtariImage";
export default {
  components: {
    IshtariImage,
  },
  data: () => {
    return {
      selectedTopCategory: [],
      selectedMenuCategory: [],
      showAllCategories: false,
      showMenuChilds: false,
      showOverlay: false,
      openAllCategoriesHandler: "",
      openMenuHandler: "",
      activeColor: "rgba(252, 244, 244, 0.3)",
    };
  },
  watch: {
    "$route.params.id": function () {
      this.clearHandlers();
    },
  },
  mounted() {
    this.getMenu();
  },
  computed: {
    ...mapGetters({
      menuData: "topNav/menuData",
    }),
  },
  methods: {
    ...mapActions({
      getMenu: "topNav/getMenu",
    }),
    showALlCategoriesMethod() {
      this.openAllCategoriesHandler = setTimeout(() => {
        this.activeColor = "rgb(247, 249, 254);";
        this.showAllCategories = true;
        this.showMenuChilds = false;
        this.showOverlay = true;
      }, 300);
    },
    showMenuChildsMethod() {
      this.openMenuHandler = setTimeout(() => {
        this.activeColor = "rgba(252, 244, 244, 0.3)";
        this.showMenuChilds = true;
        this.showAllCategories = false;
        this.showOverlay = true;
      }, 300);
    },
    clearHandlers() {
      clearTimeout(this.openAllCategoriesHandler);
      clearTimeout(this.openMenuHandler);
      this.showOverlay = false;
      this.showAllCategories = false;
      this.showMenuChilds = false;
      this.activeColor = "rgba(252, 244, 244, 0.3)";
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
  },
};
</script>
<style scoped>
#tow-images {
  display: flex;
  justify-content: space-evenly;
  padding-top: 57px !important;
}
#tow-images > div {
  margin-right: 20px;
}
#tow-images img {
  width: 100%;
}
.menu-sec {
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  padding-left: 20px !important;
}
.menu-sec h3 {
  font-size: 14px;
  padding-bottom: 10px;
}
#manufacturers-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#manufacturers-images > div {
  min-width: 32%;
  width: 32%;
  border: 1px solid #e2e5f1;
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.04);
  padding: 0.1%;
  min-height: 40px;
  margin: 1.3% 0;
}
#manufacturers-images img {
  width: 100%;
}

.menu-category-child {
  line-height: 35px;
  font-size: 14px;
  display: block;
}
.menu-category-child:hover {
  color: #3866df;
  cursor: pointer;
}
#menu-overlay {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 10;
  top: 146px;
}
#menu-wrapper {
  background: rgba(252, 244, 244, 0.2);
  letter-spacing: 0.2px;
  border-bottom: 1px solid rgb(226, 229, 241);
  z-index: 12;
}
#all-categories-text {
  display: inline-flex;
  padding: 0 20px;
  align-items: center;
  width: 240px;
  line-height: 45px;
  justify-content: space-between;
  border-right: 1px solid #e2e5f1;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
#all-categories-over-wrapper {
  background: white;
  width: 780px;
  display: flex;
  justify-content: flex-start;
}
#all-categories-over-desc {
  padding: 15px 0;
  flex-grow: 2;
}
#all-categories-over-desc-top {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
#all-categories-over-desc-content {
  padding: 0 15px;
  padding-top: 10px;
}
.selected-top-category-child {
  font-size: 14px;
  line-height: 35px;
  cursor: pointer;
  display: block;
}
.selected-top-category-child:hover {
  color: #3866df;
}
#view-all:hover {
  color: #3866df;
  cursor: pointer;
}

#left-categories-names {
  padding: 10px 0;
  width: 239px;
}
#all-categories-items {
  background: rgb(247, 249, 254);
  border-right: 1px solid #e2e5f1;
}
.all-categories-name {
  line-height: 35px;
  padding-left: 20px;
  font-size: 14px;
  display: block;
}
.all-categories-name:hover {
  background: white;
  cursor: pointer;
}
.menu-category {
  line-height: 45px;
  padding: 0 15px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  height: 100%;
  display: inline-block;
  cursor: pointer;
}
.menu-category:hover {
  box-shadow: 4px 0 7px -4px #ccc, -4px 0 7px -4px #ccc;
}
/* Menu */
#menu-desc {
  background: white;
}
a {
  color: black;
}
</style>

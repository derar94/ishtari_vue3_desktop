<template>
  <div class="minh">
    <ishtari-loader v-if="loading"> </ishtari-loader>

    <div class="container" v-if="!loading && !noData && readyData">
      <!-- Breadcrumb -->
      <breadcrumb :breadcrumbs="data.breadcrumbs"></breadcrumb>

      <div class="columns is-paddingless is-marginless">
        <!-- Filters -->
        <div class="column is-one-fifth is-paddingless is-marginless">
          <catalog-filter :filters="data.filters"></catalog-filter>
        </div>
        <!-- Content -->
        <div class="column is-four-fifths is-paddingless is-marginless">
          <div
            class="columns is-paddingless is-marginless is-align-items-baseline"
          >
            <!-- Result Found -->
            <div class="column is-paddingless is-marginless pb-5">
              {{ data.product_total }} {{ data.text.result_found }}
              <span class="has-text-weight-bold">{{
                parse(data.heading_title)
              }}</span>
            </div>
            <!-- Controls -->
            <div
              class="column is-paddingless is-marginless is-flex is-flex-grow-2 is-justify-content-flex-end"
            >
              <controls></controls>
            </div>
            <!-- Sun Categories -->
          </div>
          <categories-slider
            class="mb-5"
            v-if="
              typeof data.categories != 'undefined' &&
              data.categories.length > 0
            "
            :data="data.categories"
          ></categories-slider>
          <!-- Products -->
          <product-list :data="data.products"></product-list>
        </div>
      </div>
    </div>

    <!-- Loader-->
    <!-- No Data -->
    <div class="container" v-if="noData">
      <h1 class="title pt-6">Soory there is no thing here!</h1>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/catalog/Breadcrumb";
import IshtariLoader from "@/components/IshtariLoader";
import CategoriesSlider from "@/components/catalog/CategoriesSlider";
import ProductList from "@/components/catalog/ProductList";
import Controls from "@/components/catalog/Controls";
import CatalogFilter from "@/components/catalog/CatalogFilter";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Breadcrumb,
    IshtariLoader,
    CategoriesSlider,
    ProductList,
    Controls,
    CatalogFilter,
  },
  //

  watch: {
    "$route.params.id": function () {
      this.SET_PAGE_TYPE(this.pageType);
      this.SET_PAGE_ID(this.pageId);

      this.getData();
    },
  },
  computed: {
    pageType: function () {
      return this.$route.name;
    },
    pageId: function () {
      return this.$route.params.id;
    },
    ...mapGetters({
      loading: "catalog/loading",
      noData: "catalog/noData",
      data: "catalog/data",
      readyData: "catalog/readyData",
    }),
  },
  //
  mounted() {
    this.SET_PAGE_TYPE(this.pageType);
    this.SET_PAGE_ID(this.pageId);
    this.getData();
  },
  //
  methods: {
    ...mapActions({
      getData: "catalog/getData",
    }),
    ...mapMutations({
      SET_PAGE_TYPE: "catalog/SET_PAGE_TYPE",
      SET_PAGE_ID: "catalog/SET_PAGE_ID",
    }),
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
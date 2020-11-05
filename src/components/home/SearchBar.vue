<template>
  <div id="search-wrapper" class="mx-6 is-flex-grow-1">
    <input
      v-model="search_keyword"
      type="text"
      id="search-input"
      placeholder="What Are You Looking For ?"
      @keyup="search(search_keyword)"
    />
    <i class="icon-search"></i>
    <div id="search-results-wrapper" v-if="showResults">
      <div v-if="!noResults">
        <div
          v-for="(result, index) in searchResults"
          :key="index"
          class="search-result"
        >
          <p>{{ parse(result.value) }}</p>
          <span class="has-text-grey">{{ types[result.type] }}</span>
        </div>
      </div>
      <div
        v-else
        class="search-result has-text-grey has-font-weight-bold no-result"
      >
        No Result Found !
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  watch: {
    $route: function () {
      this.setShowResults(false);
    },
  },
  data: () => {
    return {
      search_keyword: "",
      types: {
        1: "Product",
        2: "category",
        3: "Manufacturer",
        4: "Seller",
      },
    };
  },
  computed: {
    ...mapGetters({
      showResults: "topNav/showResults",
      noResults: "topNav/noResults",
      searchResults: "topNav/searchResults",
    }),
  },
  methods: {
    ...mapActions({
      search: "topNav/search",
    }),
    ...mapMutations({
      setShowResults: "topNav/SET_SHOW_RESULTS",
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
<style lang="scss" scoped>
#search-input {
  width: 100%;
  outline: none !important;
  height: 33px;
  font-size: 16px;
  padding: 0 20px;
  border: none;
}
i {
  position: absolute;
  right: 20px;
  color: #555;
  display: block;
  height: 33px;
  line-height: 33px;
  top: 0;
}
#search-wrapper {
  position: relative !important;
}
#search-results-wrapper {
  background: white;
  position: absolute;
  top: 41px;
  width: 100%;
  z-index: 15;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
}
#search-results-wrapper::after {
  bottom: 100%;
  left: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  top: -14px;
  border-color: rgba(48, 12, 12, 0);
  border-bottom-color: white;
  border-width: 7px;
  margin-right: -7px;
  z-index: 16;
}
.search-result {
  padding: 5px 20px;
  font-size: 14px;
  cursor: pointer;
}
.search-result:first-child {
  margin-top: 5px;
}
.search-result:not(.no-result):hover {
  background: rgba(200, 200, 200, 0.2);
}
.search-result span {
  font-style: italic;
  font-size: 12px;
}
.no-result {
  cursor: default;
  font-weight: bold;
  font-size: 15px;
}
</style>

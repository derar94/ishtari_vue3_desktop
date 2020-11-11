<template>
  <div id="filtersSlider" class="mb-3 pb-2">
    <div
      class="singleUiFilter"
      v-for="(filter, index) in uiFilters"
      :key="index"
      @click="removeFIlter(filter.realData)"
    >
      <span class="type">{{ filter.type }}: </span>
      <span class="name">{{ filter.name }}</span>
      <i class="icon-cancel close"></i>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      uiFilters: [],
    };
  },
  mounted() {
    this.prepare();
  },

  computed: {
    ...mapGetters({
      filters: "catalog/filters",
    }),
  },
  methods: {
    transformer(key) {
      return key.indexOf("option") > -1 ? "option" : key.replace("_id", "");
    },
    prepare() {
      for (const topFilter in this.filters) {
        if (this.filters[topFilter].length > 0) {
          for (const filter in this.filters[topFilter]) {
            this.uiFilters.push({
              type: this.transformer(topFilter),
              name: this.filters[topFilter][filter]["name"],
              realData: this.filters[topFilter][filter],
            });
          }
        }
      }
    },
    ...mapActions({
      removeFIlter: "catalog/removeFilter",
    }),
  },
};
</script>

<style scoped>
#filtersSlider {
  display: flex;
  overflow-x: auto;
  white-space: pre;
}
.type {
  font-size: 13px;
  text-transform: capitalize;
}
.name {
  font-weight: bold;
  font-size: 14px;
  margin-left: 3px;
}
.close {
  color: #ccc;
  margin-left: 5px;
}
.singleUiFilter {
  background: white;
  padding: 5px 10px;
  border: 2px solid #eee;
  align-content: center;
  cursor: pointer;
  margin-left: 5px;
}
.singleUiFilter:first-child {
  margin-left: 0;
}
.singleUiFilter:hover {
  opacity: 0.9;
  border-color: #ccc;
}
</style>
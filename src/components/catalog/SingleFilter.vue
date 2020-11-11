<template>
  <div
    class="filterControl"
    @click="exists ? removeFilter(data) : setFilters(data)"
  >
    <i
      :class="
        exists
          ? 'icon-check has-text-ishtari-blue'
          : 'icon-check-empty filterControlUnchecked'
      "
    ></i>
    <span class="filterControlText">{{ data.name }}</span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import isEqual from "lodash";
export default {
  data: () => {
    return {
      exists: false,
    };
  },
  watch: {
    "this.$route.path": function () {
      this.check();
    },
  },
  props: ["data"],
  mounted() {
    this.check();
  },
  computed: {
    ...mapGetters({
      filters: "catalog/filters",
    }),
  },
  methods: {
    ...mapActions({
      setFilters: "catalog/setFilters",
      removeFilter: "catalog/removeFilter",
    }),
    check() {
      var currentType = Object.keys(this.data)[0]
        .replace("_id", "")
        .replace("_value", "");
      for (const type in this.filters[currentType]) {
        if (isEqual(this.filters[currentType][type], this.data)) {
          this.exists = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.filterControl {
  display: flex;
  justify-self: start;
  overflow: hidden;
  align-items: center;
  transition: all 300ms ease-in;
  cursor: pointer;
}

.filterControlText:hover,
.filterControlUnchecked:hover {
  color: #3866df !important;
}

.filterControlUnchecked {
  font-size: 18px;
  color: rgb(178, 187, 210);
}

.filterControlText {
  margin-left: 5px;
  color: #404553;
  font-size: 12px;
}
</style>
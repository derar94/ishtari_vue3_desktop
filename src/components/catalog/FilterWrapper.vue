<template>
  <div v-if="type != 'option'">
    <div class="filterHeading" @click="toggleCollapse(type)" :ref="type">
      <h2>{{ type }}</h2>
      <i class="icon-right-open"></i>
    </div>
    <div class="filterControlWrapper">
      <single-filter
        v-for="(filter, index) in data.slice(0, 5)"
        :key="index"
        :data="filter"
      ></single-filter>
      <!-- Extra -->
      <div class="extraFilters" v-if="data.length > 5">
        <span
          class="expandeMore"
          :ref="'see-' + type"
          @click="toggleSeeAll('see-' + type)"
          >See all</span
        >
        <div class="filterControlWrapper">
          <single-filter
            v-for="(filter, index) in data.slice(5, data.length)"
            :key="index"
            :data="filter"
          ></single-filter>
        </div>
      </div>
    </div>
  </div>
  <!-- Option Filters -->

  <div v-else>
    <div class="filterHeading" @click="toggleCollapse(type)" :ref="type">
      <h2>{{ type }}</h2>
      <i class="icon-right-open"></i>
    </div>

    <div class="filterControlWrapper">
      <div v-for="(topOption, index) in data" :key="index">
        <h3>
          {{ topOption["name"] }}
        </h3>
        <single-filter
          v-for="(option, optionIndex) in topOption['options']"
          :key="optionIndex"
          :data="option"
        ></single-filter>
      </div>
    </div>
  </div>
</template>

<script>
import SingleFilter from "@/components/catalog/SingleFilter";
export default {
  components: {
    SingleFilter,
  },
  props: ["type", "data"],
  methods: {
    toggleCollapse(el) {
      el = this.$refs[el];
      if (el.lastElementChild.classList.contains("icon-right-open")) {
        el.lastElementChild.classList.remove("icon-right-open");
        el.lastElementChild.classList.add("icon-down-open");
        el.nextElementSibling.style.display = "block";
      } else {
        el.lastElementChild.classList.add("icon-right-open");
        el.lastElementChild.classList.remove("icon-down-open");
        el.nextElementSibling.style.display = "none";
      }
    },
    toggleSeeAll(el) {
      el = this.$refs[el];
      if (el.innerText == "See all") {
        el.innerText = "See less";
        el.nextElementSibling.style.display = "block";
      } else {
        el.innerText = "See all";
        el.nextElementSibling.style.display = "none";
      }
    },
  },
};
</script>

<style  scoped>
.filterHeading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 19px;
  font-weight: bold;
  padding: 12px 0;
}
i {
  color: black;
  font-size: 14px;
}
h2 {
  text-transform: capitalize;
}
.filterControlWrapper {
  display: none;
}
.expandeMore {
  color: #3866df;
  font-size: 12px;
  cursor: pointer;
}

.expandeMore:hover {
  text-decoration: underline;
}
h3 {
  font-size: 15px;
  text-transform: capitalize;
  font-weight: bold;
  padding: 10px 0;
}
</style>
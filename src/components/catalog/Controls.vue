<template>
  <div id="controlsWrapper">
    <div class="control" @click="show_sort = !show_sort">
      <span>SORT BY</span>
      <div class="bt">
        <p>{{ sort.text }}</p>
        <i class="icon-sort-down"></i>
      </div>
      <div class="desc" v-if="show_sort">
        <div
          v-for="(_sort, index) in sorts"
          :key="index"
          class="desc-info"
          @click="
            setSort(_sort);
            show_sort = false;
          "
        >
          <i
            :class="
              sort.text == _sort.text
                ? 'icon-ok-circled has-text-ishtari-blue'
                : 'icon-circle-empty'
            "
          ></i>
          <p>{{ _sort.text }}</p>
        </div>
      </div>
    </div>
    <div class="control" @click="show_display = !show_display">
      <span>DISPLAY</span>
      <div class="bt">
        <p>GRID</p>
        <i class="icon-sort-down"></i>
      </div>
      <div class="desc" v-if="show_display"></div>
    </div>
    <div class="control" @click="show_per_page = !show_per_page">
      <span>SHOW</span>
      <div class="bt">
        <p>{{ limit.text }}</p>
        <i class="icon-sort-down"></i>
      </div>
      <div class="desc" v-if="show_per_page">
        <div
          v-for="(_limit, index) in limits"
          :key="index"
          class="desc-info"
          @click="
            setLimit(_limit);
            show_limit = false;
          "
        >
          <i
            :class="
              limit.text == _limit.text
                ? 'icon-ok-circled has-text-ishtari-blue'
                : 'icon-circle-empty'
            "
          ></i>
          <p>{{ _limit.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      sort: "catalog/sort",
      sorts: "catalog/sorts",
      limit: "catalog/limit",
      limits: "catalog/limits",
    }),
  },
  data: () => {
    return {
      show_sort: false,
      show_per_page: false,
      show_display: false,
    };
  },
  methods: {
    ...mapActions({
      setSort: "catalog/setSort",
      setLimit: "catalog/setLimit",
    }),
  },
};
</script>
<style scoped>
#controlsWrapper {
  display: flex;
  justify-content: space-between;
}
.control {
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
}
.control:last-child {
  padding-right: 0;
}
.control span {
  color: #b2bbd2;
  margin-right: 10px;
  letter-spacing: 0.2px;
  font-size: 12px;
  font-weight: bold;
}
.control .bt {
  background: white;
  padding: 5px 13px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  border: 1px solid black;
}
i {
  color: black;
}
.bt:hover {
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.desc {
  padding: 10px;
  background: red;
  width: 200px;
  position: absolute;
  top: 37px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  background: white;
  right: 20px;
}
.desc::after {
  bottom: 100%;
  right: 10px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  top: -13px;
  border-color: rgba(48, 12, 12, 0);
  border-bottom-color: white;
  border-width: 7px;
  margin-right: -7px;
  z-index: 16;
}
.desc-info {
  font-size: 13px;
  display: flex;
  padding: 5px 0;
}
.desc-info:hover {
  opacity: 0.8;
  cursor: pointer;
}
.desc i {
  margin-right: 5px;
}
</style>
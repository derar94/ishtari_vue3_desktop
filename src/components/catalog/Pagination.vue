<template>
   <vue-ads-pagination
            :total-items="200"
            :max-visible-pages="5"
            :page="1"
            :loading="false"
        />
</template>
<script>
import VueAdsPagination  from "vue-ads-pagination";
export default {
  data: () => {
    return {
      pagecount: 4,
    };
  },
  components: {
     VueAdsPagination,
    // VueAdsPageButton,
  },
  methods: {
    paginate() {},
  },
};
</script>
<template>
  <div id="zoom_wrapper">
    <div class="selectors">
      <a
        data-zoom-id="Zoom-1"
        v-for="img in images"
        :href="img['popup']"
        :key="img['thumb']"
        :data-image="img['popup']"
        :data-zoom-image-2x="img['popup']"
        :data-image-2x="img['popup']"
      >
        <img :srcset="img['thumb']" :src="img['thumb']" />
      </a>
    </div>
    <a id="Zoom-1" class="MagicZoom" :href="images[0]['popup']">
      <img :src="images[0]['popup']" alt="" />
    </a>
  </div>
</template>


<script>
export default {
  created() {
    let path = this.$router.resolve({
      name: "home",
    });
    let actual_url = "https://" + location.host + path.href;
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      actual_url + "magiczoomplus/magiczoomplus.js"
    );
    document.head.appendChild(externalScript);
    let style = document.createElement("link");
    style.setAttribute("href", actual_url + "magiczoomplus/magiczoomplus.css");
    style.setAttribute("rel", "stylesheet");
    document.head.appendChild(style);
  },
  props: ["images"],
};
</script>

<style scoped>
#zoom_wrapper {
  display: flex;
}

.selectors {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

a[data-zoom-id],
.mz-thumb,
.mz-thumb:focus {
  margin-bottom: 10px;
}

.selectors img[src] {
  width: 50px;
  min-width: 50px;
}

.mz-thumb.mz-thumb-selected img {
  border-bottom: 1px solid blue;
}
</style>
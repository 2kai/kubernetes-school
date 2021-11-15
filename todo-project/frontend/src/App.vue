<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-3">
            <ToDo/>
          </div>
          <div class="col-6 offset-3">
            <DailyImage/>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import DailyImage from "@/components/DailyImage";
import ToDo from "@/components/ToDo";

export default {
  name: 'LayoutDefault',

  components: {
    ToDo,
    DailyImage
  },
}
</script>

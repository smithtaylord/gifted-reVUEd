<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="addGift()">
              <div class="mb-3">
                <label for="tag" class="form-label">Tag</label>
                <input v-model="editable.tag" type="text" class="form-control" id="" aria-describedby="">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Image URL</label>
                <input v-model="editable.url" type="text" class="form-control" id="">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="row">
            <div class="col-12 pt-5 mt-5">
              <form @submit.prevent="searchGiphy()">
                <div class="input-group mb-3">
                  <input v-model="editable.query" type="text" class="form-control" placeholder="Search Giphy"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                  <button class="btn btn-outline-secondary" type="submit" id="button-addon2"><i
                      class="mdi mdi-magnify"></i></button>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div v-for="gif in giphys" class="col-6">
              <img class="img-fluid selectable" @click="selectGif(gif.url)" :src="gif.url" alt="">
            </div>
          </div>
        </div>

      </div>
      <div class="col-9">
        <div class="row">
          <div v-for="gift in gifts" class="col-3">
            <GiftCard :gift="gift" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref, watchEffect } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService.js'
import { AppState } from '../AppState.js';

export default {
  setup() {
    const editable = ref({})
    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error.message)
        logger.error('[GET GIFTS]', error)
      }
    }


    onMounted(() => {
      getGifts()
    })
    return {
      editable,
      gifts: computed(() => AppState.gifts),
      giphys: computed(() => AppState.giphys),
      async addGift() {
        try {
          let formData = editable.value
          await giftsService.addGift(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
          logger.log('[add gift]', error)
        }
      },
      async searchGiphy() {
        try {
          let queryData = editable.value
          watchEffect(() => {
            if (AppState.selectedGif) {
              editable.value.url = AppState.selectedGif
            }
          })
          await giftsService.searchGiphy(queryData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
          logger.log('[search Giphy]')
        }
      },
      selectGif(url) {
        AppState.selectedGif = url
      }
    }
  }
}
</script>

<style lang="scss">
main {
  background-color: bisque;
}
</style>

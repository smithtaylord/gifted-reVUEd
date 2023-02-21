<template>
    <div class="component">
        <div class="bg-light p-3 rounded my-3">
            <img @click="openGift(gift)"
                :src="gift.opened ? gift.url : 'https://images.unsplash.com/photo-1577217534079-41d6bb68ac50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'"
                alt="" class="img-fluid selectable">
            <h5>{{ gift.tag }}</h5>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { Gift } from '../models/Gift.js';
import { giftsService } from '../services/GiftsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    props: {
        gift: { type: Gift }
    },
    setup() {
        return {
            async openGift(gift) {
                try {
                    await giftsService.openGift(gift)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error('[open gift]', error)
                }

                logger.log('you clicked', gift.id)
            }

        }
    }
}
</script>


<style lang="scss" scoped></style>
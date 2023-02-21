import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { Giphy } from "../models/Giphy.js"
import { logger } from "../utils/Logger.js"
import { giphyApi, sandboxApi } from "./AxiosService.js"

class GiftsService {
    async getGifts() {
        const res = await sandboxApi.get('/api/gifts')
        logger.log('[getting gifts]', res.data)
        AppState.gifts = res.data.map(g => new Gift(g))
    }

    async openGift(gift) {
        let foundGiftIndex = AppState.gifts.findIndex(g => g.id == gift.id)
        let foundGift = AppState.gifts[foundGiftIndex]
        if (foundGift.opened == false) {
            foundGift.opened = true
            const res = await sandboxApi.put(`/api/gifts/${gift.id}`, foundGift)
            AppState.gifts.splice(foundGiftIndex, 1, new Gift(res.data))
        }
    }

    async addGift(formData) {
        const res = await sandboxApi.post('/api/gifts', formData)
        logger.log('[form data]', res.data)
        let newGift = new Gift(res.data)
        AppState.gifts.push(newGift)
    }

    async searchGiphy(queryData) {
        let q = queryData.query
        logger.log(q)
        const res = await giphyApi.get('search', {
            params: {
                api_key: 'ReXivBqXr5tO4HjUfTK1W76hhx3S058Q',
                rating: 'pg',
                limit: 10,
                q: q
            }
        })
        logger.log('[search Giphy]', res.data.data)
        AppState.giphys = res.data.data.map(g => new Giphy(g))
        logger.log(AppState.giphys)

    }


}

export const giftsService = new GiftsService()
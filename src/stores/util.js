import {computed} from 'vue'
import { defineStore } from 'pinia'

export const useUtilStore = defineStore('util', () => {
    const formatDateToStr = computed(() => {
        return (date) => {
            return date.toISOString().slice(0, 10);
        };
    });
    
    //string = yyyy-mm-dd
    //timestamp
    const parseDate = computed(() => {
        return (str) => {
            return new Date(str)
        }
    })

    const addThousandSeparator = computed(() => {
        return (value) => (value).toLocaleString()
    })
    return {formatDateToStr, parseDate, addThousandSeparator}
})
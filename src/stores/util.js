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

    // const addThousandSeparatorToCurrency= computed(() => {
    //     return (logs) => {
    //         logs.forEach(log => {
    //             log.deposit = addThousandSeparator(log.deposit);
    //             log.withdraw = addThousandSeparator(log.withdraw);
    //             log.balance = addThousandSeparator(log.balance);
    //         })
    //     }
    // })
    const addThousandSeparator = computed(() => {
        return (value) => (value).toLocaleString()
    })
    // const addThousandSeparator = (value) => {
    //       return (value).toLocaleString()
    //   }
    return {formatDateToStr, parseDate, addThousandSeparator}
})
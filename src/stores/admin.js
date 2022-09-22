import { defineStore } from "pinia"
import { adminlogin, adminlogout, adminchecklog } from "../axios"
import { useRouter } from "vue-router"
export const useAdminStore = defineStore({
    id: "admin",
    state: () => ({
        isLogin: false,
        remeberMe: true,
    }),
    actions: {
        async adminlogin(adminloginform) {
            const result = await adminlogin(adminloginform)
            if (result.code) this.isLogin = true
            this.remeberMe = adminloginform.isRemeber
            return result
        },
        async adminlogout() {
            const result = await adminlogout()
            if (result.code) this.isLogin = false
            return result
        },
        async adminchecklog() {
            const router=useRouter()
            const result = await adminchecklog()
            if (result.code) this.isLogin = true
            else this.isLogin = false,router.push({path:'/'})
        }
    },
    persist: true
})

export const utilsComponent = {
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.xs;
        },
        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn'];
        },
        isLoading() {
            return this.$store.getters['process/isProcessing'];
        },
        showNotif() {
            return this.$store.getters['notification/isNotifShow'];
        },
        notifError() {
            return this.$store.getters['notification/isNotifError'];
        },
        notifMessage() {
            return this.$store.getters['notification/getNotifMessage'];
        }
    }
}

export const authFormRules = {
    data: () => ({
        email: "",
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: "",
        passwordRules: [
            v => !!v || 'Password is required'
        ],
        name: "",
        nameRules: [
            v => !!v || 'Name is required'
        ],
    })
}
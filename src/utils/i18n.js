// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
    const hasKey = this.$t(`route.${title}`)
    const translatedTitle = this.$t(`route.${title}`) // $t :this method from vue-i18n, inject in @/lang/index.js

    if (hasKey) {
        return translatedTitle
    }
    return title
}
export function generateData(val) {
    const hasKey = this.$t(`common.${val}`)
    const translatedData = this.$t(`common.${val}`)
    if (hasKey) {
        return translatedData
    }
    return val
}

<template>
    <div class="app-main-wrap">
        <section class="app-main">
            <transition name="fade"
                        mode="out-in">
                <!-- <router-view :key="key"></router-view> -->
                <router-view />
            </transition>
        </section>
    </div>

</template>

<script>
export default {
    name: 'AppMain',
    computed: {}
}
</script>

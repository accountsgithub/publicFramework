<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">

            <router-link v-if="hasOneShowingChildren(item) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}" class="bigMenu">
                    <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="'icon iconfont icon-ic-' + item.children[0].meta.icon"></i>
                    <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name||item.path" :key="item.name" class="child-menu">
                <template slot="title">
                    <i v-if="item.meta&&item.meta.icon" :class="'icon iconfont icon-ic-' + item.meta.icon" class="has-child-icon"></i>
                    <span v-if="item.meta&&item.meta.title" slot="title" class="has-child-text">{{generateTitle(item.meta.title)}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <i v-if="child.meta&&child.meta.icon" :class="'icon iconfont icon-ic-' + child.meta.icon"></i>
                            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>

        </template>
    </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n.js'
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        generateTitle,
        hasOneShowingChildren(item) {
            const showingChildren = item.children.filter(item => {
                return !item.hidden
            })
            if (showingChildren.length === 1) {
                return true
            }
            return false
        }
    }
}
</script>

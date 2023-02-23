<template>
    <div class="dragResizeBox" id="dragResizeBox">
        <VueDragResize
            :w="rect.width"
            :h="rect.height"
            :x="rect.left"
            :y="rect.top"
            :parentW="listWidth"
            :parentH="listHeight"
            :minw="rect.minw"
            :minh="rect.minh"
            :isDraggable="rect.draggable"
            :isResizable="rect.resizable"
            :z="rect.zIndex"
            :isActive="rect.active"
            :axis="rect.axis"
            :parentLimitation="rect.parentLim"
            :snapToGrid="rect.snapToGrid"
            :aspectRatio="rect.aspectRatio"
            v-on:resizing="changeSize($event)"
        >
            <slot />
        </VueDragResize>
    </div>
</template>
<script>
import VueDragResize from "vue-drag-resize"
import { debounce } from 'lodash'

export default {
    data() {
        return {
            listWidth: 0,
            listHeight: 0,
            rect: {
                width: 500,
                height: 360,
                top: 50,
                left: 180,
                draggable: true,
                resizable: true,
                minw: 320,
                minh: 200,
                zIndex: 1,
                axis: 'both',
                parentLim: true,
                snapToGrid: false,
                aspectRatio: false,
                active: false
            }
        }
    },
    components: {
        VueDragResize,
    },
    created() {
        this.changeSize = debounce(this.changeSize, 1000)
    },
    mounted() {
        let listEl = document.getElementById('dragResizeBox');
        this.listWidth = listEl.clientWidth;
        this.listHeight = listEl.clientHeight;
        window.addEventListener('resize', ()=>{
            this.listWidth = listEl.clientWidth;
            this.listHeight = listEl.clientHeight;
        })
    },
    methods: {
        changeSize(newRect) {
            this.$emit('resizeChart')
        }
    }
}
</script>
<style lang="less" scoped>
.dragResizeBox {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>